<script>
    /*setTimeout(function() {
     window.close();
     }, 500);*/
</script>
<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$curIP = $_SERVER['REMOTE_ADDR'];
if ($curIP != '109.8.222.149') {
    die('sorry mum');
}


$connection = ssh2_connect('5tfu.org', 22);
usleep(500);
ssh2_auth_password($connection, 'blektre2081', 'z0b#ndUr');
usleep(9000);

$option = '';
if ($_GET['flush'])
    $option = '-flush';

//ssh2_exec($connection, 'killall --user blektre2081 /usr/bin/node');

$stream = ssh2_exec($connection, 'node /home/blektre2081/blektre2081/run.js ' . $option);
usleep(9000);

stream_set_blocking($stream, false);
do {
    $line = fgets($stream);
    if ($line) {
        // $line contient la ligne actuelle
        // Faites ici ce dont vous avez besoin
        echo $line . "<br>";
    } else {
        // On met en pause pour alléger le serveur
        usleep(200); // Dormir 200ms
        // On ne flush rien si rien n'est envoyé au client
        echo "\x00";
    }
    // Pour utiliser connection_aborted(), il faut flush() avant,
    // le statut de la connexion n'est actualisé que dans ce cas.
    flush();
} while (!connection_aborted());
