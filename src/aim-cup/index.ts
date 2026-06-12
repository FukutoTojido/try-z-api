import { Elysia } from "elysia";
import getSchedules from "./getSchedules";
import getTeams from "./getTeams";

const aimCup = new Elysia().group("/aim-cup", (app) =>
	app.use(getTeams).use(getSchedules),
);

export default aimCup;
