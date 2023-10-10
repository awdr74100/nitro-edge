// https://nitro.unjs.io/config
export default defineNitroConfig({
  runtimeConfig: {
    localDatabaseUrl: "",
    neonDatabaseUrl: "",
    tursoDatabaseUrl: "",
    tursoAuthToken: "",
  },
  preset: "vercel-edge",
});
