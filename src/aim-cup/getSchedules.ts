import { Elysia, t } from "elysia";
import { readTeamFromSheet } from "./getTeams";
import { getSheetData } from "./sheets";

const ROUNDS_MAP = {
	0: "Swiss Stage 1",
	1: "Swiss Stage 2",
	2: "Swiss Stage 3",
	3: "Quarterfinals",
	4: "Semifinals",
	5: "Finals",
	6: "Grand Finals",
};

const placeholder = {
	name: "",
	id: "",
	avatarURL: "",
	members: [],
	seed: 0,
};

const getSchedules = new Elysia().get(
	"/schedules/:id",
	async ({ params: { id }, error }) => {
		try {
			const roundName =
				id > 5 || id < 0
					? ROUNDS_MAP[0]
					: ROUNDS_MAP[id as 0 | 1 | 2 | 3 | 4 | 5 | 6];

			const { teams } = (await readTeamFromSheet()) ?? { teams: [] };

			const response = await getSheetData("schedule");
			if (!response) {
				return null;
			}

			const {
				data: { values },
			} = response;

			if (!values) {
				return { matchups: [] };
			}

			const [_, ...raw] = values;
			const data = raw.map(
				([stage, id, time, red, blue, scoreRed, scoreBlue]) => {
					return {
						stage,
						id,
						time,
						red,
						blue,
						scoreRed,
						scoreBlue,
					};
				},
			);

			const filtered = data.filter((match) => match.stage === roundName);
			const transformed = filtered.map(
				({ id, time, scoreRed, scoreBlue, red, blue }) => {
					return {
						id,
						date: time ?? 0,
						player: {
							red: teams.find((team) => team.id === red) ?? {
								...placeholder,
								name: red,
							},
							blue: teams.find((team) => team.id === blue) ?? {
								...placeholder,
								name: blue,
							},
						},
						score: {
							red: scoreRed || 0,
							blue: scoreBlue || 0,
						},
					};
				},
			);

			return { matchups: transformed };
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
