<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @close="close('form')">
      <el-form :model="form" :rules="rules" ref="form">
        <!-- 
        <el-form-item label="上级分类" :label-width="width">
          <el-select v-model="form.pid" placeholder="请选择活动区域">
            <el-option label="顶级分类" :value="0"></el-option>
            
            <el-option v-for="item in list" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>-->

        <el-form-item label="标题" :label-width="width" prop="title">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" :label-width="width" prop="img">
          <!-- 原生的上传文件 -->
          <div class="upload-box">
            <h3 class="upload-add">+</h3>
            <img class="upload-img" :src="imgUrl" alt />
            <input class="upload-file" @change="selectImg" type="file" />
          </div>

          <!-- <el-upload
            class="avatar-uploader"
            action="#"
            :show-file-list="false"
            :on-change="changeImg"
          >
            <img v-if="imgUrl" :src="imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>-->
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
import { mapGetters, mapActions } from "vuex";
import {
  reqbanneradd,
  reqbannerinfo,
  reqbanneredit,
} from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      list: "banner/list",
    }),
  },
  components: {},
  data() {
    // 放置form 数据，填写的内容到数据库的form
    return {
      imgUrl: "",
      width: "100px",
      form: {
        title: "",
        img: null,
        status: 1,
      },
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        img: [{ required: true, message: "请添加图片", trigger: "blur" }],
      },
    };
  },
  methods: {
    ...mapActions({
      reqList: "banner/reqListAction",
    }),
    //取消
    cancel() {
      this.$emit("hide");
    },
    //重置
    empty() {
      this.form = {
        title: "",
        img: null,
        status: 1,
      };
      this.imgUrl = "";
    },
    //弹框关闭完成
    close(form) {
      // 如果是编辑，取消了，就要清空
      if (!this.info.isAdd) {
        this.empty();
      }
      this.$refs[form].resetFields();
    },
    // 点击添加
    add(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          reqbanneradd(this.form).then((res) => {
            if (res.data.code == 200) {
              //添加成功
              successAlert(res.data.msg);
              //弹框消失
              this.$emit("hide");
              //数据重置
              this.empty();
              //重新获取list
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
    //查看一条具体的数据
    look(id) {
      reqbannerinfo({ id: id }).then((res) => {
        this.form = res.data.list;
        //返回的form没有img ，自己定义一个接受数据
        this.imgUrl = this.$preImg + res.data.list.img;
        //后端需要id  这个form 没有， 这样在点击完编辑后，就把这条数据的信息放到form上
        this.form.id = id;
      });
    },
    //点击修改
    update(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          reqbanneredit(this.form).then((res) => {
            if (res.data.code == 200) {
              successAlert("更新成功");
              //消失
              this.$emit("hide");
              // 重置
              this.empty();
              // 重新请求
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

    //原生上传文件
    selectImg(e) {
      var file = e.target.files[0];

      //2M
      if (file.size > 2 * 1024 * 1024) {
        warningAlert("文件格式不能超过2M");
        return;
      }

      //图片类型
      let imgTypeArr = [".jpg", ".jpeg", ".png", ".gif"];
      //获取到后缀名
      var extname = file.name.slice(file.name.lastIndexOf("."));
      //判断文件格式是否正确
      if (!imgTypeArr.includes(extname)) {
        warningAlert("请上传正确的图片格式");
        return;
      }

      this.imgUrl = URL.createObjectURL(file);
      this.form.img = file;
    },
  },

  mounted() {},
};
</script>
<style scoped>
.upload-box {
  width: 150px;
  height: 150px;
  border: 1px dashed #cccccc;
  position: relative;
}
.upload-add {
  width: 150px;
  height: 150px;
  text-align: center;
  line-height: 150px;
  font-size: 40px;
  color: #666;
  font-weight: 400;
}
.upload-img {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
.upload-file {
  width: 150px;
  height: 150px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}
</style>