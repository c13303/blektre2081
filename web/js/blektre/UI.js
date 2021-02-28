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
        console.log('launch with ' + selectedperso);
        ws.send(JSON.stringify({
            go: 1,
            char: selectedperso
        }));
        $('#character_menu').remove();

    });

    $(document).on('click', '.gamechoice', function (e) {
        console.log('Choice : ' + $(this).data('target'));
        $("#map").hide();
        $("#places").html("");
        if ($(this).data('target') === 'map') {
            $('#map').show();
            var html = "";

            for (var i = 0; i < mychar.places.length; i++) {
                html += "<div class='placemap gamechoice' data-target='" + mychar.places[i][1] + "'>" + mychar.places[i][0] + "</div>";
            }
            $('#places').html(html);
        } else {
            ws.send(JSON.stringify({
                choice: $(this).data('target'),
                page: $(this).data('page')

            }));
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
    
    

});