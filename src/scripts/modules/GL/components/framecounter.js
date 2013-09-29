function FrameCounter(){

    var drawCount = 0;
    var timeCount = 0;
    
    var out = ""
    
    this.draw = function(context, timediff, timestamp) {
    
    
        drawCount++;
        timeCount += timediff;
        if (timeCount > 1000){
            //returning focus to canvas tab sometimes produces high values.
            while (timeCount > 1000){
                timeCount -= 1000;
            }
            out = "FPS: " + drawCount;
            //console.log(out);
            drawCount = 0;
        }
        
        drawFrameCount(context);
    };
    
    var drawFrameCount = function (context) {

        
        var width = context.canvas.width;
        var height = context.canvas.height;
        
        
        context.fillStyle = "purple";
        context.fillRect(width - 50, 0, 100, 15);
        context.font = "12px sans-serif";
        context.fillStyle = "white";
        context.shadowOffsetX = 1;
        context.shadowOffsetY = 1;
        context.shadowColor = "black";
        context.shadowBlur = 1;
        context.textAlign = "left";
        context.textBaseline = "top";
        context.fillText(out, width - 48, 0);
        
        //context.fillText("y", 58, 165);
        
        
    };
    
    return this;
};
