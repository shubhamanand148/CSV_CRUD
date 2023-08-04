This is a MEAN Stack project which does CRUD operation on a CSV file named "users.csv" in the root directory.

# There are 2 files in this project:
1. Client: This is the Frontend part of the project.
2. Server: This is the Backend of the project.

# To Run the project:
1. For Running the Server:
    1. Open "Server" folder in terminal.
    2. Install dependencies by running: npm install
    3. Run: nodemon server.js

2. For running the Frontend:
    1. In new terminal, Open "Client" folder.
    2. Install dependencies by running: npm install
    3. Run: ng serve

It will read the CSV file and fetch the data saved in CSV file and show on the Webpage.

# The CSV file has 5 columns:
1. First Name
2. Last Name
3. Email ID
4. Age
5. Country

# You can Add/Edit/Delete data from the CSV file.
1. To Add a new row, click on Add.
2. To Delete a row, click on Delete.
3. To Save the data, click on Save. The data entered in the webpage, will not be saved until, the save button is pressed.

# For Unit testing the Server.
1. Open the Server folder in terminal.
2. Install dependencies by running: npm install
3. Run: npm run test

# For unit testing the Angular frontend.
1. Open the Client folder in terminal.
2. Install dependencies by running: npm install
3. Run: ng serve