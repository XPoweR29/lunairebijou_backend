import { Request, Response, Router } from "express";
import { GreetingController } from "./greeting.controller";

export const greetingRouter = Router();
const greetingController = new GreetingController();

greetingRouter

.get("/", greetingController.greeting.bind(greetingController))