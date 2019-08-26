import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {},
    state: {
        userid: "",
        avatar: "",
        token: null
    },
    mutations: {
        ['SETUSERID']: (state, data) => {
            state.userid = data;
        },
        ['LOGIN']: (state, data) => {
            localStorage.token = data;
            state.token = data;
        },
        ['LOGOUT']: state => {
            localStorage.removeItem("token");
            state.token = null;
        }
    }
});