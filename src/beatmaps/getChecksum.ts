import axios, { AxiosError } from "axios";
import { Elysia, t } from "elysia";
import tokenProvider from "../TokenProvider";

const getChecksum = new Elysia().get(
	"/:checksum",
	async ({ params: { checksum }, error }) => {
		const token = await tokenProvider.getToken();

		try {
			const { data: beatmapData } = await axios.get(
				`https://osu.ppy.sh/api/v2/beatmaps/lookup?checksum=${checksum}`,
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
			return error(500, "Internal Server Error");
		}
	},
	{
		params: t.Object({
			checksum: t.String(),
		}),
	},
);

export default getChecksum;
