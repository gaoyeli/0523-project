<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary" @click="willAdd">添加</el-button>
    <!-- //列表 -->
    <v-list @emit="emit($event)"></v-list>
    <!-- 添加弹出框 -->
    <v-add :info="info" @hide="hide" ref="add"></v-add>
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
        isShow: false,
        title: "添加规格",
        isAdd: true,
      },
    };
  },
  methods: {
    //点击添加按钮
    willAdd() {
      this.info = {
        isShow: true,
        title: "添加规格",
        isAdd: true,
      };
    },
    hide() {
      this.info.isShow = false;
    },
    //点击编辑
    emit(id) {
      this.info = {
        isShow: true,
        title: "添加规格",
        isAdd: false,
      };
      this.$refs.add.look(id)
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>