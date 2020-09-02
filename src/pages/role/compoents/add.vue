<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @closed="close">
      <el-form :model="form">
        <el-form-item label="角色名称" :label-width="width">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="角色权限" :label-width="width">
          <el-tree
            :data="menuList"
            show-checkbox
            node-key="id"
            ref="tree"
            :props="{children:'children',label:'title'}"
          ></el-tree>
        </el-form-item>

        <el-form-item label="角色状态" :label-width="width">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" v-else @click="updata">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  reqRoleAdd,
  reqRoleUpdate,
  reqRoleDetail,
} from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      menuList: "menu/list",
    }),
  },
  data() {
    return {
      width: "100px",
      //后台需要的以及引入的from
      form: {
        rolename: "",
        menus: [],
        status: 1,
      },
    };
  },
  methods: {
    ...mapActions({
      //权限是菜单管理下边的数据 先访问过来
      reqRoleList: "menu/reqListAction",
      //访问自己数据库，找到值
      roleList: "role/reqRoleAction",
    }),
    //弹框消失
    close() {
      if (!this.info.isShow) {
        this.empty();
      }
    },
    //点击关闭
    cancel() {
      this.info.isShow = false;
    },
    //重置
    empty() {
      this.form = {
        rolename: "",
        menus: [],
        status: 1,
      };
    },
    add() {
      //menus设置
      // this.$refs.tree.getCheckedKeys() 获取树形控件上的选中的key
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      //请求数据
      reqRoleAdd(this.form).then((res) => {
        if (res.data.code == "200") {
          successAlert("添加成功");
          //取消按钮
          this.cancel();
          //清空
          this.empty();
          //重新请求
          this.roleList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    //查看详情数据
    look(id) {
      reqRoleDetail({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.$refs.tree.setCheckedKeys(JSON.parse(res.data.list.menus));
      });
    },
    //修改
    updata() {
      // this.$refs.tree.getCheckedKeys() 获取树形控件上的选中的key
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert("修改成功");
          //弹框消失
          this.cancel();
          //数据重置
          this.empty();
          //刷新角色列表的数据
          this.reqRoleList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    //menuList 是空的 发请求得到menu的数据
    if (this.menuList.length == 0) {
      this.reqRoleList();
    }
    console.log(this.menuList);
  },
};
</script>
<style scoped>
</style>