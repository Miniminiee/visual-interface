<template>
  <div id="app" style="width: 1400px">
      <nav class="navbar sticky-top navbar-dark bg-dark" style="padding-top: 1px; padding-bottom: 1px; margin-bottom: 5px;">
          <div style="margin-top:5px; margin-left: 5px;">
              <span style="color:white; font-size:1.25rem; font-weight:500; user-select: none">Template</span>
          </div>
      </nav>
      <div class="container-fluid" style="padding-left: 5px; padding-right: 5px">
          <div class="row" style="margin-left: 10px; margin-right: 10px">
              <div class="col-6 content" style="padding-left: 3px; padding-right: 3px">
                <VideoView></VideoView>
                <InteractionView :videoId="videoId" :videoData="videoData"></InteractionView>
              </div>
              <div class="col-6 content" style="padding-left: 3px; padding-right: 3px">
                <CarView></CarView>
                <evaluateView></evaluateView>
              </div>
          </div>
      </div>      

  </div>
</template>

<script>
import dataService from './service/dataService.js'
/* global d3 $ _ */

import CarView from './components/CarView/CarView.vue'

import VideoView from './components/VideoView/VideoView.vue'
import InteractionView from './components/InteractionView/InteractionView.vue'
import evaluateView from './components/evaluateView/evaluateView.vue'
// import zytView from './components/zytView/zytView.vue'    //引入components

export default {
  name: 'app',
  components: {
    evaluateView,
    InteractionView,
    VideoView,
    CarView,
  },
  data() {
    return {
        videoList: [],
        videoId: 'carvideo',
        videoData: {},
        videoUrl:require('./test.mp4'),
    }
  },
  mounted: function () {
    // this.$nextTick(() => {
    //   dataService.initialization(this.videoId, (data) => {
    //     console.log('testing: ', data['data']) /* eslint-disable-line */
    //   })
    // })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #808080; */
  width: 100%;
  margin: 0 auto;
}

.container {
  width: 100%;
  padding: 5px 5px 5px 5px;
}

.content {
  padding: 2px 2px 2px 2px;
}

footer {
  margin-left: 5px;
}

.title {
    font-size: 1.25em;
    font-weight: 400;
}

</style>
