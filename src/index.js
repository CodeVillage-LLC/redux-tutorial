function sayHello() {
  return "hello Villagers";
}
function sayHi() {
  return "Hi Villagers 👋";
}

const fn = sayHello;

function greet(fnMessage) {
  console.log(fnMessage());
}

greet(sayHello);
greet(sayHi);
