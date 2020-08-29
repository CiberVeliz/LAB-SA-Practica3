// ---------------- constantes para la configuración de express y los metodos utilizados ------------------
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const axios = require("axios");

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

const winston = require("winston");
const consoleTransport = new winston.transports.Console();
const myWinstonOptions = {
    transports: [consoleTransport],
};
const logger = new winston.createLogger(myWinstonOptions);

function logRequest(req, res, next) {
    logger.info(req.url);
    next();
}
app.use(logRequest);

function logError(err, req, res, next) {
    logger.error(err);
    next();
}
app.use(logError);

// ---------------------------------------------------------------------------------------------------------

const port = process.env.APP_PORT || 3302;

//Metodo: GET, Parametros: codigoPedido*
app.get("/solicitarPedido", async function(req, res) {
    console.log("Init /solicitarPedido");
    console.log(req.body);

    axios
        .post("http://localhost:3300/recibirPedido")
        .then((response) => {
            console.log(
                "Orden realizada exitosamente, el codigo de su orden es: " +
                response.codigo
            );

            res.json({
                type: "success",
                mensaje: "Orden realizada exitosamente.",
            });

            return;
        })
        .catch((error) => {
            console.log("Error al realizar la orden");
            console.log(error);
        });
});

//Metodo: GET, Parametros: codigoPedido*
app.get("/verificarPedidoRestaurante", async function(req, res) {
    //se obtiene el valor codigo del query url
    let codigoPedido = req.query.codigo;

    if (!codigoPedido) {
        res.json({
            mensaje: "Error, es necesario el codigo del pedido",
        });
        return;
    }

    axios
        .get("http://localhost:3300/estadoPedido?code=" + codigoPedido)
        .then((response) => {
            console.log("Pedido consultado exitosamente");

            res.json({
                type: "success",
                data: response.message,
            });

            return;
        })
        .catch((error) => {
            console.log("Error al verificar el pedido");
            console.log(error);
        });
});

//Metodo: GET, Parametros: codigoPedido*
app.get("/verificarPedidoRepartidor", async function(req, res) {
    //se obtiene el valor codigo del query url
    let codigoPedido = req.query.codigo;

    if (!codigoPedido) {
        res.json({
            mensaje: "Error, es necesario el codigo del pedido",
        });
        return;
    }

    axios
        .get("http://localhost:3302/estadoPedido?code=" + codigoPedido)
        .then((response) => {
            console.log("Pedido consultado exitosamente");

            res.json({
                type: "success",
                data: response.message,
            });

            return;
        })
        .catch((error) => {
            console.log("Error al verificar el pedido");
            console.log(error);
        });
});

app.listen(port, function() {
    console.log("Aplicación corriendo en el puerto " + port);
});