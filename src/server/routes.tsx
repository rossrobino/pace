import shoe from "@/assets/shoe.svg?no-inline";
import * as calc from "@/lib/calc";
import { Layout } from "@/ui/layout";
import { Field, type Middleware, Route } from "ovr";

export const notFound: Middleware = async (c, next) => {
	await next();

	if (c.res.body === undefined) {
		c.res.status = 404;

		return (
			<Layout>
				<h2>Not Found</h2>

				<button type="button" onclick="history.back()">
					Back
				</button>

				<hr />

				<p>
					<page.Anchor>Return home</page.Anchor>
				</p>
			</Layout>
		);
	}
};

export const page = Route.get("/", (c) => {
	return (
		<Layout>
			<results.Form state={c.url} />
			<hr />
			<p>
				Enter in a recent result for a time and distance run. This calculator
				uses Peter S. Reigel's{" "}
				<a
					href="https://www.nku.edu/~longa/classes/mat375/days/docs/CrossCountry/riegel.pdf"
					target="_blank"
				>
					endurance formula
				</a>{" "}
				to estimate expected times across a common endurance race distances.
			</p>
			<p>
				<a href="https://github.com/rossrobino/pace">GitHub</a>
			</p>
		</Layout>
	);
});

export const results = Route.get(
	"/result",
	{
		distance: Field.number({ value: 1 }).persist(),
		units: Field.select(["Miles", "Kilometers", "Meters"]).persist(),
		hours: Field.number({ value: 0 }).default(0).persist(),
		minutes: Field.number({ value: 0 }).default(0).persist(),
		seconds: Field.number({ value: 0 }).default(0).persist(),
	},
	async (c) => {
		const result = await c.data();

		if (result.issues) {
			return c.redirect(page.url({ search: result.url.search }));
		}

		return (
			<Layout>
				<table>
					<thead>
						<tr>
							<th>Distance</th>
							<th>Estimated Time</th>
						</tr>
					</thead>
					<tbody>
						{() => {
							const { data } = result;

							let meters: number;
							if (data.units === "Kilometers") {
								meters = data.distance * 1_000;
							} else if (data.units === "Miles") {
								meters = calc.milesToMeters(data.distance);
							} else {
								meters = data.distance;
							}

							let seconds = data.seconds;
							seconds += data.minutes * 60;
							seconds += data.hours * 60 * 60;

							return (
								<>
									<tr>
										<td>1.5K</td>
										<td>{calc.pace(seconds, meters, 1_500)}</td>
									</tr>
									<tr>
										<td>1 Mile</td>
										<td>{calc.pace(seconds, meters, calc.milesToMeters(1))}</td>
									</tr>
									<tr>
										<td>3K</td>
										<td>{calc.pace(seconds, meters, 3_000)}</td>
									</tr>
									<tr>
										<td>5K</td>
										<td>{calc.pace(seconds, meters, 5_000)}</td>
									</tr>
									<tr>
										<td>8K</td>
										<td>{calc.pace(seconds, meters, 8_000)}</td>
									</tr>
									<tr>
										<td>10K</td>
										<td>{calc.pace(seconds, meters, 10_000)}</td>
									</tr>
									<tr>
										<td>Half Marathon (13.1 Miles)</td>
										<td>
											{calc.pace(seconds, meters, calc.milesToMeters(13.1))}
										</td>
									</tr>
									<tr>
										<td>Marathon (26.2 Miles)</td>
										<td>
											{calc.pace(seconds, meters, calc.milesToMeters(26.2))}
										</td>
									</tr>
								</>
							);
						}}
					</tbody>
				</table>
				<hr />
				<page.Anchor>Restart</page.Anchor>
			</Layout>
		);
	},
);

export const robots = Route.get("/robots.txt", (c) =>
	c.text(`User-agent: *\nDisallow:\n`),
);

export const favicon = Route.get("/favicon.ico", (c) => c.redirect(shoe));
