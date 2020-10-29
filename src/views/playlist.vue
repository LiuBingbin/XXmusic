<template>
  <div class="playlist-container">
    <div class="top-wrap">
      <div class="img-wrap">
        <img :src="playlist.coverImgUrl" alt="" />
      </div>
      <div class="info-wrap">
        <p class="title">{{ playlist.name }}</p>
        <div class="author-wrap">
          <img class="avatar" :src="playlist.creator?playlist.creator.avatarUrl:''" alt="" />
          <span class="name">{{ playlist.creator?playlist.creator.nickname:'' }}</span>
          <span class="time">{{ tranDate(playlist.createTime) }} 创建</span>
        </div>
        <div class="play-wrap">
          <span class="iconfont icon-circle-play"></span>
          <span class="text">播放全部</span>
        </div>
        <div class="tag-wrap">
          <span class="title">标签:</span>
          <ul>
            <li v-for="(item,index) in playlist.tags" :key="index">{{ item }}</li>
          </ul>
        </div>
        <div class="desc-wrap">
          <span class="title">简介:</span>
          <span class="desc"
            >{{ playlist.description }}</span
          >
        </div>
      </div>
    </div>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲列表" name="1">
        <table class="el-table playlit-table">
          <thead>
            <th></th>
            <th></th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
          </thead>
          <tbody>
            <tr class="el-table__row" v-for="(item,index) in playlist.tracks" :key="item.id" @dblclick="playMusic(item.id)">
              <td>{{ index+1 }}</td>
              <td>
                <div class="img-wrap">
                  <img :src="item.al.picUrl" alt="" />
                </div>
              </td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <span>{{ item.name }}</span>
                  </div>
                  <span>{{ item.alia[0] }}</span>
                </div>
              </td>
              <td>{{ item.ar[0].name }}</td>
              <td>{{ item.al.name }}</td>
              <td>{{ tranDuration(item.dt) }}</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>
      <el-tab-pane label="评论(66)" name="2">
        <!-- 精彩评论 -->
        <div class="comment-wrap">
          <p class="title">精彩评论<span class="number">({{ hotCount }})</span></p>
          <div class="comments-wrap">
            <div class="item" v-for="item in hotComment" :key="item.id">
              <div class="icon-wrap">
                <img :src="item.user.avatarUrl" alt="" />
              </div>
              <div class="content-wrap">
                <div class="content">
                  <span class="name">{{ item.user.nickname }}：</span>
                  <span class="comment">{{ item.content }}</span>
                </div>
                <div class="re-content" v-if="item.beReplied.length!=0">
                  <span class="name">{{ item.beReplied[0].user.nickname }}：</span>
                  <span class="comment">{{ item.beReplied[0].content }}</span>
                </div>
                <div class="date">2020-02-12 17:26:11</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 最新评论 -->
        <div class="comment-wrap">
          <p class="title">最新评论<span class="number">({{ total }})</span></p>
          <div class="comments-wrap">
            <div class="item" v-for="item in comments" :key="item.id">
              <div class="icon-wrap">
                <img :src="item.user.avatarUrl" alt="" />
              </div>
              <div class="content-wrap">
                <div class="content">
                  <span class="name">{{ item.user.nickname }}：</span>
                  <span class="comment">{{ item.content }}</span>
                </div>
                <div class="re-content" v-if="item.beReplied.length!=0">
                  <span class="name">{{ item.beReplied[0].user.nickname }}：</span>
                  <span class="comment">{{ item.beReplied[0].content }}</span>
                </div>
                <div class="date">2020-02-12 17:26:11</div>
              </div>
            </div>
            </div>
            </div>
        <!-- 分页器 -->
        <el-pagination
          @current-change="handleCurrentChange"
          background
          layout="prev, pager, next"
          :total="total"
          :current-page="page"
          :page-size="10"
        >
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "playlist",
  data() {
    return {
      activeIndex: "1",
      // 总条数
      total: 0,
      // 页码
      page: 1,
      playlist:{},
      hotComment:[],
      hotCount:0,
      comments:[]
    };
  },
  created(){
    this.getPlaylist(),
    this.getHotComment(),
    this.getComment()
  },
  methods: {
    tranDate(item) {
      let date = new Date(item);
      return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
    },
    getComment() {
      this.axios({
            url: 'https://autumnfish.cn/comment/playlist',
            method: 'get',
            params: {
                id:this.$route.query.id,
                limit:10,
                offset:(this.page-1)*10
            }
        }).then(res=>{
            this.comments = res.data.comments;
            this.total = res.data.total
        })
    },
    getHotComment() {
      this.axios({
            url: 'https://autumnfish.cn/comment/hot',
            method: 'get',
            params: {
                id:this.$route.query.id,
                type:2
            }
        }).then(res=>{
            this.hotComment = res.data.hotComments;
            this.hotCount = res.data.total
        })
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
    getPlaylist() {
        this.axios({
            url: 'https://autumnfish.cn/playlist/detail',
            method: 'get',
            params: {
                id:this.$route.query.id
            }
        }).then(res=>{
            this.playlist = res.data.playlist
        })
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getComment()
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

<style >
.playlist-container {
  width: 1100px;
  margin: 0 auto 200px;
  padding-top: 40px;
}

.playlist-container .top-wrap {
  display: flex;
}

.playlist-container .top-wrap span {
  font-size: 17px;
}

.playlist-container .top-wrap .img-wrap {
  margin-right: 30px;
}

.playlist-container .top-wrap .img-wrap img {
  width: 230px;
  height: 230px;
}

.playlist-container .top-wrap .info-wrap .title {
  margin-bottom: 20px;
}

.playlist-container .top-wrap .info-wrap .author-wrap {
  display: flex;
  align-items: center;
  margin-bottom: 25px;
}

.playlist-container .top-wrap .info-wrap .author-wrap img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 10px;
}

.playlist-container .top-wrap .info-wrap .author-wrap .name {
  margin-right: 10px;
}

.playlist-container .top-wrap .info-wrap .author-wrap .time {
  font-size: 14px;
}

.playlist-container .top-wrap .info-wrap .play-wrap {
  width: 120px;
  height: 35px;
  border-radius: 4px;
  background: linear-gradient(to right, #e85e4d, #c6483c);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 25px;
}

.playlist-container .top-wrap .info-wrap .play-wrap span {
  color: white;
}

.playlist-container .top-wrap .info-wrap .play-wrap span.iconfont {
  margin-right: 8px;
}

.playlist-container .top-wrap .info-wrap .play-wrap span.text {
  font-size: 16px;
}

.playlist-container .top-wrap .info-wrap .tag-wrap {
  display: flex;
  margin-bottom: 15px;
}

.playlist-container .top-wrap .info-wrap .tag-wrap span {
  margin: 0;
}

.playlist-container .top-wrap .info-wrap .tag-wrap ul {
  display: flex;
  align-items: center;
}

.playlist-container .top-wrap .info-wrap .tag-wrap li {
  font-size: 15px;
}

.playlist-container .top-wrap .info-wrap .tag-wrap li:not(:last-child)::after {
  content: "/";
  margin: 0 4px;
}
.playlist-container .top-wrap .info-wrap .desc-wrap{
  height: 150px;
  overflow: auto;
}
.playlist-container .top-wrap .info-wrap .desc-wrap span:last-child {
  font-size: 15px;
}

.playlist-container .top-wrap .info-wrap span:first-child {
  margin-right: 10px;
}

.playlist-container .comment-wrap {
  margin-bottom: 70px;
}

.playlist-container .comment-wrap .title {
  font-size: 20px;
}

.playlist-container .comment-wrap .title .number {
  color: black;
  font-size: 18px;
}

.playlist-container .comment-wrap .item {
  display: flex;
  padding-top: 20px;
}

.playlist-container .comment-wrap .item .icon-wrap {
  margin-right: 15px;
}

.playlist-container .comment-wrap .item .icon-wrap img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.playlist-container .comment-wrap .item:not(:last-child) .content-wrap {
  border-bottom: 1px solid #f2f2f1;
}

.playlist-container .comment-wrap .item .date {
  color: #bebebe;
  font-size: 14px;
}

.playlist-container .comment-wrap .item .content-wrap {
  padding-bottom: 20px;
  flex: 1;
}

.playlist-container .comment-wrap .item .content-wrap .name {
  color: #517eaf;
  font-size: 14px;
}

.playlist-container .comment-wrap .item .content-wrap .comment {
  font-size: 14px;
}

.playlist-container .comment-wrap .item .content-wrap .content,
.playlist-container .comment-wrap .item .content-wrap .re-content {
  margin-bottom: 10px;
}

.playlist-container .comment-wrap .item .content-wrap .re-content {
  padding: 10px;
  background-color: #e6e5e6;
  border-radius: 5px;
}

.playlist-container .el-table {
  border-bottom: none;
  border-collapse: collapse;
}

.playlist-container .el-table.playlit-table th:nth-child(2) {
  width: 130px;
}

.playlist-container .el-table.playlit-table th:nth-child(3) {
  width: 300px;
}

.playlist-container .el-table.playlit-table th:nth-child(4) {
  width: 200px;
}

.playlist-container .el-table tbody {
  border-bottom: none;
}

.playlist-container .el-table td {
  border-bottom: none;
}

.playlist-container .el-table td:first-child {
  padding-left: 10px;
}

.playlist-container .el-table th {
  font-weight: normal;
}

.playlist-container .el-table th:first-child {
  width: 50px;
}

.playlist-container .el-table th:nth-child(2) {
  width: 300px;
}

.playlist-container .el-table th:nth-child(3) {
  width: 200px;
}

.playlist-container .el-table .song-wrap > span {
  margin-top: 20px;
  display: inline-block;
  color: #bebebe;
}

.playlist-container .el-table .song-wrap .icon-mv {
  padding-left: 5px;
  color: #dd6d60;
}

.playlist-container .el-table .img-wrap {
  position: relative;
  width: 70px;
  height: 70px;
}

.playlist-container .el-table .img-wrap img {
  width: 70px;
  height: 70px;
  border-radius: 5px;
}

.playlist-container .el-table .img-wrap .icon-play {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 25px;
  height: 25px;
  color: #dd6d60;
  font-size: 12px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.8);
}

.playlist-container .el-table .img-wrap .icon-play::before {
  transform: translateX(1px);
}

.playlist-container .el-table tr:nth-child(2n) {
  background-color: #fafafa;
}

.playlist-container .el-table tr:hover {
  background-color: #f5f7fa;
}
.playlist-container .el-pagination {
  text-align: center;
}
</style>
