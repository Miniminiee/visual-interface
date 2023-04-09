/* global d3 $ */
// import pipeService from '../../service/pipeService'

let DrawCar= function (id) {
	this.id = id
    this.svgWidth = $('#' + id).width()
    this.svgHeight = $('#' + id).height()

    this.svg = d3.select('#' + id).append('svg')
        .attr('class', 'statisticSvg')
        .attr('width', this.svgWidth)
		.attr('height', this.svgHeight)

    var margin = {top: 30, right: 90, bottom: 30, left: 90};
    this.margin = margin;
	
	this.graphContainer = this.svg.append('g')
		.attr('class', 'g_main')
        .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')
}

DrawCar.prototype.speed = function (data,currenttime) {
    const xValue = d => d.time;
    const yValue = d => d.volume/10000000;
    const innerHeight = this.svgHeight - this.margin.top - this.margin.bottom;
    const innerWidth = this.svgWidth - this.margin.left - this.margin.right;

    const yAxisLabel = "速度";
    const xAxisLabel = "时刻";
    const title = "车辆速度"
    const monthList = [0,1,2,3,4,5,6,7,8,9,10,11];

    const xScale = d3.scaleTime()   //处理时间戳数据
        .domain(d3.extent(data, xValue))
        .range([0, innerWidth])
        .nice();
    
    const yScale = d3.scaleLinear()
        .domain(d3.extent(data, yValue))
        .range([innerHeight, 0])   //前面两个图y轴坐标不涉及数字，由于y轴向下为正方向，所以要反过来！ 
        .nice();

    const g = this.svg.append('g')
        .attr('transform', `translate(${this.margin.left},${this.margin.top})`);
      
    const xAxisTickFormat = time => 
        monthList[time.getMonth()];

    const xAxis = d3.axisBottom(xScale)
        .tickFormat(xAxisTickFormat)
        .tickPadding(10);
    
    const yAxisTickFormat = number => 
        d3.format('.1s')(number);

    const yAxis = d3.axisLeft(yScale)
        .tickSize(-innerWidth)
        .tickPadding(10)

    const yAxisG = g.append('g').call(yAxis);
    yAxisG.selectAll('.domain').remove();
      
    yAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('y', -60)
        .attr('x', -innerHeight / 2)
        .attr('fill', 'black')
        .attr('transform', `rotate(-90)`)
        .attr('text-anchor', 'middle')
        .text(yAxisLabel);
      
    const xAxisG = g.append('g').call(xAxis)
        .attr('transform', `translate(0,${innerHeight})`);
      
    xAxisG.select('.domain').remove();

    const lineGenerator = d3.line()   //绘制线条
        .x(d => xScale(xValue(d)))
        .y(d => yScale(yValue(d)))
        .curve(d3.curveBasis);   //平滑曲线

    g.append('path')
        .attr('class', 'line-path')   //line-path进一步在css中设置
        .attr('d', lineGenerator(data))
        .attr('stroke-width',1.5);
    
    g.append('text')
        .attr('class', 'title')
        .attr('y', -10)
        .attr('x', innerWidth/2)
        .attr('text-anchor', 'middle')
        .text(title);
}

DrawCar.prototype.drawa = function (data,currenttime) {
    const xValue = d => d.time;
    const yValue = d => d.volume/10000000;
    const innerHeight = this.svgHeight - this.margin.top - this.margin.bottom;
    const innerWidth = this.svgWidth - this.margin.left - this.margin.right;

    const yAxisLabel = "加速度";
    const xAxisLabel = "时刻";
    const title = "车辆加速度"
    const monthList = [0,1,2,3,4,5,6,7,8,9,10,11];

    const xScale = d3.scaleTime()   //处理时间戳数据
        .domain(d3.extent(data, xValue))
        .range([0, innerWidth])
        .nice();

    const yScale = d3.scaleLinear()
        .domain(d3.extent(data, yValue))
        .range([innerHeight, 0])   //前面两个图y轴坐标不涉及数字，由于y轴向下为正方向，所以要反过来！
        .nice();

    const g = this.svg.append('g')
        .attr('transform', `translate(${this.margin.left},${this.margin.top})`);

    const xAxisTickFormat = time =>
        monthList[time.getMonth()];

    const xAxis = d3.axisBottom(xScale)
        .tickFormat(xAxisTickFormat)
        .tickPadding(10);

    const yAxisTickFormat = number =>
        d3.format('.1s')(number);

    const yAxis = d3.axisLeft(yScale)
        .tickSize(-innerWidth)
        .tickPadding(10)

    const yAxisG = g.append('g').call(yAxis);
    yAxisG.selectAll('.domain').remove();

    yAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('y', -60)
        .attr('x', -innerHeight / 2)
        .attr('fill', 'black')
        .attr('transform', `rotate(-90)`)
        .attr('text-anchor', 'middle')
        .text(yAxisLabel);

    const xAxisG = g.append('g').call(xAxis)
        .attr('transform', `translate(0,${innerHeight})`);

    xAxisG.select('.domain').remove();
    xAxisG.append('text')
            .attr('class', 'axis-label')
            //.attr('y', -60)
            //.attr('x', -innerHeight / 2)
            .attr('fill', 'black')
            .attr('transform', `rotate(-90)`)
            .attr('text-anchor', 'middle')
            .text(xAxisLabel);


    const lineGenerator = d3.line()   //绘制线条
        .x(d => xScale(xValue(d)))
        .y(d => yScale(yValue(d)))
        .curve(d3.curveBasis);   //平滑曲线

    g.append('path')
        .attr('class', 'line-path')   //line-path进一步在css中设置
        .attr('d', lineGenerator(data))
        .attr('stroke-width',1.5);

    g.append('text')
        .attr('class', 'title')
        .attr('y', -10)
        .attr('x', innerWidth/2)
        .attr('text-anchor', 'middle')
        .text(title);
}

