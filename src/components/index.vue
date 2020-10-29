<template>
  <div class="index">
      <nav>
          <ul>
              <li><router-link to="/discovery"><span class="iconfont">&#xf0036;</span>发现音乐</router-link></li>
              <li><router-link to="/playlists"><span class="iconfont">&#xe636;</span>推荐歌单</router-link></li>
              <li><router-link to="/songs"><span class="iconfont">&#xe65e;</span>最新音乐</router-link></li>
              <li><router-link to="/mvs"><span class="iconfont">&#xe60b;</span>最新MV</router-link></li>
          </ul>
      </nav>
      <section>
          <router-view></router-view>
      </section>
      <footer>
          <audio :src="songUrl" controls autoplay></audio>
      </footer>
  </div>
</template>

<script>

export default {
    data() {
        return {
            songUrl:''
        }
    }
    
}
</script>

<style>
.index {
    height: 100%;
    display: flex;
}
nav{
    width: 200px;
    height: 100%;
    background-color: #F5F5F7;
}
nav ul{
    padding-top: 20px;
    width: 200px;
}
nav ul li{
    height: 40px;
    line-height: 40px;
    cursor: pointer;
}
nav ul li a{
    display: block;
    padding-left: 20px;
    text-decoration: none;
    color: #5e5e5e;
    border-left: 5px solid transparent;
}
nav ul li:hover a{
    color: #000;
}
nav ul li .router-link-active{
    color: #000000;
    background-color: #E6E7EA;
    border-left: 5px solid #C62F2F;
}
nav ul li span{
    margin-right: 10px;
}
section{
    height: 100%;
    flex:1;
    overflow: auto;
}
footer{
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    background-color: #F1F3F4;
    border-top: 1px solid #ccc;
}
footer audio{
    width: 100%;
    border-radius: none;
    outline: none;
}
</style>