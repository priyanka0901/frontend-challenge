/*-----country request-----*/
var Orequest = new XMLHttpRequest();
Orequest.onload = function(e) {
    var ajaxdata = Orequest.response;
    for (var i = 0; i < 9; i++) {
        var countries = ajaxdata.countries[i];
        // console.log(countries);
        $('#list1').append("<option class='country-options'>" + countries + "</option>");
        $('#list2').append("<option class='country-options'>" + countries + "</option>");
    }
};
Orequest.open('GET', '/countries/');
Orequest.responseType = "json";
Orequest.send();

/*------country trends request-------*/
var namedata1 = [],
    namedata2 = [],
    namedata3 = [];
$('#list1').change(function() {
    namedata1 = [];
    var ajaxdata1 = $(this).find(':selected')[0].innerHTML;
    // console.log(ajaxdata);
    $.ajax({
        type: 'GET',
        url: '/countries/' + ajaxdata1 + '/trends/',
        success: function(data) {
            for (var i = 0; i < data.trends.length; i++) {
                namedata1.push(data.trends[i].name);
            }
            compareArray(namedata1, namedata2);
            // console.log(namedata1);
        }
    })
});


$('#list2').change(function() {
    namedata2 = [];
    var ajaxdata2 = $(this).find(':selected')[0].innerHTML;
    // console.log(ajaxdata);
    $.ajax({
        type: 'GET',
        url: '/countries/' + ajaxdata2 + '/trends/',
        success: function(data) {
            for (var i = 0; i < data.trends.length; i++) {
                namedata2.push(data.trends[i].name);
            }
            compareArray(namedata1, namedata2);
            // console.log(namedata2); 
        }
    })
});

function compareArray(arr1, arr2) {
    namedata3 = [];
    if (arr1.length === 0) {
        for (var i = 0; i < arr2.length; i++) {
            namedata3.push(arr2[i]);
        }
    } else if (arr2.length === 0) {
        for (var i = 0; i < arr1.length; i++) {
            namedata3.push(arr1[i]);
        }
    } else {
        for (var i = 0; i < arr1.length; i++) {
            for (var j = 0; j < arr2.length; j++) {
                if (arr1[i] === arr2[j]) {
                    namedata3.push(arr1[i]);
                }
            }
        }
    }
    appendTrends();
}

function appendTrends() {
    var trends = '';
    for (var i = 0; i < namedata3.length; i++) {
        trends += "<p class='trends-menu'>" + namedata3[i] + "</p>";
    }
    $('.trends').html(trends);
    arrayLength();
    percentCal();
    graphmaker();
}

/*------array length---*/
var totallength;

function arrayLength() {
    totallength = 0;
    for (var i = 0; i < namedata3.length; i++) {
        totallength += namedata3[i].length;
    }
    // console.log(totallength);
}

/*-----percent calculation------*/
var trendweight;

function percentCal() {
    trendweight = [];
    for (var i = 0; i < namedata3.length; i++) {
        trendweight.push(((namedata3[i].length / totallength) * 100).toFixed(2));
    }
    console.log(trendweight);
}

/*------chart---------*/

function graphmaker(strlength, arrlength) {
    $('.result-graph').html('');
    var canvasElem = '<canvas id="myChart"></canvas>';
    $('.result-graph').html(canvasElem);
    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: namedata3,
            datasets: [{
                backgroundColor: [
                    "#5b066b",
                    "#e1067c",
                    "#f46f00",
                    "#116063",
                    "#40f906",
                    "#fb6c6c",
                    "#1c1d78",
                    "#f68b8b",
                    "#cfa63d",
                    "#305434"
                ],
                data: trendweight
            }]
        }
    });
};
