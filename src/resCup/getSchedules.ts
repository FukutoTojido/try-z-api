import axios from "axios";
import { Elysia, t } from "elysia";

const getSchedules = new Elysia().get(
	"/schedules/:id",
	async ({ params: { id }, error }) => {
		try {
			const { data } = await axios.get(
				`https://open.corsace.io/api/round/${id}/matchups`,
			);

			if (!data.success)
				return {
					matchups: [],
				};

			return data;
		} catch (e) {
			console.error(e);
			return error(500, "Internal Server Error");
		}
	},
	{
		params: t.Object({
			id: t.Number(),
		}),
	},
);

export default getSchedules;
