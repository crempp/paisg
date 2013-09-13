/**
 * Created with JetBrains WebStorm.
 * User: chad
 * Date: 9/11/13
 * Time: 6:39 PM
 * To change this template use File | Settings | File Templates.
 */

class Subroutine {
    private name: string;
    private age: number;
    private salary: number;

    constructor(name: string, age: number, salary: number) {
        this.name = name;
        this.age = age;
        this.salary = salary;
    }

    toString(): string {
        return this.name + " (" + this.age + ")" + "("+ this.salary +")";
    }
}