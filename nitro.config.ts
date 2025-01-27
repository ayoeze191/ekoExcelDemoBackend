//https://nitro.unjs.io/config
export default defineNitroConfig({
  plugins: ["plugins/mongoose.ts", "middleware/cors.ts"],
  srcDir: "server",
  compatibilityDate: "2025-01-21",
  experimental: {
    openAPI: true,
    websocket: true,
    tasks: true,
  },
});
console.log();
