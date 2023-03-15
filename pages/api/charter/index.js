import { Charter } from "../../../server/models"

export default async function handler(req, res) {
  
    const charters = await Charter.findAll();
    res.status(200).json(charters);

    // res.status(200).json([ {
    //     name: "Greens Farms Academy",
    //     description: "At GFA, students work with the Adam J. Lewis school and hold monthly coding competitions.",
    //     lat: 41.1187,
    //     long: -73.3150
    // },
    // {
    //     name: "Brunswick Academy",
    //     description: " ",
    //     lat: 41.0379,
    //     long: -73.6261
    // },
    // {
    //     name: "Brunswick Academy",
    //     description: " ",
    //     lat: 41.0379,
    //     long: -73.6261
    // },
    // {
    //     name: "New Jersey",
    //     description: " ",
    //     lat: 40.0583,
    //     long: -74.4057
    // },
    // {
    //     name: "Oregon",
    //     description: " ",
    //     lat: 45.5152,
    //     long: -122.6784
    // },
    // {
    //     name: "Baltimore",
    //     description: "",
    //     lat: 39.2904,
    //     long: -76.6122
    // },
    // {
    //     name: "Pomfret",
    //     description: "",
    //     lat: 41.8976,
    //     long: -71.9626
    // },
    // {
    //     name: "Washington",
    //     description: "",
    //     lat: 47.6062, 
    //     long: -122.3321
    // },
    // {
    //     name: "Miramonte",
    //     description: "",
    //     lat: 36.6923, 
    //     long: -119.0519
    // } ]);

}
