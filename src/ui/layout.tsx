import shoe from "@/assets/shoe.svg?no-inline";
import * as script from "client:script";
import * as style from "client:style";
import { type JSX, Render } from "ovr";

const title = "Pace Calculator";

export const Layout = (props: { children: JSX.Element }) => {
	return (
		<html lang="en">
			<head>
				<meta charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link rel="icon" type="image/svg+xml" href={shoe} />
				{Render.html(script.tags + style.tags)}
				<title>{title}</title>
			</head>
			<body class="prose">
				<h1>{title}</h1>
				{props.children}
			</body>
		</html>
	);
};
