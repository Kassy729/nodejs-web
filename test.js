'use strict';

const { resolve } = require("path");




// const { request } = require("http");


// const { rejects } = require("assert");

// let obj = {};

// const { rejects } = require("assert");
// const { promises } = require("fs");
// const { resolve } = require("path");

// function A(){return obj;}
// function B(){return obj;}

// alert(new A() == new B());

// let calculator = new Calculator();
// calculator.read();

// alert("Sum=" + calculator.sum());
// alert("Mul=" + calculator.mul());


// function Calculator(){
//     this.read = function(){
//         this.num1 = +prompt("숫자를 입력해 주세요.", "");
//         this.num2 = +prompt("숫자를 입력해 주세요.", "");
//     }

//     this.sum = function(){
//         return this.num1 + this.num2;
//     }

//     this.mul = function(){
//         return this.num1 * this.num2;
//     }
// }

// function Accumulator(startingValue){
//     this.value = startingValue;
//     this.read = function(){
//         this.value += +prompt('더할 값을 입력해주세요.',0);
//     };
// }

// let accumulator = new Accumulator(5);
// accumulator.read();
// accumulator.read();
// alert(accumulator.value);

// promise
//     .then((message) => {
//         return new Promise((resolve,reject) => {
//             resolve(message);
//         });
//     })
//     .then((message2) => {
//         console.log(message2);
//         return new Promise((resolve, reject) => {
//             resolve(message2)
//         });
//     })
//     .then((message3) => {
//         console.log(message3);
//     })
//     .catch((error) => {
//         console.log(error);
//     });

// const promise = new Promise((resolve,reject) => {
//     console.log("doing wait...");
//     setTimeout(() => {
//         // resolve('Hello');
//         reject(new Error("no network"));
//     },2000)
// });

// promise
//     .then(value => {
//         console.log(value);
//     })
//     .catch(error => {
//         console.error(error);
//     });


let promise = new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error("에러발생!")), 3000);
});

promise.catch(alert);



