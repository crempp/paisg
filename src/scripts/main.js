require.config({
    baseUrl: 'js',

    paths: {
        jquery: '../lib/jquery',
        rafpollyfill: '../lib/RAFPolyfill'
    }
});

// Start the app:
require(['App'], function (App) {
    var app = new App.App();
    // Start gets run at onload time now
    //app.start();
});