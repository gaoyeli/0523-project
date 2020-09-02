<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary" @click="willadd">添加</el-button>
    <!-- 弹出框 -->
    <v-add :info="info" ref="add"></v-add>
    <!-- 表单 -->
    <v-list @edit="edit" ></v-list>
  </div>
</template>
<script>
import vAdd from "./components/add";
import vList from "./components/list";
export default {
  components: {
    vAdd,
    vList,
  },
  data() {
    return {
      info: {
        //控制add的状态
        isShow: false,
        title: "添加管理员",
            isAdd:true
      },
    };
  },
  methods: {
    willadd() {
      this.info = {
        //控制add的状态
        isShow: true,
        title: "添加管理员",
          isAdd:true
      };
    },
    edit(id){
      this.info={
        //控制add的状态
        isShow: true,
        title: "修改管理员",
        isAdd:false
      },
      this.$refs.add.look(id)
    }
  },
  mounted() {},
};
</script>
<style scoped>
</style>