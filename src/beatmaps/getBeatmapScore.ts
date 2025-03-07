import axios, { AxiosError } from "axios";
import { Elysia, t } from "elysia";
import tokenProvider from "../TokenProvider";
import { fetchBeatmap } from "./getBeatmap";
import { processScore } from "./utils";

const getGlobalScores = async (id: number) => {
	const token = await tokenProvider.getToken();

	try {
		const { data: beatmapScoresData } = await axios.get(
			`https://osu.ppy.sh/api/v2/beatmaps/${id}/scores`,
			{
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: `Bearer ${token}`,
				},
			},
		);

		return beatmapScoresData;
	} catch (e) {
		if (e instanceof AxiosError) console.error(e);
		return null;
	}
};

const getCountryScores = async (id: number) => {
    const beatmapData = await fetchBeatmap(id);
	if (!beatmapData) return null;
    
	const { checksum } = beatmapData;
	const { USERNAME_OSU, PASSWORD_MD5 } = import.meta.env;

	try {
		const { data: scores } = await axios.get("/osu-osz2-getscores.php", {
			baseURL: "https://osu.ppy.sh/web",
			headers: {
				"User-Agent": "osu!",
				Host: "osu.ppy.sh",
				"Accept-Encoding": "gzip, deflate",
			},
			params: {
				s: 0,
				vv: 4,
				v: 4,
				c: checksum,
				m: 0,
				i: id,
				mods: 0,
				us: USERNAME_OSU,
				ha: PASSWORD_MD5,
			},
		});

		return {
			scores: scores.match(/^[0-9]+\|[A-Za-z_\[\]-\s]{3,16}(\|[0-9]+){1,14}$/gm).map(processScore),
		};
	} catch (e) {
		console.error(e);
		return null;
	}
};

const getBeatmapScores = new Elysia().get(
	"/:id/scores",
	async ({ params: { id }, query: { passphrase }, error }) => {
		try {
			const scores = passphrase === import.meta.env.PASSPHRASE
				? await getCountryScores(id)
				: await getGlobalScores(id);

			if (!scores) return error(500, "Internal Server Error");
			return scores;
		} catch (e) {
			console.error(e);
			return error(500, "Internal Server Error");
		}
	},
	{
		params: t.Object({
			id: t.Number(),
		}),
		query: t.Object({
			passphrase: t.Optional(t.String()),
		}),
	},
);

export default getBeatmapScores;
