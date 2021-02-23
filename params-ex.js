/* file created by charles.torris@gmail.com */

module.exports = {
    host: 'tamere',
    user: 'tamere',
    password: 'tamere',
    database: 'tamere',
    key: "/path/to/tamere/privkey.pem",
    cert: "/path/to/tamere/fullchain.pem",
    logpath: '/path/to/tamere/logs/',
    datapath: '/path/to/tamere/web/data/',
    httpsenabled: true,
    dev: false,
    port_prod: 8078,
    port_dev: 8077,
    granu: 200,
    antiFloodDelay: 75,
    tickrate: 272, // better have a 32 (pixels) round  /// 576,448,384, 296, 288,144
    worldSize: 128,
    viewSize: 8,
    writeLogs: false,
    spawnX: 32,
    spawnY: 75,

};