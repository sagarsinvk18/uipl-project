function fetchAndVisualizeData() {
    fetch("./data.json")
      .then(r => r.json())
      .then(visualizeData);
  }
  
  fetchAndVisualizeData();
  function visualizeData(data) {
    visualizeMatchesPlayedPerYear1(data.wonMatchPerTeam);
    visualizeMatchesPlayedPerYear2(data.economy);
    visualizeMatchesPlayedPerYear3(data.extraRunConceded);
    visualizeMatchesPlayedPerYear4(data.highestWicket);
    visualizeMatchesPlayedPerYear5(data.matchesPlayedPerYear);
    return;
  }
  
  //wonmatchperteam

  function visualizeMatchesPlayedPerYear1(wonMatchPerTeam) {
    const seriesData = [];
    const obj={};
    const years=[]
    for (let year in wonMatchPerTeam) {
      years.push(year);
      for(let team in wonMatchPerTeam[year])
      {
        if(obj.hasOwnProperty(team))
        {
          obj[team].push(wonMatchPerTeam[year][team]);
        }
        else
        {
          obj[team]=[]
          obj[team].push(wonMatchPerTeam[year][team]);
        }
      }
    }
    let a=Object.keys(obj);
    let j=0;
    for (let year in wonMatchPerTeam)
    {
      for(let i=0;i<a.length;i++)
      {
        if(a[i] in wonMatchPerTeam[year])
          continue;
        else
          obj[a[i]].splice(j,0,0);
      }
      j++;
    }
    /*for(let i in obj)
    {
      const ob={};
      ob[i]=obj[i];
      seriesData.push(ob);
    }*/
    let i=0;
    for(let team in obj)
    {
      seriesData[i]={};
      if(seriesData[i].hasOwnProperty("name")==false)
        seriesData[i]["name"]=team;
      seriesData[i]["data"]=obj[team];
      i++;
    }
    console.log(seriesData);
    //console.log(obj);
    //console.log(years)
  
    Highcharts.chart("wonmatch", {
      chart: {
          type: 'column'
      },
      title: {
          text: 'Match Won By Each Team In A Year'
      },
      subtitle: {
          text: 'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
      },
      xAxis: {
          categories: years,
          crosshair: true
      },
      yAxis: {
          min: 0,
          title: {
              text: 'no. of matches won'
          }
      },
      tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
              '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
      },
      plotOptions: {
          column: {
              pointPadding: 0.2,
              borderWidth: 0
          }
      },
      series:seriesData
  });
}

//extra run conceded highcharts
function visualizeMatchesPlayedPerYear3(extraRunconceded) {
  const seriesData = [];
  for (let year in extraRunconceded) {
    seriesData.push([year, extraRunconceded[year]]);
  }

  Highcharts.chart("extra-run-conceded", {
    chart: {
      type: "column"
    },
    title: {
      text: "Extra Run Conceded By Each Team"
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      type: 'category',
      labels: {
          rotation: -45,
          style: {
              fontSize: '13px',
              fontFamily: 'Verdana, sans-serif'
          }
        }
    },
    yAxis: {
      min: 0,
      title: {
        text: "Extra-Run"
      },
    },
    series: [
      {
        name:"Teams",
        data: seriesData
      }
    ]
  });
}

//economy
function visualizeMatchesPlayedPerYear2(economy) {
  const seriesData = [];
  for (let year in economy) {
    seriesData.push([year, economy[year]]);
  }
  
  Highcharts.chart("economyrate", {
    chart: {
      type: "column"
    },
    title: {
      text: "Match Won By Each Team"
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      type: 'category',
      labels: {
          rotation: -45,
          style: {
              fontSize: '13px',
              fontFamily: 'Verdana, sans-serif'
          }
        }
    },
    yAxis: {
      min: 0,
      title: {
        text: "economyrate"
      }
    },
    series: [
      {
        name: "economy",
        data: seriesData
      }
    ]
  });
}

//matchesplayedperyear
function visualizeMatchesPlayedPerYear5(matchesPlayedPerYear) {
  const seriesData = [];
  for (let year in matchesPlayedPerYear) {
    seriesData.push([year, matchesPlayedPerYear[year]]);
  }

  Highcharts.chart("matches-played-per-year", {
    chart: {
      type: "column"
    },
    title: {
      text: "Matches Played Per Year"
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      type: "category"
    },
    yAxis: {
      min: 0,
      title: {
        text: "Matches"
      }
    },
    series: [
      {
        name: "Years",
        data: seriesData
      }
    ]
  });
}

//highestwicket
function visualizeMatchesPlayedPerYear4(highestWicket) {
  const seriesData = [];
  for(let bowler in highestWicket)
  {
    seriesData.push([bowler,highestWicket[bowler]]);
  }

  Highcharts.chart("highestWicket", {
    chart: {
      type: "column"
    },
    title: {
      text: "top 10 highest wicket taker bowler"
    },
    subtitle: {
      text:
        'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>'
    },
    xAxis: {
      type: "category"
    },
    yAxis: {
      min: 0,
      title: {
        text: "wickets"
      }
    },
    series: [
      {
        name: "Top Bowlers",
        data: seriesData
      }
    ]
  });
}