<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @close="close('form')">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="活动名称" :label-width="width" prop="title">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="活动期限" :label-width="width" prop="time">
          <el-date-picker
            v-model="value1"
            value-format="timestamp"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="一级分类" :label-width="width" prop="pp">
          <el-select v-model="form.first_cateid" placeholder="请选择活动区域" @change="changeFirstId">
            <el-option label="--请选择--" value disabled></el-option>
            <!-- 少一个动态的数据 -->
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" :label-width="width" prop="second">
          <el-select v-model="form.second_cateid" @change="changeSpecId" placeholder="请选择活动区域">
            <el-option label="--请选择--" value disabled></el-option>
            <!-- 少一个动态的数据 -->
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品" :label-width="width">
          <el-select v-model="form.goodsid" placeholder="请选择商品">
            <el-option label="--请选择--" value disabled></el-option>
            <!-- 少一个动态的数据   商品-->
            <el-option
              v-for="item in goodsList"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态" :label-width="width">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add('form')" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" @click="update ('form')" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {
  reqseckAdd,
  reqseckDetail,
  reqseckUpdate,
} from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      //分类列表
      cateList: "cate/list",
      //商品列表
      goodsList: "goods/list",

      list: "seckill/list",
      Rlist: "seckill/list",
    }),
  },
  components: {},
  data() {
    // 放置form 数据，填写的内容到数据库的form
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      value1: [],
      //二级分类的列表
      secondCateList: [],
      //商品的列表
      attrList: [],
      //label占的宽度
      width: "100px",
      //表单数据
      form: {
        first_cateid: "",
        second_cateid: "",
        title: "",
        begintime: "",
        endtime: "",
        goodsid: "",
        status: 1,
      },
      rules: {
        title: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        time: [{ required: true, message: "请输入活动时间", trigger: "blur" }],
        pp: [{ required: true, message: "请选择一级分类", trigger: "blur" }],
         second: [{ required: true, message: "请选择二级分类", trigger: "blur" }],
      },
     
    };
  },
  methods: {
    ...mapActions({
      //获取分类列表
      reqCateList: "cate/reqListAction",
      //获取规格列表
      reqSpecList: "spec/reqListAction",
      //获取商品列表
      reqList: "goods/reqListAction",
      //秒杀 列表
      seckillList: "seckill/reqListAction",
    }),
    //取消
    cancel() {
      this.$emit("hide");
    },
    //重置
    empty() {
      this.form = {
        first_cateid: "",
        second_cateid: "",
        title: "",
        begintime: "",
        endtime: "",
        goodsid: "",
        status: 1,
      };
    },
    //弹框关闭完成
    close(form) {
      // 如果是编辑，取消了，就要清空
      if (!this.info.isAdd) {
        this.empty();
      }
      this.$refs[form].resetFields();
    },
    //点击后一级分类找到这个分类下边的相对应的数据，赋值给二级分类
    changeFirstId() {
      this.secondCateList = this.cateList.find(
        (item) => item.id == this.form.first_cateid
      ).children;
      //更改了一级分类。二级分类重置
      this.form.second_cateid = "";
    },

    //商品修改 拿到值赋值给attrList
    changeSpecId() {
      this.reqList({
        fid: this.form.first_cateid,
        sid: this.form.second_cateid,
      });
      //  console.log(attrList);
    },
    // 点击添加
    add(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.reqList(true);
          //把form的起始时间。结束时间给begin 和end
          this.form.begintime = this.value1[0];
          this.form.endtime = this.value1[1];
          // console.log(this.begintime);
          reqseckAdd(this.form).then((res) => {
            if (res.data.code == 200) {
              //添加成功
              successAlert(res.data.msg);
              //弹框消失
              this.$emit("hide");
              //数据重置
              this.empty();
              //重新获取list
              this.reqList();
              this.seckillList();
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
      reqseckDetail({ id: id }).then((res) => {
        this.form = res.data.list;
        //后端需要id  这个form 没有， 这样在点击完编辑后，就把这条数据的信息放到form上
        this.form.id = id;
        this.value1 = [];
        this.value1[0] = this.form.begintime;
        this.value1[1] = this.form.endtime;
        //计算二级分类的列表
        this.secondCateList = this.cateList.find(
          (item) => item.id == this.form.first_cateid
        ).children;
        // this.reqList();
      });
    },
    //点击修改
    update(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          // this.form.begintime = this.value1[0];
          // this.form.endtime = this.value1[1];
          // this.value1[0] = JSON.stringify(this.form.begintime);
          // this.value1[1] = JSON.stringify(this.form.endtime);
          reqseckUpdate(this.form).then((res) => {
            if (res.data.code == 200) {
              successAlert("更新成功");
              //消失
              this.$emit("hide");
              // 重置
              this.empty();
              // 刷新请求
              this.seckillList();
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
    //如果没有分类就请求
    if (this.cateList.length == 0) {
      this.reqCateList();
    }
    //请求商品
    this.reqList(true);
    // this.seckillList()
    // //请求全部的规格
    // this.reqSpecList(true);
  },
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