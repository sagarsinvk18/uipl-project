const fs = require("fs");
const csv = require("csvtojson");
const extraRunConceded = require("./func/extraRunConceded");
const economy = require("./func/economy");
const highestWicket = require("./func/highestWicket");
const matchesPlayedPerYear = require("./func/matchesPlayedPerYear");
const wonMatchPerTeam = require("./func/wonMatchPerTeam");
const MATCHES_FILE_PATH="./csv_data/matches.csv";
const DELIVERIES_FILE_PATH="./csv_data/deliveries.csv";
const JSON_OUTPUT_FILE_PATH= "./public/data.json";
function main()
{
    csv()
        .fromFile(MATCHES_FILE_PATH)
        .then(matches => {
          csv()
            .fromFile(DELIVERIES_FILE_PATH)
            .then(deliveries => {
                let result1 = extraRunConceded(matches,deliveries);
                let result2 = economy(matches,deliveries);
                let result3 = highestWicket(deliveries);
                let result4 = matchesPlayedPerYear(matches);
                let result5 = wonMatchPerTeam(matches);
                saveMatchesPlayedPerYear(result1,result2,result3,result4,result5);
            });

});
}

function saveMatchesPlayedPerYear(result1,result2,result3,result4,result5) {
    const jsonData = {
      extraRunConceded: result1,
      economy :result2,
      highestWicket :result3,
      matchesPlayedPerYear : result4,
      wonMatchPerTeam : result5
    };
    const jsonString = JSON.stringify(jsonData);
    fs.writeFile(JSON_OUTPUT_FILE_PATH, jsonString, "utf8", err => {
      if (err) {
        console.error(err);
      }
    });
  }

main();