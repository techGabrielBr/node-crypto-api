import UsersController from "./UsersController"
import { prismaMock } from "../../singleton"
import User from "../Models/User"
import {
    createRequest, createResponse, MockRequest, MockResponse,
} from 'node-mocks-http';
import { Request, Response } from "express";

describe("user controller tests", () => {
    let req: MockRequest<Request>;
    let res: MockResponse<Response>;
    let next = function(){};

    beforeEach(() => {
        res = createResponse();
    })

    describe("create user function", () => {
        test("should return 201 status code", async () => {
            const user = {
                name: "Gabriel",
                email: "test@test.com",
                password: "123456"
            } as User

            req = createRequest({
                body: user
            });

            prismaMock.user.create.mockImplementation();

            await UsersController.createUser(req, res, next);

            expect(res.statusCode).toBe(201);
        });

        test("should return 422 status code - yup validation success", async () => {
            const user = {
                name: "Gabriel",
                email: 1,
                password: "123456"
            }

            req = createRequest({
                body: user
            });

            prismaMock.user.create.mockImplementation();

            await UsersController.createUser(req, res, next);

            expect(res.statusCode).toBe(422);
        });

        test("should return 422 status code - yup validation success", async () => {
            const user = {
                name: 1,
                email: "test@test.com",
                password: 1
            }

            req = createRequest({
                body: user
            });

            prismaMock.user.create.mockImplementation();

            await UsersController.createUser(req, res, next);

            expect(res.statusCode).toBe(422);
        });
    });

    describe("get all function", () => {
        test("should return all users", async () => {
            const users = [
                {
                    id: 1,
                    name: "Gabriel",
                    email: "test@test.com",
                    active: true
                },
                {
                    id: 2,
                    name: "Gabriel2",
                    email: "test@test2.com",
                    active: false
                }
            ] as User[]

            req = createRequest({});

            prismaMock.user.findMany.mockResolvedValue(users);

            await UsersController.getAll(req, res, next);

            expect(res._getData()).toBe(users);
        });
    });

    describe("auth user function", () => {
        test("should return auth true message", async () => {
            const user = {
                email: "test@test.com",
                password: "12345"
            }

            const returnedUser = {
                id: 1,
                name: "Gabriel",
                email: "test@test.com",
                active: true
            } as User

            req = createRequest({
                body: user
            });

            prismaMock.user.findUnique.mockResolvedValue(returnedUser);

            await UsersController.authUser(req, res, next);

            expect(res._getData()).toStrictEqual({authenticated: true});
        });

        test("should return incorrect credentials message", async () => {
            const user = {
                email: "test@test.com",
                password: "12345"
            }

            const returnedUser = null;

            req = createRequest({
                body: user
            });

            prismaMock.user.findUnique.mockResolvedValue(returnedUser);

            await UsersController.authUser(req, res, next);

            expect(res._getData()).toStrictEqual({message: "Incorrect username and/or password"});
        });

        test("should return 422 status code", async () => {
            const user = {
                email: "test@test.com",
                password: 1
            }

            req = createRequest({
                body: user
            });

            prismaMock.user.findUnique.mockImplementation();

            await UsersController.authUser(req, res, next);

            expect(res.statusCode).toBe(422);
        });
    });
});
