
const state = {
    accountNumber: '',
    password: '',
    isLogin: false
}



const getters = { 
    getAccountNumber: (state)=>{
        return state.accountNumber;
    },
    getPassword: (state)=>{
        return state.password;
    }
}

const mutations =  { 
    SET_ACCOUNT_NUMBER(state, accountNumber){
        state.accountNumber = accountNumber;
    },
    SET_PASSWORD(state, password){
        state.password = password;
    },
    // LOGIN(state, payload){
    //     state.isLogin = true;
    //     commit('SET_ACCOUNT_NUMBER', payload.accountNumber)
    //     commit('SET_PASSWORD', payload.password)
    //     // SET_ACCOUNT_NUMBER(payload.accountNumber);
    //     // SET_PASSWORD(payload.password);
    // },
    // LOGOUT(state){
    //     state.isLogin = false;
    //     // state.commit('SET_ACCOUNT_NUMBER', '')
    //     // state.commit('SET_PASSWORD', '')
    // },
    IS_LOGIN(state){
        return state.isLogin;
    }
}
const actions = { 
    LOGIN({ commit, state }, payload){
        state.isLogin = true;
        commit('SET_ACCOUNT_NUMBER', payload.accountNumber)
        commit('SET_PASSWORD', payload.password)
        // console.log(state.accountNumber, state.password)
    },
    LOGOUT({ commit, state }){
        state.isLogin = false;
        localStorage.removeItem('token');
        commit('SET_ACCOUNT_NUMBER', '')
        commit('SET_PASSWORD', '')
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}