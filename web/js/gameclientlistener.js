/* file created by charles.torris@gmail.com */
var tickrate;
var map;
var mapSizeX = mapSizeY = null;
var viewSize = null;
var people = [];
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




function gameClientHook(d) {
    /* d = data from serveur message */

    console.log(d);
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



        if (!d.choices)
            console.log('ERREUR : D.CHOICES MISSING');
        if (d.flush) {
            $('#leftgame').delay(500).fadeTo(1000, 1);
            $('#text').html("");
        } else {
            $('#text').find(".content").addClass('old').fadeTo(500, 0);
        }

        $('#choices').find('.gamechoice').fadeTo(500, 0).delay(50).remove();
        $('#text').append("<div class='content'>" + nl2br(d.text) + "<br/><br/></div>");
        var choices = '';
        for (var i = 0; i < d.choices.length; i++) {
            var line = d.choices[i];
            var buton = "<button id='#tutu" + i + "' class='gamechoice gamechoice_button' data-target='" + line[1] + "' style='opacity:0' data-page='" + line[2] + "'>" + line[0] + "</button>";
            choices += buton;
        }
        $('#choices').append(choices);
        $('#choices').find('.gamechoice').delay(500).fadeTo(500, 1);
        if (d.visu) {
            $('#thecanvas').fadeTo(200, 0, function () {
                $('#thecanvas').css('background', 'url(/img/' + d.visu + '.png?v=' + Date.now()).fadeTo(500, 1);
            })
        }

    }



    /* end recept a page */


    if (d.mychar) {
        if (d.mychar.notifications.length) {
            for (var i = 0; i < d.mychar.notifications.length; i++) {
                $('#notifs').append('<div class="notif">' + d.mychar.notifications[i] + '</div>');
            }
        }
        var html = "<b class='name'>" + d.mychar.nom + "</b>";
        html += JSON.stringify(d.mychar);
        $('#fiche #json').html(html);
        mychar = d.mychar;
        $('#place').html(mychar.place);
        //$('#sprite_mychar').css('background', 'url(/img-persos/type' + mychar.type + '.png?v=');

        $(".stat").each(function () {
            var stat = $(this).data('stat');
            $(this).html(mychar[stat]);
        });

    }



    if (d.persos) {
        var html = '';
        console.log(d.persos);

        /* persos here */
        for (const [key, value] of Object.entries(d.persos)) {
            html += ' <div class="persal">' + key + '</div> ';
        }
        $('#peoplehere').html(html);



    }

}



/* end of listener */


