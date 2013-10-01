/**
 * Created with JetBrains WebStorm.
 * User: chad
 * Date: 9/11/13
 * Time: 6:39 PM
 * To change this template use File | Settings | File Templates.
 */
export module CommandBlock {
    export class Block {
        //private name: string;

        constructor(name: string) {
            console.log("New Block");

        }

        toString(): string {
            return "CommandBlock";
        }
    }
}