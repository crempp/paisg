/**
 * Main Application
 *
 */

define(["require",
        "exports",
        "modules/UI/Menu",
        "modules/CB/CommandBlock",
        "modules/StubAdapter"],
        function(require,
                 exports,
                 Menu,
                 CommandBlock,
                 StubAdapter) {
    var App = (function () {

        /**
         * App Constructor
         *
         * @constructor
         */
        function App() {
            console.log("New App");
            var _this = this;
            $(document).ready(function(){
                _this.start();
            });
        }

        /**
         * Start the app
         */
        App.prototype.start = function () {
            console.log("Staring application");

            var STUB_SUBROUTINE = 'nav_prop_test';

            // Startup Chad's code
            var m = new Menu.Menu();

            // Create a command block
            var cb = new CommandBlock.CommandBlock();

            // Seth's Initialization
            Game = new GameLoop('game-canvas');
            var clear = new Clear();
            //clear.color = "#000040";
            clear.color = "#000000";
            Game.addItem(clear);

            // Create entity
            var entity = new SpaceShip();
            entity.setPosition({x: 100, y: 50})
            entity.readyLoadImageId('ship');

            // Create Adapter
            var adapter = new StubAdapter.StubAdapter(cb, entity);

            // Finish GL setup
            entity.setInput(adapter);
            adapter.bootAI(STUB_SUBROUTINE).done(function(){
                Game.addItem(entity);
            });

        };

        return App;
    })();
    exports.App = App;

});