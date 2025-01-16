import { defineStore } from "pinia";
import { User } from "../interfaces/user.interface";
import { Auth } from "../interfaces/auth.interface";
import { AuthForm } from "../interfaces/auth-form.interface";
import axiosInstance from "../plugins/axios";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: {id: "", username: "", email: ""} as User,
        auth: {token: "", isLogged: true} as Auth
    }),
    actions: {
        logout(){

        },
        login(form: AuthForm){
      console.log(form)

            axiosInstance.post('/auth/login/', form).then(r => {
                console.log(r)
            })
        },
        register(form: AuthForm){
            
        }

    }
})