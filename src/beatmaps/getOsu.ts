import axios, { AxiosError } from "axios";
import { Elysia, t } from "elysia";

const getOsu = new Elysia().get(
	"/:id/osu",
	async ({ params: { id }, error }) => {
		try {
			const { data: osuFile } = await axios.get(`https://osu.ppy.sh/osu/${id}`);

			return osuFile;
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

export default getOsu;
