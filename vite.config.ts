import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  server: {
    host: "0.0.0.0",
    allowedHosts: ["darna-ae.onrender.com"],
  },

  preview: {
    host: "0.0.0.0",
    allowedHosts: ["darna-ae.onrender.com"],
  },

  tanstackStart: {
    server: { entry: "server" },
  },
});
