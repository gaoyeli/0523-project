<template>
  <div>
    <el-button type="primary" @click="willadd">添加</el-button>
    <!-- 弹框 -->
    <v-add :info="info" @hide="hide" ref="add"></v-add>
    <!-- 列表 -->
    <v-list @emit="emit"></v-list>
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
        //添加弹框出现状态
        isShow: false,
        title: "添加分类",
        isAdd: true,
      },
    };
  },
  methods: {
    willadd() {
      this.info = {
        isShow: true,
        title: "添加轮播图",
        isAdd: true,
      };
    },
    //点击取消
    hide() {
      this.info.isShow = false;
    },
    //编辑
    emit(id) {
      (this.info = {
        isShow: true,
        title: "修改轮播图",
        isAdd: false,
      }),
        this.$refs.add.look(id);
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>