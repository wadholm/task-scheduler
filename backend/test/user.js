/* eslint-env mocha */
/** global: server */

// process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const { app: server } = require("../app.js");

const mongoose = require('mongoose');

chai.should();

chai.use(chaiHttp);

let id;
let fakeId = "619f6ee3d0b6c914a2b58513";

before((done) => {
    mongoose.connection.collections.users.drop(() => {
        done();
    });
});

describe('Users model', () => {
    describe('POST /users', () => {
        it('should get 401 for missing email', (done) => {
            let user = {
                password: "test"
            };

            chai.request(server)
                .post("/users")
                .send(user)
                .end((err, res) => {
                    if (err) {done(err);}
                    res.should.have.status(401);
                    res.body.should.have.property("message");
                    res.body.message.should.equal("Email or password missing.");
                    done();
                });
        });
        it('should get 201 adding user', (done) => {
            let user = {
                name: "John Doe",
                email: "test@example.com",
                password: "123test"
            };

            chai.request(server)
                .post("/users")
                .send(user)
                .end((err, res) => {
                    if (err) {done(err);}
                    res.should.have.status(201);
                    res.body.should.be.an("object");
                    res.body.should.have.property("createdUser");
                    res.body.should.have.property("message");
                    id = res.body.createdUser._id;
                    res.body.message.should.equal("User created.");
                    done();
                });
        });
        it('should get 409 for user already exists', (done) => {
            let user = {
                name: "John Doe",
                email: "test@example.com",
                password: "123test"
            };

            chai.request(server)
                .post("/users")
                .send(user)
                .end((err, res) => {
                    if (err) {done(err);}
                    res.should.have.status(409);
                    res.body.should.have.property("message");
                    res.body.message.should.equal("Email already exists");
                    done();
                });
        });
        it('should get 500 for required fields missing', (done) => {
            let user = {
                email: "test2@example.com",
                password: "123test"
            };

            chai.request(server)
                .post("/users")
                .send(user)
                .end((err, res) => {
                    if (err) {done(err);}
                    res.should.have.status(500);
                    res.body.should.have.property("error");
                    res.body.error.errors.name.message.should.equal("Path `name` is required.");
                    done();
                });
        });
    });
    describe('GET /users', () => {
        it('200 HAPPY PATH for users', (done) => {
            chai.request(server)
                .get("/users")
                .end((err, res) => {
                    if (err) {done(err);}
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    done();
                });
        });
    });
    describe('GET /users/:id', () => {
        it('200 HAPPY PATH for users by id', (done) => {
            chai.request(server)
                .get(`/users/${id}`)
                .end((err, res) => {
                    if (err) {done(err);}
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    done();
                });
        });
        it('should get 404 no entry for provided id', (done) => {
            chai.request(server)
                .get(`/users/${fakeId}`)
                .end((err, res) => {
                    if (err) {done(err);}
                    res.should.have.status(404);
                    res.body.should.be.an("object");
                    res.body.should.have.property("message");
                    res.body.message.should.equal("No valid entry found for provided ID.");
                    done();
                });
        });
        it('should get 500 no entry for incorrect id', (done) => {
            chai.request(server)
                .get(`/users/${id}1`)
                .end((err, res) => {
                    if (err) {done(err);}
                    res.should.have.status(500);
                    done();
                });
        });
    });
});

