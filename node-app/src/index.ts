/*let x: number|string = 1;
x = "Bhumesh";
console.log(x);
// Problem 1: Write a function that greets a user given their first name. 
//Argument - firstName
//Logs - Hello {firstName}
//Doesn’t return anything
function greetUser(fName: string){
    console.log(`Hello ${fName}`)

}
greetUser("Bhumesh");

// Problem 2: Write a function that calculates the sum of two Numbers
function sumNum(a: number, b: number): number{
    return a + b;
}
console.log(sumNum(5,99));

// Problem 3 - Return true or false based on if a user is 18+
function isLegal(age: number): boolean{
    if(age>=18){
        return true;
    }
    else{
        return false;
    }
}
console.log(isLegal(50));
console.log(isLegal(14));

// Problem 4: Create a function that takes another function as input, and runs it after 1 second.

function runAfterOneSec(func: ()=>void){
    setTimeout(func, 1000);
}
runAfterOneSec(()=> console.log("harkirat"));

// experimenting with tsconfig
const greet  = (name: string)=> `Hello,${name}`; // code remains same in index.js if target is es2022/es20116
// var greet = function (name) { return "Hello,".concat(name); }; // code if target is es5
// "noImplicitAny": truue by default and it means TypeScript will error if a variable or parameter type is not specified and would otherwise be 'any'. By default, it is false unless set to true in tsconfig.
*/
// Interfaces 
// How can you assign types to objects? To assign a type to the user object, you can use interfaces
interface userType {
    fName: string,
    Lname: string,
    age: number
};
let user: userType = {
    fName: "Bhumesh",
    Lname: "Mahajan",
    age: 20
};
console.log(user);

//Problem 1: Create a function isLegal that returns true or false if a user is above 18. It takes a user as an input.
function isLegal(user:userType):boolean{
    return user.age>=18?true:false;
}
console.log(isLegal(user));

//Implementing interfaces
interface People{
    name: string;
    age: number;
    greet: (phrase: string)=>void;
}
const person:People = {
    name: "Bhumesh",
    age: 20,
    greet: (phrase: string) => console.log(`${phrase}, ${person.name}`),
}
person.greet("Hello");
class Manager implements People{
    name: string;
    age: number;
    constructor(n: string, a:number){
        this.name = n;
        this.age = a;
    }
    greet(phrase: string){
        console.log(`${phrase}, ${this.name}`);
    }
}
let manager1 = new Manager("Bhumesh", 20);
manager1.greet("Welcome");

// Abstract Class
abstract class Shape {
  abstract name: string;

  abstract calculateArea(): number;
  // it can also have some of the implementation
  describe(): void {
    console.log(`This shape is a ${this.name} with an area of ${this.calculateArea()} units squared.`);
  }
}

class Rectangle extends Shape {
  name = "Rectangle";

  constructor(public width: number, public height: number) {
    super();
  }

  // Implement the abstract method
  calculateArea(): number {
    return this.width * this.height;
  }
}
let rectangle = new Rectangle(10, 2);
console.log(rectangle.calculateArea());
rectangle.describe();