function GameLoop(canvas){

var _canvas = canvas;
        
var drawContext = null;
var _setDrawContext = function(context){
    drawContext = context;
}
this.setDrawContext = _setDrawContext;

var initialized = false;
this.initialize = function(){

    // skip setting if context is already known.
    if (drawContext == null){
        if (typeof(_canvas) == "string"){
            _canvas = document.getElementById(canvas);
        }
        if (_canvas.getContext){
            var ctx = _canvas.getContext('2d');
            _setDrawContext(ctx);
        }
    }
         
    //unify browser functions
    (function() {
      var requestAnimationFrame = 
        window.requestAnimationFrame || 
        window.mozRequestAnimationFrame || 
        window.webkitRequestAnimationFrame || 
        window.msRequestAnimationFrame;
      window.requestAnimationFrame = requestAnimationFrame;
    })();

    // setup main loop
    function jsloop(timestamp) {

        if (initialized){
            update(timestamp);
            draw(timestamp);
        }
        
        requestAnimationFrame(jsloop);
    }
    window.requestAnimationFrame(jsloop);
    
    initialized = true;
}

// self initialize, if possible

if (document.readyState == "complete") {
    this.initialize();
} else {
    var loop = this;
    var prevORSC = document.onreadystatechange;  //save previous event
    document.onreadystatechange = function () {
        
        if (typeof(prevORSC) == "function"){
            prevORSC();
        }
            
        if (document.readyState == "complete") {
            loop.initialize();
        }
            
    }   
}


// setup up exceptions structure

function GameException(message){
    this.message = message;
    this.name = "GameException";
}


// setup private properties and methods

var tempDate = new Date();
var prevUpdate = tempDate.getTime();
var prevDraw = 0;
var updateables = [];
var drawables = [];

function update(timestamp){

    var timediff = timestamp - prevUpdate;
    prevUpdate = timestamp;
    
    for (var i = 0; i < updateables.length; i++){
        updateables[i].update(drawContext, timediff, timestamp);
    }
}

function draw (timestamp){
    var timediff = timestamp - prevDraw;
    prevDraw = timestamp;
    for (var i = 0; i < drawables.length; i++){
        drawContext.save();
        drawables[i].draw(drawContext, timediff, timestamp);
        drawContext.restore();
    }
}


// public methods

this.addItem = function(objectable){
    if (objectable){
        if (typeof(objectable.draw) == "function"){
            this.addDrawable(objectable);
        }
        if (typeof(objectable.update) == "function"){
            this.addUpdateable(objectable);
        }
    }
}

this.addUpdateable = function(updateable){
    if (updateable && updateable.update && typeof(updateable.update) == "function"){
        updateables.push(updateable);
    } else {
        throw new GameException("invalid updateable object added.");
    }
    //crude identifier, invalidated by each removal
    return updateables.length;
}

this.addDrawable = function (drawable) {
    if (drawable && drawable.draw && typeof(drawable.draw) == "function"){
        drawables.push(drawable);
    } else {
        throw new GameException("invalid drawable object added.");
    }
    return drawables.length;
}


return this;

};


