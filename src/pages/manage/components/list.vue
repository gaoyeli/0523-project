<template>
  <div>
    <el-table
      :data="list"
      style="width: 90%;margin:10px auto;margin-bottom: 20px;"
      row-key="id"
      border
    >
      <el-table-column prop="id" label="用户编号" sortable width="180"></el-table-column>
      <el-table-column prop="username" label="用户名称" sortable width="180"></el-table-column>
      <el-table-column prop="rolename" label="所属角色" sortable width="180"></el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
          <v-del @confirm="del(scope.row.uid)">删除</v-del>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :page-size="size"
      layout="prev, pager, next"
      :total="total"
      :current-page="page"
      @current-change="changeCurrentPage"
    ></el-pagination>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqUserDel } from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  computed: {
    ...mapGetters({
      list: "manage/list",
      size: "manage/size",
      total: "manage/total",
      page: "manage/page",
    }),
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      reqList: "manage/reqRoleAction",
      reqTotal: "manage/reqListNum",
      changePageAction: "manage/changePageAction",
    }),
    //点击了编辑
    edit(id) {
      this.$emit("edit", id);
    },
    //删除
    del(id) {
      reqUserDel({ uid: id }).then((res) => {
        if (res.data.code == 200) {
          successAlert("删除成功");
          this.reqList();
          this.reqTotal();
           this.changePageAction(1);
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //修改了当前的页码
    changeCurrentPage(p) {
      //修改一下vuex里面的page
      this.changePageAction(p);
    },
  },
  mounted() {
    this.reqList();
    this.reqTotal();
  },
};
</script>
<style scoped>
</style>