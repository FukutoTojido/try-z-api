import { Elysia, t } from "elysia";
import axios, { AxiosError } from "axios";
import tokenProvider from "../TokenProvider";

const toQueryParams = (ids: number[]) => ids.map(id => `ids[]=${id}`).join("&");

const getUsers = new Elysia().get(
	"/",
	async ({ query: { ids }, error }) => {
		const token = await tokenProvider.getToken();

		try {
			const { data: usersData } = await axios.get(
				`https://osu.ppy.sh/api/v2/users?${toQueryParams(ids)}`,
				{
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json",
						Authorization: `Bearer ${token}`,
					},
				},
			);

			return usersData;
		} catch (e) {
			if (e instanceof AxiosError) console.error(e.message);
			return error(500, "Internal Server Error");
		}
	},
	{
		query: t.Object({
            ids: t.Array(t.Number())
        })
	},
);

export default getUsers;
