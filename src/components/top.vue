<template>
  <div class="top">
    <h1>XX音乐</h1>
    <div class="top_box">
      <div class="top_left">
        <div class="top_btns">
          <span class="iconfont">&#xe61c;</span>
          <span class="iconfont" @click="test">&#xe61b;</span>
        </div>
        <el-input 
            size="mini" 
            placeholder="搜索音乐" 
            suffix-icon="el-icon-search"
            v-model="searchValue"
            @keyup.enter.native="search"
        >
        </el-input>
      </div>
      <div class="user">
        <img src="../assets/images/avatar.jpg" />
        <span class="uname">_proto</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            searchValue:''
        }
    },
    methods: {
        search(){
            if(this.searchValue.length == 0)return;
            this.$router.push('/result?keyword='+this.searchValue)
        },
        test(){
          this.axios({
            url: 'http://localhost:8080/MyReservation/showUser',
            method: 'get'
          }).then(res=>{
            console.log(res)
          })
        }
    }
};
</script>

<style>
.top {
  height: 50px;
  background-color: #c62f2f;
  color: #fff;
  display: flex;
  align-items: center;
}
h1 {
  font-size: 24px;
  padding-left: 10px;
  width: 190px;
}
.top_box {
  height: 100%;
  flex: 1;
  display: flex;
  justify-content: space-between;
}
.top_box .top_left {
  display: flex;
  align-items: center;
}
.top_box .top_left .top_btns span {
    font-size: 14px;
    padding: 4px;
    border: 0.1px solid #A72727;
    cursor: pointer;
}
.top_box .top_left .top_btns span:first-child {
    border-right: none;
}
.top_box .top_left .el-input {
    margin-left: 20px;
}
.top_left .el-input__suffix:hover {
  cursor: pointer;
  color: #fff;
}
.el-input__inner {
    color: #fff!important;
    border-radius: 20px!important;
    background-color: #A82828!important;
    border: none!important;
}
.top_box .user {
  padding: 0 10px;
  width: 150px;
  display: flex;
  align-items: center;
  font-size: 14px;
}
.top_box .user img {
  border-radius: 50%;
  width: 30px;
  margin-right: 10px;
}
</style>