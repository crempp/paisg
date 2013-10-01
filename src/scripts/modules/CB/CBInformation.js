/**
 * Command Block Information Object
 *
 */

define(["require", "exports"], function(require, exports) {
    var CBInformation = (function () {

        /**
         * CBInformation Constructor
         *
         * @constructor
         */
        function CBInformation() {
            console.log("New CBInformation");
        }

        /**
         * Start the app
         */
        CBInformation.prototype.start = function () {

        };

        return CBInformation;
    })();
    exports.CBInformation = CBInformation;

});