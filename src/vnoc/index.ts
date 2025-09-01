import { Elysia } from "elysia";
import getSchedules from "./getSchedules";
import getTeams from "./getTeams";

const vnoc = new Elysia().group("/vnoc", (app) =>
	app.use(getTeams).use(getSchedules),
);

export default vnoc;
