//https://nitro.unjs.io/config
export default defineNitroConfig({
  plugins: ["plugins/mongoose.ts", "middleware/cors.ts"],
  srcDir: "server",

  compatibilityDate: "2025-01-21",
  preset: "node-server",
  experimental: {
    openAPI: true,
    websocket: true,
    tasks: true,
  },
});
