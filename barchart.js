
var margin = {top: 40, right: 40, bottom: 120, left: 80},
    fullwidth = 700,
    fullheight = 500,
    width = fullwidth - margin.left - margin.right,
    height = fullheight - margin.top - margin.bottom;

d3.json("zillow_chicago.json", function(error,data){
    dataset = data.sort(function(a,b) {return b.zhvi - a.zhvi;});
    makeBarChart();
});

function makeBarChart(){
    console.log(dataset);

    var svg = d3.select("#chart")
        .append("svg")
        .attr("width",fullwidth)
        .attr("height",fullheight)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    var neighScale = d3.scaleBand()
            .domain( dataset.map(function(d) {return d.neighbourhood;}) )
            .range([0,width])
            .paddingInner(0.1);

    var bandwidth = neighScale.bandwidth();

    var maxZHVI = d3.max(dataset,function(d){return d.zhvi;});
    var zhviScale = d3.scaleLinear()
        .domain([0, maxZHVI])
        .range([height, 0])
        .nice();

    var xAxis = d3.axisBottom(neighScale);
    var yAxis = d3.axisLeft(zhviScale);

    svg.append('g')
        .classed('x axis', true)
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis)
        .selectAll("text")
            .attr("y", 0)
            .attr("x", 9)
            .attr("dy", ".35em")
            .attr("transform", "rotate(70)")
            .style("text-anchor", "start");

    var yAxisEle = svg.append('g')
        .classed('y axis', true)
        .call(yAxis);

    var yText = yAxisEle.append('text')
        .attr('transform', 'rotate(-90)translate(-' + height/2 + ',0)')
        .style('text-anchor', 'middle')
        .style('fill', 'black')
        .attr('dy', '-4.25em')
        .style('font-size', 14)
        .text('Zillow Housing Value Index');

    var barHolder = svg.append('g')
        .classed('bar-holder', true);

    var bars = barHolder.selectAll('rect.bar')
        .data(dataset)
        .enter().append('rect')
        .classed('bar', true)
        .attr('x', function(d, i){return neighScale(d.neighbourhood)})
        .attr('width', bandwidth)
        .attr('y', function(d) {return zhviScale(d.zhvi);})
        .attr('height', function(d) {return height - zhviScale(d.zhvi);})
        .attr("class", function(d) {
          var side
          if (d.side == 'South') {side = 'south'}
          else if (d.side.includes('North')) {side = 'north'}
          else if (d.side.includes('South')) {side = 'south'}
          else if (d.side.includes('West')) {side = 'west'}
          else if (d.side.includes('Central')) {side = 'central'}
          return side});
};
