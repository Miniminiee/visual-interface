// /* global d3 $ */
import dataService from '../../service/dataService.js'
import pipeService from '../../service/pipeService'
import DrawD3 from './drawD3.js'
import axios from "axios";

d3 = require("d3@6")

export default {
    name: 'InteractionView',
    components: {
    },
    props: { //主组件传递的值
        videoId: String,
        videoData: Object
    },
    data() {//当前component内置变量
        return {
        containerId: 'InteractionGraph',   //此处记得改
        audioData: {},
        interval: 5,
        sliding: 1,
        currenttime:0
        }
    },

    watch: {//监测某变量是否变化，变化后执行什么函数
    },

    //页面加载完成后执行的函数，可用于初始化
    mounted: function () {   //注意接收信号要卸载mounted内
          this.chart()
    },

    methods: {
       chart(){
             var margin = {top: 30, right: 90, bottom: 30, left: 90};
          //画布大小
              var width = $('#' + this.containerId).width()
              var height = $('#' + this.containerId).height()
              const innerheight = height-margin.top-margin.bottom;
              const innerwidth = width - margin.left-margin.right;
            var color = i => d3[scheme][Math.max(3, overlap)][i + Math.max(0, 3 - overlap)]
            const x = d3.scaleTime()
                .range([0, width])
            const y = d3.scaleLinear()
                .rangeRound([0, -overlap * step])
            const step = 29
            var color = i => d3[scheme][Math.max(3, overlap)][i + Math.max(0, 3 - overlap)]


            const xAxis = g => g
                .attr("transform", `translate(0,${margin.top})`)
                .call(d3.axisTop(x).ticks(width / 80).tickSizeOuter(0))
                .call(g => g.selectAll(".tick").filter(d => x(d) < margin.left || x(d) >= width - margin.right).remove())
                .call(g => g.select(".domain").remove())

                  const div = html`<div style="position:relative;">`;

                  const canvas = d3.select(div)
                    .selectAll("canvas")
                    .data(data)
                    .enter().append(() => DOM.context2d(width, step, 1).canvas)
                      .style("position", "absolute")
                      .style("image-rendering", "pixelated")
                      .style("top", (d, i) => `${i * (step + 1) + margin.top}px`)
                      .property("context", function() { return this.getContext("2d"); })
                      .each(horizon);

                    var svg = d3.select("#evaluateGraph")
                                      .append("svg")
                                      .attr("width", width)
                                      .attr("height",height);

              const gX = svg.append("g");

              svg.append("g")
                .selectAll("text")
                .data(data)
                .join("text")
                  .attr("x", 4)
                  .attr("y", (d, i) => (i + 0.5) * (step + 1) + margin.top)
                  .attr("dy", "0.35em")
                  .text((d, i) => i);

              const rule = svg.append("line")
                  .attr("stroke", "#000")
                  .attr("y1", margin.top - 6)
                  .attr("y2", height - margin.bottom - 1)
                  .attr("x1", 0.5)
                  .attr("x2", 0.5);

              svg.on("mousemove touchmove", (event) => {
                const x = d3.pointer(event, svg.node())[0] + 0.5;
                rule.attr("x1", x).attr("x2", x);
              });

              function horizon(d) {
                const {context} = this;
                const {length: k} = d;
                if (k < width) context.drawImage(this, k, 0, width - k, step, 0, 0, width - k, step);
                context.fillStyle = "#fff";
                context.fillRect(width - k, 0, k, step);
                for (let i = 0; i < overlap; ++i) {
                  context.save();
                  context.translate(width - k, (i + 1) * step);
                  context.fillStyle = color(i);
                  for (let j = 0; j < k; ++j) {
                    context.fillRect(j, y(d[j]), 1, -y(d[j]));
                  }
                  context.restore();
                }
              }

              div.update = data => {
                canvas.data(data).each(horizon);
                gX.call(xAxis);
              };

              return div;
            },

     data () {
          const n = 20, m = 964;
          const data = new Array(n);
          for (let i = 0; i < n; ++i) {
            const d = data[i] = new Float64Array(m);
            for (let j = 0, v = 0; j < m; ++j) {
              d[j] = v = walk(v);
            }
          }
          return data;
        },

    update () {
      const period = 250, m = data[0].length;
      const tail = data.map(d => d.subarray(m - 1, m));
      while (true) {
        const then = new Date(Math.ceil((Date.now() + 1) / period) * period);
        Promises.when(then, then);
        for (const d of data) d.copyWithin(0, 1, m), d[m - 1] = walk(d[m - 1]);
        x.domain([then - period * width, then]);
        chart.update(tail);
      }
    },

    walk(v) {
      return Math.max(0, Math.min(1, v + (Math.random() - 0.5) * 0.05));
    },
    }
}