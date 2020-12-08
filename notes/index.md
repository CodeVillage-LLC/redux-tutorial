## Functional programming

> Functional programming is a pattern where problems are broken down into small and small and reusable functions that takes some inputs and return some result

example of pure functions

```js
function add(a, b) {
  return a + b;
}
add(7, 3); // 10
```

### Functions as first class citizens

functions are treated as variable, can be assigned and reasigned and also passed as arguments

```js
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

greet(fn);
greet(sayHello);
greet(sayHi);
```

### High order functions

functions that takes a function as an argument, returns it or do both

```js
// ex 1
const names = ["Badmus", "Aisha", "Ahmad"];
const introductions = names.map((name) => `My name is ${name}`);
console.log({ introductions });

// ex 2
setTimeout(() => console.log("hello"), 5000);
```

```js
const input = "    Jalasem  ";

const trim = (str) => str.trim();
const wrapInDiv = (str) => `<div>${str}</div>`;

const output = wrapInDiv(trim(input));

console.log({ input, output });
```

Let's add one more function

```js
const input = "    Jalasem  ";

const trim = (str) => str.trim();
const wrapInDiv = (str) => `<div>${str}</div>`;
const lowercase = (str) => str.toLowerCase();

const output = wrapInDiv(lowercase(trim(input)));

console.log({ input, output });
```

We can make this code more readable using a lodash/fp utility called `pipe`

```js
import { pipe } from "lodash/fp";
const input = "    Jalasem  ";

const trim = (str) => str.trim();
const wrapInDiv = (str) => `<div>${str}</div>`;
const lowercase = (str) => str.toLowerCase();

const transform = pipe(trim, lowercase, wrapInDiv);
const output = transform(input);

console.log({ input, output });
```

let's do more

```js
import { pipe } from "lodash/fp";
const input = "    Jalasem  ";

const trim = (str) => str.trim();
const wrapInDiv = (str) => `<div>${str}</div>`;
const wrapInSpan = (str) => `<span>${str}</span>`;
const lowercase = (str) => str.toLowerCase();

const transform1 = pipe(trim, lowercase, wrapInDiv);
const transform2 = pipe(trim, lowercase, wrapInSpan);
const output1 = transform1(input);
const output2 = transform2(input);

console.log({ input, output1, output2 });
```

let's try unifiying our tag utility into a single function

```js
import { pipe } from "lodash/fp";
const input = "    Jalasem  ";

const trim = (str) => str.trim();
const wrapInTag = (tag, str) => `<${tag}>${str}</${tag}>`;
const lowercase = (str) => str.toLowerCase();

const transform1 = pipe(trim, lowercase, wrapInTag("div"));
const transform2 = pipe(trim, lowercase, wrapInTag("span"));
const output1 = transform1(input);
const output2 = transform2(input);

console.log({ input, output1, output2 });
```

the snippet above will throw the error: `lodash.min.js:55 Uncaught TypeError: Expected a function` because only functions can be passed to `pipe`

To fix this problem, we need to apply a method called _Currying_

### Currying

```js
function add(a, b) {
  return a + b;
}
function cAdd(a) {
  return function (b) {
    return a + b;
  };
}
console.log(add(7, 3));
console.log(cAdd(7)(3));

console.log(typeof add);
console.log(typeof add(5));
console.log(typeof cAdd(5));

function wrapInTag(tag) {
  return function (str) {
    return `<${tag}>${str}</${tag}>`;
  };
}

console.log(wrapInTag("h1")("Jalasem is here"));
```

Our wrapIntag function can be rewritten as

```js
const wrapInTag = (tag) => (str) => `<${tag}>${str}</${tag}>`;
```

Now let's put everything together

```js
import { compose, pipe } from "lodash/fp";
const input = "    Jalasem  ";

const trim = (str) => str.trim();
const wrapInTag = (tag) => (str) => `<${tag}>${str}</${tag}>`;
const lowercase = (str) => str.toLowerCase();

const transform1 = pipe(trim, lowercase, wrapInTag("div"));
const transform2 = pipe(trim, lowercase, wrapInTag("span"));
const output1 = transform1(input);
const output2 = transform2(input);

console.log({ input, output1, output2 });
```

