import { google } from "googleapis";

const auth = await google.auth.getClient({
	scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
});

const sheets = google.sheets({ version: "v4", auth });

export const getSheetData = async (name: string) => {
	try {
		return (
			(await sheets?.spreadsheets.values.get({
				spreadsheetId: process.env.SHEET_ID,
				range: name,
			})) ?? {}
		);
	} catch (e) {
		console.error(e);
		return null;
	}
};
