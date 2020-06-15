const express = require("express");
const cors = require("cors");
const soap = require("soap");
const bodyParser = require("body-parser");

// create express app
const app = express();

// create application/json parser
var jsonParser = bodyParser.json();

// CORS only post and any host
const WL = [
    "https://www.tiendasjumbo.co",
    "http://www.tiendasjumbo.co",
    "https://www.tiendasmetro.co",
    "http://www.tiendasmetro.co",
    "https://jumbocolombiafood.myvtex.com",
    "https://jumbocolombiafoodqa.myvtex.com",
    "https://metrocolombiafood.myvtex.com",
];
app.use(
    cors({
        origin: WL,
        methods: "POST",
        preflightContinue: false,
        optionsSuccessStatus: 204,
    })
);

const url = "https://www.portalventaempresas.co/bragi_test/ws/ClienteService";

app.get("/", (req, res) => {
    res.send("its work!!");
});

app.post("/consultaEan", jsonParser, (req, res) => {
    try {
        let soapBody = req.body.soapBody;
        soapBody.autenticacion = {
            token: "8NZoEi8a9pkVpAF7I9nSPhwnmn5RCdMSCo62Mu6J",
            usuario: "UserGenerico",
        };

        soap.createClient(url + "?wsdl", function (err, client) {
            if (client) {
                client.setEndpoint(url);
                client.consultaEan(soapBody, function (err2, result) {
                    if (result) {
                        res.send(result);
                    } else {
                        res.send(err2);
                    }
                });
            } else {
                res.send(err);
            }
        });
    } catch (error) {
        res.send(error);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Cencosud sin Iva app is running on port ${PORT}`);
});
