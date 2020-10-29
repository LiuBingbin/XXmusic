<template>
  <div class="result-container">
    <div class="title-wrap">
      <h2 class="title">{{ keyword }}</h2>
      <span class="sub-title">找到{{ songCount }}条歌曲、{{ playlistCount }}个歌单、{{ mvCount }}个MV</span>
    </div>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲" name="songs">
        <table class="el-table">
          <thead>
            <th></th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
          </thead>
          <tbody>
            <tr
              class="el-table__row"
              v-for="(item, index) in songs"
              :key="item.id"
               @dblclick="playMusic(item.id)"
            >
              <td>{{ index + 1 }}</td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <span>{{ item.name }}</span>
                  </div>
                  <span>{{ transNamesStr(item) }}</span>
                </div>
              </td>
              <td>{{ item.artists[0].name }}</td>
              <td>{{ item.album.name }}</td>
              <td>{{ tranDuration(item.duration) }}</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>
      <el-tab-pane label="歌单" name="lists">
        <div class="items">
          <div class="item" v-for="item in playlists" :key="item.id" @click="toPlaylist(item.id)">
            <div class="img-wrap">
              <div class="play_count">
                <i class="el-icon-headset"></i>{{ tranNum(item.playCount) }}
              </div>
              <img :src="item.coverImgUrl" alt="" />
            </div>
            <p class="name">{{ item.name }}</p>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="MV" name="mv">
        <div class="items mv">
          <div class="item" v-for="item in mvs" :key="item.id" @click="toMv(item.id)">
            <div class="img-wrap">
              <img :src="item.cover" alt="" />
              <div class="play_count">
                <i class="el-icon-headset"></i>{{ tranNum(item.playCount) }}
              </div>
              <span class="time">{{ tranDuration(item.duration) }}</span>
            </div>
            <div class="info-wrap">
              <div class="name">{{ item.name }}</div>
              <div class="singer">{{ item.artists[0].name }}</div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "result",
  data() {
    return {
      songCount:0,
      playlistCount:0,
      mvCount:0,
      activeIndex: "songs",
      keyword: this.$route.query.keyword,
      songs: [],
      playlists: [],
      mvs: [],
    };
  },
  created() {
    this.showResult();
  },
  methods: {
    toMv(id) {
      this.$router.push(`/mv?id=${id}`);
    },
    toPlaylist(id) {
      this.$router.push(`/playlist?id=${id}`);
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
    tranNum(num) {
      let numStr = num.toString();
      if (numStr.length <= 5) {
        return num;
      } else return numStr.slice(0, -4) + "万";
    },
    transNamesStr(item) {
      if (item.transNames) {
        return item.transNames[0];
      }
    },
    showResult() {
      this.axios({
        url: "https://autumnfish.cn/search",
        method: "get",
        params: {
          keywords: this.keyword,
          limit: 30,
          offset: 0,
          type: 1,
        },
      }).then((res) => {
        this.songs = res.data.result.songs;
        this.songCount = res.data.result.songCount;
      });
      this.axios({
        url: "https://autumnfish.cn/search",
        method: "get",
        params: {
          keywords: this.keyword,
          limit: 30,
          offset: 0,
          type: 1000,
        },
      }).then((res) => {
        this.playlists = res.data.result.playlists;
        this.playlistCount = res.data.result.playlistCount;
      });
      this.axios({
        url: "https://autumnfish.cn/search",
        method: "get",
        params: {
          keywords: this.keyword,
          limit: 30,
          offset: 0,
          type: 1004,
        },
      }).then((res) => {
        this.mvs = res.data.result.mvs;
        this.mvCount = res.data.result.mvCount;
      });
    },
    tranDuration(item) {
      return (
        ("0" + parseInt((item / 1000) / 60)).slice(
          ("0" + parseInt((item / 1000) / 60)).length - 2
        ) +
        ":" +
        ("0" + parseInt((item / 1000) % 60)).slice(
          ("0" + parseInt((item / 1000) % 60)).length - 2
        )
      );
    },
  },
};
</script>

<style >
.result-container {
  width: 1100px;
  margin: 0 auto 200px;
}
.result-container .title-wrap {
  display: flex;
  align-items: flex-end;
  margin: 30px 0;
}

.result-container .title-wrap .title {
  margin-right: 10px;
}

.result-container .title-wrap .sub-title {
  font-size: 15px;
  color: #bebebe;
}

.result-container .el-tabs__item {
  font-size: 18px;
}
.el-tabs__active-bar {
  background-color: #c3473a;
}

.el-tabs__item:hover,
.el-tabs__item.is-active {
  color: #c3473a;
}
.result-container .el-table tr:nth-child(odd) {
  background-color: #fafafa;
}
.result-container .el-table tr:nth-child(even) {
  background-color: #f5f5f7;
}
.result-container .el-table tr:hover {
    background-color: #e6e6e6;
}
.result-container .el-table .song-wrap > span {
  color: #bebebe;
}
.result-container .el-table td,
.result-container .el-table th.is-leaf {
  border-bottom: none;
}
.result-container .el-table tr td:first-child {
  text-align: center;
}

.result-container .items {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.result-container .items .item {
  width: 200px;
  cursor: pointer;
  margin-right: 20px;
  margin-bottom: 20px;
}

.result-container .items .item .img-wrap {
  width: 100%;
  position: relative;
}

.result-container .items .item .img-wrap > .icon-play {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  color: #dd6d60;
  font-size: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.8);
  opacity: 0;
}

.result-container .items .item .img-wrap > .icon-play::before {
  transform: translateX(3px);
}

.result-container .items .item .img-wrap:hover > .icon-play {
  opacity: 1;
}

.result-container .items .item .img-wrap img {
  width: 100%;
  border-radius: 5px;
}

.result-container .items .item .img-wrap .play_count {
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

.result-container .items .item .img-wrap .play_count .el-icon-headset {
  margin-right: 5px;
}

.result-container .items .item .img-wrap .time {
  position: absolute;
  bottom: 5px;
  right: 5px;
  color: white;
  font-size: 15px;
}

.result-container .items .item .name {
  font-size: 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.result-container .items .item .singer {
  font-size: 14px;
  color: #c5c5c5;
}

.result-container .items.mv .item {
  width: 250px;
}
</style>
