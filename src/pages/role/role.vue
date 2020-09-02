<template>
  <div>
    <el-button type="primary" @click="WillAdd">添加</el-button>
    <!-- 添加表格 -->
    <v-list @edit="edit"></v-list>
    <!-- 添加弹框 -->
    <v-add  :info="info" @hide="hide" ref="add"></v-add>
  </div>
</template>
<script>
import vList from "./compoents/list";
import vAdd from "./compoents/add";
export default {
  components: {
    vList,
    vAdd,
  },
  data() {
    return {
      info: {
        isShow: false,
        title: "添加角色",
        isAdd: true,
      },
    };
  },
  methods: {
    WillAdd() {
      this.info = {
        isShow: true,
        title: "添加角色",
        isAdd: true,
      }
    },
    hide(){
    this.info.isShow=false
    },
    //编辑按钮
    edit(id){
      this.info={
       isShow: true,
        title: "修改角色",
        isAdd: false,
      }
      this.$refs.add.look(id)
    }
  },
  mounted() {},
};
</script>
<style scoped>
</style>