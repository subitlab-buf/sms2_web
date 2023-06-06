import { createStore } from "vuex";
import { Buffer } from "buffer";

export const store = createStore({
    state() {
        return {
            info: "",
        };
    },
    getters: {
        info: function (state) {
            if (state.info !== "") return state.info;
            let info = localStorage.getItem("info");
            if (info != null) {
                state.info = info;
                // console.log(state,info);
                return info;
            }
            return "";
        },
        parsePayload: function (state) {
            return Buffer
                .from(this.token(state), 'base64')
                .toString('utf-8')
                .split('.');
        },
        isLoginStatic: function (state) {
            return this.info(state) !== "";
        },
        username: function (state) {
            return this.parsePayload(state)[1];
        },
    },
    mutations: {
        setLogin: function (state, token, username) {
            let info = Buffer
                .from(token + '.' + username, 'utf-8')
                .toString('base64');
            state.info = info;
            localStorage.setItem("info", info);
        },
        logout: function (state) {
            state.info = "";
            localStorage.setItem("info", "");
        }
    }
});

