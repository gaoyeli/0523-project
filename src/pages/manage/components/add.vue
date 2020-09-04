<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @close="close('form')">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="用户名称" :label-width="width" prop="username">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="所属角色" :label-width="width" prop="roleid">
          <el-select v-model="form.roleid">
            <el-option value label="--请选择--" disabled></el-option>
            <!-- 少数据 -->
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="密码" :label-width="width">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="状态" :label-width="width">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add('form')" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" @click="update('form')" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  reqUserAdd,
  reqUserDetail,
  reqUserUpdate,
} from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      roleList: "role/list",
    }),
  },
  data() {
    return {
      width: "100px",
      form: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        roleid: [{ required: true, message: "请选择角色", trigger: "blur" }],
      },
    };
  },
  methods: {
    ...mapActions({
      roleRoleList: "role/reqRoleAction",
      reqUserList: "manage/reqRoleAction",
      reqTotal: "manage/reqListNum",
    }),
    //点击取消按钮
    cancel() {
      this.info.isShow = false;
    },
    //弹框消失
    close(form) {
      if (!this.info.isShow) {
        this.empty();
      }
      this.$refs[form].resetFields();
    },
    //重置
    empty() {
      this.form = {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      };
    },

    //点击确定按钮，请求数据，到数据库
    add(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          reqUserAdd(this.form).then((res) => {
            console.log(this.form);
            if (res.data.code == 200) {
              successAlert("添加成功");
              this.cancel();
              this.empty();
              //刷新页面
              this.reqUserList();
              this.reqTotal();
            } else {
              warningAlert(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //查看详情
    look(id) {
      reqUserDetail({ uid: id }).then((res) => {
        this.form = res.data.list;
        this.form.password = "";
      });
    },
    update(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          reqUserUpdate(this.form).then((res) => {
            if (res.data.code == 200) {
              successAlert("修改成功");
              //消失
              this.cancel();
              //    清空
              this.empty();
              this.reqUserList();
            } else {
              warningAlert(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  mounted() {
    if (this.roleList.length == 0) {
      this.roleRoleList();
    }
  },
};
</script>
<style scoped>
</style>