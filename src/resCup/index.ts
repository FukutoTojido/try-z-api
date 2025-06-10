import { Elysia } from "elysia";
import getTeams from "./getTeams";
import getSchedules from "./getSchedules";

const resCup = new Elysia().group("/resCup", (app) =>
	app.use(getTeams).use(getSchedules),
);

export default resCup;
