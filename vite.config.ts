import { adapter } from "@domcojs/vercel";
import { domco } from "domco";
import { defineConfig } from "vite";

export default defineConfig({
	build: { minify: true },
	plugins: [domco({ adapter: adapter() })],
});
