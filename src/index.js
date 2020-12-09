import store from "./store";
import { addBug, removeBug, resolveBug } from "./store/actions";

const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

const id = () => Math.random().toString(36).substring(2, 6);

store.dispatch(addBug("reset button dissapear when user want to click on it"));
store.dispatch(addBug("app crashes after 32 mins of runtime"));
store.dispatch(addBug("layout looks distorted on iPhone12"));

unsubscribe();

store.dispatch(resolveBug(2));
store.dispatch(removeBug(1));
