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
  autocolorscale: true,
  transforms: [{
    type: 'aggregate',
    groups: Country,
    aggregations: [
      {target: 'z', func: 'avg', enabled: true},
    ]
  }]
}];

var layout = {
title: 'Average Happiness by Countries, 2008 - 2020',
geo: {
    projection: {
        type: 'robinson'
    }
}
};

Plotly.newPlot("main", data, layout, {showLink: false});
}
getData_main();




const api_url = '/api/seven'

async function getData(){
  const response = await fetch(api_url)
const data = await response.json();
console.log(data)

let xl = []
let yl = []
let label = []
for (var i=0; i< data.length; i++){
xl.push(data[i]['year'])
yl.push(data[i]['Life_ladder'])
label.push(data[i]['Country']) }
let trace = {
x: xl,
y: yl,
text:label,
marker: {color: 'navy'},
type:'bar',
}

let layout = {
title: 'top',
yaxis:{title: 'LIfe Ladder'},
xaxis: {title: ''} }
plot1 = [trace]
Plotly.newPlot("bar",plot1,layout)
}
  
getData();
