import { Elysia } from "elysia";
import { cors } from '@elysiajs/cors'

import users from "./users";
import beatmaps from "./beatmaps";
import beatmapsets from "./beatmapsets";
import avatars from "./avatars";
import resCup from "./resCup";

const app = new Elysia()
	.use(cors())
	.get("/", () => "Try-Z API")
	.use(users)
	.use(avatars)
	.use(beatmaps)
	.use(beatmapsets)
	.use(resCup)
	.listen(23456);

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
