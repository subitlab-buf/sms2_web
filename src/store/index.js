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
        parsePayload: function (state, getters) {
            return Buffer
                .from(getters.info, 'base64')
                .toString('utf-8')
                .split('.');
        },
        isLoginStatic: function (state, getters) {
            return getters.info !== "";
        },
        accountId: function (state, getters) {
            return getters.parsePayload[1];
        },
        token: function (state, getters) {
            return getters.parsePayload[0];
        },
    },
    mutations: {
        setLogin: function (state, token, accountId) {
            let info = Buffer
                .from(token + '.' + accountId, 'utf-8')
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

