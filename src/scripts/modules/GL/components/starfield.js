function StarField(){

    var center = {x:0, y:0};
    var bounds = {x:0, y:0};
    var particles = [];
    
    this.particleCount = 200;
    this.color = "white";
    this.clearing = true;
    
    var spawnRadius = 10;

    this.draw = function(context, timediff, timestamp) {
        
        if (this.clearing) {
            context.fillStyle = "rgba(0, 0, 10, 0.1)";
            context.fillRect(0,0,2 * center.x, 2 * center.y);
        }
        
        context.fillStyle = this.color;
        
        for (var i = 0; i < particles.length; i++){
            context.fillRect(
                particles[i].x - 1, 
                particles[i].y - 1,
                2, 2);
        }
        
    };
    
    this.update = function(context, timediff, timestamp) {
    
        bounds = {
            x: context.canvas.width,
            y: context.canvas.height
        }
        center = {
            x: bounds.x / 2,
            y: bounds.y / 2
        };
        
        while (particles.length < this.particleCount){
            particles.push({
                x: 2 * spawnRadius * Math.random() - spawnRadius + center.x,
                y: 2 * spawnRadius * Math.random() - spawnRadius + center.y
            });
        }
        
        for (var i = 0; i < particles.length; i++){
        
            particles[i].x += (particles[i].x - center.x) * 0.02;
            particles[i].y += (particles[i].y - center.y) * 0.02;
        
            if (particles[i].x < 0 ||
                particles[i].x > bounds.x ||
                particles[i].y < 0 ||
                particles[i].y > bounds.y
            ){
                particles.splice(i, 1);
            }
        }
    };
    
    return this;
}
