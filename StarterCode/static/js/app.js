// // Pull data and create promise while using localhost:8000
var sourceData = [];

function buildPlot(top_values, top_otu, layout1, hoverLabels) {

  // Build trace to plot the chart in reverse order
  var trace1 = [{
    title: "OTU ID",
    type: "bar",
    x: top_values.reverse(),
    y: top_otu.reverse(),
    orientation: "h",
    text: hoverLabels,
  }]
  var layout1 = {
    xaxis: {
      title: "Number of OTUs"
    },
    yaxis: {
      title: "Microbial species label"
    }
  };
  // Plot newplot onto "bar" in html using trace1
  Plotly.newPlot("bar", trace1, layout1);

  // End Build bar chart
}

// Build bubble chart
function buildbubble(names, sample_values, layout, hoverLabels) {

  // Trace for bubble plot
  var trace2 = [{
    x: names,
    y: sample_values,
    text: hoverLabels,
    mode: 'markers',
    marker: {
      size: sample_values,
      color: names
    }
  }]
  var layout = {
    xaxis: {
      title: "OTU ID"
    },
    yaxis: {
      title: "Value of OTU"
    }
  };
  Plotly.newPlot("bubble", trace2, layout);
};

function buildgauge(scrubs_per_week) {

  var wash_gauge = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: scrubs_per_week,
      title: { text: "Washes per Week" },
      type: "indicator",
      mode: "gauge+number",
      gauge: {
        axis: { range: [null, 10], tickwidth: 1, tickcolor: "green" },
        bar: { color: "Green" },
        bgcolor: "white",
        borderwidth: 2,
      }
    }
  ];

  var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
  Plotly.newPlot('gauge', wash_gauge, layout);


}

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
  var hoverLabels = otuLabels.slice(0, 10).map((item, i) => {
    return `${item}`;
  });

  // Scrubs per week
  var scrubs_per_week = sourceData[0].metadata[0].wfreq;
  console.log(scrubs_per_week);

  // Print default charts
  buildPlot(top_values, top_otu, otuLabels, hoverLabels)
  buildbubble(names, sample_values, otuLabels, hoverLabels)
  buildgauge(scrubs_per_week)

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
    var sample_values = sourceData[0].samples[0].sample_values;
    var top_values = [];
    top_values = sample_values.slice(0, 10);

    var names = sourceData[0].samples[dropdownID].otu_ids;
    var top_otu = [];
    top_otu = names.slice(0, 10).map((item, i) => {
      return `OTU ${item}`;
    });
    // Display hover labels
    var otuLabels = sourceData[0].samples[dropdownID].otu_labels;
    var hoverLabels = [];
    var hoverLabels = otuLabels.slice(0, 10).map((item, i) => {
      return `${item}`;
    });
    // Scrubs per week
    var scrubs_per_week = sourceData[0].metadata[dropdownID].wfreq;
    console.log(scrubs_per_week);

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
    buildPlot(top_values, top_otu, hoverLabels, otuLabels)
    buildbubble(names, sample_values, hoverLabels, otuLabels)
    buildgauge(scrubs_per_week)
  };

  // Create initialize function
  function init() {
  }; //ends the function(init()
  init();
});

// Set data promise
const dataPromise = d3.json("data/samples.json");