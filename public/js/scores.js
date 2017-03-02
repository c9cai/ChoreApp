'use strict';

var json_data = {};
var colors = ['#00b3b3', '#008080', 'grey', 'black'];

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	  var json = $("#json").text();
    console.log("original");
    console.log(json);
    var json_decoded = JSON.parse(json);
    console.log("decoded"); 
    console.log(json_decoded);
    json_data = json_decoded;

    google.charts.load("current", {packages:['corechart']});
    google.charts.setOnLoadCallback(drawChart);

})

function drawChart() {

  var parameters = [];
  parameters[0] = ['firstName', 'Ratings', {role:'style'}, {role:'annotation'}, {role: 'tooltip'}];

  var color_ind = 0;

  //add a row to parameters for each user in the house
  for (var i = 0; i<json_data['users'].length; i++) {
    var to_push = [];
    to_push.push(json_data['users'][i]['firstName']);
    to_push.push(json_data['users'][i]['rating']);

    //loop through the colors, find next one for this user
    to_push.push('color:' + colors[color_ind]);
    color_ind = (color_ind + 1) % colors.length;

    to_push.push('' + json_data['users'][i]['rating']);

    var category = calcCategory(json_data['users'][i]['rating']);
    to_push.push(category + '!');
    //add to_push to parameters
    parameters[i+1] = to_push;
  }


  var data = google.visualization.arrayToDataTable(parameters);
  // var view = new google.visualization.DataView(data);
  // view.setColumns([0, 1,
  //                  { calc: "stringify",
  //                    sourceColumn: 1,
  //                    type: "string",
  //                    role: "annotation" },
  //                  2]);

  var options = {
    // title: none,
    // width: 600,
    height: 400,
    bar: {groupWidth: "95%"},
    legend: { position: "none" },
    vAxis: {
      title: 'Ratings',
      maxValue: 100,
      minValue: 0,
    },
    // tooltip: {
    //   trigger: 'none',
    // }
  };

  var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values"));
  chart.draw(data, options);
}



function calcCategory(rating) {
  if (rating > 80) {
      return "hero";
  }
  else if (rating > 60) {
      return"sidekick";
  }
  else if (rating > 40) {
      return "civilian";
  }
  else if (rating > 20) {
      return "minion";
  }
  else {
      return "villian";
  }
}


  // {{#each users}}
  //   <script type="text/javascript">
  //     google.charts.load("current", {packages:["corechart"]});
  //     google.charts.setOnLoadCallback(drawChart);
  //     function drawChart() {
  //       var data = google.visualization.arrayToDataTable([
  //         ['Score', "Points"],
  //         ['Score', {{rating}}],
  //         ['Missing', 100-{{rating}}]
  //       ]);

  //       var options = {
  //         title: '{{firstName}}',
  //         pieHole: 0.4,
  //         legend: 'none',
  //         slices: {
  //           0: { color: '#00b3b3' },
  //           1: { color: 'grey' }
  //         }
  //       };

  //       var chart = new google.visualization.PieChart(document.getElementById('{{firstName}}'));
  //       chart.draw(data, options);
  //     }
  //   </script>
  //   {{/each}}