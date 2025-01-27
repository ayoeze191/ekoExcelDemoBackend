import { eventHandler } from "h3";

export default eventHandler((event) => {
  if (!event || !event.node || !event.node.res) {
    console.error("Invalid event or response object");
    return;
  }

  // Set CORS headers for all methods
  event.node.res.setHeader(
    "Access-Control-Allow-Origin",
    "https://ekoexcel.netlify.app"
  ); // Replace with your frontend domain
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
    return; // Early exit to prevent further handling
  }

  // Handle other requests (GET, POST, etc.)
  // Your regular handler logic goes here
});
