/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */




$(document).ready(function () {
    $(document).on('click', '.command', function (e) {
        var command = $(this).data('command');
        ws.send(JSON.stringify({
            command: $(this).data('command')
        }));
    });


    $('#createchar_button').click(function () {
        $('#createchar').removeClass('hidden');
        $('#character_menu').addClass('hidden');
    });

    $('#cancelbio').click(function () {
        $('#createchar').addClass('hidden');
        $('#character_menu').removeClass('hidden');
    });

    $(document).on('click', '.perso_selector', function (e) {
        $('#charbox').find('button').removeClass("selected");
        $(this).addClass('selected');
        $("#golodark_box").removeClass('hidden');
    });

    $('#go').click(function () {

        var selectedperso = $(document).find('#charbox .selected').data('i');
       // console.log('launch with ' + selectedperso);
        ws.send(JSON.stringify({
            go: 1,
            char: selectedperso
        }));
        $('#character_menu').remove();

    });

    $(document).on('click', '.gamechoice', function (e) {
       // console.log('Choice : ' + $(this).data('target'));
        $("#map").hide();
        $("#places").html("");

        /* AFFICHAGE MAP DE METRO */
        if ($(this).data('target') === 'map') {
            $('#map').show();
            var html = "";
            for (var i = 0; i < mychar.places.length; i++) {
                html += "<button class='placemap gamechoice' data-page='moving' data-target='00_global/metro' data-dest='" + mychar.places[i][1] + "' data-destname='" + mychar.places[i][0] + "'>" + mychar.places[i][0] + "</button>";
            }
            $('#places').html(html);
        } else {

            /* VALIDATION DES CHOIX */

            var msg = {
                choice: $(this).data('target'),
                page: $(this).data('page')
            };

            /* textarea*/

            if ($(document).find('#frage').length) {
                msg.textarea = $(document).find('#frage').val();
            }

            if ($(this).data('dest')) {
                msg.dest = $(this).data('dest');
                msg.destname = $(this).data('destname');
            }
            ws.send(JSON.stringify(msg));
        }
    });

    $("#submitbio").click(function () {
        var nom = $('#nom').val().replace(/(<([^>]+)>)/gi, "");
        var type = $('#type').val().replace(/(<([^>]+)>)/gi, "");
        var bio = $('#bio').val().replace(/(<([^>]+)>)/gi, "");

        if (nom && type && bio) {
            ws.send(JSON.stringify({
                create_char: {
                    nom: $('#nom').val(),
                    type: $('#type').val(),
                    bio: $('#bio').val()
                }
            }));

            $('#createchar').addClass('hidden');
            $('#character_menu').removeClass('hidden');
        }

    });


    /* lors du textarea en pleine page */
    $(document).on('click', '#frageok', function (e) {
        var data = $(document).find('#frage').val();
        console.log(' YEAH ' + data);
        $(document).find('.fragebox').hide();
        $(document).find(".text2").removeClass('hidden');
        $(document).find('#choices').show()
    });



    $("#quickstart").click(function () {
        setTimeout(quickstart1, 100);
    });
    function quickstart1() {
        $('#createchar_button').trigger('click');
        setTimeout(quickstart2, 100);
    }
    function quickstart2() {
        $('#submitbio').trigger('click');
        setTimeout(quickstart3, 100);
    }
    function quickstart3() {
        $('#charbox button').trigger('click');
        setTimeout(quickstart4, 100);
    }
    function quickstart4() {
        $('#go').trigger('click');
    }



    $(document).on('mouseover', '.perso_', function () {
        var persoKey = $(this).data('n');
        var perso = persos[persoKey];
      //  console.log('over people ' + persoKey);

        $(this).append('<div class="hoverpeople">'
                + '<b>' + perso.bnom + '</b>'
                + '<br/>Relation avec vous : ' + mychar.relationships[perso.nom]
                + '<br/>Karma : ' + perso.karma
                + '<br/>Sex-appeal : ' + perso.sex
                + '<br/>Santé mentale : ' + perso.sanity
                + '<br/>Money : ' + perso.money
                + '</div>')
    });

    $(document).on('mouseout', '.perso_', function () {
      //  console.log('out people');

        $(document).find('.hoverpeople').remove();
    });
});