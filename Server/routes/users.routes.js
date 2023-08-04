import express from 'express';
import cors from "cors";
import { readCSV } from "../fileHandling/readCSV.js";
import { writeCSV } from "../fileHandling/writeCSV.js";
import { deleteUser } from "../fileHandling/deleteUser.js";

const router = express.Router();
const fileName = "../users.csv";

router.use(
  cors({
    origin: "*",
    methods: ['GET','POST','DELETE'],
    preflightContinue: false
  })
);

//----------------------------- Rest API to get User data -----------------------------//

router.get('/', (req, res) => {
  readCSV(fileName).then(function (data) {
    res.send(data); // Send the data as a response
  }).catch(function (error) {

    // If the file does not exist, create a new file with no data.
    if(error.code == 'ENOENT'){
      writeCSV([], fileName).then(function (){
        // res.status(200);
      })
      .catch(function (err) {
        console.log(err);
      });
    }
    // For any other errors.
    else {
      console.log(error);
      res.status(500).send("Internal Server Error"); // Send an error response to the client
    }
  });
});

//----------------------------- Rest API to post User data -----------------------------//

router.post("/", function(req, res){
  writeCSV(req.body.allUsers, fileName).then(function () {

    // Read the file.
    readCSV(fileName).then(function (data) {
      res.send(data); // Send the data as a response
    })
  }).catch(function (err) {
    res.status(500).send("Internal Server Error"); // Send an error response to the client
    console.log(err);
  });
});

//----------------------------- Rest API to delete a User -----------------------------//

router.delete("/", function(req, res){
  deleteUser(req.body.userIndexToDel, fileName).then(function (newUserList) {

    // Converting users array to user json array
    const newUserListJson = [];
    for(const user of newUserList){
      newUserListJson.push({
        firstName: user[0],
        lastName: user[1],
        emailID: user[2],
        age: user[3],
        country: user[4]
      });
    }

    // Write the new users (after deletion) to the CSV.
    writeCSV(newUserListJson, fileName).then(function () {
      // Read the file.
      readCSV(fileName).then(function (newUserList) {
        res.send(newUserList); // Send the data as a response
      })
    })
  }).catch(function (err) {
    if(error.code == 'ENOENT'){
    // If the file does not exist, create a new file with no data.
      writeCSV([], fileName).then(function (){
        // res.status(200);
      })
      .catch(function (err) {
        console.log(err);
      });
    }
    console.log(err);
    res.status(500).send("Internal Server Error"); // Send an error response to the client
  });
})

export { router };