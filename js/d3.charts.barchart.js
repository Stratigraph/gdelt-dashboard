if (!d3.hasOwnProperty('charts')) {
    d3.charts = {};
}

d3.charts.barchart = function () {

    'use strict';

    var margin = {'top': 5, 'right': 5, 'bottom': 20, 'left': 40 },
        width = 600,
        height = 300,
        xAccessor = function (d) { return d.x; },
        yAccessor = function (d) { return d.y; },
        xDomain = null,
        yDomain = null,
        xValues = null,
        yValues = null,
        xFormat = null,
        yFormat = null,
        dispatch = d3.dispatch('click');

    function barchart(selection) {

        selection.each(function (d) {

            var data = d.map(function (d, i) {

                return {'x': xAccessor(d, i), 'y': yAccessor(d, i)};

            });

            // Scales and axes

            var x = d3.scale.ordinal()
                .domain(xDomain ? xDomain : data.map(function (d) { return d.x; }))
                .rangeBands([0, width - margin.left - margin.right]);

            var y = d3.scale.linear()
                .domain(yDomain ? yDomain : [0, d3.max(data, function (d) { return d.y; })])
                .range([height - margin.top - margin.bottom, 0]);

            var xAxis = d3.svg.axis()
                .scale(x)
                .tickValues(xValues)
                .tickFormat(xFormat);

            var yAxis = d3.svg.axis()
                .orient('left')
                .scale(y)
                .tickValues(yValues)
                .tickFormat(yFormat);

            // Initial selection

            var svg = d3.select(this).selectAll('svg').data([data]);

            // Scaffolding

            var g = svg.enter().append('svg')
                    .attr('class', 'barchart')
                    .attr('width', width)
                    .attr('height', height)
                .append('g')
                    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

            g.append('g').attr('class', 'chart-area');

            g.append('g').attr('class', 'x axis');

            g.append('g').attr('class', 'y axis');

            // Chart area

            g = svg.select('g');

            var bars = g.select('.chart-area').selectAll('.bar')
                    .data(function (d) { return d; });

            bars.enter().append('rect')
                    .attr('class', 'bar')
                    .attr('x', function (d) { return x(d.x); })
                    .attr('y', function (d) { return y(d.y); })
                    .attr('width', x.rangeBand())
                    .attr('height', function (d) { return height - margin.top - margin.bottom - y(d.y); })
                    .on('click', dispatch.click);

            // Axes

            g.select('.x.axis')
                    .attr('transform', 'translate(0,' + (height - margin.top - margin.bottom + 2) + ')')
                    .call(xAxis);

            g.select('.y.axis')
                    .attr('transform', 'translate(-2,0)')
                    .call(yAxis);

        });
    }

    barchart.margin = function (d) {
        if (!arguments.length) {
            return margin;
        }
        margin = d;
        return barchart;
    };

    barchart.width = function (d) {
        if (!arguments.length) {
            return width;
        }
        width = d;
        return barchart;
    };

    barchart.height = function (d) {
        if (!arguments.length) {
            return height;
        }
        height = d;
        return barchart;
    };

    barchart.x = function (d) {
        if (!arguments.length) {
            return xAccessor;
        }
        xAccessor = d;
        return barchart;
    };

    barchart.y = function (d) {
        if (!arguments.length) {
            return yAccessor;
        }
        yAccessor = d;
        return barchart;
    };

    barchart.xDomain = function (d) {
        if (!arguments.length) {
            return xDomain;
        }
        xDomain = d;
        return barchart;
    };

    barchart.yDomain = function (d) {
        if (!arguments.length) {
            return yDomain;
        }
        yDomain = d;
        return barchart;
    };

    barchart.xValues = function (d) {
        if (!arguments.length) {
            return xValues;
        }
        xValues = d;
        return barchart;
    };

    barchart.yValues = function (d) {
        if (!arguments.length) {
            return yValues;
        }
        yValues = d;
        return barchart;
    };

    barchart.xFormat = function (d) {
        if (!arguments.length) {
            return xFormat;
        }
        xFormat = d;
        return barchart;
    };

    barchart.yFormat = function (d) {
        if (!arguments.length) {
            return yFormat;
        }
        yFormat = d;
        return barchart;
    };

    return d3.rebind(barchart, dispatch, 'on');

};
