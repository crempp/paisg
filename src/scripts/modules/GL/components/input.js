
function Keyboard() {
    var prevKeyDown = document.onkeydown;
    var prevKeyUp = document.onkeyup;
    
    var keyState = {};
    
    this.identifiers = {
        up : 'Up',
        down : 'Down',
        left: 'Left',
        right: 'Right'
    };
    
    
    var detectKeyDown = function(e){
        if (prevKeyDown != null) {
            prevKeyDown(e);
        }
        keyState[e.keyIdentifier] = e.timeStamp;
    }
    
    var detectKeyUp = function(e) {
        if (prevKeyUp != null) {
            prevKeyUp(e);
        }
        keyState[e.keyIdentifier] = null;
    }
    
    prevKeyDown = document.onkeydown;
    document.onkeydown = detectKeyDown;
    prevKeyUp = document.onkeyup;
    document.onkeyup = detectKeyUp;
    
    this.isKeyDown = function(identifier){
        return (
            typeof(keyState[identifier]) != 'undefined'
            && keyState[identifier] != null
        );
    }
    
}

var keyboard = new Keyboard();


function keyInput() {
    this.getThrust = function (){
        var val = keyboard.isKeyDown(keyboard.identifiers.up) ? 1 : 0;
        return val;
        
        
        
    }
    this.getTorque = function (){
        var val_r = keyboard.isKeyDown(keyboard.identifiers.right) ? 1 : 0;
        var val_l = keyboard.isKeyDown(keyboard.identifiers.left) ? -1 : 0;
        return val_r + val_l    ;
    }
    return this;
}