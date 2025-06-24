// src/store/index.js

import { createStore } from 'vuex'

// 创建 store 实例
const store = createStore({
    // 1️⃣ 定义个对象，对象名，固定为state
    state() {
        return {
            name: "光学学习平台", // 定义的属性，调用的办法是： store.state.name
            phone: 1888888
        }
    },

    // 2️⃣ 同步修改状态的方法（必须是同步的）
    mutations: {
        setName(state, newName) {  // store.commit('setName',"李四")  这个是不传state的，state是自己内部传的，类似python的self
            state.name = newName
        },
        updatePhone(state, newPhone) {
            state.phone = newPhone
        }
    },

    // 3️⃣ 异步操作，最后还是要调用 mutations 来改状态。调用：store.dispatch('asyncUpdatePhone',"1555555")
    actions: {
        asyncSetName({ commit }, newName) {
            setTimeout(() => {
                commit('setName', newName)
            }, 1000)
        },
        asyncUpdatePhone({ commit }, newPhone) {
            setTimeout(() => {
                commit('updatePhone', newPhone)
            }, 1000)
        }
    },

    // 4️⃣ getters 即不是获取数据，也不是定义属性，他是把已经定义的属性，组合起来，所以他是属性扩展，唯一跟get单词沾边的，就是他是只读的
    getters: {
        fullName(state) {   //这个定义的属性，所以调用的时候是 store.state.fullName , 没有()的，就是属性调用。
            return state.name +"-"+state.phone
        }
    }
})

export default store
