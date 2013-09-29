function Clear(){

	this.color = null;

    this.draw = function(context, timediff, timestamp) {
        
        var width = context.canvas.width;
        var height = context.canvas.height;
        
		if (this.color == null){

	        context.clearRect(0, 0, width, height);

		} else {
			context.fillStyle = this.color;
			context.fillRect(0, 0, width, height);
		}
        
    };
    
    return this;
};
