
import { createStore } from 'redux';
import appReducer from './reducers';

const store: Store = createStore(appReducer);
export default store;
