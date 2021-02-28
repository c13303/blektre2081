<?php
$version = '0.2';
$statut = '';
$v = time();
$title = 'BLEKTRE 2081';
$isdev = filter_input(INPUT_GET, "dev", FILTER_SANITIZE_NUMBER_INT);
$message = filter_input(INPUT_GET, "message", FILTER_SANITIZE_STRING);
$reconnect = filter_input(INPUT_GET, "reconnect", FILTER_SANITIZE_STRING);
$disablereconnect = filter_input(INPUT_GET, "disablereconnect", FILTER_SANITIZE_STRING);



if ($disablereconnect) {
    $reconnect = 0;
}

if ($isdev) {
    $title .= " Dev";
    $v = time();
    $devclass = "dev";
}
?>
<!DOCTYPE html>
<html>

    <head>
        <title>
            <?= strip_tags($title); ?>
        </title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
        <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js"></script>
        <link rel="icon" type="image/png" href="favicon.png" />
        <link href="https://fonts.googleapis.com/css?family=VT323&display=swap" rel="stylesheet">
        <link rel="stylesheet" type="text/css" href="style.css?v=<?= $v; ?>" />

        <script src="/js/toolbox.js?v=<?= $v; ?>"></script>
        <script src="/js/dial.js?v=<?= $v; ?>"></script>
        <script src="/js/gameclientlistener.js?v=<?= $v; ?>"></script>
        <script src="/js/monitor.js?v=<?= $v; ?>"></script>
        <script src="/js/blektre/UI.js?v=<?= $v; ?>"></script>
        <script src="/js/blektre/phaser.js?v=<?= $v; ?>"></script>


    </head>

    <body class="<?= $isdev ? " dev " : " "; ?>">
        <h1>BLEKTRE 2081</h1>

        <form id="connect" class="homepage">

            <input type="text" id="username" placeholder="username" />
            <input type="password" placeholder="password" id="password" value="pass"/>
            <input type="submit" id="submit" value="Login" />
            <button class="quicklogin" data-name="ours" data-password="ours">QL OURS</button>
            <div id="autoreconnect" class="centered hidden">
                Reconnexion in progress !
            </div>

        </form>
        <div id="character_menu" class="hidden">
            <h2>Selection personnage</h2>
            <div id="charbox">

            </div>   
            <div id="golodark_box" class="hidden">
                <button id="effacer" data-command="createchar">Libérer ce personnage</button>
                <button id="go">GO GO GO AVEC OUI GO</button>
            </div>
            <br/><br/>
            <button id="createchar_button" data-command="createchar">Créer un nouveau personnage</button>
        </div>
        <div id="createchar" class="hidden">
            <div id="creaturecharform">
                <?php

                function generateRandomString($length = 10) {
                    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
                    $charactersLength = strlen($characters);
                    $randomString = '';
                    for ($i = 0; $i < $length; $i++) {
                        $randomString .= $characters[rand(0, $charactersLength - 1)];
                    }
                    return $randomString;
                }
                ?>
                Nom : <input type="text" id="nom" value="<?= generateRandomString(8); ?>" />
                <br/> Corps : 
                1<input type="radio" id="type" name="type" selected="selected" value="1" />
                2<input type="radio" id="type" name="type" selected="selected" value="2" />
                3<input type="radio" id="type" name="type" selected="selected" value="3" />
                <br/> Biographie<textarea id="bio">Coucouille</textarea>
                <br/> <button id="submitbio">Incarner ce merveilleux personnage</button> <button id="cancelbio">Annuler</button> 
            </div>

        </div>


        <div id="game" class="hidden">

            <div id="leftgame">
                <div id="text"></div>               
                <div id="choices"></div>  
            </div>
            <div id="fiche">

                <div id="visuel">
                    <iframe id="phaserframe" src="Game/index.html?v=<?= $v; ?>" ></iframe>
                    <div id="place"></div>
                    <div id="peoplehere"></div>
                    <div class="stats">
                        <br/>€ <span class="stat" data-stat="money"></span>
                        <br/>KARMA <span class="stat" data-stat="karma"></span>
                        <br/>SEX <span class="stat" data-stat="sex"></span>
                        <br/>SANITY <span class="stat" data-stat="sanity"></span>
                    </div>
                </div>
                <div id="notifs"></div>
                <div id="json" ></div>
            </div>
            <div id="map">
                <div id="places"></div>
            </div>
        </div>



        <input type="hidden" id="reconnect" value="<?= $disablereconnect ? 0 : $reconnect; ?>" data-username="<?= $_GET['username'] ? $_GET['username'] : ''; ?>" />








    </body>

</html>