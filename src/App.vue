<template>
  <div id="app">
    <a-input placeholder="请输入任务" class="my_ipt" :value='inputValue' @change=" handleInputChange"/>
    <a-button type="primary" @click="addItemToList">添加事项</a-button>

    <a-list bordered :dataSource="infoList" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox :checked="item.done" @change="cbStateChanged($event,item.id)">{{item.info}}</a-checkbox>
        <!-- 删除链接 -->
        <a slot="actions" @click="removeItemById(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>{{unDoneLength}}条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button :type="viewKey ==='all'?'primary':'default'" @click="changeList('all')">全部</a-button>
          <a-button :type="viewKey ==='undone'?'primary':'default'" @click="changeList('undone')">未完成</a-button>
          <a-button :type="viewKey ==='done'?'primary':'default'"  @click="changeList('done')">已完成</a-button>
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="clean">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  name: 'app',
  data () {
    return {}
  },
  created () {
    this.$store.dispatch('getList')
  },
  methods: {
    changeList (key) {
      // 点击“全部”，“已完成”，“未完成”时触发
      this.$store.commit('changeKey', key)
    },
    clean () {
    // 清除已经完成的事项
      this.$store.commit('cleanDone')
    },
    handleInputChange (e) {
      this.$store.commit('setInputValue', e.target.value)
    },
    addItemToList () {
      // 向列表中新增事项
      if (this.inputValue.trim().length <= 0) {
        return this.$message.warning('文本框内容不能为空')
      }
      this.$store.commit('addItem')
    },
    removeItemById (id) {
      // 根据id删除事项
      this.$store.commit('removeItem', id)
    },
    cbStateChanged (e, id) {
      // 复选框状态改变时触发
      const param = {
        id: id,
        status: e.target.checked
      }
      // 根据id更改事项状态
      this.$store.commit('changeStatus', param)
    }
  },
  computed: {
    ...mapState(['list', 'inputValue', 'viewKey']),
    ...mapGetters(['unDoneLength', 'infoList'])
  }
}
</script>

<style scoped>
#app {
  padding: 10px;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
