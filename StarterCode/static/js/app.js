// // Pull data and create promise while using localhost:8000

function buildMetadata(sample) {
    d3.json("/data/samples.json").then(function(sample) {
        
        var sample_metadata = d3.select("#sample-metadata");
        // Clears any existing meta-data
        sample_metadata.html("");

        Object.defineProperties(sample).forEach(([key, value]) => {
            var roe = sample_metadata.append("p");
            HTMLTableRowElement.text('${key}: ${value}');
        })
    }); 
}; //Ends buildMetadata function
// console.log(sample);

// Promise Pending
const dataPromise = d3.json("/data/samples.json");
console.log("Data Promise: ", dataPromise);

// Create and merge sample data and meta data



// Create a horizontal bar chart
// Use sample_values as the values for the bar chart.
// Use otu_ids as the labels for the bar chart.
// Use otu_labels as the hovertext for the chart.
// var sample_values = sample.sample_values
function buildPlot(sample) {
  
      // Grab values from the data json object to build the plots
      d3.json("/data/samples/json").then(function)
      var sample_values = sample.sample_values;
      var otu_ids = sample.otu_ids;
    //   var otu_labels = data.otu_labels;
  
      var trace1 = {
        type: "bar",
        x: sample_values,
        y: otu_ids,
      };
  
    //   var layout = {
    //     title: `Sample by OTU ID`,
    //     xaxis: {
    //         type: "linear"
    //     },
    //     yaxis: {
    //       autorange: true,
    //     }
    //   };
  
    };
  
  buildPlot();

// Create dropdown menu
function init() {
    Plotly.newPlot("sample-metadata", trace1);
}; //ends the function(init()


init();