DrawCar.prototype.drawspeed = function (data,currenttime) {
    const xValue = d => d.time;
    const yValue = d => d.volume/10000000;
    const innerHeight = this.svgHeight - this.margin.top - this.margin.bottom;
    const innerWidth = this.svgWidth - this.margin.left - this.margin.right;

    const yAxisLabel = "速度";
    const xAxisLabel = "时刻";
    const title = "车辆速度"
    const monthList = [0,1,2,3,4,5,6,7,8,9,10,11];

    const xScale = d3.scaleTime()   //处理时间戳数据
        .domain(d3.extent(data, xValue))
        .range([0, innerWidth])
        .nice();

    const yScale = d3.scaleLinear()
        .domain(d3.extent(data, yValue))
        .range([innerHeight, 0])   //前面两个图y轴坐标不涉及数字，由于y轴向下为正方向，所以要反过来！
        .nice();

    const g = this.svg.append('g')
        .attr('transform', `translate(${this.margin.left},${this.margin.top})`);

    const xAxisTickFormat = time =>
        monthList[time.getMonth()];

    const xAxis = d3.axisBottom(xScale)
        .tickFormat(xAxisTickFormat)
        .tickPadding(10);

    const yAxisTickFormat = number =>
        d3.format('.1s')(number);

    const yAxis = d3.axisLeft(yScale)
        .tickSize(-innerWidth)
        .tickPadding(10)

    const yAxisG = g.append('g').call(yAxis);
    yAxisG.selectAll('.domain').remove();

    yAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('y', -60)
        .attr('x', -innerHeight / 2)
        .attr('fill', 'black')
        .attr('transform', `rotate(-90)`)
        .attr('text-anchor', 'middle')
        .text(yAxisLabel);

    const xAxisG = g.append('g').call(xAxis)
        .attr('transform', `translate(0,${innerHeight})`);

    xAxisG.select('.domain').remove();

    const lineGenerator = d3.line()   //绘制线条
        .x(d => xScale(xValue(d)))
        .y(d => yScale(yValue(d)))
        .curve(d3.curveBasis);   //平滑曲线

    g.append('path')
        .attr('class', 'line-path')   //line-path进一步在css中设置
        .attr('d', lineGenerator(data))
        .attr('stroke-width',1.5);

    g.append('text')
        .attr('class', 'title')
        .attr('y', -10)
        .attr('x', innerWidth/2)
        .attr('text-anchor', 'middle')
        .text(title);
}

DrawCar.prototype.drawa = function (data,currenttime) {
    const xValue = d => d.time;
    const yValue = d => d.low;
    const innerHeight = this.svgHeight - this.margin.top - this.margin.bottom;
    const innerWidth = this.svgWidth - this.margin.left - this.margin.right;

    const yAxisLabel = "加速度";
    const xAxisLabel = "时刻";
    const title = "车辆加速度"
    const monthList = [0,1,2,3,4,5,6,7,8,9,10,11];

    const xScale = d3.scaleTime()   //处理时间戳数据
        .domain(d3.extent(data, xValue))
        .range([0, innerWidth])
        .nice();

    const yScale = d3.scaleLinear()
        .domain(d3.extent(data, yValue))
        .range([innerHeight, 0])   //前面两个图y轴坐标不涉及数字，由于y轴向下为正方向，所以要反过来！
        .nice();

    const g = this.svg.append('g')
        .attr('transform', `translate(${this.margin.left},${this.margin.top})`);

    const xAxisTickFormat = time =>
        monthList[time.getMonth()];

    const xAxis = d3.axisBottom(xScale)
        .tickFormat(xAxisTickFormat)
        .tickPadding(10);

    const yAxisTickFormat = number =>
        d3.format('.1s')(number);

    const yAxis = d3.axisLeft(yScale)
        .tickSize(-innerWidth)
        .tickPadding(10)

    const yAxisG = g.append('g').call(yAxis);
    yAxisG.selectAll('.domain').remove();

    yAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('y', -60)
        .attr('x', -innerHeight / 2)
        .attr('fill', 'black')
        .attr('transform', `rotate(-90)`)
        .attr('text-anchor', 'middle')
        .text(yAxisLabel);

    const xAxisG = g.append('g').call(xAxis)
        .attr('transform', `translate(0,${innerHeight})`);

    xAxisG.select('.domain').remove();
    xAxisG.append('text')
            .attr('class', 'axis-label')
            //.attr('y', -60)
            //.attr('x', -innerHeight / 2)
            .attr('fill', 'black')
            .attr('transform', `rotate(-90)`)
            .attr('text-anchor', 'middle')
            .text(xAxisLabel);


    const lineGenerator = d3.line()   //绘制线条
        .x(d => xScale(xValue(d)))
        .y(d => yScale(yValue(d)))
        .curve(d3.curveBasis);   //平滑曲线

    g.append('path')
        .attr('class', 'line-path')   //line-path进一步在css中设置
        .attr('d', lineGenerator(data))
        .attr('stroke-width',1.5);

    g.append('text')
        .attr('class', 'title')
        .attr('y', -10)
        .attr('x', innerWidth/2)
        .attr('text-anchor', 'middle')
        .text(title);
}
export default DrawCar