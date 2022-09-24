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
        <link rel="stylesheet" type="text/css" href="font/sharetech.css?v=<?= $v; ?>" />
        <link rel="stylesheet" type="text/css" href="style.css?v=<?= $v; ?>" />





        <script src="/js/toolbox.js?v=<?= $v; ?>"></script>
        <script src="/js/dial.js?v=<?= $v; ?>"></script>
        <script src="/js/gameclientlistener.js?v=<?= $v; ?>"></script>
        <script src="/js/monitor.js?v=<?= $v; ?>"></script>
        <script src="/js/blektre/UI.js?v=<?= $v; ?>"></script>
        <script src="/js/blektre/phaser.js?v=<?= $v; ?>"></script>



    </head>

    <body class="<?= $isdev ? " dev " : " "; ?>">






        <div id="game" class="">
            <div id="notifs"></div>

            <div id="leftgame">
                <div id="fiche">
                    <div class="showonstart">
                        <div id="gheader">
                            <div class="stats stats1">
                                <div class="statbloc s33">  <span class="stat" data-stat="nom"></span>@<span class="stat" data-stat="place"></span><div id="music">♪<span id="musictitle"></span>♪</div></div>




                            </div>
                            <div class="stats stats2">
                                <div class="statbloc"> LIFE<span class="stat" data-stat="life"></span></div>
                                <div class="statbloc"> KARMA<span class="stat" data-stat="karma"></span></div>
                                <div class="statbloc">SEX<span class="stat" data-stat="sex"></span></div>
                                <div class="statbloc"> SANITY<span class="stat" data-stat="sanity"></span></div>
                                <div class="statbloc"> €<span class="stat" data-stat="money"></span></div>
                            </div>

                        </div>

                    </div>
                    <div id="visuel">

                        <div id="cadrephaser"></div>
                        <iframe id="phaserframe" src="Game/index.html?v=<?= $v; ?>" ></iframe> 


                    <!--  <textarea id="json" class="onhide"></textarea>
                    <textarea id="persos" class="onhide"></textarea>
                        <!-- <div id="peoplehere"></div> -->
                    </div>


                </div>

                <div class="textzone showonstart">
                    <div id="text"></div>               
                    <div id="choices"></div>  
                </div>
            </div>

            <!-- 
            <div id="map">

                <div id="places"></div>
            </div> 
the map overlay -->
        </div>
        <form id="connect" class="homepage hidden textzone">
            <h1>BLEKTRE 2081</h1>
            <input type="text" id="username" placeholder="username" />
            <input type="password" placeholder="password" id="password" value="pass"/>
            <input type="submit" id="submit" value="Login" />
            <div id="autoreconnect" class="centered hidden">
                Reconnexion in progress !
            </div>
            <br/><br/>
            <?php if (isset($_GET["devmode"])) : ?>
                <button class="quicklogin" data-name="ours" data-password="ours">Dev Only</button>
            <?php endif; ?>

        </form>

        <div id="character_menu" class="hidden textzone">
            <h2>Selection personnage</h2>
            <div id="charbox">

            </div>   
            <div id="golodark_box" class="hidden">


                <br/>----><button id="go" class="green">COMMENCER LA SIMULATION</button>
                <br/><br/>----><button id="effacer" data-command="createchar">Effacer</button> 
            </div>
            <br/><br/>
            <button id="createchar_button" data-command="createchar">Créer un nouveau personnage</button>

            <button id="quickstart" >QUICK START</button>
        </div>
        <div id="createchar" class="hidden textzone">
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

                function randomprenom() {
                    $tab = array('Henri Midur', 'OurseDur', 'Josiane', 'Onvie', 'Chirac', 'Miterrand', 'Alabate', 'Chichatte', 'Doreuse', 'Muceux',
                        "Quentine", "Seniana", "Coufeux", "Loufon", "Giboulard", "Copate", "Simili-Cuir", "Sencha-sanlafrez", "Sambal", "Macreuse", "Pileur",
                        "Verdure", "Gislabe", "Falantôme", "Pantine", "Stagalas", "Jenpol", "Luje", "Pleural", "Olivier",
                        "Arrosoir", "PatrickB", "Sectorin", "Sabeum", "Zigomas", "Alandru", "Pilopé", "Enfalme",
                        "Zobstance", "Peulan", "Peducelle", "Avantage", "Dego-Sabanthème");
                    shuffle($tab);
                    return $tab[0];
                }

                $de = round(rand(1, 3));
                ?>
                Nom <br/> <input type="text" id="nom" value="<?= randomprenom(); ?>" /> 
                <br/><br/> Morphologie <br/>
                <img src="img/persos_presentation.png" /><br/>


                <div id="type" class="genrebox"><input name="genderselect" type="radio" value="1" <?php if ($de == 1) : ?>checked="checked"<?php endif; ?> /> 
                    <input name="genderselect" type="radio" value="2" <?php if ($de == 2) : ?>checked="checked"<?php endif; ?> /> 
                    <input name="genderselect" type="radio" value="3" <?php if ($de == 3) : ?>checked="checked"<?php endif; ?> /> 
                </div>


                <br/><br/> Biographie<br/><textarea id="bio">Moi, tout simplement.</textarea>
                <br/> <button id="submitbio">Incarner ce merveilleux personnage</button> <button id="cancelbio">Annuler</button> 
            </div>

        </div>

        <input type="hidden" id="reconnect" value="<?= $disablereconnect ? 0 : $reconnect; ?>" data-username="<?= $_GET['username'] ? $_GET['username'] : ''; ?>" />






        <div id="col_popups">                        </div>

    </body>


</html>