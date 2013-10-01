define(["require", "exports"], function(require, exports) {
    var Menu = (function () {

        /**
         * App Constructor
         *
         * @constructor
         */
        function Menu() {
            console.log("Menu");

            $('#menu-button-cb').on('click', this.handleControlBlockClick);
            $('#menu-button-blah').on('click', function(){console.log("NOT IMPLEMENTED");});
            $('#menu-button-max').on('click', this.handleMaximizeClick);
            $('#menu-button-unmax').on('click', this.handleUnMaximizeClick);
        }


        /**
         * Handle clicks on control block button
         */
        Menu.prototype.handleControlBlockClick = function () {
            console.log("CBClick");
        }

        /**
         * Handle clicks on maximize button
         */
        Menu.prototype.handleMaximizeClick = function () {
            console.log("Maximize");
        }

        /**
         * Handle clicks on un-maximize button
         */
        Menu.prototype.handleUnMaximizeClick = function () {
            console.log("UnMaximize");
        }

        return Menu;
    })();
    exports.Menu = Menu;

});
