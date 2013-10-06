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
            console.log("New Command Block");
        }

        /**
         * Start the app
         */
        CommandBlock.prototype.start = function () {

        };

        CommandBlock.prototype.getThrust = function () {
            return 1;
        };
        CommandBlock.prototype.getTorque = function () {
            return 1;
        };


        return CommandBlock;
    })();
    exports.CommandBlock = CommandBlock;

});