/**
 * Stub Adapter
 *
 */

define(["require", "exports", "modules/UI/Menu", "modules/CB/CommandBlock"], function(require, exports, Menu, CommandBlock) {
    var StubAdapter = (function () {

        var _subroutinePath = "js/subroutines/";

        var _commandBlock = null;
        var _entity       = null;

        var $sandbox       = null;
        var sandboxContext = null;

        function sandboxPassThru(func, args) {

        }

        /**
         * StubAdapter Constructor
         *
         * @param CommandBlock controlBlock
         * @param SpaceShip entity
         * @constructor
         */
        function StubAdapter(controlBlock, entity) {
            console.log("New Stub Adapter");

            _commandBlock = controlBlock;
            _entity       = entity;
        }

        /**
         * Boot an AI subroutine
         *
         * TODO: This belongs somewhere else
         *
         * @param id
         */
        StubAdapter.prototype.bootAI = function (id) {
            console.log("Booting ["+ id + "]");

            var deferred = $.Deferred();

            var sb_loaded = false;
            var sc_loaded = false;

            // Create a sandbox
            $sandbox = $("<iframe />", {
                id: 'subroutine-sandbox',
                name: 'subroutine-sandbox',
                load: function() {
                    console.log("Subroutine sandbox loaded");
                    sb_loaded = true;
                    if (sb_loaded && sc_loaded) deferred.resolve();
                }
            });
            $('#sandbox-container').append($sandbox);

            // Attach subroutine to sandbox
            //$sandbox = $('#subroutine-sandbox');

            // Create script tag to load the subroutine
            var script    = document.createElement("script");
            script.type   = "text/javascript";
            script.src    = _subroutinePath + id + ".js";
            script.onload = function() {
                console.log("Subroutine script loaded");
                //console.log(window.frames['subroutine-sandbox'].instruct_thrust)
                sandboxContext = window.frames['subroutine-sandbox'];

                sc_loaded = true;
                if (sb_loaded && sc_loaded) deferred.resolve();
            }

            // Attach
            $sandbox.contents().find('head')[0].appendChild(script);

            // test
            //console.log($sandbox[0].contentWindow.instruct_thrust());

            return deferred.promise();
        }

        /**
         * Pass thrust query from entity to control block
         *
         * Called by Entity
         * Queries ControlBlock
         */
        StubAdapter.prototype.getThrust = function () {
            //return _commandBlock.getThrust();
            if (sandboxContext) {
                return sandboxContext.instruct_thrust();
            }
            else return false;
        }

        /**
         * Pass torque query from entity to control block
         *
         * Called by Entity
         * Queries ControlBlock
         */
        StubAdapter.prototype.getTorque = function () {
            //return _commandBlock.getTorque();
            if (sandboxContext) {
                return sandboxContext.instruct_heading();
            }
            else return false;
        }

        return StubAdapter;
    })();
    exports.StubAdapter = StubAdapter;

});