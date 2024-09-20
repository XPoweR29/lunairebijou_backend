import "reflect-metadata";
import * as dotenv from "dotenv";
import { DataSource } from "typeorm";
dotenv.config();

let dataSource: DataSource | null = null;
const entitiesPath = process.env.NODE_ENV === "production"
		? "dist/entities/**.entity.js"
		: "src/entities/**.entity.ts";

export const initializeDatabase = async (): Promise<DataSource> => {
	if (dataSource && dataSource.isInitialized) {
		console.log("Data Source is already initialized 💾 ➡ ✅");
		return dataSource;
	}
	try {
		dataSource = new DataSource({
			type: "mysql",
			host: process.env.DB_HOSTNAME,
			port: 3306,
			username: process.env.DB_USER,
			password: process.env.DB_PASS,
			database: process.env.DB_DATABASE,
			synchronize: false,
			logging: false,
			entities: [entitiesPath],
			migrations: [],
			subscribers: [],
		});

		await dataSource.initialize();
		console.log("Data Source has been initialized successfully 💾 ➡ ✅");

		return dataSource;
	} catch (err) {
		console.error("Error during Data Source initialization ❌");
		throw new Error(err);
	}
};
