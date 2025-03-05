
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { User, UserCreateResponse, UserState, UsetsList } from '@tsTypes/userType';

const initState: UserState = {
    allUsers: {
        usersList: {
            page: 0,
            per_page: 0,
            total: 0,
            total_pages: 0,
            data: []
        }, status: 'loading', error: null
    }, createdUser: {
        userData: {
            name: '',
            job: '',
            id: '',
            createdAt: ''
        }, status: 'loading', error: null
    }
};

export const createUser = createAsyncThunk<UserCreateResponse, User>(
    "users/createUser",
    async (user, { rejectWithValue }) => {
        try {
            const response = await axios.post("https://reqres.in/api/users", user);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "An error occurred");
        }
    }
);


export const getUsers = createAsyncThunk<UsetsList, number>(
    "users/getUser",
    async (pageNo: number) => {
        try {
            const response = await axios.get(`https://reqres.in/api/users?page=${pageNo}`);
            return response.data;
        } catch (error: any) {
            return (error.response?.data || "An error occurred");
        }
    }
);

const usersSlice = createSlice({
    name: "users",
    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {
        builder


            .addCase(getUsers.fulfilled, (state, action) => {
                state.allUsers.status = "fulfilled";
                state.allUsers.usersList = action.payload;
            })
            .addCase(getUsers.pending, (state) => {
                state.allUsers.status = "loading";
                state.allUsers.error = null;
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.createdUser.status = "rejected";
                state.allUsers.error = action.payload as string;
            })


            .addCase(createUser.fulfilled, (state, action) => {
                state.createdUser.status = "fulfilled";
                state.createdUser.userData = action.payload;
            })
            .addCase(createUser.pending, (state) => {
                state.createdUser.status = "loading";
                state.createdUser.error = null;
            })
            .addCase(createUser.rejected, (state, action) => {
                state.createdUser.status = "rejected";
                state.createdUser.error = action.payload as string;
            });
    }
});

export default usersSlice.reducer;

