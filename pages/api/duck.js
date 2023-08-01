import duckgen from "duckgen";

export default async function handler(req, res) {
  
    const duckString = req.query.duckString;
    const parsedDuck = duckgen.parseString(duckString);
    const raw = duckgen.generateDuck(parsedDuck);
    const focused = duckgen.formatSVG(raw);

    res.setHeader('Content-Type', 'image/svg+xml');

    res.status(200).send(focused);

}