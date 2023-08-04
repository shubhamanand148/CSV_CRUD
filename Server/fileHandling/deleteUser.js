// import { readCSV } from "../fileHandling/readCSV.js";
import fs from "fs";
import { parse } from "csv-parse";
import util from "util";

//Convert the callback-based fs.createReadStream into a promise-based function.
const readFileAsync = util.promisify(fs.readFile);
async function deleteUser(userIndexToDel, fileName){

  //Reading the file
  const fileData = await readFileAsync(fileName);
  return new Promise(function (resolve, reject) {
    let allUsers = [];
    const file = fs.createReadStream(fileName)
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", function (row) {
      allUsers.push(row);
    }).on("end", function () {
      console.log("File reading finished");
      allUsers.splice(userIndexToDel, 1)
      resolve(allUsers); // Deleting the selected user and returning the list of new users 
    }).on("error", function (error) {
      console.log("Error");
      reject(error); 
    });
  });
}




// async function deleteUser(userIndexToDel, fileName){

//   // Reading the file to get all the users.

//   readCSV(fileName).then(function (allUsers) {
//     console.log(allUsers);
//     return allUsers.splice(userIndexToDel, 1); // Deleting the selected user and returning the list of new users
//   }).catch(function (error) {
//     console.log(error);
//     res.status(500).send("Internal Server Error");
//   });
// }

export {deleteUser};