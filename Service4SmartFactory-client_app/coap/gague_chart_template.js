
Highcharts.chart('chart_solar', {
    chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false
    },
    title: {
        text: 'Solar'
    },
    pane: {
        startAngle: -180,
        endAngle: 150,
        background: []
    },
    // the value axis
    yAxis: {
        min: 0,
        max: 5000,

        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10,
        minorTickPosition: 'inside',
        minorTickColor: '#666',

        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
            step: 4,
            rotation: 'auto'
        },
        title: {
            text: 'lux'
        },
        plotBands: [{
            from: 300,
            to: 3500,
            color: '#55BF3B' // green
        }, {
            from: 3500,
            to: 4000,
            color: '#DDDF0D' // yellow
        }, {
            from: 4000,
            to: 5000,
            color: '#DF5353' // red
        }]
    },

    series: [{
        name: 'Solar',
        data: [300],
        tooltip: {
            valueSuffix: ' lux'
        }
    }]
},

function (chart) {
    if (!chart.renderer.forExport) {
        setInterval(function () {
            var point = chart.series[0].points[0],
                newVal,
                inc = 300 + Math.round((Math.random()) * 30);
            point.update(inc);
        }, 1000);
    }
});

Highcharts.chart('chart_photo', {
    chart: {
        type: 'gauge'
    },
    title: {
        text: 'Photosynthetic'
    },
    pane: {
        startAngle: -150,
        endAngle: 150,
        background: []
    },
    // the value axis
    yAxis: {
        min: 0,
        max: 500,

        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10,
        minorTickPosition: 'inside',
        minorTickColor: '#666',

        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
            step: 4,
            rotation: 'auto'
        },
        title: {
            text: 'lux'
        },
        plotBands: [{
            from: 30,
            to: 350,
            color: '#55BF3B' // green
        }, {
            from: 350,
            to: 400,
            color: '#DDDF0D' // yellow
        }, {
            from: 400,
            to: 500,
            color: '#DF5353' // red
        }]
    },

    series: [{
        name: 'Photosynthetic',
        data: [30],
        tooltip: {
            valueSuffix: ' lux'
        }
    }]
},
// Add some life
function (chart) {
    if (!chart.renderer.forExport) {
        setInterval(function () {
            var point = chart.series[0].points[0],
                newVal,
                inc = 30 + Math.round((Math.random()) * 30);
            point.update(inc);
        }, 1000);
    }
});

Highcharts.chart('chart_motor', {
    chart: {
        type: 'gauge'
    },
    title: {
        text: 'Motor'
    },
    pane: {
        startAngle: -90,
        endAngle: 90,
        background: []
    },
    // the value axis
    yAxis: {
        min: 0,
        max: 1,

        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
            step: 10,
            rotation: 'auto'
        },
        title: {
            text: 'OFF / ON'
        },
        plotBands: [{
            from: 0.5,
            to: 1,
            color: '#55BF3B' // green
        },{
            from: 0,
            to: 0.5,
            color: '#DF5353' // red
        }]
    },

    series: [{
        name: 'Motor',
        data: [0]
    }]
},
// Add some life
function (chart) {
    if (!chart.renderer.forExport) {
        setInterval(function () {
            var point = chart.series[0].points[0],
                newVal,
                inc = 0 + Math.round((Math.random()) * 1);
            point.update(inc);
        }, 1000);
    }
});