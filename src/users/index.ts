import { Elysia } from "elysia";
import getUser from "./getUser";
import getUsers from "./getUsers";
import getUserMode from "./getUserMode";

const users = new Elysia()
	.group("/users", (app) => app.use(getUser).use(getUserMode).use(getUsers))
	.group("/u", (app) => app.use(getUser).use(getUserMode).use(getUsers));

export default users;
