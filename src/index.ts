import { Elysia } from "elysia";
import users from "./users";
import beatmaps from "./beatmaps";
import beatmapsets from "./beatmapsets";
import avatars from "./avatars";

const app = new Elysia()
	.get("/", () => "Try-Z API")
	.use(users)
	.use(avatars)
	.use(beatmaps)
	.use(beatmapsets)
	.listen(3000);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
