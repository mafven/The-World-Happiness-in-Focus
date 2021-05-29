const api_url = '/api/ten'

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
