import {createStore} from "vuex";
import {Buffer} from "buffer";

export const store = createStore({
    state() {
        return {
            token: "",
        };
    },
    getters: {
        token: function (state) {
            if (state.token !== "") return state.token;
            let token = localStorage.getItem("token");
            if (token != null) {
                state.token = token;
                // console.log(state,token);
                return token;
            }
            return "";
        },
        parsePayload: function (state) {
            return JSON.parse(
                Buffer
                    .from(this.token(state).split(".")[1], 'base64')
                    .toString('utf-8')
            );
        },
        isLoginStatic: function (state) {
            return this.token(state) !== "";
        },
        username: function (state) {
            return this.parsePayload(state).username;
        },
    },
    mutations: {
        setLogin: function (state, token) {
            state.token = token;
            localStorage.setItem("token", token);
        }, logout: function (state) {
            state.token = "";
            localStorage.setItem("token", "");
        }
    }
});

