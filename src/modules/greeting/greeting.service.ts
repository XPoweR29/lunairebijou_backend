export class GreetingService {

    greeting(): string {
        const greetMsg = `<h1 style="text-align: center;">Hello from Backend!</h1>`;
        return greetMsg;
    };
}