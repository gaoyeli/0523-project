<template>
  <div>
    <el-table
      :data="list"
      style="width: 90%;margin:10px auto;margin-bottom: 20px;"
      row-key="id"
      border
    >
      <el-table-column prop="id" label="用户编号" sortable width="180"></el-table-column>
      <el-table-column prop="nickname" label="昵称" sortable width="180"></el-table-column>
      <el-table-column prop="phone" label="手机号" sortable width="180"></el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
          
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqUserDel } from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  computed: {
    ...mapGetters({
      list: "member/list",

    }),
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      reqList: "member/reqRoleAction",
    }),
    //点击了编辑
    edit(id) {
      this.$emit("edit", id);
    },
    // //删除
    // del(id) {
    //   reqUserDel({ uid: id }).then((res) => {
    //     if (res.data.code == 200) {
    //       successAlert("删除成功");
    //       this.reqList();
          
          
    //     } else {
    //       warningAlert(res.data.msg);
    //     }
    //   });
    // },
  },
  mounted() {
    this.reqList();
  },
};
</script>
<style scoped>
</style>