import { configureStore } from "@reduxjs/toolkit";
import usersReducer from '../store/slice/addUserSlice';


const store = configureStore({
    reducer: {
        users: usersReducer
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;