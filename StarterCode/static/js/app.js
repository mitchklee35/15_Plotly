// // Pull data and create promise while using localhost:8000
var sourceData = [];

function buildPlot(top_values, top_otu) {

  // Build trace to plot the chart in reverse order
  var trace1 = [{
    type: "bar",
    x: top_values.reverse(),
    y: top_otu.reverse(),
    orientation: "h",
    // text: hoverLabels.reverse(),
    title: "OTU ID"
  }];

  // Plot newplot onto "bar" in html using trace1
  Plotly.newPlot("bar", trace1);

  // End Build bar chart
}

// Build bubble chart
function buildbubble(names, sample_values, layout) {

  // Trace for bubble plot
  var trace2 = [{
    x: names,
    y: sample_values,
    // text: otuLabels,
    mode: 'markers',
    marker: {
      size: sample_values,
      color: names
    }
  }]
  var layout = {
    xaxis: {
      title: "OTU ID"
    }
  };
  Plotly.newPlot("bubble", trace2, layout);
};

// Load source data, make data promise, and push data to array
d3.json("data/samples.json").then(function (data) {
  sourceData.push(data);
  console.log("sourceData", sourceData)

  // Populate dropdown menu
  var dropdownList = sourceData[0].names;
  var dropdownID = -1
  dropdownList.forEach(function (item) {
    var option = document.createElement("option");
    option.text = item;
    option.id = dropdownID + 1;
    document.getElementById("selDataset").appendChild(option);
    dropdownID += 1
    // End dropdown menu
  });

  // Display and filter samples
  var sample_values = sourceData[0].samples[0].sample_values;
  var top_values = [];
  top_values = sample_values.slice(0, 10);

  // Display and filter otu_ids
  var names = sourceData[0].samples[0].otu_ids;
  var top_otu = [];
  top_otu = names.slice(0, 10).map((item, i) => {
    return `OTU ${item}`;
  });

  // Display hover labels
  var otuLabels = sourceData[0].samples[0].otu_labels;
  var hoverLabels = [];
  hoverLabels = otuLabels.slice(0, 10);

  // Print default charts
  buildPlot(top_values, top_otu)
  buildbubble(names, sample_values)

  // Build demographic info
  var name = sourceData[0].metadata[0].id;
  var ethnicity = sourceData[0].metadata[0].ethnicity;
  var gender = sourceData[0].metadata[0].gender;
  var age = sourceData[0].metadata[0].age;
  var location = sourceData[0].metadata[0].location;
  var bbtype = sourceData[0].metadata[0].bbtype;
  var wfreq = sourceData[0].metadata[0].wfreq;
  document.getElementById("sample-metadata")
    .innerHTML += `<p><b>ID: </b>${name}<br><b>Ethnicity: </b>${ethnicity}<br><b>Gender: </b>${gender}<br><b>Age: </b>${age}<br><b>Location: </b>${location}<br><b>BBType: </b>${bbtype}<br><b>WFreq: </b>${wfreq}</p>`;

  // Fucntion for dropdown menu
  document.getElementById("selDataset").onchange = function () {

    // Depopulate  demographic info
    document.getElementById("sample-metadata")
      .innerHTML = ""

    // Set dropdown
    var dropdownMenu = document.getElementById("selDataset");
    var dropdownID = dropdownMenu.selectedIndex

    // Data points for bar and bubble chart when changing drop down menu. 
    var names = sourceData[0].samples[dropdownID].otu_ids;
    var top_otu = [];
    top_otu = names.slice(0, 10).map((item, i) => {
      return `OTU ${item}`;
    });
    var otuLabels = sourceData[0].samples[dropdownID].otu_labels;
    var hoverLabels = [];
    hoverLabels = otuLabels.slice(0, 10);

    // Print new demographic Info
    var name = sourceData[0].metadata[dropdownID].id;
    var ethnicity = sourceData[0].metadata[dropdownID].ethnicity;
    var gender = sourceData[0].metadata[dropdownID].gender;
    var age = sourceData[0].metadata[dropdownID].age;
    var location = sourceData[0].metadata[dropdownID].location;
    var bbtype = sourceData[0].metadata[dropdownID].bbtype;
    var wfreq = sourceData[0].metadata[dropdownID].wfreq;
    document.getElementById("sample-metadata")
      .innerHTML += `<p><b>ID: </b>${name}<br><b>Ethnicity: </b>${ethnicity}<br><b>Gender: </b>${gender}<br><b>Age: </b>${age}<br><b>Location: </b>${location}<br><b>BBType: </b>${bbtype}<br><b>WFreq: </b>${wfreq}</p>`;
  
    // Print plot and Bubble chart
    buildPlot(top_values, top_otu)
    buildbubble(names, sample_values)
  };

  // Create initialize function
  function init() {
  }; //ends the function(init()
  init();
});

// Set data promise
const dataPromise = d3.json("data/samples.json");