import { Component, OnInit } from '@angular/core';
import axios from "axios";
import { UserModel } from '../Models/UserModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  user = new UserModel();
  allUsers: UserModel[] = []; //List of users
  errorOccured: number = 0; // To track error.
  API_URL: string = "http://localhost:3002/users"

  constructor() {}

  // Load the CSV data when the website is opened.
  ngOnInit() {
    this.errorOccured = 0;
    axios.get(this.API_URL)
    .then((response) => {
      // this.allUsers.push(response.data);
      this.convertDataToUserModel(response.data);
    })
    .catch((error) => {
      if (error.code == 'ERR_NETWORK') {
        // Error if unable to connect to backend.
        this.errorOccured = 1;
        console.log("Error status:", error.response.status);
        console.log("Error data:", error.response.data);
        this.refreshPage();
      }
      // If the file does not exists. Create a file in backend and refresh the page.
      else if( error.code == 'ERR_BAD_RESPONSE'){
        this.refreshPage();
      } else {
        // Something else went wrong
        console.log("Error is this:", error);
      }
    });
  }

  // // Convert the received data into UserModel.
  convertDataToUserModel(data){
    this.allUsers = data.map(userData => ({
      firstName: userData.firstName,
      lastName: userData.lastName,
      emailID: userData.emailID,
      age: userData.age,
      country: userData.country
    }));
    if(this.allUsers.length == 0) this.allUsers.push(this.user); // Add a row if there is none.
  }

  // Adds a new row to the CSV.
  addRow(index: number) {
    const newUser: UserModel = {
      firstName: "",
      lastName: "",
      emailID: "",
      age: 0,
      country: ""
    };

    this.allUsers.splice(index+1, 0, newUser);
    this.saveUsers();
  }

  // Save the users to the CSV.
  saveUsers() {
    this.errorOccured = 0;
    // Call the backend to save users
    axios.post(this.API_URL, {
      allUsers: this.allUsers,
    })
    .then((response) => {
      this.convertDataToUserModel(response.data);
      // this.allUsers.push(response.data);
    })
    .catch((error) => {
      if (error.code == 'ERR_NETWORK' || error.code == 'ERR_BAD_RESPONSE') {
        // Error if unable to connect to backend.
        this.errorOccured = 1;
        console.log("Error status:", error.response.status);
        console.log("Error data:", error.response.data);
        this.refreshPage();
      } else {
        // Something else went wrong
        console.log("Error is this:", error);
      }
    });
  }

  // Delete a user.
  deleteUser(index: number) {
    this.errorOccured = 0;
    // Call the backend to delete user
    axios.delete(this.API_URL, {
      data: { userIndexToDel: index }
    })
    .then((response) => {
      this.convertDataToUserModel(response.data);
      // this.allUsers.push(response.data);
    })
    .catch((error) => {
      if (error.code == 'ERR_NETWORK' || error.code == 'ERR_BAD_RESPONSE') {
        // Error if unable to connect to backend.
        this.errorOccured = 1;
        console.log("Error status:", error.response.status);
        console.log("Error data:", error.response.data);
        this.refreshPage();
      } else {
        console.log("Error is this:", error); // Something else went wrong
      }
    });
  }

  // Function to reload the application
  refreshPage() {
    window.location.reload();
  }
}
