## Redux [Aha moment 🥰]

we store our app state inside a single js object called the store. It's the single source of truth

```js
store = {
  categories: [],
  products: [],
  cart: {},
  user: {},
};

// it's up to you whether you want to use array, object, boolean etc
```

> You can't mutate the state

```js
store.user = { name: "Ridwan Opebe" }; // nah!!!
```

> to update our store, we need a reducer

### Reducer

reducer is a function that takes the current instance of the store (state) and return the updated store (udpated state)

```js
function reducer(store) {
  // return updated store
  updated = { ...store };
  // use spread (and be conscious about issues around it)
  // or use one of the immutability libraries preferably immer
}
```

#### so how does reducer know what to update???

yeah, that's where action comes in

```jsx
function reducer(store, action) {
  // update
}
// we can have a single reducer or have a reducer for each object in the store
```

### Redux is made up of

- Action (kind of like events) e.g ADD_TO_CART
- Store
- Reducer (kind of event handlers)

### How Redux works

```websequencediagrams.com
title How Redux works

Action->Store: Actions are dispatched to the store
Store->Reducer: Store calls the reducer
Reducer-->Store: Makes the change and commits (return) it to the store
note over Action: Actions are like events that happens in our application
note over Store: a JS object that maintain our app state
note over Store: our single source of truth
note over Store: Our entire UI/React App depends soley on the store to render everything you're seeing that could change
```

## Bug Tracker

![Bug Tracker](./bugTracker.png)
![Bug Tracker](./bugTrackerSimplified.png)

## Steps

1. Design the store
2. define the actions
3. create a reducer
4. setup store

### 1. design the store

```js
// minimal
store = [
  {
    id: 1,
    description: "...",
    resolved: false
  },
  {...},
  {...}
]

// more featured
store = {
  bugs: [
    {
      id: 1,
      description: "app crashes when reset button is clicked",
      resolved: true,
      resolvedBy: "userId"
    }
  ],
  currentUser: {
    userId: 7,
    name: 'Mubarak Sanusi',
    email: 'mbsanusi@mockmail.com'
  }
}
```

in the example above, for minimal, we don't need more than 1 reducer but as for `more featured` we can use either one reducer or 2 reducers

### 2. Define the actions

- add a bug
- mark a bug as resolved
- delete a bug

> we could sort, change status and so on but we want to keep this simple first

#### anatomy of action

```js
{
  type: "ADD_BUG",
  description: "app crashes when reset button is clicked"
}
// type has to be string
// underscore and uppercase is just a convention
// in fact some people prefer "bugAdded" instead

// overall, I prefer this
{
 type: "ADD_BUG",
 payload: {
   description: "description of the bug"
 }
}

{
  type: "RESOLVE_BUG",
  payload: {
    id: 1
  }
}

{
  type: "REMOVE_BUG",
  payload: {
    id: 1
  }
}
```

### 3. create a reducer

```js
const reducer = (state, action) => {
  if (action.type === "ADD_BUG") {
    return state.concat({
      id: state.length + 1,
      description: action.payload.description,
      resolved: false,
    });
  } else if (action.type === "REMOVE_BUG") {
    return state.filter((bug) => bug.id !== action.payload.id);
  } else if (action.type === "RESOLVE_BUG") {
    return state.map((bug) => {
      if (bug.id === action.payload.id) {
        bug.resolved = true;
      }

      return bug;
    });
  }

  return state;
};
```

### 4. setup store

```js
// in our reducer file, set initial state and export the reducer like so
export default reducer = (state = [], action) => {
	...
}

// in store index file
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)
// createStore an high order function that takes a function as an argument

export default store
```

### Lets use our store!

```jsx
import store from './store'

console.log(store)
console.log(store.getState())

store.dispatch({
  type: "ADD_BUG",
	payload: {
		description: "app crashes when reset button is clicked"
	}
})

store.dispatch({
  type: "ADD_BUG",
	payload: {
		description: "add bug doesn't work"
	}
})

console.log(store.getState())

store.dispatch({
  type: "REMOVE_BUG",
	payload: {
		id: 2
	}
})

console.log(store.getState())
```