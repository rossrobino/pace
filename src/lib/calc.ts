/**
 * Peter S. Riegel pace formula from "Athletic Records and Human Endurance".
 *
 * https://www.nku.edu/~longa/classes/mat375/days/docs/CrossCountry/riegel.pdf
 *
 * @param seconds Time for known distance
 * @param knownMeters Known distance
 * @param unknownMeters Distance to estimate time for
 * @returns Estimated time
 */
export const pace = (
	seconds: number,
	knownMeters: number,
	unknownMeters: number,
) => {
	return formatHMS(seconds * (unknownMeters / knownMeters) ** 1.06);
};

/**
 * Format seconds into HH:MM:SS
 *
 * @param seconds
 * @returns Formatted time string
 */
const formatHMS = (seconds: number) => {
	const s = Math.abs(Math.trunc(seconds));
	const sec = s % 60;
	return `${seconds < 0 ? "-" : ""}${Math.floor(s / 3_600)}:${String(
		Math.floor((s % 3_600) / 60),
	).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
};

/**
 * Convert miles to meters.
 *
 * @param mi Miles
 * @returns Meters
 */
export const milesToMeters = (mi: number) => mi * 1_609.34;
