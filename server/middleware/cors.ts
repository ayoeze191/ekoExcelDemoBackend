import { eventHandler } from "h3";

export default eventHandler((event) => {
  if (!event || !event.node || !event.node.res) {
    console.error("Invalid event or response object");
    return;
  }
  event.node.res.setHeader(
    "Access-Control-Allow-Origin",
    "http://localhost:3001"
  );
  event.node.res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  event.node.res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
  event.node.res.setHeader("Access-Control-Allow-Credentials", "true");

  // Handle preflight (OPTIONS) requests
  if (event.node.req.method === "OPTIONS") {
    event.node.res.statusCode = 204; // No Content
    event.node.res.end();
  }
});
