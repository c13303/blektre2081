/* file created by charles.torris@gmail.com */
var tickrate;
var map;
var mapSizeX = mapSizeY = null;
var viewSize = null;
var persos = null;
var centerX = centerY = 0;
var followId = null;
var monitor = "";
var names = [];
var newNotices = [];
var lastd;
var nplayers;
var serverSettings = {};
var mychar = '';
var lag = {now: 0, last: 0};
function roughSizeOfObject(object) {

    var objectList = [];
    var stack = [object];
    var bytes = 0;
    while (stack.length) {
        var value = stack.pop();
        if (typeof value === 'boolean') {
            bytes += 4;
        } else if (typeof value === 'string') {
            bytes += value.length * 2;
        } else if (typeof value === 'number') {
            bytes += 8;
        } else if
                (
                        typeof value === 'object'
                        && objectList.indexOf(value) === -1
                        ) {
            objectList.push(value);
            for (var i in value) {
                stack.push(value[i]);
            }
        }
    }
    return bytes;
}

var titrePlace;


function gameClientHook(d) {
    /* d = data from serveur message */

    console.log(d);

    phaserHook(d);

    if (d.error) {
        alert(d.error);
    }

    if (d.connected) {
        $("#connect").remove();
        $('#game').removeClass('hidden');
    }

    if (d.character_menu) {
        $('#character_menu').removeClass('hidden');
    }
    if (d.char_inventory) {
        var chars = '';
        for (var i = 0; i < d.char_inventory.length; i++) {
            console.log('Inventorian Personnsnnges ' + d.char_inventory[i].nom);
            chars += '<button class="perso_selector" data-i="' + i + '">' + d.char_inventory[i].nom + '</button>';
        }
        $("#charbox").html(chars);
    }


    /* RECEPT A PAGE */




    if (d.text) {
        if (d.scene)
            titrePlace = d.scene;
        var texthtml = nl2br("<br/>" + d.text); // <h2>" + titrePlace + '</h2>' + nl2br(d.text);

        if (!d.choices)
            console.log('ERREUR : D.CHOICES MISSING');
        if (d.flush) {
            $('#leftgame').delay(500).fadeTo(1000, 1);
            $('#text').html("");
        } else {
            $('#text').find(".content").addClass('old').fadeTo(500, 0);
        }

        $('#choices').find('.gamechoice').fadeTo(500, 0).delay(50).remove();

        /* is there textarea */




        if (d.textarea) {
            texthtml += '<br/><div class="fragebox"><textarea id="frage"></textarea><button id="frageok">OK</button></div>';
            $(document).find('#choices').hide();
        }

        if (d.text2) {
            texthtml += '<div class="hidden text2">' + nl2br(d.text2) + '</div>';
        }





        $('#text').append("<div class='content'>" + texthtml + "<br/><br/></div>");

        var choices = '';
        for (var i = 0; i < d.choices.length; i++) {
            var line = d.choices[i];
            var buton = "<button id='#tutu" + i + "' class='gamechoice gamechoice_button' data-target='" + line[1] + "' style='opacity:0' data-page='" + line[2] + "'>" + line[0] + "</button>";
            choices += buton;
        }


        $('#choices').append(choices);
        $('#choices').find('.gamechoice').delay(1).fadeTo(100, 1);
    }










    /* end recept a page */


    if (d.mychar) {
        if (d.mychar.loglines.length) {
            for (var i = 0; i < d.mychar.loglines.length; i++) {
                if (d.mychar.loglines[i][0] !== '!') // symbole update stat
                    $('#notifs').append('<div class="notif">' + d.mychar.loglines[i] + '</div>');
            }
        }
        // var html = "<b class='name'>" + d.mychar.nom + "</b>";
        var html = JSON.stringify(d.mychar, null, 2);
        $('#fiche #json').html(html);
        mychar = d.mychar;
        // $('#place').html(mychar.place);
        $('.stats').css("opacity", 1);

        //$('#sprite_mychar').css('background', 'url(/img-persos/type' + mychar.type + '.png?v=');

        $(".stat").each(function () {
            var stat = $(this).data('stat');
            $(this).html(mychar[stat]);
        });

    }



    if (d.persos) {
        var html = '';
        console.log(d.persos);
        $('#persos').html(JSON.stringify(d.persos, null, 2));

        persos = d.persos;

    }

    if (d.popups) {
        console.log(d.popups);
        var html = '';
        for (var i = 0; i < d.popups.length; i++) {
            //JSON.stringify(d.popups[i], null, 2)
            html += '<div class="popin"><span class="title">' + d.popups[i].title + '</span></div>';

        }
        $('#col_popups').append(html);
    }



    /* PHASER ANIMATION */
    if (d.phasercommand) {

    }

}



/* end of listener */


