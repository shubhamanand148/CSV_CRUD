import chai, { expect } from "chai"
import chaiHttp from "chai-http"
// import {server} from "../server"
// import should from "should";
// import supertest from "supertest";

const server = "http://localhost:3002"
chai.should();
chai.use(chaiHttp);

// Test if the connection to server exists.
describe("Check server", () => {
    describe("GET http://localhost:3002", () => {
        it("It should connect to the server.", (done) => {
            chai.request(server)
            .get("/")
            .end((err, response) => {
                response.should.have.status(200);
            done()
            });
        });
    });
});

describe("Check Users API", () => {

    // Test if the API able to GET users data
    describe("GET /users", () => {
        it("Get a list of all the users in a CSV file.", (done) => {
            chai.request(server)
            .get("/users")
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a("array");
            done()
            })
        })
    })

    // Test if the API able to Save/POST users data
    describe("POST /users", () => {
        it("Save a new user and get a list of all the users in a CSV file.", (done) => {
            const users = [{
                firstName: "FNTest1",
                lastName: "LNTest1",
                emailID: "ETest1",
                age: "1",
                country: "CTest1"
            }];
            chai.request(server)
            .post("/users")
            .send({allUsers: users})
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a("array");
                response.body[0][0].should.eq(users[0].firstName);
                response.body[0][1].should.eq(users[0].lastName);
                response.body[0][2].should.eq(users[0].emailID);
                response.body[0][3].should.eq(users[0].age);
                response.body[0][4].should.eq(users[0].country);
            done()
            });
        });
    });

    // Test if the API able to Delete users data
    describe("DELETE /users", () => {
        it("Delete a user and get a list of all the remaining users in a CSV file.", (done) => {
            const index = 1
            chai.request(server)
            .delete("/users")
            .send({userIndexToDel: index})
            .end((err, response) => {
                response.should.have.status(200);
                response.body.should.be.a("array");
            done()
            });
        });
    });
});