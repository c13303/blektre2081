
function showmelove() {
    $('#connect').show();
    setTimeout(function () {
        $("iframe").css('pointer-events', 'none');
    }, 100);
}

function resizeIframeOnCanvas() {
    console.log('resized iframe');
    $("iframe").height($("iframe").contents().find("canvas").height());
}


function send(json) {

    if ($(".nogameclick:hover").length === 0) {
        ws.send(JSON.stringify(json));
    }

}
var user;
var rebootdisabled = false;
var devFollow = 3;
var devFollow = false;
var log = 0;
var url = 'blektre2081.5tfu.org';
var v = Math.floor(Date.now() / 1000);
var ws;
var user = player = camera = preload = create = update = null;
var autoreco;
var deltaTime = 0;
var button;
var game;
var dev;
var consolage = null;
var drawnOurs;
var datamemory;

$(document).ready(function () {

    dev = $('#isdev').val() ? true : false;
    console.log('Blektre2081 bY ChArLEs ToRRiS');
    lastdata = null;

    //   $(document).find('*').off('keyup keydown keypressed');


    $(document).on('change', '#mouse1', function (e) {
        dT.speak(pd.id, "caca", true);
    });


    /* login UI */
    $('#connect').submit(function (e) {
        e.preventDefault();
        connect();
    });

    /* auto Reconnection */
    if ($('#reconnect').val() == 1) {

        if ($('#reconnect').data('username')) {
            user = $('#reconnect').data('username');
            var token = 'ours';
        } else {
            user = Cookies.get('user');
            var token = Cookies.get('token');
        }
        console.log('Try to reco ' + user + $('#reconnect').val());
        $('#reconnect').val(0);
        if (user && token) {
            $('#password').val(token);
            $('#username').val(user);
            $('.homepage').hide();
            $('#autoreconnect').removeClass('hidden');
            autoreco = setTimeout(function () {
                connect();
            }, 100);
        }
    }
    $(document).on('click', '.quicklogin', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $('#username').val($(this).data('name'));
        $('#password').val($(this).data('password'));
        //$('#connect').submit();
        connect();
    })

    /* connexion to serveur */
    function connect() {
        clearTimeout(autoreco);
        token = $('#password').val();
        user = $('#username').val();

        //  console.log("ZOOM " + ZOOM);
        var regex = /^([a-zA-Z0-9_-]+)$/;
        if (!regex.test(user) || !regex.test(token)) {
            alert('Please use only alphanumeric characters and underscores for user and pass ');
            return false;
        }
        var port = 8078;
        Cookies.set('user', user);
        Cookies.set('token', token);
        console.log('connecting ' + user);
        try {
            ws = new WebSocket('wss://' + url + ':' + port + '/' + token + '-' + user);
        } catch (e) {
            alert(e);
        }

        /* error & close handling */
        ws.onerror = function (e) {
            console.log('erreur from ws');
            console.log(e);
            //window.location.replace("/?" + isdev + "message=Login Failed&disablereconnect=1");
        };
        ws.onclosed = function (e) {
            // console.log('closed');
            console.log(e);
        }


        /* receive from server */
        ws.onmessage = function (event) {
            try {
                var d = JSON.parse(event.data);
                if (log === 1) {
                    console.log(d);
                }
                lastdata = d;
            } catch (e) {
                console.log(event.data);
                console.log(e);
            }
            var mem = memorySizeOf(d);
            datamemory += mem;

            if (d.startgame && d.mapSize) {
                /* game starts from server */
                console.log('!!! Start Signal From Server !!!!');
                $('.homepage').remove();
                $('#autoreconnect').remove();
                $('#game').removeClass("hidden");
                config();
            }

            /* hook to gameclient.js */
            gameClientHook(d);
        } /* end of reception */


        function ping() {
            setTimeout(function () {
                if (ws.readyState === ws.CLOSED && !rebootdisabled) {
                    console.log('Connexion closed, reset triggered');
                    window.location.replace("/?reconnect=1&username=" + user);
                } else {
                    ping();
                }
            }, 2000);
        }

        ping();


    } /* end of connect */
    ///// DEV OR TESTABLE MODE
    // $(".devtools").remove();











}); /* end of domready */

function mem() {
    const used = window.performance.memory;
    for (let key in used) {
        console.log(`${key} ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`);
    }

    function checkdata(bytes) {
        if (bytes < 1024)
            return bytes + " bytes";
        else if (bytes < 1048576)
            return (bytes / 1024).toFixed(3) + " KiB";
        else if (bytes < 1073741824)
            return (bytes / 1048576).toFixed(3) + " MiB";
        else
            return (bytes / 1073741824).toFixed(3) + " GiB";
    }
    console.log("Data received : " + checkdata(datamemory));
}

