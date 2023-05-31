import convict from "convict";

export const config = convict({
  port: {
    doc: "Port for request listening from client",
    format: Number,
    default: 8000,
    env: "PORT",
  },
})
  .validate({ allowed: "strict" })
  .getProperties();
