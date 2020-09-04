<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @close="close('form')">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="规格名称" :label-width="width" prop="specsname">
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 渲染循环 -->
        <el-form-item
          label="规格属性"
          :label-width="width"
          v-for="(item,index) in attrArr"
          :key="index"
        >
          <el-row>
            <el-col :span="18">
              <el-input v-model="item.value"></el-input>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" v-if="index==0" @click="addAttr">新增规格属性</el-button>
              <el-button type="danger" v-else @click="del(index)">删除</el-button>
            </el-col>
          </el-row>
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
  reqspecsAdd,
  reqspecsDetail,
  reqspecsUpdate,
} from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      attrArr: [
        {
          value: "",
        },
      ],
      width: "100px",
      //表单数据
      form: {
        specsname: "",
        attrs: "",
        status: 1,
      },
      rules: {
        specsname: [
          { required: true, message: "请输入规格名称", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    //添加成功从新请求
    ...mapActions({
      reqList: "spec/reqListAction",
      reqTotal: "spec/reqListNum",
    }),
    //离开
    cancel() {
      this.$emit("hide");
    },
    //新增规格属性点击一下 添加一个json
    addAttr() {
      this.attrArr.push({
        value: "",
      });
    },
    //点击删除  删除规格属性
    del(index) {
      this.attrArr.splice(index, 1);
    },
    //重置按钮
    empty() {
      this.form = {
        specsname: "",
        attrs: "",
        status: 1,
      };
      this.attrArr = [{ value: "" }];
    },
    //点击添加按钮
    add(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          //添加value的值
          this.form.attrs = JSON.stringify(
            this.attrArr.map((item) => item.value)
          );
          reqspecsAdd(this.form).then((res) => {
            if (res.data.code == 200) {
              //添加成功
              successAlert("添加成功");
              //弹框消失
              this.$emit("hide");
              //数据重置
              this.empty();
              //重新获取list
              this.reqList();
              //从新获取分页
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
    //查看一条数据
    look(id) {
      reqspecsDetail({ id: id }).then((res) => {
        this.form = res.data.list[0];
        this.attrArr = JSON.parse(this.form.attrs).map((item) => ({
          value: item,
        }));
      });
    },
    //点击修改
    update(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.form.attrs = JSON.stringify(
            this.attrArr.map((item) => item.value)
          );
          reqspecsUpdate(this.form).then((res) => {
            if (res.data.code == 200) {
              successAlert("更新成功");
              this.$emit("hide");
              this.empty();
              this.reqList();
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
    //编辑弹框xiaoshi
    close(form) {
      if (!this.info.isAdd) {
        this.empty();
      }
      this.$refs[form].resetFields();
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>