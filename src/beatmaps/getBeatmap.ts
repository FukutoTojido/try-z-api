import axios, { AxiosError } from "axios";
import { Elysia, t } from "elysia";
import tokenProvider from "../TokenProvider";

export const fetchBeatmap = async (id: number) => {
	const token = await tokenProvider.getToken();
	try {
		const { data: beatmapData } = await axios.get(
			`https://osu.ppy.sh/api/v2/beatmaps/${id}`,
			{
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: `Bearer ${token}`,
				},
			},
		);

		return beatmapData;
	} catch (e) {
		if (e instanceof AxiosError) console.error(e.message);
		return null;
	}
};

const getBeatmap = new Elysia().get(
	"/:id",
	async ({ params: { id }, error }) => {
		try {
			const beatmapData = await fetchBeatmap(id);

			if (!beatmapData) return error(404, "Not Found");
			return beatmapData;
		} catch (e) {
			return error(500, "Internal Server Error");
		}
	},
	{
		params: t.Object({
			id: t.Number(),
		}),
	},
);

export default getBeatmap;
