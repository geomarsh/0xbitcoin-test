
const Chart = require('./chart.min');

function generateHoldersGraph(holders, minted) {

  var amount = [];
  var exchanges_list = [];
  var colors = [];


  // Used to get the 'other' holders
  var sum = 0;

  for(var i = 0; i < holders.length; i++) {
    amount.push(holders[i][2]);
    sum += holders[i][2];

    //Random color
    var randomColor = "#000000".replace(/0/g,function randomColor() {return (~~(Math.random()*16)).toString(16);});
    colors.push(randomColor);
  }

  console.log(colors);

  amount.unshift(Math.round(sum - minted));

  var data = {
      datasets: [{
        backgroundColor: colors,
        data: amount
      }],

      // These labels appear in the legend and in the tooltips when hovering different arcs
      labels: ['Other','Mercatox']
  };

  var myPieChart = new Chart(document.getElementById('pie-holders').getContext('2d'), {
    type: 'pie',
    data: data
  });
}


async function getAPIData() {
  return new Promise((resolve, reject) => {
      $.getJSON('http://www.whateverorigin.org/get?url='
      + encodeURIComponent('https://bloxy.info/api/token/token_holders_list?token=0xb6ed7644c69416d67b522e20bc294a9a9b405b31&limit=150&key=ACCm8dVOKllqC&format=table')
      + '&callback=?', function(data) {
      resolve(JSON.parse(data.contents));
      });
    });
  }

async function showHoldersGraph(tokensMinted) {

  var tokenHolders = await getAPIData();

  generateHoldersGraph(tokenHolders, tokensMinted);
}


module.exports.showHoldersGraph = showHoldersGraph;
