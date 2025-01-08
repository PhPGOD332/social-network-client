import {IUser} from "@/shared/types/IUser";
import {UserRoles} from "@/shared/types/UserRoles";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AuthService} from "@/services/auth/AuthService";
import {updateLocalStorage} from "@/store/localStorage";

interface ILogin {
    login: string;
    password: string;
}

export interface IRegistration {
    login: string;
    password: string;
    passwordRepeat: string;
    phone: string;
    surname: string;
    name: string;
    patronymic: string;
    dateBirth: Date | null;
}

interface TInitialState {
    user: IUser;
    isAuth: boolean;
    isLoading: boolean;
    users: IUser[];
    error: string | null;
}

const initialState: TInitialState = {
    user: {
        _id: "",
        login: "",
        phone: "",
        email: "",
        surname: "",
        name: "",
        patronymic: "",
        avatar: "",
        dateBirth: null,
        isActivated: false,
        role: {
            value: UserRoles.User,
            label: "Пользователь",
        },
        activationLink: "",
    },
    users: [],
    isAuth: false,
    isLoading: false,
    error: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setAuth(state, action: { payload: boolean; type: string }) {
            state.isAuth = action.payload;
        },
        setUser(state, action: { payload: IUser; type: string }) {
            state.user = action.payload;
        },
        setLoading(state, action: { payload: boolean; type: string }) {
            state.isLoading = action.payload;
        },
        setUsers(state, action: { payload: IUser[]; type: string }) {
            state.users = action.payload;
        },
        addNewUser(state, action: { payload: IUser, type: string }) {
            state.users.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state: TInitialState) => {
            state.isLoading = true;
        });
        builder.addCase(login.fulfilled, (state: TInitialState, action) => {
            if (action.payload) {
                state.user = action.payload;
                state.isAuth = true;
            }
            state.isLoading = false;
        });
        builder.addCase(login.rejected, (state: TInitialState, action) => {
            state.error = action.payload;
            state.isLoading = false;
        });

        builder.addCase(registration.pending, (state: TInitialState) => {
           state.isLoading = true;
        });
        builder.addCase(registration.fulfilled, (state: TInitialState, action) => {
            if (action.payload) {
                state.user = action.payload;
                state.isAuth = true;
            }
            state.isLoading = false;
        });
        builder.addCase(registration.rejected, (state: TInitialState, action) => {
            if (typeof action.payload === "string") {
                state.error = action.payload;
            }

            state.isLoading = false;
        });

        builder.addCase(checkAuth.pending, (state: TInitialState) => {
           state.isLoading = true;
        });
        builder.addCase(checkAuth.fulfilled, (state: TInitialState, action) => {
            if (action.payload) {
                state.user = action.payload;
                state.isAuth = true;
            }

            state.isLoading = false;
        });
        builder.addCase(checkAuth.rejected, (state: TInitialState, action) => {
            if (typeof action.payload === 'string') {
                state.error = action.payload;
            }

            state.isLoading = false;
        });

        builder.addCase(logout.pending, (state: TInitialState) => {
            state.isLoading = true;
        });
        builder.addCase(logout.fulfilled, (state: TInitialState, action) => {
            if (action.payload) {
                state.isAuth = false;
            }

            state.isLoading = false;
        });
        builder.addCase(logout.rejected, (state: TInitialState, action) => {
            if (typeof action.payload == "string") {
                state.error = action.payload;
            }

            state.isLoading = false;
        });
    }
})

export const login = createAsyncThunk(
    "user/login",
    async ({ login, password }: ILogin) => {
        try {
            const response = await AuthService.login(login, password);

            console.log(response);

            localStorage.setItem("token", response.data.accessToken);
            return response.data.user;
        } catch (error) {
            console.log(error);
        }
    }
);

export const registration = createAsyncThunk(
    "user/registration",
    async (regData: IRegistration) => {
        try {
            const response = await AuthService.registration(regData);
            console.log(response);
            localStorage.setItem("token", response.data.accessToken);

            return response.data.user;
        } catch (error) {
            console.log(error);
        }
    }
);

export const logout = createAsyncThunk(
    "user/logout",
    async () => {
        try {
            const response = await AuthService.logout();
            console.log(response);
            localStorage.removeItem("token");
            return response;
        } catch (error) {
            console.log(error)
        }
    }
);

export const checkAuth = createAsyncThunk<IUser>(
    "user/checkAuth",
    async () => {
        setLoading(true);

        try {
            const response = await AuthService.refresh();

            console.log(response);
            if (response) {
                setAuth(true);
            }
            localStorage.setItem("token", response.data.accessToken);
            return response.data.user;
        } catch (error) {
            console.log(error)
        }
    }
)

export const { setAuth, setUser, setLoading } = userSlice.actions;

export const userReducer = userSlice.reducer;