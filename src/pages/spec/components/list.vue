<template>
  <div>
    <el-table
      :data="list"
      style="width: 90%;margin:10px auto;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="id" label="规格编号" sortable width="180"></el-table-column>
      <el-table-column prop="specsname" label="规格名称" sortable width="180"></el-table-column>
      <el-table-column label="规格属性">
        <template slot-scope="scope">
          <el-tag type="success" v-for="item in scope.row.attrs" :key="item">{{item}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <v-del @confirm="del(scope.row.id)"></v-del>
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
import { reqspecsDel } from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  computed: {
    ...mapGetters({
      list: "spec/list",
      size: "spec/size",
      total: "spec/total",
      page: "spec/page",
    }),
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      reqList: "spec/reqListAction",
      reqNum: "spec/reqListNum",
      changePageAction: "spec/changePageAction",
    }),
    //修改了当前的页码
    changeCurrentPage(p) {
      //修改一下vuex里面的page
      this.changePageAction(p);
    },
    //点击编辑
    edit(id) {
      this.$emit("emit", id);
    },
    del(id) {
      //点击了确定，发起删除请求
      reqspecsDel({ id: id }).then((res) => {
        if (res.data.code == 200) {
          successAlert("删除成功");
          this.reqNum();
          this.reqList();
           this.changePageAction()
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    this.reqList();
    this.reqNum();
  },
};
</script>
<style scoped>
</style>