/* global d3 $ */
// import pipeService from '../../service/pipeService'
/* eslint-disable */

let Drawevaluate= function (id) {
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


Drawevaluate.prototype.drawBarChart = function () {
            const w = 1200;
            const h = 500;
            var svg=d3.select("#evaluateGraph")
                        .append("svg")
                        .attr("width",w)
                        .attr("height",h);

			var rect = svg.selectAll("rect")
						  .data(dataset)
						  .enter()
						  .append("rect")
						  .attr("x",function(d,i){
								return i*((w-500)/dataset.length)+250;
						  })
						  .attr("y",function(d){
								return h-d[1]*8-20;
						  })
						  .attr("width",((w-500)/dataset.length-20))
						  .attr("height",function(d){
								return d[1]*8;
						  })
						  .attr("fill",function(d,i){
								return color[i];
						  });

			var number = svg.selectAll("text1")
						  .data(dataset)
						  .enter()
						  .append("text")
						  .attr("fill","black")
						  .attr("x",function(d,i){
								return i*((w-500)/dataset.length)+250;
						  })
						  .attr("y",function(d){
								return h-d[1]*8-40;
						  })
						  .attr("dx",45)
						  .attr("dy","1em")
						  .attr("font-size",14)
						  .text(function(d){
								return d[1]+"%";
						  });

			var index = svg.selectAll("text2")
						  .data(dataset)
						  .enter()
						  .append("text")
						  .attr("fill","black")
						  .attr("x",function(d,i){
								return i*((w-500)/dataset.length)+250;
						  })
						  .attr("y",h-15)
						  .attr("dx",20)
						  .attr("dy","1em")
						  .attr("font-size",14)
						  .text(function(d,i){
								return d[0];
						  });
}

export default Drawevaluate