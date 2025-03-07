import { Elysia } from "elysia";
import getBeatmap from "./getBeatmap";
import getBeatmaps from "./getBeatmaps";
import getChecksum from "./getChecksum";
import getOsu from "./getOsu";
import getBeatmapScores from "./getBeatmapScore";

const checksum = new Elysia()
	.group("/checksum", (app) => app.use(getChecksum))
	.group("/h", (app) => app.use(getChecksum));

const beatmaps = new Elysia()
	.group("/beatmaps", (app) =>
		app
			.use(getBeatmap)
			.use(getBeatmapScores)
			.use(getBeatmaps)
			.use(getOsu)
			.use(checksum),
	)
	.group("/b", (app) =>
		app
			.use(getBeatmap)
			.use(getBeatmapScores)
			.use(getBeatmaps)
			.use(getOsu)
			.use(checksum),
	);

export default beatmaps;
