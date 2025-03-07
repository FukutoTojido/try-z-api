import { Elysia, t } from "elysia";
import { fetchUser } from "./getUser";

const getUserMode = new Elysia().get(
	"/:id/:mode?",
	async ({ params: { id, mode }, error }) => {
		try {
			const userData = await fetchUser(id, mode);
			if (!userData) return error(404, "Not Found");

			return userData;
		} catch (e) {
			return error(500, "Internal Server Error");
		}
	},
	{
		params: t.Object({
			id: t.String(),
			mode: t.Optional(t.String()),
		}),
	},
);

export default getUserMode;
