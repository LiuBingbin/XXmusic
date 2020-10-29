<template>
  <div class="playlists_container">
    <div class="firstlist_container">
      <div class="firstlist" @click="toPlaylist(firstlist.id)">
        <img :src="firstlist.coverImgUrl" alt="" />
        <div class="detail">
          <span>精品歌单</span>
          <p class="name">{{ firstlist.name }}</p>
          <p class="description">
            {{ firstlist.description }}
          </p>
        </div>
      </div>
      <div
        class="mask"
        :style="'backgroundImage:url(' + firstlist.coverImgUrl + ');'"
      ></div>
    </div>
    <div class="tag">
      <ul>
        <li @click="catValue = '全部'">全部</li>
        |
        <li @click="catValue = '欧美'">欧美</li>
        |
        <li @click="catValue = '华语'">华语</li>
        |
        <li @click="catValue = '流行'">流行</li>
        |
        <li @click="catValue = '说唱'">说唱</li>
        |
        <li @click="catValue = '摇滚'">摇滚</li>
        |
        <li @click="catValue = '民谣'">民谣</li>
        |
        <li @click="catValue = '电子'">电子</li>
        |
        <li @click="catValue = '轻音乐'">轻音乐</li>
        |
        <li @click="catValue = '影视原声'">影视原声</li>
        |
        <li @click="catValue = 'ACG'">ACG</li>
        |
        <li @click="catValue = '怀旧'">怀旧</li>
        |
        <li @click="catValue = '治愈'">治愈</li>
        |
        <li @click="catValue = '旅行'">旅行</li>
      </ul>
    </div>
    <div class="playlists">
      <ul>
        <li v-for="item in playlists" :key="item.id" @click="toPlaylist(item.id)">
          <div class="playlists_box">
            <img :src="item.coverImgUrl" alt="" />
            <span class="iconfont">&#xe6a6;</span>
            <div class="play_count">
              <i class="el-icon-headset"></i>{{ tranNum(item.playCount) }}
            </div>
          </div>
          <p>{{ item.name }}</p>
        </li>
      </ul>
    </div>
    <el-pagination
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next"
      :current-page="page"
      :page-size="10"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      firstlist: {},
      playlists: [],
      catValue: "全部",
      total: 0,
      page: 1,
    };
  },
  watch: {
    catValue() {
      this.page = 0;
      this.showFirstlist();
      this.showPlaylists();
    },
  },
  created() {
    this.showFirstlist();
    this.showPlaylists();
  },
  methods: {
    toPlaylist(id) {
      this.$router.push(`/playlist?id=${id}`);
    },
    showFirstlist() {
      this.axios({
        url: "https://autumnfish.cn/top/playlist/highquality",
        method: "get",
        params: {
          limit: 1,
          offset: 0,
          cat: this.catValue,
        },
      }).then((res) => {
        this.firstlist = res.data.playlists[0];
      });
    },
    showPlaylists() {
      this.axios({
        url: "https://autumnfish.cn/top/playlist/",
        method: "get",
        params: {
          limit: 10,
          offset: (this.page - 1) * 10,
          cat: this.catValue,
        },
      }).then((res) => {
        this.playlists = res.data.playlists;
        this.total = res.data.total;
      });
    },
    handleCurrentChange(val) {
      this.page = val;
      this.showPlaylists();
    },
    tranNum(num) {
      let numStr = num.toString();
      if (numStr.length <= 5) {
        return num;
      } else return numStr.slice(0, -4) + "万";
    },
  },
};
</script>

<style>
.playlists_container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 200px;
}
.playlists_container .firstlist_container {
  margin-top: 20px;
  width: 1000px;
  height: 220px;
  position: relative;
  overflow: hidden;
}
.playlists_container .firstlist_container .mask {
  position: absolute;
  width: 100%;
  height: 100%;

  background-size: 100% 100%;
  filter: blur(15px);
}
.playlists_container .firstlist_container .firstlist {
  position: absolute;
  width: 960px;
  height: 180px;
  padding: 20px;
  display: flex;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1;
  cursor: pointer;
}
.playlists_container .firstlist img {
  height: 100%;
  margin-right: 20px;
}
.playlists_container .firstlist .detail {
  width: 800px;
}
.firstlist .detail span {
  color: #e6b87d;
  border: 2px solid #e6b87d;
  border-radius: 5px;
  padding: 0 10px;
  position: relative;
  top: 2px;
}
.firstlist .detail .name {
  color: #fff;
  font-size: 20px;
  line-height: 40px;
}
.firstlist .detail .description {
  font-size: 12px;
  color: #5e5e5e;
  width: 100%;
  height: 115px;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 7;
  overflow: hidden;
}
.tag {
  margin-top: 40px;
  width: 1000px;
}
.tag ul {
  width: 100%;
  display: flex;
  color: #5e5e5e;
}
.tag ul li {
  margin: 0 15px;
  font-size: 14px;
  cursor: pointer;
}
.tag ul li:first-child {
  margin-left: 0;
}
.tag ul li:hover {
  color: #000;
}
.playlists {
  width: 1000px;
}
.playlists ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.playlists li {
  width: 180px;
  height: 230px;
  margin: 20px 0;
  cursor: pointer;
}

.playlists li img {
  width: 100%;
}
.playlists li p {
  font-size: 14px;
}
.playlists li .playlists_box {
  position: relative;
}
.playlists li .playlists_box .iconfont {
  color: #fff;
  position: absolute;
  right: 10px;
  bottom: 10px;
  font-size: 25px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  display: none;
}
.playlists li .playlists_box .iconfont:hover {
  background-color: rgba(0, 0, 0, 0.6);
}
.playlists li .playlists_box:hover .iconfont {
  display: block;
}
.playlists li .playlists_box .play_count {
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
.playlists li .playlists_box .play_count .el-icon-headset {
  margin-right: 5px;
}

.el-pager li.active {
  background-color: #e94f4f !important;
}
.el-pager li:hover {
  color: #e94f4f !important;
}
</style>