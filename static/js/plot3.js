
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
yl.push(data_main[i]['Life_ladder'])
Corruption.push(data_main[i]['Corruption'])
Freedom.push(data_main[i]['Freedom'])
GDP_per_capita.push(data_main[i]['GDP_per_capita'])
Generosity.push(data_main[i]['Generosity'])
Country.push(data_main[i]['Country'])
Social_support.push(data_main[i]['Social_support'])
Life_expectancy.push(data_main[i]['Life_expectancy'])}

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
      title: 'Happiness<br>Index'
  }
}];

var layout = {
title: 'Average Happiness by Countries, 2006 - 2020',
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


// add bar plot - top happiness countries 

var data0 = [
  {
    x: xl,
    y: yl,
    type: 'bar',
    orientation:'h',
    transforms: [{
      type: 'aggregate',
      groups: Country,
      aggregations: [
        {target: 'x', func: 'avg', enabled: true},
        {target: 'y', func: 'avg', enabled: true}
      ]
    }],
  }
];

var layout = {
  xaxis: {
    range: [ 2006, 2020 ]
  },
  yaxis: {
    range: [2, 10]
  },
  title:'xxx xxxx " '
};

Plotly.newPlot('plot0', data0, layout);
Plotly.newPlot('plot00', data0, layout);



// add plot 1 - GDP and happiness index 
var trace1 = {
  y: yl,
  x: GDP_per_capita,
  mode: 'markers',
  type: 'scatter',
  name: 'Team A',
  text: Country,
  transforms: [{
    type: 'aggregate',
    groups: Country,
    aggregations: [
      {target: 'x', func: 'avg', enabled: true},
      {target: 'y', func: 'avg', enabled: true}
    ]
  }],
  marker: { size: 10 }
};

var data1 = [ trace1];

var layout = {
  xaxis: {
    range: [ 5, 15]
  },
  yaxis: {
    range: [2, 8]
  },
  title:'Happiness Index and GDP Per Capita '
};

Plotly.newPlot('plot1', data1, layout);

// add plot 2 - Life_expectancy and happiness index 
var trace1 = {
  y: yl,
  x: Life_expectancy,
  mode: 'markers',
  type: 'scatter',
  name: 'Team A',
  text: Country,
  transforms: [{
    type: 'aggregate',
    groups: Country,
    aggregations: [
      {target: 'x', func: 'avg', enabled: true},
      {target: 'y', func: 'avg', enabled: true}
    ]
  }],
  marker: { size: 10 }
};

var data2 = [ trace1];

var layout = {
  xaxis: {
    range: [ 30, 100 ]
  },
  yaxis: {
    range: [2, 8]
  },
  title:'Happiness Index and Life Expectancy '
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
  marker: { size: 10 }
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
  marker: { size: 10 }
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
  marker: { size: 10 }
};
var data3 = [ trace1,trace2,trace3];

var layout = {
  xaxis: {
    range: [ 0.3, 1 ]
  },
  yaxis: {
    range: [2, 8]
  },
  title:'Life ladder and measures of "Subjective Wellbeing" '
};

Plotly.newPlot('plot3', data3, layout);


}
getData_main();

