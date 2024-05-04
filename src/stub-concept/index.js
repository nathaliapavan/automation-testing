import Service from "./service.js";

const data = {
  username: `natpavan-${Date.now()}`,
  password: "strongP4$s",
};

const service = new Service({ filename: "./users.ndjson" });
await service.create(data);

const users = await service.read();
console.log("users", users);