### Pure functions

It always return same result when we pass same argument

```jsx
const fn = (number) => number * Math.random(); // is not a pure function
const fn = (number) => number * 2; // is pure because if it's called a billion times,
// we can be sure of a uniform output
```

#### Don'ts of pure functions

- no date/time
- no random values (e.g Math.random())
- it can't read or change global state (DOM, files, db, etc) or a variable outside the function scope

> - Reducers have to be pure function. Please take note

```js
const canPass = (age) => age > minAge; // is not pure because minAge is not defined withing the scope of the function
const canPass = (age, minAge) => age > minAge;
```

### Benefits of pure functions

- clear and straightforward
- can be easily decoupled, moved or integrated anywhere it's needed
- easily testable
- consistent
- cacheable

## Immutability

a value is immutable when it can't change

```js
const name = "Abdulsamii";
name = name.toUpperCase();
console.log(name);
```

At first the code above will convince you that const can be used to implement immutability but that's not true. Take a look at the code below

```js
const person = { name: "Abdulsamii" };
console.log({ person });

const book = {};
book.title = "";
console.log({ book });

person.name = "Abu Maryam";
console.log({ person });
```

this proves that const can't stop an obj or array from being mutated

- Implementation

```js
// in string, just create another variable, make sure the new variable name is descriptive
const name = "Abdulsamii";
const nameToUpperCase = name.toUpperCase();

// object
const book = {};
const updatedBook = { ...book, title: "..." };

const person = { name: "Badmus", tribe: "Yoruba" };
const person1 = Object.assign({}, person, { name: "Ahmad", age: 10 });
const person2 = { ...person, name: "Mubarak", age: 15 };

console.log({ person, person1, person2 });
```

At first, the code above looks good until you try this

```js
const person = {
  name: "Badmus",
  address: {
    country: "Malaysia",
    city: "Kuala Lumpur",
  },
};

const ahPerson = Object.assign({}, person, { name: "Ahmad", age: 10 });
const mubPerson = { ...person, name: "Mubarak", age: 15 };

ahPerson.address.city = "George Town";
mubPerson.address.city = "Miri";

console.log({ person, ahPerson, mubPerson });
```

paste the code above in your index.js and watch out for anormally in the console.

> The anormally you notice in the address object is due to the fact that Javascript `Object.assign` method and `spread` operator only perform shallow copying. If you need to update the memebers of an object which are also object(s) or array. Do this instead;

```js
const person = {
  name: "Badmus",
  address: {
    country: "Malaysia",
    city: "Kuala Lumpur",
  },
};

const ahPerson = Object.assign({}, person, {
  name: "Ahmad",
  age: 10,
  address: {
    ...person.address,
    city: "George Town",
  },
});
const mubPerson = {
  ...person,
  name: "Mubarak",
  age: 15,
  address: { ...person.address, city: "Miri" },
};

console.log({ person, ahPerson, mubPerson });
```

### How to update immutably

```js
// array
const numbers = [1, 2, 3];
const double = numbers.map((number) => number * 2);

// array - add
const addedToFront = [4, ...numbers];
const addedToBack = [...numbers, 4];
const added2Back = numbers.concat(4);

// array - add at an index
const index = numbers.indexOf(2); // or hardcoded
const addedToIndex = [...numbers.slice(0, index), 4, ...numbers.slice(index)];

// add - remove
const removed = numbers.filter((number) => number !== 2);

// array - update
const updated = numbers.map((n) => (n === 2 ? 20 : n));
```

### Libraries that implement immutability

- Immutable
- Immer
- Mori

Using Immutable

```js
import { Map } from "immutable";

const publish = (book) => book.set("title", "We don't know JS");

const book = Map({ title: "You don't know JS" });
const published = publish(book);

console.log(book.get("title"));
book.set("title", "We don't know JS");
console.log(published.get("title"));
```

Using Immer

```js
import { produce } from "immer";

const book = { title: "You don't know JS" };

function publish(book) {
  return produce(book, (draftBook) => {
    draftBook.isPublished = true;
    draftBook.title = "We don't know JS";
  });
}

const publishedBook = publish(book);

console.log({ book, publishedBook });
```
