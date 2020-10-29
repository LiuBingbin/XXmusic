<template>
  <div class="mv-container">
    <div class="mv-wrap">
      <h3 class="title">mv详情</h3>
      <!-- mv -->
      <div class="video-wrap">
        <video controls :src="url"></video>
      </div>
      <!-- mv信息 -->
      <div class="info-wrap">
        <div class="singer-info">
          <div class="avatar-wrap">
            <img :src="icon" alt="" />
          </div>
          <span class="name">{{ mvInfo.artistName }}</span>
        </div>
        <div class="mv-info">
          <h2 class="title">{{ mvInfo.name }}</h2>
          <span class="date">发布：2014-11-04</span>
          <span class="number">播放：{{ mvInfo.playCount }}次</span>
          <p class="desc">
            {{ mvInfo.desc }}
          </p>
        </div>
      </div>
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
        :limit="limit"
      >
      </el-pagination>
    </div>
    <div class="mv-recommend">
      <h3 class="title">相关推荐</h3>
      <div class="mvs">
        <div class="items">
          <div class="item" v-for="item in simiMvs" :key="item.id">
            <div class="img-wrap">
              <img :src="item.cover" alt="" />
              <div class="num-wrap">
                <div class="num">{{ tranNum(item.playCount) }}</div>
              </div>
              <span class="time">{{ tranDuration(item.duration) }}</span>
            </div>
            <div class="info-wrap">
              <div class="name">{{ item.name }}</div>
              <div class="singer">{{ item.artistName }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "mv",
  data() {
    return {
      total: 20,
      page: 1,
      limit: 10,
      url: "",
      simiMvs: [],
      mvInfo: {},
      icon:'',
      comments:[],
      hotComment:[],
      hotCount:0
    };
  },
  created() {
    this.playMv();
    this.getSimiMv();
    this.getMv();
    this.getComment()
  },
  methods: {
      tranNum(num) {
      let numStr = num.toString();
      if (numStr.length <= 5) {
        return num;
      } else return numStr.slice(0, -4) + "万";
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
    playMv() {
      this.axios({
        url: "https://autumnfish.cn/mv/url",
        method: "get",
        params: {
          id: this.$route.query.id,
        },
      }).then((res) => {
        this.url = res.data.data.url;
      });
    },
    getMv() {
      this.axios({
        url: "https://autumnfish.cn/mv/detail",
        method: "get",
        params: {
          mvid: this.$route.query.id,
        },
      }).then((res) => {
        this.mvInfo = res.data.data;
        this.axios({
          url: "https://autumnfish.cn/artists",
          method: "get",
          params: {
            id: this.mvInfo.artists[0].id,
          },
        }).then((res) => {
            this.icon = res.data.artist.picUrl
        });
      });
    },
    getSimiMv() {
      this.axios({
        url: "https://autumnfish.cn/simi/mv",
        method: "get",
        params: {
          mvid: this.$route.query.id,
        },
      }).then((res) => {
        this.simiMvs = res.data.mvs;
      });
    },
    getComment() {
      this.axios({
            url: 'https://autumnfish.cn/comment/mv',
            method: 'get',
            params: {
                id:this.$route.query.id,
                limit:10,
                offset:(this.page-1)*10
            }
        }).then(res=>{console.log(res);
            this.comments = res.data.comments;
            this.hotComment = res.data.hotComments;
            this.hotCount = this.hotComment.length;
            this.total = res.data.total
        })
    },
    handleCurrentChange(val) {
        this.page = val;
        this.getComment();
    },
  },
};
</script>

<style>
.mv-container {
  display: flex;
  width: 1100px;
  margin: 20px auto 200px;
}

.mv-container .title {
  margin-bottom: 20px;
}

.mv-container .mv-wrap {
  width: 700px;
  margin-right: 35px;
}

.mv-container .mv-wrap .date {
  margin-right: 25px;
}

.mv-container .mv-wrap .date,
.mv-container .mv-wrap .number {
  color: #bebebe;
  font-size: 14px;
}

.mv-container .mv-wrap .video-wrap {
  width: 100%;
  height: 390px;
  margin-bottom: 20px;
}

.mv-container .mv-wrap .video-wrap video {
  border-radius: 5px;
  height: 100%;
  width: 100%;
  outline: none;
}

.mv-container .mv-wrap .info-wrap {
  margin-bottom: 50px;
}

.mv-container .mv-wrap .info-wrap .singer-info {
  display: flex;
  align-items: center;
  margin-bottom: 35px;
}

.mv-container .mv-wrap .info-wrap .singer-info .avatar-wrap {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-right: 10px;
  overflow: hidden;
}

.mv-container .mv-wrap .info-wrap .singer-info .avatar-wrap img {
  height: 100%;
}

.mv-container .mv-wrap .info-wrap .mv-info .title {
  font-size: 30px;
}

.mv-container .mv-wrap .info-wrap .mv-info .desc {
  font-size: 15px;
  margin-top: 20px;
}

.mv-container .mv-wrap .comment-wrap {
  margin-bottom: 70px;
}

.mv-container .mv-wrap .comment-wrap .title {
  font-size: 25px;
}

.mv-container .mv-wrap .comment-wrap .title .number {
  color: black;
  font-size: 20px;
}

.mv-container .mv-wrap .comment-wrap .item {
  display: flex;
  padding-top: 20px;
}

.mv-container .mv-wrap .comment-wrap .item .icon-wrap {
  margin-right: 15px;
}

.mv-container .mv-wrap .comment-wrap .item .icon-wrap img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.mv-container .mv-wrap .comment-wrap .item:not(:last-child) .content-wrap {
  border-bottom: 1px solid #f2f2f1;
}

.mv-container .mv-wrap .comment-wrap .item .content-wrap {
  padding-bottom: 20px;
  flex: 1;
}

.mv-container .mv-wrap .comment-wrap .item .content-wrap .name {
  color: #517eaf;
  font-size: 14px;
}

.mv-container .mv-wrap .comment-wrap .item .content-wrap .comment {
  font-size: 14px;
}

.mv-container .mv-wrap .comment-wrap .item .content-wrap .content,
.mv-container .mv-wrap .comment-wrap .item .content-wrap .re-content {
  margin-bottom: 10px;
}

.mv-container .mv-wrap .comment-wrap .item .content-wrap .re-content {
  padding: 10px;
  background-color: #e6e5e6;
  border-radius: 5px;
}

.mv-container .mv-recommend {
  flex: 1;
}

.mv-container .mv-recommend .mvs .items {
  display: flex;
  flex-wrap: wrap;
}

.mv-container .mv-recommend .mvs .items .item {
  cursor: pointer;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
}

.mv-container .mv-recommend .mvs .items .item:hover {
  background-color: #f5f5f5;
}

.mv-container .mv-recommend .mvs .items .item .img-wrap {
  width: 180px;
  position: relative;
  margin-right: 10px;
}

.mv-container .mv-recommend .mvs .items .item .img-wrap > .icon-play {
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

.mv-container .mv-recommend .mvs .items .item .img-wrap > .icon-play::before {
  transform: translateX(3px);
}

.mv-container .mv-recommend .mvs .items .item .img-wrap:hover > .icon-play {
  opacity: 1;
}

.mv-container .mv-recommend .mvs .items .item .img-wrap img {
  width: 100%;
  border-radius: 5px;
}

.mv-container .mv-recommend .mvs .items .item .img-wrap .num-wrap {
  position: absolute;
  color: white;
  top: 0;
  right: 0;
  display: flex;
  align-content: center;
  font-size: 15px;
  padding-right: 5px;
  padding-top: 2px;
}

.mv-container .mv-recommend .mvs .items .item .img-wrap .num-wrap .icon-play {
  font-size: 12px;
  display: flex;
  align-items: center;
  margin-right: 5px;
}

.mv-container .mv-recommend .mvs .items .item .img-wrap .time {
  position: absolute;
  bottom: 5px;
  right: 5px;
  color: white;
  font-size: 15px;
}

.mv-container .mv-recommend .mvs .items .item .info-wrap {
  flex: 1;
}

.mv-container .mv-recommend .mvs .items .item .info-wrap .name {
  font-size: 15px;
}

.mv-container .mv-recommend .mvs .items .item .info-wrap .singer {
  font-size: 14px;
  color: #c5c5c5;
}
.mv-container .el-pagination {
  text-align: center;
}
</style>