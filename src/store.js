
import { createStore } from 'redux';
import appReducer from './reducers';

let store;
if (!store) {
  store = createStore(appReducer);
}

export default store;
