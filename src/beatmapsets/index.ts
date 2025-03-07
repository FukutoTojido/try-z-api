import Elysia from "elysia";
import getBeatmapset from "./getBeatmapset";

const beatmapsets = new Elysia()
	.group("/beatmapsets", (app) => app.use(getBeatmapset))
	.group("/s", (app) => app.use(getBeatmapset));

export default beatmapsets;
