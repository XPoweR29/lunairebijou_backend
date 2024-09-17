import { Request, Response } from "express";
import { GreetingService } from "./greeting.service";

export class GreetingController {
	private greetingService:GreetingService;

	constructor() {
		this.greetingService = new GreetingService();
	}

	greeting(req: Request, res: Response): void {
		const greetMsg = this.greetingService.greeting();
        res.send(greetMsg);
	}
}