
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

const api_url = '/api/ten'
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
xl.push(data[i]['year'])
yl.push(data[i]['Life_ladder'])
y2.push(data[i]['GDP_per_capita'])
y3.push(data[i]['Life_expectancy'])
y4.push(data[i]['Social_support'])
y5.push(data[i]['Corruption'])
y6.push(data[i]['Freedom'])
label.push(data[i]['Country']) }

var trace1 = {
    x: xl,
    y: yl,
    text:label,
    type: 'bar',
    name: 'Life_ladder',
    marker: {
      color: '#845EC2',
      opacity: 0.8,
    }
  };
  
  var trace2 = {
    x: xl,
    y: y2,
    text:label,
    type: 'bar',
    name: 'GDP per capita',
    marker: {
      color: '#D02B7D',
      opacity: 0.6
    }
  };

  var trace3 = {
    x: xl,
    y: y4,
    text:label,
    type: 'bar',
    name: 'Social_support',
    marker: {
      color: '##F85766',
      opacity: 0.6
    }
  };

  var trace4 = {
    x: xl,
    y: y5,
    text:label,
    type: 'bar',
    name: 'Corruption',
    marker: {
      color: '#FF8C53',
      opacity: 0.6
    }
  };

  var trace5 = {
    x: xl,
    y: y6,
    text:label,
    type: 'bar',
    name: 'Freedom',
    marker: {
      color: '#FFC351',
      opacity: 0.5
    }
  };

  var data1 = [trace1, trace2, trace3,trace5, trace4];
  
  var layout = {
    title: 'Title',
    xaxis: {
      tickangle: -45
    },
    barmode: 'group'
  };
  
  Plotly.newPlot('bar', data1, layout);

}
  
getData();