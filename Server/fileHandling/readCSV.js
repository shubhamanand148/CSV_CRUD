import fs from "fs";
import { parse } from "csv-parse";
import util from "util";

//Convert the callback-based fs.createReadStream into a promise-based function.
const readFileAsync = util.promisify(fs.readFile);
async function readCSV(fileName){

  const fileData = await readFileAsync(fileName);
  return new Promise(function (resolve, reject) {
    let allUsers = [];
    const file = fs.createReadStream(fileName)
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", function (row) { // Retrieving one row from the CSV.
      allUsers.push(row); // Pushing the row to the CSV.
    }).on("end", function () {
      console.log("finished");
      resolve(allUsers); // Resolving the list of users.
    }).on("error", function (error) {
      console.log("Error");
      reject(error); 
    });
  });
}

export {readCSV};