import { PORT } from "..";

export const initialLog = () => {
	console.log("");
	console.log("\x1b[36m%s\x1b[0m", "╔═══════════════════════╗");
	console.log("\x1b[36m%s\x1b[0m", "║ \x1b[32mServer up and runing!\x1b[36m ║");
	console.log("\x1b[36m%s\x1b[0m", "╚═══════════════════════╝");
	console.log(
		"\x1b[33m%s\x1b[0m",
		`>> listening on \x1b[34mhttp://localhost:${PORT}\x1b[33m <<`
	);
};

export const serverLog = (message: string) => {
	console.log(`\x1b[34m[server.log]\x1b[93m ${message} \x1b[0m`);
};