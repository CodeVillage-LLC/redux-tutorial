"use strict";

function sayHello() {
  return "hello Villagers";
}

function sayHi() {
  return "Hi Villagers 👋";
}

var fn = sayHello;

function greet(fnMessage) {
  console.log(fnMessage());
}

greet(sayHello);
greet(sayHi);