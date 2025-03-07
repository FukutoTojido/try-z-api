import { Elysia, t } from "elysia";
import axios, { AxiosError } from "axios";
import tokenProvider from "../TokenProvider";

export const fetchUser = async (id: string, mode?: string) => {
	const token = await tokenProvider.getToken();

	try {
		const userQuery = /^[0-9]+$/g.test(id) ? id : `@${id}`;
		const m = ["osu", "taiko", "mania", "fruits"].includes(mode ?? "")
			? mode
			: "";
		const { data: userData } = await axios.get(
			`https://osu.ppy.sh/api/v2/users/${userQuery}/${m}`,
			{
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: `Bearer ${token}`,
				},
			},
		);

		return userData;
	} catch (e) {
		if (e instanceof AxiosError) console.error(e.message);
		return null;
	}
};

const getUser = new Elysia().get(
	"/:id",
	async ({ params: { id }, error }) => {
		try {
			const userData = await fetchUser(id);
			if (!userData) return error(404, "Not Found");

			return userData;
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

export default getUser;
