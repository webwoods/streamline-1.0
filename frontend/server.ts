import pkg from 'http-proxy';
const { createProxyServer } = pkg;
import { createServer } from "http";
import { parse } from "url";
import next from "next";
import nextConfig from "./next.config.js";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
const customServer = true;
const conf = nextConfig;

const proxy = createProxyServer({
  target: "http://localhost:3333", // Set the target URL for the proxy
  changeOrigin: true, // Change the origin of the host header to the target URL
});

const app = next({
  dev,
  hostname,
  port,
  customServer,
  conf,
});

const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    try {
      const parsedUrl = parse(req.url ?? "", true);
      const { pathname, query } = parsedUrl;

      if (pathname?.startsWith("/graphql")) {
        proxy.web(req, res); // Proxy requests to /graphql to the backend
      } else {
        handle(req, res, parsedUrl);
      }
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("Internal server error");
    }
  })
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
