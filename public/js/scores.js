'use strict';



// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	
    google.charts.load("current", {packages:['corechart']});
    google.charts.setOnLoadCallback(drawChart);

})

function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['firstName', 'Ratings', { role: 'style' } ],
    ["noah", 61, "color: grey"],
    ["alia", 73, "color: black"],
    ["brian", 100, "color: #00b3b3"],
    ["chris", 20, "color: #008080"],
  ]);
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
  };

  var chart = new google.visualization.ColumnChart(document.getElementById("columnchart_values"));
  chart.draw(data, options);
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