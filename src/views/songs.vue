<template>
  <div class="songs_container">
    <div class="songs">
      <div class="tag">
        <ul>
          <li :class="{ active: tag == 0 }" @click="tag = 0">全部</li>
          <li :class="{ active: tag == 7 }" @click="tag = 7">华语</li>
          <li :class="{ active: tag == 96 }" @click="tag = 96">欧美</li>
          <li :class="{ active: tag == 8 }" @click="tag = 8">日本</li>
          <li :class="{ active: tag == 16 }" @click="tag = 16">韩国</li>
        </ul>
      </div>
      <el-table
        ref="singleTable"
        :data="songsList"
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column type="index" width="45"> </el-table-column>
        <el-table-column width="80">
          <template slot-scope="scope">
            <div class="pic_box">
              <img :src="scope.row.album.picUrl" />
              <span class="iconfont" @click="playMusic(scope.row.id)">&#xe6a6;</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column property="name" label="音乐标题" width="300">
        </el-table-column>
        <el-table-column property="artists[0].name" label="歌手" width="250">
        </el-table-column>
        <el-table-column property="album.name" label="专辑" width="250">
        </el-table-column>
        <el-table-column property="duration" label="时长" width="80">
          <template slot-scope="scope">{{ tranDuration(scope.row.duration) }}</template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tag: 0,
      songsList: [],
    };
  },
  created() {
    this.showSongs();
  },
  watch: {
    tag(){
      this.showSongs();
    }
  },
  methods: {
    showSongs() {
      this.axios({
        url: "https://autumnfish.cn/top/song",
        method: "get",
        params: {
          type: this.tag,
        },
      }).then((res) => {
        this.songsList = res.data.data;
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
    }
  },
};
</script>

<style>
.songs_container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 200px;
}
.songs {
  width: 1000px;
}
.songs .tag {
  line-height: 50px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
}
.songs .tag li.active {
  color: #000;
  border-bottom: 1px solid;
}
.songs .pic_box {
  position: relative;
  width: 50px;
  height: 50px;
}
.songs .pic_box img {
  height: 100%;
}
.songs .pic_box .iconfont {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;
}
.songs .pic_box .iconfont:hover {
  background-color: rgba(0, 0, 0, 0.6);
}
.songs .el-table tr:nth-child(odd) {
  background-color: #fafafa;
}
.songs .el-table tr:nth-child(even) {
  background-color: #f5f5f7;
}
.songs .el-table td {
  font-size: 12px;
}
</style>