<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary" @click="willAdd">添加</el-button>
    <!-- 数据列表 -->
    <v-list @emit="emit($event)"></v-list>
    <!-- 添加弹框 -->
    <v-add :info="info" @hide="hide" ref="add" ></v-add>
  </div>
</template>
<script>
import vList from "./components/list";
import vAdd from "./components/add";
export default {
  components: {
    vList,
    vAdd,
  },
  data() {
    return {
      //给子组件信息
      info: {
        isShow: false,
        title: "添加菜单",
        isAdd: true,
      },
    };
  },
  methods: {
    //点击添加按钮
    willAdd() {
      this.info = {
        isShow: true,
        title: "添加菜单",
        isAdd: true,
      };
    },
    //弹框消失
    hide() {
      this.info.isShow = false;
    },
    //编辑按钮
    emit(id) {
      this.info = {
        isShow: true,
        title: "修改菜单",
        isAdd: false,
      };
      //父组件调用子组件的方法
      this.$refs.add.look(id);
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>