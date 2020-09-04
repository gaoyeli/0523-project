<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="昵称" :label-width="width" prop="nickname">
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="width" prop="phone">
          <el-input v-model="form.phone"></el-input>
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
        <!-- <el-button type="primary" @click="add" v-if="info.isAdd">添 加</el-button> -->
        <el-button type="primary" @click="update('form')">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { reqmemberDetail, reqmemberUpdate } from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      roleList: "member/list",
    }),
  },
  data() {
    return {
      width: "100px",
      form: {
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      },
      rules: {
        phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
      },
    };
  },
  methods: {
    ...mapActions({
      reList: "member/reqRoleAction",
    }),
    //点击取消按钮
    cancel() {
      this.info.isShow = false;
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

    // //点击确定按钮，请求数据，到数据库
    // add() {
    //   reqUserAdd(this.form).then((res) => {
    //     console.log(this.form);
    //     if (res.data.code == 200) {
    //       successAlert("添加成功");
    //       this.cancel();
    //       this.empty();

    //     } else {
    //       warningAlert(res.data.msg);
    //     }
    //   });
    // },
    //查看详情
    look(id) {
      reqmemberDetail({ uid: id }).then((res) => {
        this.form = res.data.list;
        this.form.password = "";
      });
    },
    //点击修改
    update(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          reqmemberUpdate(this.form).then((res) => {
            if (res.data.code == 200) {
              successAlert("修改成功");
              //消失
              this.cancel();
              //    清空
              this.empty();
              this.reList();
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
  mounted() {},
};
</script>
<style scoped>
</style>