// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Deployment target is selected via the DEPLOY_TARGET env var:
//   - unset (default) or "cloudflare" → Cloudflare Workers build (used by Lovable's own publish)
//   - "vercel" → disables the Cloudflare plugin so the SSR build runs on Vercel's Node.js runtime
//     via the catch-all function in api/[...all].ts.
//
// Set DEPLOY_TARGET=vercel in Vercel → Project → Settings → Environment Variables.
const isVercel = process.env.DEPLOY_TARGET === "vercel" || !!process.env.VERCEL;

export default defineConfig({
  cloudflare: isVercel ? false : undefined,
  tanstackStart: {
    router: { entry: "router" },
    server: { entry: "server" },
  },
});
