import axios from "axios";
import { Elysia } from "elysia";

const getTeams = new Elysia().get("/teams", async ({ error }) => {
	try {
		return (await axios.get("https://open.corsace.io/api/tournament/10/teams"))
			.data;
	} catch (e) {
		console.error(e);
		return error(500, "Internal Server Error");
	}
});

export default getTeams;