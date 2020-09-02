<template>
  <div>
    <el-container class="con">
      <el-aside width="150px">
        <!-- 左边导航 -->
        <el-menu
          unique-opened
          default-active="/"
          class="el-menu-vertical-demo"
          router
          background-color="#20222A"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="/">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>系统设置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/menu">菜单管理</el-menu-item>
              <el-menu-item index="/role">角色管理</el-menu-item>
              <el-menu-item index="/manage">管理员管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商城管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/classify">商品分类</el-menu-item>
              <el-menu-item index="/spec">商品规格</el-menu-item>
              <el-menu-item index="/goods">商品管理</el-menu-item>
              <el-menu-item index="/member">会员管理</el-menu-item>
              <el-menu-item index="/banner">轮播图管理</el-menu-item>
              <el-menu-item index="/seckill">秒杀活动</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="con-box">
            <div class="name">{{info.username}}</div>
            <el-button class="btn" type="primary" @click="logout">退出</el-button>
          </div>
        </el-header>
        <el-main>
          <!-- 面包屑 -->
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <!-- 二级路由出口 -->
          <router-view class="view"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import {mapGetters,mapActions} from "vuex"

export default {
  computed: {
    ...mapGetters({
      info: "user/info",
    }),
  },
  methods: {
    ...mapActions({
      changeInfoAction: "user/changeInfoAction",
    }),
    logout() {
      this.changeInfoAction({});
      this.$router.push("/login");
    },
  },
  mounted() {
    console.log(store);
  },
};
</script>
<style scoped>
.con {
  height: 100vh;
}
.el-aside {
  background: #20222a;
}
.el-header {
  background: #b3c0d1;
}
.view {
  padding-top: 30px;
}
.con-box {
  float: right;
}
.name {
  line-height: 60px;
  color: #ffffff;
  float: left;
  margin-right: 20px;
}
.btn {
  float: left;
  margin-top: 10px;
}
</style>