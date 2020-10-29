<template>
  <div class="mvs-container">
    <div class="filter-wrap">
      <div class="seciton-wrap">
        <span class="section-type">地区:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span class="title" :class="{'active':area=='全部'}" @click="area='全部'">全部</span>
          </li>
          <li class="tab">
            <span class="title" :class="{'active':area=='内地'}" @click="area='内地'">内地</span>
          </li>
          <li class="tab">
            <span class="title" :class="{'active':area=='港台'}" @click="area='港台'">港台</span>
          </li>
          <li class="tab">
            <span class="title" :class="{'active':area=='欧美'}" @click="area='欧美'">欧美</span>
          </li>
          <li class="tab">
            <span class="title" :class="{'active':area=='日本'}" @click="area='日本'">日本</span>
          </li>
          <li class="tab">
            <span class="title" :class="{'active':area=='韩国'}" @click="area='韩国'">韩国</span>
          </li>
        </ul>
      </div>
      <div class="type-wrap">
        <span class="type-type">类型:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span class="title" :class="{'active':type=='全部'}" @click="type='全部'">全部</span>
          </li>
          <li class="tab">
            <span class="title" :class="{'active':type=='官方版'}" @click="type='官方版'">官方版</span>
          </li>
          <li class="tab">
            <span class="title" :class="{'active':type=='原声'}" @click="type='原声'">原声</span>
          </li>
          <li class="tab">
            <span class="title" :class="{'active':type=='现场版'}" @click="type='现场版'">现场版</span>
          </li>
          <li class="tab">
            <span class="title" :class="{'active':type=='网易出品'}" @click="type='网易出品'">网易出品</span>
          </li>
        </ul>
      </div>
      <div class="order-wrap">
        <span class="order-type">排序:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span class="title" :class="{'active':order=='上升最快'}" @click="order='上升最快'">上升最快</span>
          </li>
          <li class="tab">
            <span class="title" :class="{'active':order=='最热'}" @click="order='最热'">最热</span>
          </li>
          <li class="tab">
            <span class="title"  :class="{'active':order=='最新'}" @click="order='最新'">最新</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="mvs">
      <div class="items">
        <div class="item" @click="toMv(item.id)" v-for="item in mvsList" :key="item.id">
          <div class="img-wrap">
            <img :src="item.cover" alt="" />
            <div class="play_count">
              <i class="el-icon-headset"></i>{{ tranNum(item.playCount) }}
            </div>
          </div>
          <div class="info-wrap">
            <div class="name">{{ item.name }}</div>
            <div class="singer">{{ item.artists[0].name }}</div>
          </div>
        </div>
        </div>
      </div>

    <el-pagination
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="page"
      :page-size="5"
      :limit="limit"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "mvs",
  data() {
    return {
      mvsList:[],
      total: 20,
      page: 1,
      limit: 8,
      area: '全部',
      type: '全部',
      order: '上升最快',
    };
  },
  created() {
    this.showMvs();
  },
  watch: {
    area(){
      this.page = 1;
      this.showMvs ()
    },
    type(){
      this.page = 1;
      this.showMvs ()
    },
    order(){
      this.page = 1;
      this.showMvs ()
    }
  },
  methods: {
    showMvs (){
      this.axios({
        url: 'https://autumnfish.cn/mv/all',
        method: 'get',
        params: {
          area:this.area,
          type:this.type,
          order:this.order,
          limit:this.limit,
          offset:(this.page - 1) * 8
        }
      }).then(res=>{
        this.mvsList = res.data.data;
      })
    },
    tranNum(num) {
      let numStr = num.toString();
      if (numStr.length <= 5) {
        return num;
      } else return numStr.slice(0, -4) + "万";
    },
    toMv(id) {
      this.$router.push(`/mv?id=${id}`);
    },
    handleCurrentChange(val) {
      this.page = val;
      this.showMvs();
    },
  },
};
</script>

<style >
.mvs-container {
  display: flex;
  padding-top: 20px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 200px;
}
.mvs-container .filter-wrap {
  width: 1100px;
}
.mvs-container .filter-wrap > div {
  margin-bottom: 30px;
  vertical-align: baseline;
  display: flex;
  align-items: center;
}

.mvs-container .filter-wrap > div span {
  font-size: 14px;
  height: 100%;
}

.mvs-container .filter-wrap > div span.title {
  margin: 20px;
  color: gray;
  cursor: pointer;
  padding: 5px 20px;
}

.mvs-container .filter-wrap > div span.title.active {
  color: #dd6d60;
  background-color: #fcf6f5;
  border-radius: 20px;
}

.mvs-container .filter-wrap > div span.title::before {
  content: "", pos;
}

.mvs-container .filter-wrap > div ul {
  display: flex;
}

.mvs-container .filter-wrap > div ul li:not(:last-child) {
  border-right: 1px solid #f2f2f1;
}
.mvs-container .mvs {
  width: 1100px;
}
.mvs-container .mvs .items {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.mvs-container .mvs .items .item {
  width: 250px;
  cursor: pointer;
  margin-right: 25px;
  margin-bottom: 30px;
}

.mvs-container .mvs .items .item .img-wrap {
  width: 100%;
  position: relative;
}

.mvs-container .mvs .items .item .img-wrap img {
  width: 100%;
  border-radius: 5px;
}

.mvs-container .mvs .items .item .img-wrap .play_count {
  height: 24px;
  font-size: 12px;
  line-height: 24px;
  padding-right: 10px;
  color: #fff;
  width: 50%;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.6)
  );
  position: absolute;
  top: 0;
  right: 0;
  text-align: end;
}
.mvs-container .mvs .items .item .img-wrap .play_count .el-icon-headset {
  margin-right: 5px;
}

.mvs-container .mvs .items .item .info-wrap .name {
  font-size: 15px;
}

.mvs-container .mvs .items .item .info-wrap .singer {
  font-size: 14px;
  color: #c5c5c5;
}

</style>
