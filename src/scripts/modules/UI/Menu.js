define(["require", "exports"], function(require, exports) {
    var Dialog = (function () {

        var _id = null;
        var $el = null;

        function Dialog(id) {
            console.log("dialog - " + id);
            _id = id;
            $el = $('#' + id);
        }

        Dialog.prototype.show = function () {
            console.log("Dialog show");
            $el.show();
        }

        Dialog.prototype.hide = function () {
            console.log("Dialog show");
            $el.hide();
        }

        Dialog.prototype.visible = function () {
            return $el.is(":visible");
        }

        Dialog.prototype.handleResize = function (windowMetric) {

            var dlgW = $el.width();
                dlgH = $el.height();

            $el.css('left', (windowMetric.windowW - dlgW) / 2 );
            $el.css('top',  (windowMetric.windowH - windowMetric.menuH - dlgH) / 2 );


        }

        return Dialog;
    })();

    var Menu = (function () {

        var dialogCB       = null,
            $gameScreen    = null,
            $gameContainer = null,
            $canvas        = null,
            $menu          = null,
            $debug         = null;

        // Normalize some fullscreen API functions

        // the element which has been pushed to fullscreen
        var fullscreenElement = document.fullscreenElement ||
                                document.mozFullScreenElement ||
                                document.webkitFullscreenElement;
        // notes if fullscreen is current enabled
        var fullscreenEnabled = document.fullscreenEnabled ||
                                document.mozFullScreenEnabled ||
                                document.webkitFullscreenEnabled;

        /**
         * App Constructor
         *
         * @constructor
         */
        function Menu() {
            console.log("Menu");

            // Save game screen handle
            $gameScreen    = $('#game-screen');
            $menu          = $('#menu-bar');
            $canvas        = $('#game-canvas');
            $gameContainer = $('#game-container');
            $debug         = $('#debug');

            // Control block dialog
            dialogCB = new Dialog("dlg-control-block");

            // Menu button handlers
            $('#menu-button-cb').on('click', this.handleControlBlockClick);
            $('#menu-button-blah').on('click', this.handleDebugClick);
            $('#menu-button-max').on('click', this.handleMaximizeClick);
            $('#menu-button-unmax').on('click', this.handleUnMaximizeClick);

            // Hide some buttons
            $('#menu-button-unmax').hide();

            // Setup window resize handler
            this.handleResize();
            $( window ).resize(this.handleResize);
        }


        /**
         * Handle clicks on control block button
         */
        Menu.prototype.handleControlBlockClick = function () {
            console.log("CBClick");

            if (dialogCB.visible()) {
                dialogCB.hide();
            } else {
                dialogCB.show();
            }
        }

        /**
         * Handle clicks on maximize button
         */
        Menu.prototype.handleMaximizeClick = function () {
            console.log("Maximize");

            $('#menu-button-max').hide();
            $('#menu-button-unmax').show();

            if (fullscreenEnabled) {
                if ($gameScreen[0].requestFullscreen) {
                    $gameScreen[0].requestFullscreen();
                } else if ($gameScreen[0].mozRequestFullScreen) {
                    $gameScreen[0].mozRequestFullScreen();
                } else if ($gameScreen[0].webkitRequestFullscreen) {
                    $gameScreen[0].webkitRequestFullscreen();
                }
            }

        }

        /**
         * Handle clicks on debug button
         */
        Menu.prototype.handleDebugClick = function () {
            console.log("debug");
            $debug.toggle();
        }

        /**
         * Handle clicks on un-maximize button
         */
        Menu.prototype.handleUnMaximizeClick = function () {
            console.log("UnMaximize");

            $('#menu-button-max').show();
            $('#menu-button-unmax').hide();

            if(document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if(document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if(document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
        }

        Menu.prototype.handleResize = function () {
            console.log("handleResize");

            var windowMetric = {
                windowW : $(window).width(),
                windowH : $(window).height(),
                menuW   : $menu.width(),
                menuH   : $menu.height()
            }

            $gameScreen.width(windowMetric.windowW);
            $gameScreen.height(windowMetric.windowH);

            $canvas.width(windowMetric.windowW);
            $canvas.height(windowMetric.windowH - windowMetric.menuH);

            $gameContainer.width(windowMetric.windowW);
            $gameContainer.height(windowMetric.windowH - windowMetric.menuH);

            dialogCB.handleResize(windowMetric);

        }




        return Menu;
    })();

    exports.Menu = Menu;
    exports.Dialog = Dialog;

});
