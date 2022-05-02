"use strict";

/**
 * Перебор массива arrays methods
 */

// filter()

const names = ["Ivan", "Sasha", "Antony", "Ann"];

const shortNames = names.filter((name) => {
  return name.length < 5;
});

console.log(shortNames);

// map()

const answers = ["AdsA", "KOStya", "caT"];

const result = answers.map(item => item.toLowerCase());

console.log(result);

// every / some

const some = [4, "KOStya", "caT"];

console.log(some.some(item => typeof (item) === "number"));

console.log(some.every(item => typeof (item) === "number"));

// reduce

const arr = [4, 5, 1, 2, 6];

const res = arr.reduce((sum, current) => sum + current);

console.log(res);

const lines = ["AdsA", "KOStya", "caT"];

const array = lines.reduce((sum, current) => `${sum}, ${current}`);

console.log(array);

// example
const obj = {
  ivan: "person",
  ann: "person",
  dog: "animal",
  cat: "animal"
};

const newArray = Object.entries(obj)
  .filter(item => item[1] === "person")
  .map(item => item[0]);

console.log(newArray);

/**
 * Local storage работа бе БД
 */

localStorage.setItem("number", 5);

localStorage.getItem("number");

localStorage.removeItem("number");

localStorage.clear();

const human = {
  name: "John",
  age: 25,
  race: "Human"
};

const serializedHuman = JSON.stringify(human);

localStorage.setItem("John", serializedHuman);

/**
 * RegEx
 */

// new RegExp("pattern", "flags"); //old method
// /pattern/f  //new method

const ans = "Enter your Name";

const reg = /n/ig;
//i найти в неависимости от регистра
//g найти несколько вхождений
//m включает многострочный режим
console.log(ans.search(reg)); // 1 в консоли
console.log(ans.match(reg));

const pass = "password";

console.log(pass.replace(/./g, "*"));

console.log("12-12-23".replace(/-/g, "?"));

console.log(reg.test(ans));

// классы : \d (цифры), \w (слова), \s (пробелы)
//          \D (не цифры), \W (не слова), \S (не пробелы)

console.log("QWER1ads2".match(/\d/));

const str = "My name is R2D2";
console.log(str.match(/\w\d\w\d/));

/**
 * Setters and Getters
 */

const human1 = {
  name: "Alex",
  age: 25,
  get _age() {
    return this.age;
  },
  set _age(number) {
    this.age = number;
  }
};

console.log(human1._age = 30);
console.log(human1._age);

/**
 * Incasulation
 */

class User {
  constructor(name, age) {
    this.name =name;
    this._age = age;
  }

  say() {
    console.log(`Name: ${this.name}, age: ${this._age}`);
  }

  get age() {
    return this._age;
  }

  set age(age) {
    if (typeof age === "number" && age > 0 && age <110) {
      this._age = age;
    } else {
      console.log("Wrong inut");
    }
  }
}

const ivan = new User("Ivan", 27);

console.log(ivan.name);
console.log(ivan.age);


