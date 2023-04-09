// import DrawVideo from './drawVideo.js'
import dataService from '../../service/dataService.js'
import pipeService from '../../service/pipeService.js'
import { VueAmazingSelector } from 'vue-amazing-selector'

var video = () => {
  var videoTime = document.getElementById("carvideo");
  //console.log(videoTime.duration); //获取视频时长
  var currenttime=videoTime.currentTime
  console.log(currenttime); //获取视频当前播放时间
  pipeService.emitUPDATEPIC(currenttime);  //发送信号，同时传递变量currenttime
};

export default {
  name: 'VideoView',
  components: {
    VueAmazingSelector
  },
  props: {
    videoUrl: { // 视频文件url，必传，支持网络地址 https 和相对地址 require('@/assets/files/Bao.mp4')
      type: String,
      required: true,
      default: null
    },
    videoCover: { // 视频封面url，支持网络地址 https 和相对地址 require('@/assets/images/Bao.jpg')
      type: String,
      default: null
    },
    width: { // 视频播放器宽度
      type: Number,
      default: "100%"
    },
    height: { // 视频播放器高度
      type: Number,
      default: 300
    },
    /*
      最新版Chrome浏览器已不再允许自动播放音频和视频。
      就算你为video或audio标签设置了autoplay,属性也一样不能自动播放
      本组件解决方法：设置视频 autoplay 时，自动将视频设置为静音 muted: true 即可实现自
      动播放，然后用户可以使用控制栏开启声音，类似某宝商品自动播放的宣传视频逻辑
    */
    autoplay: { // 视频就绪后是否马上播放
      type: Boolean,
      default: true
    },
    controls: { // 是否向用户显示控件，比如进度条，全屏
      type: Boolean,
      default: true
    },
    loop: { // 视频播放完成后，是否循环播放
      type: Boolean,
      default: false
    },
    muted: { // 是否静音
      type: Boolean,
      default: true
    },
    preload: { // 是否在页面加载后载入视频，如果设置了autoplay属性，则preload将被忽略；
      type: String,
      default: 'auto' // auto:一旦页面加载，则开始加载视频; metadata:当页面加载后仅加载视频的元数据 none:页面加载后不应加载视频
    },
    showPlay: { // 播放暂停时是否显示播放器中间的暂停图标
      type: Boolean,
      default: false
    },
    playWidth: { // 中间播放暂停按钮的边长
      type: Number,
      default: 96
    },
    zoom: { // video的poster默认图片和视频内容缩放规则
      type: String,
      default: 'contain' // none:(默认)保存原有内容，不进行缩放; fill:不保持原有比例，内容拉伸填充整个内容容器; contain:保存原有比例，内容以包含方式缩放; cover:保存原有比例，内容以覆盖方式缩放
    }
  },
  data () {
    return {
      originPlay: true,
      vplay: false,
      options: [
        {
          label: '场景1',
          value: 1
        },
        {
          label: '场景2',
          value: 2,
          //disabled: true
        },
        {
          label: '场景3',
          value: 3
        },
        {
          label: '场景4',
          value: 4
        },
        {
          label: '场景5',
          value: 5
        },
        {
          label: '场景6',
          value: 6
        },
        {
          label: '场景7',
          value: 7
        },
        {
          label: '场景8',
          value: 8
        },
        {
          label: '场景9',
          value: 9
        }],
        selectedValue: 1
     }
    },

  watch: {
    selectedValue (to) {
      console.log('selectedValue:', to)
    }
  },

  mounted () {
    //下拉框
      setTimeout(() => { // 模拟接口调用
      this.selectedValue = 3
    }, 1000)

    //视频
    if (this.showPlay) {
      this.$refs.veo.addEventListener('pause', this.onPause)
      this.$refs.veo.addEventListener('playing', this.onPlaying)
    }
    if (this.autoplay) {
      this.vplay = true
      this.originPlay = false
    }
    /*
      自定义设置播放速度，经测试：
      在vue2中需设置：this.$refs.veo.playbackRate = 2
      在vue3中需设置：veo.value.defaultPlaybackRate = 2
    */
    // this.$refs.veo.playbackRate = 2
  },
  methods: {
    getVidTime() {
      video();
    },
    onPlay () {
      console.log('click')
      if (!this.autoplay) {
        this.vplay = true
        this.originPlay = false
        this.$refs.veo.play()
      } else {
        this.$refs.veo.pause()
      }
    },
    onPause () {
      this.vplay = false
      console.log('pause')
      this.$once('hook:beforeDestroy', function () {
        removeEventListener('pause', this.onPause)
      })
    },
    onPlaying () {
      this.vplay = true
      console.log('playing')
      // 自动清理自己，避免内存泄漏
      this.$once('hook:beforeDestroy', function () {
        removeEventListener('playing', this.onPlaying)
      })
    },
    //下拉框
    onChange (value, label, index) {
      console.log('item:', value, label, index)
    }
  }
}