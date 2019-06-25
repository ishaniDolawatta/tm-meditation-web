import moment from "moment";

export const THEME_TYPE_DAY = "THEME_TYPE_DAY";
export const THEME_TYPE_NIGHT = "THEME_TYPE_NIGHT";
export const DAY_TIME = moment.utc({ hour: 6 }).local(true);
export const NIGHT_TIME = moment.utc({ hour: 18 }).local(true);
