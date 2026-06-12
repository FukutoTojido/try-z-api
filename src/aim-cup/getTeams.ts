import { Elysia } from "elysia";
import { getSheetData } from "./sheets";

export const readTeamFromSheet = async () => {
	const response = await getSheetData("teams");
	if (!response) {
		return null;
	}

	const {
		data: { values },
	} = response;

	if (!values) {
		return { teams: [] };
	}

	const [_, ...raw] = values;
	const data = raw.map(
		([seed, name, acronym, avatarURL, p1, p2, p3, p4, p5]) => {
			return {
				name,
				id: acronym,
				avatarURL,
				members: [p1, p2, p3, p4, p5].filter((p) => p),
				seed: seed || 0,
			};
		},
	);

	return { teams: data };
};

const getTeams = new Elysia().get("/teams", async ({ error }) => {
	try {
		const data = await readTeamFromSheet();

		if (data === null) {
			return error(500, "Internal Server Error");
		}

		return data;
	} catch (e) {
		console.error(e);
		return error(500, "Internal Server Error");
	}
});

export default getTeams;
