const calculateAccuracy = (
	h300: number,
	h100: number,
	h50: number,
	h0: number,
) => (h300 * 3 + h100 + h50 / 2) / ((h300 + h100 + h50 + h0) * 3);

const modArray = [
	"NF",
	"EZ",
	"TD",
	"HD",
	"HR",
	"SD",
	"DT",
	"RX",
	"HT",
	"NC",
	"FL",
	"AT",
	"SO",
	"AP",
	"PF",
];

const processMods = (modsNum: number) => {
	const mods: string[] = [];
	modsNum
		.toString(2)
		.split("")
		.toReversed()
		.forEach((flag, idx) => {
			if (+flag && modArray[idx]) mods.push(modArray[idx]);
		});

	return mods;
};

const processRank = (
	h300: number,
	h100: number,
	h50: number,
	h0: number,
	isHD: boolean,
) => {
	const accuracy = calculateAccuracy(h300, h100, h50, h0);
	const maxCombo = h300 + h100 + h50 + h0;
	const badRatio = h50 / maxCombo;
	const greatRatio = h300 / maxCombo;

	if (accuracy === 1 || maxCombo === 0) return isHD ? "XH" : "X";
	if (accuracy > 0.9 && badRatio < 0.01 && h0 === 0) return isHD ? "SH" : "S";
	if ((accuracy > 0.8 && accuracy <= 0.9 && h0 === 0) || greatRatio > 0.9)
		return "A";
	if ((accuracy > 0.7 && accuracy <= 0.8 && h0 === 0) || greatRatio > 0.8)
		return "B";
	if (greatRatio > 0.6 && greatRatio <= 0.8) return "C";
	if (greatRatio <= 0.6) return "D";
};

const processScore = (scoreString: string) => {
	const [
		_id,
		username,
		_score,
		_maxCombo,
		_h50,
		_h100,
		_h300,
		_h0,
		_hK,
		_hG,
		_isPerfect,
		_mods,
		_uid,
		_placement,
		_timestamp,
	] = scoreString.split("|");

	const [
		id,
		score,
		maxCombo,
		h50,
		h100,
		h300,
		h0,
		hK,
		hG,
		isPerfect,
		mods,
		uid,
		placement,
		timestamp,
	] = [
		+_id,
		+_score,
		+_maxCombo,
		+_h50,
		+_h100,
		+_h300,
		+_h0,
		+_hK,
		+_hG,
		+_isPerfect,
		+_mods,
		+_uid,
		+_placement,
		+_timestamp,
	];

	const modsArray = processMods(mods);

	return {
		accuracy: calculateAccuracy(h300, h100, h50, h0),
		created_at: new Date(timestamp * 1000).toISOString(),
		id,
		max_combo: maxCombo,
		mods: modsArray,
		perfect: Boolean(isPerfect),
		rank: processRank(h300, h100, h50, h0, modArray.includes("HD")),
		score,
		statistic: {
			count_100: h100,
			count_300: h300,
			count_50: h50,
			count_geki: hG,
			count_katu: hK,
			count_miss: h0,
		},
		user_id: uid,
		user: {
			username,
		},
	};
};

export { processScore };
