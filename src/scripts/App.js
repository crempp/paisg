define(["require", "exports"], function(require, exports) {
    var App = (function () {

        /**
         * App Constructor
         *
         * @constructor
         */
        function App() {
            console.log("New App");
        }

        /**
         * Start the app
         */
        App.prototype.start = function () {
            console.log("Staring application");
        };

        return App;
    })();
});