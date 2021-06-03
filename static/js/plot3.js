
const api_url_main = '/api/main'

async function getData_main(){
const response_main = await fetch(api_url_main)
const data_main = await response_main.json();
console.log(data_main)

let xl = []
let yl = []
let Country = []
let Corruption = []
let Freedom =[]
let GDP_per_capita =[]
let Generosity =[]
let Life_expectancy =[]
let Social_support = []

for (var i=0; i< data_main.length; i++){
xl.push(data_main[i]['year'])
yl.push(data_main[i]['life_ladder'])
Corruption.push(data_main[i]['corruption'])
Freedom.push(data_main[i]['freedom'])
GDP_per_capita.push(data_main[i]['gdp_per_capita'])
Generosity.push(data_main[i]['generosity'])
Country.push(data_main[i]['country'])
Social_support.push(data_main[i]['social_support'])
Life_expectancy.push(data_main[i]['life_expectancy'])}

// add choropleth map (avg Life_ladder/ years & countries)
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
      title: '<b>Happiness<br>Index<b>'
  }
}];

var layout = {
title: '<b>Average Happiness by Countries, 2006 - 2020<b>',
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


// add plot 1 - GDP and happiness index 
var trace1 = {
  y: yl,
  x: GDP_per_capita,
  mode: 'markers',
  type: 'scatter',
  text: Country,
  transforms: [{
    type: 'aggregate',
    groups: Country,
    aggregations: [
      {target: 'x', func: 'avg', enabled: true},
      {target: 'y', func: 'avg', enabled: true}
    ]
  }],
  marker: {
    color: 'ffd384',
    opacity: 0.6,
    size: 15,
    line: {
      color: 'ffd384',
      width: 2
    }}
};

var data1 = [ trace1];

var layout = {
  xaxis: {
    range: [ 5, 15]
  },
  yaxis: {
    range: [2, 8],
    title: '<b>Happiness<br>Index<b>'
  },
  title:'<b>Happiness Index and GDP Per Capita<b>'
};

Plotly.newPlot('plot1', data1, layout);

// add plot 2 - Life_expectancy and happiness index 
var trace1 = {
  y: yl,
  x: Life_expectancy,
  mode: 'markers',
  type: 'scatter',
  text: Country,
  title: '<b>Happiness<br>Index<b>',
  transforms: [{
    type: 'aggregate',
    groups: Country,
    aggregations: [
      {target: 'x', func: 'avg', enabled: true},
      {target: 'y', func: 'avg', enabled: true}
    ]
  }],
  marker: {
    color: 'f98404',
    opacity: 0.6,
    size: 15,
    line: {
      color: 'f98404',
      width: 2
    }}
};

var data2 = [ trace1];

var layout = {
  xaxis: {
    range: [ 30, 100 ]
  },
  yaxis: {
    range: [2, 8],
    title: '<b>Happiness<br>Index<b>'
  },
  title:'<b>Happiness Index and Life Expectancy<b>'
};

Plotly.newPlot('plot2', data2, layout);


// add plot 3 - Social_support and happiness index 
var trace1 = {
  y: yl,
  x: Social_support,
  mode: 'markers',
  type: 'scatter',
  name: 'Social support',
  text: Country,
  transforms: [{
    type: 'aggregate',
    groups: Country,
    aggregations: [
      {target: 'x', func: 'avg', enabled: true},
      {target: 'y', func: 'avg', enabled: true}
    ]
  }],
    marker: {
    color: 'f8615a',
    opacity: 0.6,
    size: 15,
    line: {
      color: 'f8615a',
      width: 2
    }}
};

var trace2 = {
  y: yl,
  x: Corruption,
  mode: 'markers',
  type: 'scatter',
  name: 'Perceptions Corruption ',
  text: Country,
  transforms: [{
    type: 'aggregate',
    groups: Country,
    aggregations: [
      {target: 'x', func: 'avg', enabled: true},
      {target: 'y', func: 'avg', enabled: true}
    ]
  }],
  marker: {
    color: '8f4068',
    opacity: 0.6,
    size: 15,
    line: {
      color: '8f4068',
      width: 2
    }}
};
var trace3 = {
  y: yl,
  x: Freedom,
  mode: 'markers',
  type: 'scatter',
  name: 'Perceptions Freedom',
  text: Country,
  transforms: [{
    type: 'aggregate',
    groups: Country,
    aggregations: [
      {target: 'x', func: 'avg', enabled: true},
      {target: 'y', func: 'avg', enabled: true}
    ]
  }],
  marker: {
    color: 'ffed99',
    opacity: 0.6,
    size: 15,
    line: {
      color: 'ffed99',
      width: 2
    }}
};
var data3 = [ trace1,trace2,trace3];

var layout = {
  xaxis: {
    range: [ 0, 1 ]
  },
  yaxis: {
    range: [2, 8],
    title: '<b>Happiness<br>Index<b>'
    
  },
  title:'Life ladder and measures of "Subjective Wellbeing" '
};

Plotly.newPlot('plot3', data3, layout);



}
getData_main();


const api_url_top = '/api/top'
async function getData_top(){
const response_main = await fetch(api_url_top)
const data_top = await response_main.json();
console.log(data_top)
// add bar plot - top happiness countries 

let yl = []
let Country = []
for (var i=0; i< data_top.length; i++){
yl.push(data_top[i]['life_ladder'])
Country.push(data_top[i]['country'])

var plot0 = [
  {
    x: Country,
    y: yl,
    type: 'bar',
    marker: {
      color: 'ffd56b'
    }}
];

var layout = {
  yaxis: {
  title: '<b>Happiness<br>Index<b>'
  },
  title:'<b>The happiest countries in the world between 2006 - 2020<b>'
};

Plotly.newPlot('plot0', plot0, layout);

}}
getData_top()

const api_url_bottom = '/api/bottom'

async function getData_bottom(){
const response_main = await fetch(api_url_bottom)
const data_bottom = await response_main.json();
console.log(data_bottom)

// add bar plot - data_bottom happiness countries 
let yl = []
let Country = []
for (var i=0; i< data_bottom.length; i++){
yl.push(data_bottom[i]['life_ladder'])
Country.push(data_bottom[i]['country'])

var plot00 = [
  {
    x: Country,
    y: yl,
    type: 'bar',
    marker: {
      color: 'ac66cc'
    }}
];

var layout = {
  yaxis: {
  title: '<b>Happiness<br>Index<b>'
  },
  title:'<b>The Unhappiest countries in the world between 2006 - 2020<b>'
};

Plotly.newPlot('plot00', plot00, layout);

}}
getData_bottom()

