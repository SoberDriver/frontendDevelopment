"use strict";

alert('Hello');

const result = confirm("Are you here?");
console.log(result);

const answer = +prompt("Are you 18 years old?", "");
console.log(answer + 5);

const answers = [];

answers[0] = prompt("What's your name?", "");
answers[1] = prompt("What's your lastname?", "");
answers[2] = prompt("What's your age?", "");

console.log(typeof(answer));

const category = 'toys';

console.log(`https://someurl.com/${category}/5/123`);

//lesson 9

let icr = 10,
    decr = 10;

icr++;
decr--;

console.log(icr);
console.log(decr);