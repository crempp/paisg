/**
 * Main Application
 *
 */

define(["require", "exports", "modules/UI/Menu", "modules/CB/CommandBlock"], function(require, exports, Menu, CommandBlock) {
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

            // Seth's Initialization
            /*
            Game = new GameLoop('game-canvas');
            var clear = new Clear();
            clear.color = "#000040";
            Game.addItem(clear);
            var ship = new SpaceShip();
            ship.readyLoadImageId('ship');

            var keyinput = new keyInput();
            var mouseinput = new mouseInput('game-canvas');

            ship.setInput(keyinput);
            Game.addItem(ship);


            debugout = new GameLoop('debug');

            var debug = new Debug();
            debugout.addItem(debug);
            debug.setFullWidth(true);
            debug.addItem(mouseinput, mouseinput.getMousePosition, 'mouse');
            debug.addItem(ship, 'getForwardNormal', 'shipfront');
            debug.addItem(ship, 'getVelocity', 'ship_v');
            */

            // Startup Chad's code
            var m = new Menu.Menu();
        };

        return App;
    })();
    exports.App = App;

});