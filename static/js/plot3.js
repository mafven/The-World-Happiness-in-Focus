
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
xl.push(data_main[i]['year']);
yl.push(data_main[i]['life_ladder']).toFixed(2);
Corruption.push(data_main[i]['corruption']).toFixed(2);
Freedom.push(data_main[i]['freedom']).toFixed(2);
GDP_per_capita.push(data_main[i]['gdp_per_capita']).toFixed(2);
Generosity.push(data_main[i]['generosity']).toFixed(2);
Country.push(data_main[i]['country']);
Social_support.push(data_main[i]['social_support']).toFixed(2);
Life_expectancy.push(data_main[i]['life_expectancy']).toFixed(2);}

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
    color: '#4C5270',
    opacity: 0.8,
    size: 13,
    line: {
      color: '#4C5270',
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
    color: '#FFA384',
    opacity: 0.8,
    size: 13,
    line: {
      color: '#FFA384',
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
  name: 'Corruption ',
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
  name: 'Freedom',
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

// add plot 3 - Generosity and happiness index 
var trace4 = {
  y: yl,
  x: Generosity,
  mode: 'markers',
  type: 'scatter',
  name: 'Generosity',
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
    color: '1eae98',
    opacity: 0.6,
    size: 15,
    line: {
      color: '1eae98',
      width: 2
    }}
};
var data3 = [ trace1,trace2,trace3,trace4];

var layout = {
  xaxis: {
    range: [ 0, 1 ]
  },
  yaxis: {
    range: [2, 8],
    title: '<b>Happiness<br>Index<b>'
    
  },
  title:'Happiness Index and measures of "Subjective Wellbeing" '
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
      color: '#E1C340'
    }}
];

var layout = {
  yaxis: {
  title: '<b>Happiness<br>Index<b>'
  },
  // title:'<b>The happiest countries in the world between 2006 - 2020<b>'
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
      color: '#D8A7B1'
    }}
];

var layout = {
  yaxis: {
  title: '<b>Happiness<br>Index<b>'
  },
  // title:'<b>The Unhappiest countries in the world between 2006 - 2020<b>'
};

Plotly.newPlot('plot00', plot00, layout);

}}
getData_bottom()


const api_url_table = '/api/happiness2021'
async function getData_table(){
  const response_main = await fetch(api_url_table)
  const data_table = await response_main.json();
  
  console.log(data_table)

  // Display each key-value pair from the metadata JSON object.
let table = d3.select("#table");
let tbody = table.select("tbody");
let trow;
for (var i = 0; i < data_table.length; i++) {
  let Prediction = data_table[i].Prediction.toFixed(2);
  trow = tbody.append("tr");
  trow.append("td").text(Prediction);

  let Actual = data_table[i].Actual.toFixed(2);;
  trow.append("td").text(Actual);
}   
}
getData_table()


const api_url_top2021 = '/api/top2021'

async function getData_top2021(){
const response_top2021 = await fetch(api_url_top2021)
const data_top2021 = await response_top2021.json();
console.log(data_top2021)

let yl = []
let label = []
let Corruption = []
let Freedom =[]
let GDP_per_capita =[]
let Generosity =[]
let Life_expectancy =[]
let Social_support = []

for (var i=0; i< data_top2021.length; i++){
yl.push(data_top2021[i]['life_ladder'])
Corruption.push(data_top2021[i]['corruption'])
Freedom.push(data_top2021[i]['freedom'])
GDP_per_capita.push(data_top2021[i]['gdp_per_capita'])
Generosity.push(data_top2021[i]['generosity'])
label.push(data_top2021[i]['country'])
Social_support.push(data_top2021[i]['social_support'])
Life_expectancy.push(data_top2021[i]['life_expectancy'])}

var trace1 = {
  x: label,
  y: yl,
  text:label,
  type: 'line',
  name: 'Happiness Index',
  marker: {
    color: '#ac66cc',
    opacity: 0.8,
  }
};

var trace2 = {
  x: label,
  y: Social_support,
  text:label,
  type: 'bar',
  name: 'Social Support',
  marker: {
    color: '#D02B7D',
    opacity: 0.6
  }
};

var trace3 = {
  x: label,
  y: Generosity,
  text:label,
  type: 'bar',
  name: 'Generosity',
  marker: {
    color: '##F85766',
    opacity: 0.6
  }
};

var trace4 = {
  x: label,
  y: Corruption,
  text:label,
  type: 'bar',
  name: 'Corruption',
  marker: {
    color: '#FF8C53',
    opacity: 0.6
  }
};

var trace5 = {
  x: label,
  y: Freedom,
  text:label,
  type: 'bar',
  name: 'Freedom',
  marker: {
    color: '#FFC351',
    opacity: 0.5
  }
};


var datatop2021 = [trace1,trace2,trace3,trace4,trace5];

var layout = {
  title: 'Happiness Index and measures of "Subjective Wellbeing - Top Countries 2021',
  xaxis: {
    tickangle: -45
  },
  barmode: 'group'
};
Plotly.newPlot("plot4", datatop2021, layout, {showLink: false});


}
getData_top2021()


const api_url_bottom2021 = '/api/bottom2021'
async function getData_bottom2021(){
const response_bottom2021 = await fetch(api_url_bottom2021)
const data_bottom2021 = await response_bottom2021.json();
console.log(data_bottom2021)

let yl = []
let label = []
let Corruption = []
let Freedom =[]
let GDP_per_capita =[]
let Generosity =[]
let Life_expectancy =[]
let Social_support = []

for (var i=0; i< data_bottom2021.length; i++){
yl.push(data_bottom2021[i]['life_ladder'])
Corruption.push(data_bottom2021[i]['corruption'])
Freedom.push(data_bottom2021[i]['freedom'])
GDP_per_capita.push(data_bottom2021[i]['gdp_per_capita'])
Generosity.push(data_bottom2021[i]['generosity'])
label.push(data_bottom2021[i]['country'])
Social_support.push(data_bottom2021[i]['social_support'])
Life_expectancy.push(data_bottom2021[i]['life_expectancy'])}

var trace1 = {
  x: label,
  y: yl,
  text:label,
  type: 'line',
  name: 'Happiness Index',
  marker: {
    color: '#ac66cc',
    opacity: 0.8,
  }
};

var trace2 = {
  x: label,
  y: Social_support,
  text:label,
  type: 'bar',
  name: 'Social Support',
  marker: {
    color: '#D02B7D',
    opacity: 0.6
  }
};

var trace3 = {
  x: label,
  y: Generosity,
  text:label,
  type: 'bar',
  name: 'Generosity',
  marker: {
    color: '##F85766',
    opacity: 0.6
  }
};

var trace4 = {
  x: label,
  y: Corruption,
  text:label,
  type: 'bar',
  name: 'Corruption',
  marker: {
    color: '#FF8C53',
    opacity: 0.6
  }
};

var trace5 = {
  x: label,
  y: Freedom,
  text:label,
  type: 'bar',
  name: 'Freedom',
  marker: {
    color: '#FFC351',
    opacity: 0.5
  }
};


var databottom2021 = [trace1,trace2,trace3,trace4,trace5];

var layout = {
  title: 'Happiness Index and measures of "Subjective Wellbeing - Bottom Countries 2021',
  xaxis: {
    tickangle: -45
  },
  barmode: 'group'
};
Plotly.newPlot("plot5", databottom2021, layout, {showLink: false});
}
getData_bottom2021()