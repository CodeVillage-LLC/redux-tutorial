import store from "./store";
// import * as Actions from './store/actions'
import { addBug, removeBug, resolveBug } from "./store/actions";

store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(addBug("test bug"));
store.dispatch(addBug("another bug"));
store.dispatch(resolveBug(2));
store.dispatch(removeBug(1));
store.dispatch(addBug("login button dissapears on click"));
