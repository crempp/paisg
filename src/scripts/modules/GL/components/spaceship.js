function SpaceShip(img){

	var PERIOD = 1000;
    //draw private properties and accessors
    var imageElement;
    var width;
    var height;

    this.getImageElement = function(){
        return imageElement;    
    }
    this.setImageElement = function(val){
        imageElement = val;
        width = val.width;
        height = val.height;
    }
    
    if (img && (img != null)){
        this.setImageElement(img);
    }
    this.readyLoadImageId = function(imageId){
    
        //save previous event
        var prevORSC = document.onreadystatechange;  
        var _this = this;
        document.onreadystatechange = function () {
            //call previous event
            if (typeof(prevORSC) == "function"){ prevORSC(); }
            
            if (document.readyState == "complete") {
                _this.setImageElement(document.getElementById(imageId)); 
            }
        };
    }


    //update private properties and accessors
	var rotation = 0;
	var rotationRate = Math.PI/4;
	var position = {x: 0, y: 0};
	var velocity = {x: 0, y: 0};
	var maxThrust = 2;
	var mass = 1;

	this.getRotation = function(){ return rotation; }
	this.setRotation = function(val){ rotation = val; };
	this.addRotation = function(val){ rotation += val; };
	this.getRotationMatrix = function(){
		var m = [
			[Math.cos(rotation), -1 * Math.sin(rotation)],
			[Math.sin(rotation), Math.cos(rotation)]
		];
		return m;
	}
	this.getForwardNormal = function(){
		var m = this.getRotationMatrix();
		var forward = {x: 0, y: -1};
		var n = {
			x: forward.x * m[0][0] + forward.y * m[0][1],
			y: forward.x * m[1][0] + forward.y * m[1][1]
		};
		return n;
	}

	this.getRotationRate = function () { return rotationRate; }
	this.setRotationRate = function (val) { rotationRate = val; }

	this.getPosition = function(){ return position; };
	this.setPosition = function(obj){
		if (typeof(obj.x) != 'undefined' && typeof(obj.y) != 'undefined'){
			position = obj;
		} else {
			console.error("invalid position settings");
		}
	}

	this.setVelocity = function (obj){ velocity = obj; };
	this.addVelocity = function (obj){
		velocity.x += obj.x;
		velocity.y += obj.y;
	};
	this.getVelocity = function (){ return velocity; };
	this.accelerate = function (rate, direction) {
		this.addVelocity({
			x: rate * direction.x,
			y: rate * direction.y
		});
	}
	this.getAcceleration = function (){
		return (this.getMaxThrust() / this.getMass());
	}

	this.setMaxThrust = function (val){ maxThrust = val; };
	this.getMaxThrust = function (){ return maxThrust; };
	
	this.setMass = function (val) { mass = val;};
	this.getMass = function (){ return mass;};
	
	// modules 
	var input = {getThrust: function(){return 0;}, getTorque: function(){return 0;}};
	this.setInput = function(_input){
		if (typeof(_input.getThrust) == "function" &&
			typeof(_input.getTorque) == "function"
		) {
			input = _input;
		} else {
			console.log("invalid input module", _input);
		}
	}
	this.getInput = function (){
		return input;
	}

    this.draw = function(context, timediff, timestamp) {
        
		context.save();
		
		var p = this.getPosition();
		
		context.translate(p.x, p.y);
		
		var r = this.getRotation();
		
		context.rotate(r);
		
        var offsetX = width / -2;
        var offsetY = height / -2;
        
		context.drawImage(
			this.getImageElement(),
			offsetX,
			offsetY,
			width,
			height);
		
		context.restore();

    };

	this.update = function (context, timediff, timestamp)
	{
		if (timediff < -1) {
			return;
		}
			
		//rotate
		var rot = this.getInput().getTorque() * this.getRotationRate()
			* timediff / PERIOD;
		this.addRotation(rot);
		
		//change velocity
		var thrust = this.getInput().getThrust() * this.getMaxThrust()
			* timediff / PERIOD;
		var f = this.getForwardNormal();
		this.accelerate(thrust, f);
		
		//update position
		var p = this.getPosition();
		var v = this.getVelocity();
		p.x += v.x;
		p.y += v.y;
		this.setPosition(p);
	}
    
    return this;
};
