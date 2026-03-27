import * as routes from "@/server/routes";
import { App } from "ovr";

const app = new App().use(routes);

export default { fetch: app.fetch, prerender: ["/"] };
