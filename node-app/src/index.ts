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


// Types: Very similar to interfaces , types let you aggregate data together.
//But they let you do a few other things.
// 1. Unions: Let’s say you want to print the id of a user, which can be a number or a string.
type StringOrNumber = string | number;
function printId(id: StringOrNumber) {
console.log(`ID: ${id}`);
}

printId(101); // ID: 101
printId("202"); // ID: 202

function sum(a:StringOrNumber, b: StringOrNumber):StringOrNumber{
if(typeof(a) === "string" || typeof(b) === "string"){
return String(a) + String(b);
}
return a+b;
}
console.log(sum("Bhumesh", 56));
console.log(sum(4,5));
// 2. Intersection: What if you want to create a type that has every property of multiple types/ interfaces. Could be done with the help of types
type Employee = {
name: string;
startDate: Date;
};

type Manager = {
name: string;
department: string;
};

type TeamLead = Employee & Manager;

const teamLead: TeamLead = {
name: "harkirat",
startDate: new Date(),
department: "Software developer"
};

// Assignment: Create 2 types called User and Admin, take a function that takes either a user or admin as input, and returns strinng saying "Welcome, [name]"
interface User{
    name: string;
    age: number|string;
}
interface Admin{
    name: string;
    permissions: string;
}
type adminOruser = User|Admin;
function displayMessage(person:adminOruser):string{
    //i can't use person.age/person.permissions directly here
    return `Welcome, ${person.name}`
}
console.log(displayMessage({name:"Bhumesh", permissions: "superAdmin"}));
console.log(displayMessage({name:"Bhumi", age: 20}));

//Arrays in TypeScript: If you want to access arrays in typescript, it’s as simple as adding a [] annotation next to the type
//Eg 1: Find max Element in an array
function maxElement(array:number[]):number{
    let num:number = 0;
    for(let i:number=0; i<array.length; i++){
        if(num<array[i]){
            num += i;
        }
    }
    return num;
}
console.log(maxElement([2,8,1,0,-1,2,90]));
//Eg 2: Given a list of users, filter out the users that are legal (greater than 18 years of age)
interface User {
	firstName: string;
	lastName?: string;
	age: number;
}
function findLegal(userList: User[]):User[]{
    return userList.filter(user=>user.age>=18);
}

console.log(findLegal([{firstName: "Bhumesh", age: 20}, {firstName: "Bhavya", age: 21}, {firstName: "Vaneesha", age: 10}, {firstName: "Dityaa", age: 3}]))


// Enums: Enums (short for enumerations) in TypeScript are a feature that allows you to define a set of named constants.
//Example:
enum Direction{
    Up = 1,
    Down,
    Left,
    Right
}
function doSomething(keyPressed:Direction):void{
    console.log(keyPressed);
}

doSomething(Direction.Down); 
// Use Case 2
enum ResponseStatus {
    Success = 200,
    NotFound = 404,
    Error = 500
}

// app.get("/', (req, res) => {
//     if (!req.query.userId) {
// 			res.status(ResponseStatus.Error).json({})
//     }
//     // and so on...
// 		res.status(ResponseStatus.Success).json({});
// }) 

//Generics: Generics are a Language Independent Concept
//Problem Statement: Let’s say you have a function that needs to return the first element of an array. Array can be of type either string or integer. How would you solve this problem?
type StringOrNumber = string|number;
function getFirstElement(arr:StringOrNumber[]):StringOrNumber{
    return arr[0];
}
// What is the problem in this approach?
// User can send different types of values in inputs, without any type errors
let first = getFirstElement(["1", "2", 30]);
console.log(first);
// Typescript isn’t able to infer the right type of the return type
const el = getFirstElement(["harkiratSingh", "ramanSingh"]);
console.log(el.toLowerCase()) // This Line gives error
// Property 'toLowerCase' does not exist on type 'StringOrNumber'. Property 'toLowerCase' does not exist on type 'number'.
*/
//Solution - Generics
// Generics enable you to create components that work with any data type while still providing compile-time type safety.
function getFirstElement<T>(arr: T[]):T{
    return arr[0];
}
// const el = getFirstElement<string>([1, "Bhumi", "Bhavya"]); // This line raises error
const el = getFirstElement<string>(["Bhumi", "Bhavya"]);
console.log(el);
console.log(el.toLocaleLowerCase());