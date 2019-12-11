import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 所以任务列表
    list: [],
    // 输入框的值
    inputValue: '',
    // 模拟id号
    nextId: 5,
    // 保存默认的选项卡值
    viewKey: 'all'
  },
  mutations: {
    changeKey (state, key) {
      // 当用户点击“全部”，“已完成”，“未完成”选项卡时触发
      state.viewKey = key
    },
    initList (state, list) {
      state.list = list
    },
    setInputValue (state, mes) {
      state.inputValue = mes
    },
    addItem (state) {
      const obj = {
        id: state.nextId,
        info: state.inputValue.trim(),
        done: false
      }
      // 将创建好的事项添加到数组list中
      state.list.push(obj)
      // 将nextId值自增
      state.nextId++
      state.inputValue = ''
    },
    removeItem (state, id) {
      // 根据id删除事项数据
      const index = state.list.findIndex(x => x.id === id)
      // console.log(index);
      if (index !== -1) {
        state.list.splice(index, 1)
        state.nextId--
      }
    },
    // 改变复选框状态
    changeStatus (state, param) {
      // 根据id改变对应事项的状态
      const index = state.list.findIndex(x => x.id === param.id)
      if (index !== -1) state.list[index].done = param.status
    },
    cleanDone (state) {
      state.list = state.list.filter(x => x.done === false)
    }
  },
  // 异步请求
  actions: {
    getList (context) {
      axios.get('/list.json').then(({ data }) => {
        console.log(data)
        context.commit('initList', data)
      })
    }
  },
  getters: {
    unDoneLength (state) {
      const temp = state.list.filter(x => x.done === false)
      console.log(temp)
      return temp.length
    },
    infoList (state) {
      if (state.viewKey === 'all') {
        return state.list
      }
      if (state.viewKey === 'undone') {
        return state.list.filter(x => x.done === false)
      }
      if (state.viewKey === 'done') {
        return state.list.filter(x => x.done === true)
      }
    }
  },
  modules: {
  }
})
