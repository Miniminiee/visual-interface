// /* global d3 $ */
import dataService from '../../service/dataService.js'
import DrawCar from './drawCar'
// import dataService from '../../service/dataService.js'
// import pipeService from '../../service/pipeService'
/* eslint-disable */
import speed from "./speed";
import acceleration from "./acceleration";
export default {
    name: 'CarView',
    components: {
        speed,
        acceleration
    },
    props: {
        videoId: String,
        videoData: Object
    },
    data() {
        return {
            containerId: 'carGraph',   //此处记得改
            audioData: {},
            interval: 5,
            sliding: 1,

            title: "动态组件",
            currentTab: "speed",
            tabs: ["speed", "acceleration"],
            propsData: "send data",
            propsDataA: "comA send data",
            propsDataB: "comB send data"
        }
    },
    watch: {
    },
    mounted: function () { //页面加载结束后执行
        this.currentView = "initOne";
    },
    created() {
        setTimeout(() => {
          this.showComponent = "speed";
          this.changeCom();
        }, 1000);
      },
      computed: {
        currentTabComponent() {
          return this.currentTab;
        }
      },
    methods: { //当前component内置函数
    }
}
