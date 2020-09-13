const fs = require('fs');
const { config } = require('process');
const confParams = JSON.parse(fs.readFileSync('../config.json'));
const podio = require('./podioHandler');

exports.createDonationPodio = async function createDonationPodio(appId, item) {
    let info = {
        fields: [
            {
                "status": "active",
                "type": "date",
                "field_id": 212749327,
                "label": "Donation Date",
                "values": [ { "value": item.fechaDonacion.value } ],
                "external_id": "donation-date"
            },
            {
                "status": "active",
                "type": "text",
                "field_id": 212749286,
                "label": "Donate",
                "values": [ { "value": item.nombre.value } ],
                "external_id": "title"
            },
            {
                "status": "active",
                "type": "number",
                "field_id": 212749474,
                "label": "Cédula",
                "values": [ { "value": item.documento.value } ],
                "external_id": "cedula"
            },
            {
                "status": "active",
                "type": "category",
                "field_id": 212749336,
                "label": "Estado",
                "values": [ { "value": "Activo" } ],
                "external_id": "estado"
            },
            {
                "status": "active",
                "type": "text",
                "field_id": 212749329,
                "label": "Email",
                "values": [ { "value": item.email.value } ],
                "external_id": "email"
            },
            {
                "status": "active",
                "type": "text",
                "field_id": 212749328,
                "label": "Telefono",
                "values": [ { "value": item.telefono.value } ],
                "external_id": "telefono"
            },
            {
                "status": "active",
                "type": "text",
                "field_id": 212749331,
                "label": "Donación",
                "values": [ { "value": item.amount.value } ],
                "external_id": "donacion"
            },
            {
                "status": "active",
                "type": "text",
                "field_id": 212749330,
                "label": "Número de Pagos",
                "values": [ { "value": item.nPagos.value } ],
                "external_id": "numero-de-pagos"
            },
            {
                "status": "active",
                "type": "text",
                "field_id": 212749332,
                "label": "Token ID",
                "values": [ { "value": item.tokenID.value } ],
                "external_id": "token-id"
            },
            {
                "status": "active",
                "type": "text",
                "field_id": 212749333,
                "label": "Donate ID",
                "values": [ { "value": item.clienteID.value } ],
                "external_id": "donate-id"
            },
            {
                "status": "active",
                "type": "text",
                "field_id": 212749334,
                "label": "Plan ID",
                "values": [ { "value": item.planID.value } ],
                "external_id": "plan-id"
            },
            {
                "status": "active",
                "type": "text",
                "field_id": 212749335,
                "label": "Suscription ID",
                "values": [ { "value": item.suscriptionID.value } ],
                "external_id": "suscription-id"
            }
        ]
    }

    let appPID= confParams.podio.appID;
    let appPToken = confParams.podio.appToken;

    await podio.newItem(appId, info, appPID, appPToken).catch(console.log);
}