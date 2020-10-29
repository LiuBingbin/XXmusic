<template>
  <div class="discovery">
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="(item, index) in bannerList" :key="index">
        <img :src="item.imageUrl" alt="" />
      </el-carousel-item>
    </el-carousel>
    <div class="playlist_container">
      <h3>推荐歌单</h3>
      <div class="playlist">
        <ul>
          <li v-for="item in playlist" :key="item.id"  @click="toPlaylist(item.id)">
            <div class="playlist_box">
              <img :src="item.picUrl" alt="" />
              <div class="detail">
                <p>{{ item.copywriter }}</p>
              </div>
              <span class="iconfont">&#xe6a6;</span>
            </div>
            <p>{{ item.name }}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="songlist_container">
      <h3>最新音乐</h3>
      <div class="songlist">
        <ul>
          <li v-for="(item,index) of songlist.slice(0, 5)" :key="item.id">
            <span class="num">{{ '0'+(index+1) }}</span>
            <div class="songCover">
              <img :src="item.picUrl" alt="" />
              <span class="iconfont" @click="playMusic(item.id)">&#xe6a6;</span>
            </div>
            <div class="message">
              <span class="name">{{ item.name }}</span>
              <span class="singer">{{ item.song.artists[0].name }}</span>
            </div>
          </li>
        </ul>
        <ul>
          <li v-for="(item,index) of songlist.slice(5,)" :key="item.id">
            <span class="num">{{ ('0'+(index+6)).substring(('0'+(index+6)).length-2,) }}</span>
            <div class="songCover">
              <img :src="item.picUrl" alt="" />
              <span class="iconfont" @click="playMusic(item.id)">&#xe6a6;</span>
            </div>
            <div class="message">
              <span class="name">{{ item.name }}</span>
              <span class="singer">{{ item.song.artists[0].name }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="mvlist_container">
      <h3>推荐MV</h3>
      <div class="mvlist">
        <ul>
          <li v-for="item in mvlist" :key="item.id" @click="toMv(item.id)">
            <div class="mvlist_box">
              <img :src="item.picUrl" alt="">
              <div class="detail"><p>{{ item.copywriter }}</p></div>
            </div>
            <p class="name">{{ item.name }}</p>
            <p class="singer">{{ artistsStr(item) }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bannerList: [],
      playlist: [],
      songlist: [],
      mvlist: []
    };
  },
  created() {
    this.showBanner();
    this.showPlaylist();
    this.showSonglist();
    this.showMvlist();
  },
  methods: {
    toMv(id) {
      this.$router.push(`/mv?id=${id}`);
    },
    toPlaylist(id) {
      this.$router.push(`/playlist?id=${id}`);
    },
    showBanner() {
      this.axios({
        url: "https://autumnfish.cn/banner",
        method: "get",
      }).then((res) => {
        this.bannerList = res.data.banners;
      });
    },
    showPlaylist() {
      this.axios({
        url: "https://autumnfish.cn/personalized",
        method: "get",
        params: {
          limit: 10,
        },
      }).then((res) => {
        this.playlist = res.data.result;
      });
    },
    showSonglist() {
      this.axios({
        url: "https://autumnfish.cn/personalized/newsong",
        method: "get"
      }).then((res) => {
        this.songlist = res.data.result;
      });
    },
    showMvlist() {
      this.axios({
        url: "https://autumnfish.cn/personalized/mv",
        method: "get"
      }).then((res) => {
        this.mvlist = res.data.result;
      });
    },
    playMusic(id) {
      this.axios({
        url: "https://autumnfish.cn/song/url",
        method: "get",
        params:{
          id
        }
      }).then(res=>{
        let url = res.data.data[0].url;
        this.$parent.songUrl= url;
      })
    },
    artistsStr(item) {
      let arr = [];
      item.artists.forEach(it=>{
        arr.push(it.name)
      })
      return arr.join(' / ');
    }
  },
};
</script>

<style>
.discovery {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.el-carousel {
  margin-top: 20px;
  width: 1000px;
}
.el-carousel img {
  width: 100%;
}
.playlist_container {
  width: 1000px;
  margin-bottom: 50px;
}
h3 {
  line-height: 45px;
  font-weight: normal;
  border-bottom: 1px solid #ccc;
}
.playlist_container .playlist {
  width: 100%;
}
.playlist_container .playlist ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.playlist_container .playlist li {
  width: 180px;
  height: 230px;
  margin: 20px 0;
  cursor: pointer;
}
.playlist li .playlist_box {
  position: relative;
}
.playlist li img {
  width: 100%;
}
.playlist li .playlist_box:hover .detail {
  max-height: 180px;
}
.playlist li p {
  font-size: 14px;
}
.discovery .detail {
  width: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  color: #fff;
  overflow: hidden;
  position: absolute;
  top: 0;
  max-height: 0;
  transition: max-height 0.5s;
}
.discovery .detail p {
  padding: 5px;
}
.playlist li .playlist_box .iconfont {
  color: #fff;
  position: absolute;
  right: 10px;
  bottom: 10px;
  font-size: 25px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  display: none;
}
.playlist li .playlist_box .iconfont:hover {
  background-color: rgba(0, 0, 0, 0.6);
}
.playlist li .playlist_box:hover .iconfont {
  display: block;
}

.songlist_container {
  width: 1000px;
  margin-bottom: 50px;
  box-sizing: border-box;
}
.songlist_container .songlist {
  width: 100%;
  display: flex;
  margin-top: 20px;
}
.songlist ul{
  border: 1px solid #ccc;
}
.songlist ul:first-child{
  border-right: none;
}
.songlist li {
  width: 500px;
  height: 60px;
  display: flex;
  align-items: center;
  font-size: 14px;
}
.songlist li:nth-child(odd) {
  background-color: #fafafa;
}
.songlist li:nth-child(even) {
  background-color: #f5f5f7;
}
.songlist li:hover {
  background-color: #e6e7ea;
}
.songlist .num {
  width: 35px;
  text-align: center;
  color: #5e5e5e;
}
.songlist .songCover {
  width: 40px;
  position: relative;
  cursor: pointer;
}
.songlist .songCover img {
  width: 100%;
}
.songlist .songCover .iconfont {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
}
.songlist .songCover .iconfont:hover {
  background-color: rgba(0, 0, 0, 0.6);
}
.songlist .message {
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  line-height: 20px;
}
.songlist .message .singer {
  color: #5e5e5e;
  font-size: 12px;
}

.mvlist_container {
  width: 1000px;
  margin-bottom: 200px;
}
.mvlist_container .mvlist ul{
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.mvlist_container .mvlist li {
  width: 230px;
  position: relative;
  font-size: 12px;
  cursor: pointer;
}
.mvlist li .mvlist_box img {
  width: 100%;
}
.mvlist li .mvlist_box:hover .detail {
  max-height: 180px;
}
.mvlist li .singer {
  width: 100%;
  color: #5e5e5e;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

}
</style>