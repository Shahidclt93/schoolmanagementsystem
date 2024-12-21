import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./redux/authSlice";
import studentReducer from "./redux/studentSlice";
import accountsReducer from "./redux/accountsSlice";

const loadState = () => {
  const serializedState = localStorage.getItem('auth');
  return serializedState ? JSON.parse(serializedState) : undefined;
}
const saveState = (state) => {
  const serializedState = JSON.stringify(state.auth);
  localStorage.setItem('auth', serializedState);
};

const store = configureStore({
  reducer:{
    auth :  authReducer ,
    students: studentReducer,
    accounts : accountsReducer,
  } ,
  preloadedState: { auth: loadState() }, 
});

store.subscribe(() => saveState(store.getState()));
export default store;
