import fs from "fs";
import { parse } from "csv-parse";
import util from "util";
import { UserModel } from '../Models/UserModel.js';

//Convert the callback-based fs.createReadStream into a promise-based function.
const readFileAsync = util.promisify(fs.readFile);
async function readCSV(fileName){

  const fileData = await readFileAsync(fileName);
  return new Promise(function (resolve, reject) {
    let allUsers = [];
    const file = fs.createReadStream(fileName)
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", function (row) { // Retrieving one row from the CSV.

      // Converting row to the UserModel
      const user = new UserModel();
      user.firstName = row[0];
      user.lastName = row[1];
      user.emailID = row[2];
      user.age = row[3];
      user.country = row[4]

      allUsers.push(user); // Pushing the row to the CSV.

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