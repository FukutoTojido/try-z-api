import axios, { AxiosError } from "axios";
import { Elysia, t } from "elysia";
import tokenProvider from "../TokenProvider";

const getBeatmapset = new Elysia().get(
	"/:id",
	async ({ params: { id }, error }) => {
		const token = await tokenProvider.getToken();

		try {
			const { data: beatmapsetData } = await axios.get(
				`https://osu.ppy.sh/api/v2/beatmapsets/${id}`,
				{
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json",
						Authorization: `Bearer ${token}`,
					},
				},
			);

			return beatmapsetData;
		} catch (e) {
			if (e instanceof AxiosError) console.error(e.message);
			return error(500, "Internal Server Error");
		}
	},
	{
		params: t.Object({
			id: t.Number(),
		}),
	},
);

export default getBeatmapset;
