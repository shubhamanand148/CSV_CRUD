import fs from "fs";
import {stringify} from "csv-stringify"

async function writeCSV(allUsers, fileName){

    const columns = ["FirstName", "LastName", "EmailID", "Age", "Country" ]
    const writableStream = fs.createWriteStream(fileName);
    const stringifier = stringify({ header: true, columns: columns });

    for(const user of allUsers){
      stringifier.write([user.firstName, user.lastName, user.emailID, user.age, user.country]);
    }
    stringifier.pipe(writableStream);
}

export { writeCSV };