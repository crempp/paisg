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
    app.start();
});