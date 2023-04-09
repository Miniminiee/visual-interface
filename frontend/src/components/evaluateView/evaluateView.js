// /* global d3 $ */
import dataService from '../../service/dataService.js'
import Drawevaluate from './drawevaluate'
// import dataService from '../../service/dataService.js'
// import pipeService from '../../service/pipeService'
/* eslint-disable */
//import axios from "axios";
import * as d3 from 'd3';
import moment from "moment"

export default{
    name: 'evaluateView',
    components: {
    },
    props: {
        videoId: String,
        videoData: Object
    },
    data() {
        return {
            containerId: 'evaluateGraph',   //此处记得改
            audioData: {},
            interval: 5,
            sliding: 1
        }
    },
    watch: {
    },
    mounted: function () { //页面加载结束后执行
        this.StackedBarChart()
    },
    methods:{
		 StackedBarChart()
            {
              var margin = {top: 30, right: 90, bottom: 30, left: 90};
              //画布大小
              var width = $('#' + this.containerId).width()
              var height = $('#' + this.containerId).height()
              const innerheight = height-margin.top-margin.bottom;
			  const innerwidth = width - margin.left-margin.right;

              var svg = d3.select("#evaluateGraph")
                              .append("svg")
                              .attr("width", width)
                              .attr("height",height);

              //const margin ={top:20,left:60,bottom:60,right:60};
            const g = svg.append('g')
            .attr('id','maingroup')
            .attr('transform','translate('+margin.left+','+margin.top+')');

			//准备数据
			const naiveData=[
				{month:1,apples:0.284,banans:0.2920,cherries:0.260,dates:0.300},
				{month:2,apples:0.184,banans:0.3920,cherries:0.360,dates:0.400},
				{month:3,apples:0.84,banans:0.4920,cherries:0.60,dates:0.500},
				{month:4,apples:0.384,banans:0.1920,cherries:0.560,dates:0.200},
				{month:5,apples:0.14,banans:0.4920,cherries:0.960,dates:0.500},
				{month:6,apples:0.74,banans:0.4270,cherries:0.280,dates:0.540},
				{month:7,apples:0.89,banans:0.5020,cherries:0.480,dates:0.350},
				{month:8,apples:0.19,banans:0.2110,cherries:0.160,dates:0.550},
			    {month:9,apples:0.640,banans:0.3760,cherries:0.860,dates:0.250},
			]
                    const naiveKeys = ['apples','banans','cherries','dates'];
                    //配置stack，堆叠的标签，标签对应数据，堆叠顺序
                    let stack = d3.stack()
                    .keys(naiveKeys)
                    .order(d3.stackOrderNone)(naiveData);//此处stack返回是一个函数，数据在最后加一个括号
                    const yScale = d3.scaleLinear()
                    .domain([0,d3.max(stack,d=>d3.max(d,sub => sub[1]))])//
                    .range([innerheight,0])
                    .nice();
                    //坐标轴，使用封装好的函数
            		const xValue = d => d['month'];//此处可使用d['month']或d.month
            		//scaleBand有bandwidth
            		const xScale = d3.scaleBand()//scaleBand没有nice()函数
            		.domain(naiveData.map(d=>xValue(d)))//传递给xValue的是一条条的数据，在moment处选取month属性对应的值
            		.range([0,innerwidth])
            		.padding(0.5);

           		//比例尺（scale）-->坐标轴（axis）-->添加组(call)
           		const naiveAxes = function(){
           			const xAxis = d3.axisBottom(xScale).tickSize(-innerheight)
           			const xAxisGroup = g.append('g').attr('id', 'xaxis').call(xAxis)
           			.attr('transform', 'translate('+0+', '+innerheight+')');
                    const yAxis = d3.axisLeft(yScale)
                        //.tickFormat(d3.format('.1s'))
                        .tickSize(-innerwidth);

                    const yAxisGroup = g.append('g').attr('id', 'yaxis').call(yAxis);
                    /*
                    yAxisGroup.selectAll('.domain').remove();
                    yAxisGroup.append('text')
                        .attr('class', 'axis-label')
                        .attr('y', -60)
                        .attr('x', -innerHeight / 2)
                        .attr('fill', 'black')
                        .attr('transform', `rotate(-90)`)
                        .attr('text-anchor', 'middle')
                        .text("指标值");
                        */
                    return {'xAxisGroup': xAxisGroup, 'yAxisGroup': yAxisGroup};
                }
                naiveAxes();

                //根据数据的属性名返回对应颜色
                //scaleOrdinal是比例尺，输入输出都是离散的
                const color = d3.scaleOrdinal()
                .domain(naiveKeys)
                .range(d3.schemeSet3);
                //放入数据为stack，不是原始数据
                //此处select的datagroup和datarect是封装好
                //data能将输入的数据平均分给每个图元
                //第一个是group，是一组（不同样本数据中的同一key对应的数据），第二个是矩形，是每个组里面的每个块.
                //绘图为一层一层的画，不是一个柱一个柱的画，第一层先画apples
                //使用group和rect将stack进行两次分离
                //join思想：将图元和数据进行对应
                g.selectAll('.datagroup').data(stack).join('g').attr('class','datagroup')
                .attr('fill',d=>color(d.key))//key属性在控制台返回数据中寻找
                //下层selectAll().data将数据进一步的分发
                .selectAll('.datarect').data(d=>d).join('rect').attr('class','datarect')
                //.selectAll('.line').data(d=>d).join('path').attr('class','line line-')
                .attr('y',d=>yScale(d[1]))
                .attr('x',d=>xScale(xValue(d.data)))//data属性从控制台返回数据中寻找
                .attr('width',xScale.bandwidth())//每个组对应的宽度
                .attr('height',d=>yScale(d[0])-yScale(d[1]))
            }
    }
}