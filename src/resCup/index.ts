import { Elysia } from "elysia";
import getSchedules from "./getSchedules";
import getTeams from "./getTeams";

const resCup = new Elysia().group("/resCup", (app) =>
	app.use(getTeams).use(getSchedules),
);

export default resCup;
