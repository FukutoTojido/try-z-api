import { Elysia, t } from "elysia";
import { fetchUser } from "../users/getUser";

const getAvatar = new Elysia().get(
	"/:id",
	async ({ params: { id }, error, redirect }) => {
		try {
			const userData = await fetchUser(id);
			if (!userData) return redirect("https://a.ppy.sh");

			return redirect(userData.avatar_url);
		} catch (e) {
			return error(500, "Internal Server Error");
		}
	},
	{
		params: t.Object({
			id: t.String(),
		}),
	},
);

export default getAvatar;
