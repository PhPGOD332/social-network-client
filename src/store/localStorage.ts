import {setupStore} from "@/store/store";


export const updateLocalStorage = () => {
    localStorage.setItem('storage', setupStore().getState().toString());
}