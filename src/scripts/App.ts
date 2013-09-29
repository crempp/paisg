import CB = require('./modules/CB/CommandBlock');

export class App {
    //private name: string;

    constructor() {
        console.log("New App")
        //var cb = new CB.CommandBlock.Block("sdfsdf");
//        var cb = new Block();
//        var Game = new GameLoop('tutorial');
//        var clear = new Clear();
//        clear.color = "#000040";
//        Game.addItem(clear);
//        var ship = new SpaceShip();
//        ship.readyLoadImageId('ship');
//
//        var keyinput = new keyInput();
//        ship.setInput(keyinput);
//        Game.addItem(ship);
//
//        Game.addItem(new FrameCounter());
    }

    start() {
        console.log("Staring application");
    }

    toString(): string {
        //return this.name;
        return "App";
    }
}