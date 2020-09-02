<template>
  <div>
    <el-dialog
      :title="info.title"
      :visible.sync="info.isShow"
      @close="close"
      @opened="createEditor"
    >
      <el-form :model="form">
        <el-form-item label="一级分类" :label-width="width">
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
        <el-form-item label="二级分类" :label-width="width">
          <el-select v-model="form.second_cateid" placeholder="请选择活动区域">
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

        <el-form-item label="商品名称" :label-width="width">
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="width">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" :label-width="width">
          <el-input v-model="form.market_price" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="图片" :label-width="width" v-if="form.pid!=0">
          <!-- 原生的上传文件 -->
          <div class="upload-box">
            <h3 class="upload-add">+</h3>
            <img class="upload-img" v-if="imgUrl" :src="imgUrl" alt />
            <input class="upload-file" @change="selectImg" type="file" />
          </div>
        </el-form-item>

        <el-form-item label="商品规格" :label-width="width">
          <el-select v-model="form.specsid" placeholder="请选择活动区域" @change="changeSpecId">
            <el-option label="--请选择--" value disabled></el-option>
            <!-- 少一个动态的数据 -->
            <el-option
              v-for="item in specList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品属性" :label-width="width">
          <el-select v-model="form.specsattr" placeholder="请选择活动区域" multiple>
            <el-option label="--请选择--" value disabled></el-option>
            <!-- 少一个动态的数据 -->
            <el-option v-for="item in attrList" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品" :label-width="width">
          <el-radio :label="1" v-model="form.isnew">是</el-radio>
          <el-radio :label="2" v-model="form.isnew">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖" :label-width="width">
          <el-radio :label="1" v-model="form.ishot">是</el-radio>
          <el-radio :label="2" v-model="form.ishot">否</el-radio>
        </el-form-item>
        <el-form-item label="状态" :label-width="width">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
        <el-form-item label="商品描述" :label-width="width">
          <!-- 富文本编辑器的节点 -->
          <div id="editor" v-if="info.isShow"></div>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {
  reqgoodsAdd,
  reqgoodsDetail,
  reqgoodsUpdate,
} from "../../../utils/request";
import { successAlert, warningAlert } from "../../../utils/alert";
import E from "wangeditor"
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      //分类列表
      cateList: "cate/list",
      //规格列表
      specList: "spec/list",
    }),
  },
  components: {},
  data() {
    // 放置form 数据，填写的内容到数据库的form
    return {
      //二级分类的列表
      secondCateList: [],
      //规格属性的列表
      attrList: [],
      //图片临时地址
      imgUrl: "",
      //label占的宽度
      width: "100px",
      //表单数据
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
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
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      };
      this.imgUrl = "";
    },
    //弹框关闭完成
    close() {
      // 如果是编辑，取消了，就要清空
      if (!this.info.isAdd) {
        this.empty();
      }
    },
    //点击后一级分类找到这个分类下边的相对应的数据，赋值给二级分类
    changeFirstId() {
      this.secondCateList = this.cateList.find(
        (item) => item.id == this.form.first_cateid
      ).children;
      //更改了一级分类。二级分类重置
    },
    //商品规格修改 拿到值赋值给attrList
    changeSpecId() {
      //商品规格改变，找到对应规格下边的属性
      this.attrList = this.specList.find(
        (item) => item.id == this.form.specsid
      ).attrs;
      //选中的商品属性重置
      this.form.specsattr = [];
    },
    //创建编辑器
    createEditor() {
      //创建编辑器
      this.editor = new E("#editor");
      this.editor.create();
      //给富文本编辑器赋值
      this.editor.txt.html(this.form.description);
    },
    // 点击添加
    add() {
      //取出富文本编辑器的内容，赋值给form的description
      this.form.description = this.editor.txt.html();
      reqgoodsAdd(this.form).then((res) => {
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
    },
    //查看一条具体的数据
    look(id) {
      reqgoodsDetail({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.specsattr = this.form.specsattr.split(",");
        //返回的form没有img ，自己定义一个接受数据
        this.imgUrl = this.$preImg + res.data.list.img;
        //后端需要id  这个form 没有， 这样在点击完编辑后，就把这条数据的信息放到form上
        this.form.id = id;
        //计算二级分类的列表
        this.secondCateList = this.cateList.find(
          (item) => item.id == this.form.first_cateid
        ).children;
        //计算属性列表
        this.attrList = this.specList.find(
          (item) => item.id == this.form.specsid
        ).attrs;
        
      });
    },
    //点击修改
    update() {
      reqgoodsUpdate(this.form).then((res) => {
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

  mounted() {
    //如果没有分类就请求
    if (this.cateList.length == 0) {
      this.reqCateList();
    }

    //请求全部的规格
    this.reqSpecList(true);
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