let x: number|string = 1;
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