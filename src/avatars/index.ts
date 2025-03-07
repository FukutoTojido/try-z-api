import { Elysia, t } from "elysia";
import getAvatar from "./getAvatar";

const avatars = new Elysia()
	.group("/avatars", (app) => app.use(getAvatar))
	.group("/a", (app) => app.use(getAvatar));

export default avatars;
