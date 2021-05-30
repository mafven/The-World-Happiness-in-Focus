
const api_url_main = '/api/main'

async function getData_main(){
const response_main = await fetch(api_url_main)
const data_main = await response_main.json();
console.log(data_main)

let xl = []
let yl = []
let Country = []
for (var i=0; i< data_main.length; i++){
xl.push(data_main[i]['year'])
yl.push(data_main[i]['Life_ladder'])
Country.push(data_main[i]['Country']) }

var data = [{
  type: 'choropleth',
  locationmode: 'country names',
  locations: Country,
  z: yl,
  text: Country,
  transforms: [{
    type: 'aggregate',
    groups: Country,
    aggregations: [
      {target: 'z', func: 'avg', enabled: true},
    ]
  }],
    colorscale: [
      [0,'#F9F871'],[0.35,'#FFC75F'],
      [0.5,'#FF9671'], [0.6,'#FF6F91'],
      [0.7,'#D65DB1'],[1,'#845EC2']],
  autocolorscale: false,
  reversescale: true,
  marker: {
      line: {
          color: 'rgb(180,180,180)',
          width: 0.3
      }
  },
  tick0: 0,
  zmin: 0,
  dtick: 1000,
  colorbar: {
      autotic: false,
      tickprefix: '',
      title: 'Life<br>Ladder'
  }
}];

var layout = {
title: 'Average Happiness by Countries, 2008 - 2020',
geo:{
    showframe: false,
    showcoastlines: false,
    height: 600,
    width: 900,
    projection:{
    type: 'mercator'
    },
     margin: {l: 0,r: 0,b: 0,t: 0,pad: 1 }
}
};
Plotly.newPlot("main", data, layout, {showLink: false});

}
getData_main();

const api_url = '/api/main'
async function getData(){
const response = await fetch(api_url)
const data = await response.json();
console.log(data)
let xl = []
let yl = []
let y2 = []
let y3 = []
let y4 = []
let y5 = []
let y6 = []
let label = []
for (var i=0; i< data.length; i++){
  if (data[i]['Life_ladder'] <= 3){
  xl.push(data[i]['year'])
  yl.push(data[i]['Life_ladder'])
  y2.push(data[i]['GDP_per_capita'])
  y3.push(data[i]['Life_expectancy'])
  y4.push(data[i]['Social_support'])
  y5.push(data[i]['Corruption'])
  y6.push(data[i]['Freedom'])
  label.push(data[i]['Country']) }

  xl = xl.slice(0,10).reverse()
  yl =  yl.slice(0,10).reverse()
  label =  label.slice(0,10).reverse()

var trace1 = {
x: label,
y: yl,
    text:xl,
    type: 'bar',
    // orientation:"h",
    name: 'Life_ladder',
    marker: {
      color: '#845EC2',
      opacity: 0.8,
    }
  };

  var data1 = [trace1];
  var layout = {
    title: 'Title',
    width:600, 
    height:400,
    xaxis: {
    tickangle: -45
    },
    barmode: 'group'
  };

  var data2 = [{
    type: 'scatter',
    mode: 'markers',
    x: yl,
    y: y2,
    text:  label,
    marker: {
      size:  yl*20000000,
      sizemode: "area",
    },
    transforms: [
      {
      type: 'filter',
      target: yl,
      operation: '<=',
      value: '3'
      }, {
      type: 'groupby',
      groups:  xl,
      styles: [
        {target: '2008', value: {marker: {color: 'red'}}},
        {target: '2009', value: {marker: {color: 'blue'}}},
        {target: '2010', value: {marker: {color: 'orange'}}},
        {target: '2011', value: {marker: {color: 'green'}}},
        {target: '2012', value: {marker: {color: 'green'}}},
        {target: '2013', value: {marker: {color: 'green'}}},
        {target: '2014', value: {marker: {color: 'green'}}},
        {target: '2016', value: {marker: {color: 'green'}}},
        {target: '2017', value: {marker: {color: 'green'}}},
        {target: '2018', value: {marker: {color: 'green'}}},
        {target: '2019', value: {marker: {color: 'green'}}},
        {target: '2020', value: {marker: {color: 'purple'}}}
      ]
}]
  }]

var layout = {
yaxis: {
  type: 'log'
}
}
  
  Plotly.newPlot('plot1', data1, layout);
  Plotly.newPlot('plot2', data2, layout);
  // Plotly.newPlot('plot3', data3, layout);
  // Plotly.newPlot('plot4', data4, layout);
  // Plotly.newPlot('plot5', data5, layout)

}
}
getData();

