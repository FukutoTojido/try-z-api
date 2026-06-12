import { sheets } from "../resCup/sheets";

export const getSheetData = async (name: string) => {
	try {
		return (
			(await sheets?.spreadsheets.values.get({
				spreadsheetId: process.env.SHEET_AIM_CUP_ID,
				range: name,
			})) ?? {}
		);
	} catch (e) {
		console.error(e);
		return null;
	}
};
