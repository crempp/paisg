/**
 * Command Block Object
 *
 */

define(["require", "exports"], function(require, exports) {
    var CommandBlock = (function () {

        /**
         * App Constructor
         *
         * @constructor
         */
        function CommandBlock() {
            console.log("New App");
        }

        /**
         * Start the app
         */
        CommandBlock.prototype.start = function () {

        };

        return CommandBlock;
    })();
    exports.CommandBlock = CommandBlock;

});