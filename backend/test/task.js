/* eslint-env mocha */
/** global: server */

// process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const { app: server } = require("../app.js");

const mongoose = require('mongoose');

chai.should();

chai.use(chaiHttp);

let userId;
let taskId;
let fakeTaskId = "61d37e42dc79ead6cfe2bb1f";

before((done) => {
    const { users, tasks } = mongoose.connection.collections;

    tasks.drop(() => {
        users.drop(() => {
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
                    userId = res.body.createdUser._id;
                    res.should.have.status(201);
                    done();
                });
        });
    });
});

describe('Tasks model', () => {
    describe('POST /tasks', () => {
        it('should get 401 for missing user', (done) => {
            let task = {
                description: "a test task",
                category: "test",
                state: "planned"
            };

            chai.request(server)
                .post("/tasks")
                .send(task)
                .end((err, res) => {
                    if (err) {done(err);}
                    res.should.have.status(401);
                    res.body.should.have.property("message");
                    res.body.message.should.equal("User missing.");
                    done();
                });
        });
        it('should get 201 adding task', (done) => {
            let task = {
                user: userId,
                description: "a test task",
                category: "test",
                state: "planned"
            };

            chai.request(server)
                .post("/tasks")
                .send(task)
                .end((err, res) => {
                    if (err) {done(err);}
                    res.should.have.status(201);
                    res.body.should.be.an("object");
                    res.body.should.have.property("createdTask");
                    res.body.should.have.property("message");
                    taskId = res.body.createdTask._id;
                    res.body.message.should.equal("Task created.");
                    done();
                });
        });
    });
    describe('GET /tasks', () => {
        it('200 HAPPY PATH for tasks', (done) => {
            chai.request(server)
                .get("/tasks")
                .end((err, res) => {
                    if (err) {done(err);}
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    done();
                });
        });
    });
    describe('GET /tasks/:id', () => {
        it('200 HAPPY PATH for tasks by id', (done) => {
            chai.request(server)
                .get(`/tasks/${taskId}`)
                .end((err, res) => {
                    if (err) {done(err);}
                    res.should.have.status(200);
                    res.body.should.be.an("object");
                    done();
                });
        });
        it('should get 404 no entry for provided id', (done) => {
            chai.request(server)
                .get(`/tasks/${fakeTaskId}`)
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
                .get(`/tasks/${taskId}1`)
                .end((err, res) => {
                    if (err) {done(err);}
                    res.should.have.status(500);
                    done();
                });
        });
    });
});
