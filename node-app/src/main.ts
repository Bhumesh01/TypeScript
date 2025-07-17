// TYPESCRIPT ADVANCE APIs
/*
// 1. Pick: Pick allows you to create a new type by selecting a set of properties (Keys) from an existing type (Type).
interface User{
    id: string,
    name: string,
    age: number,
    email: string,
    password: string
}; 
type UserProfile = Pick<User, 'name'|'age'|'password'>

function showProfile(user: UserProfile):void{
    // Hit database to get the user Details
    console.log(`name: ${user.name}`);
    console.log(`age: ${user.age}`);
    console.log(`password: ${user.password}`);
}
function UpdateProfile(user: UserProfile):void{
    // Hit Database to update all the attributes of user mentioned in type UserProfile
    console.log(`name: ${user.name}`);
    console.log(`age: ${user.age}`);
    console.log(`password: ${user.password}`);
}
let user:User = {
    id: "12345001",
    name: "Bhumesh",
    age: 20,
    email: "bhumeshmahajan01@gmail.com",
    password: "143001@asr"
}
// showProfile(user);
// UpdateProfile({name: "Bhumi", age: 22, password: "bhumi@2005"});

// 2. Partial: Partial makes all properties of a type optional, creating a type with the same properties, but each marked as optional.
// here earlier we have made all the properties to be necessary inorder to update the userProfile... To add the functionality of making possible the updating of 1 or more properties we use Partial
type UpdateProfileOptional = Partial<UserProfile>;
function UpdateUser(user:UpdateProfileOptional):void{
    // Hit the database to update the attributes specified in the user argument
    user.name&&console.log(`name: ${user.name}`);
    user.age&&console.log(`age: ${user.age}`);
    user.password&&console.log(`password: ${user.password}`);
}
// UpdateUser({name:"Bhumi"});

// 3. Readonly: When you have a configuration object that should not be altered after initialization, making it Readonly ensures its properties cannot be changed.
// option 1
type User = {
    readonly name : string,
    readonly age: number
};
const user: User = {
    name: "Bhumesh",
    age: 20
}
// user.age = 20; // This line raises error: Cannot assign to 'age' because it is a read-only property
// option 2
type User2 = {
    name: string,
    age: number
};
const user2:Readonly<User2> = {
    name: "Bhumesh",
    age: 20
}
// Use Case:
interface Config {
  readonly endpoint: string;
  readonly apiKey: string;
}

const config: Readonly<Config> = {
  endpoint: 'https://api.example.com',
  apiKey: 'abcdef123456',
};

// Records: Record let’s you give a cleaner type to objects
type User = {
    id: string,
    username: string
};
// type Users = {
//     [key: string]: User,
// }
type Users = Record<string, User>;
const user:Users = {
    "abc@2001": {id: "abc@2001", username: "bhumi"},
    "defg@2001": {id: "defg@2001", username: "vaneesha"},
}

// Map: maps gives you an even fancier way to deal with objects. Very similar to Maps in C++
// const users = new Map()
// users.set("abc@2001", {id: "abc@2001", username: "bhumi"});
// users.set("defg@2001", {id: "defg@2001", username: "vaneesha"});
// console.log(users);
// console.log(users.get("abc@2001"));
type User = {
    id: string,
    username: string
};
const users = new Map<string, User>();
users.set("abc@2001", {id: "abc@2001", username: "bhumi"});
users.set("defg@2001", {id: "defg@2001", username: "vaneesha"});
console.log(users);
console.log(users.get("abc@2001"));

// Exclude: In a function that can accept several types of inputs but you want to exclude specific types from being passed to it.
type EventType = 'click' | 'scroll' | 'mousemove';
type ExcludeEventType = Exclude<EventType, 'scroll'>; // 'click' | 'mousemove'

const handleEvent = (event: ExcludeEventType) => {
  console.log(`Handling event: ${event}`);
};

handleEvent('click'); 
*/

// Type Inference in zod: when using zod we're doing the runtime validation. For ex: The following code makes sure that the user  is sending the right inputs to update their profile information

import { z } from 'zod';
import express from "express";

const app = express();
app.use(express.json());

// Define the schema for profile update
const userProfileSchema = z.object({
  name: z.string().min(1, { message: "Name cannot be empty" }),
  email: z.string().email({ message: "Invalid email format" }),
  age: z.number().min(18, { message: "You must be at least 18 years old" }).optional(),
});
type UserProfileType = z.infer<typeof userProfileSchema>

app.put("/user", (req, res) => {
  const { success, data } = userProfileSchema.safeParse(req.body);

  if (!success) {
    res.status(411).json({});
    return
  }
  const updateBody:UserProfileType = data; // how to assign a type to updateBody?
  // update database here
  res.json({
    message: "User updated",
    contents: updateBody
  })
});

app.listen(3000);