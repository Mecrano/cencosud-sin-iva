const express = require("express");
const cors = require("cors");
const soap = require("soap");
const bodyParser = require('body-parser')

// create express app
const app = express();

// create application/json parser
var jsonParser = bodyParser.json()

// CORS only post and any host
app.use(
    cors({
        origin: "*",
        methods: "POST",
        preflightContinue: false,
        optionsSuccessStatus: 204,
    })
);

const url = "https://www.portalventaempresas.co/bragi_test/ws/ClienteService?wsdl";

app.get("/", (req, res) => {
    res.send("its work!!")
})

app.post("/consultaEan", jsonParser, (req, res) => {
    try {
        soap.createClient(url, function (err, client) {
            client.setEndpoint("https://www.portalventaempresas.co/bragi_test/ws/ClienteService")
            client.consultaEan(req.body.soapBody, function(err2, result) {
                if (result) {
                    res.send(result)
                } else {
                    res.send(err2)
                }
            });
        });
    } catch (error) {
        res.send(error)
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});
