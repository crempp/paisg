/**
 * Command Block Navigation Object
 *
 */

define(["require", "exports"], function(require, exports) {
    var CBNavigation = (function () {

        /**
         * CBNavigation Constructor
         *
         * @constructor
         */
        function CBNavigation() {
            console.log("New App");
        }

        /**
         * Start the app
         */
        CBNavigation.prototype.start = function () {

        };

        return CBNavigation;
    })();
    exports.CBNavigation = CBNavigation;

});