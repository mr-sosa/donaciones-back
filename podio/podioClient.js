const podio = require('./podioHandler');
const fs         = require('fs')
const confParams = JSON.parse(fs.readFileSync('./config.json'))
const appPID= confParams.podio.appID;
const appPToken = confParams.podio.appToken;

exports.createDonationPodio = async function createDonationPodio(appId, item) {
    console.log("Loading Podio data")
    let info = {
        fields: [
            {
                "status": "active",
                "type": "date",
                "field_id": 212749327,
                "label": "Donation Date",
                "values": [ { "start": item.fechaDonacion + " 00:00:00"} ],
                "external_id": "donation-date"
            },
            {
                "status": "active",
                "type": "text",
                "field_id": 212749286,
                "label": "Donate",
                "values": [ { "value": item.nombre } ],
                "external_id": "title"
            },
            {
                "status": "active",
                "type": "number",
                "field_id": 212749474,
                "label": "Cédula",
                "values": [ { "value": parseInt(item.documento) } ],
                "external_id": "cedula"
            },
            {
                "status": "active",
                "type": "category",
                "field_id": 212749336,
                "label": "Estado",
                "values": [ { "value": 1 } ],
                "external_id": "estado"
            },
            {
                "status": "active",
                "type": "text",
                "field_id": 212749329,
                "label": "Email",
                "values": [ { "value": item.email } ],
                "external_id": "email"
            },
            {
                "status": "active",
                "type": "text",
                "field_id": 212749328,
                "label": "Telefono",
                "values": [ { "value": item.telefono } ],
                "external_id": "telefono"
            },
            {
                "status": "active",
                "type": "money",
                "field_id": 212749331,
                "label": "Donación",
                "values": [ { "value": parseInt(item.amount), "currency":"USD" } ],
                "external_id": "donacion"
            },
            {
                "status": "active",
                "type": "text",
                "field_id": 212749330,
                "label": "Número de Pagos",
                "values": [ { "value": item.nPagos } ],
                "external_id": "numero-de-pagos"
            },
            {
                "status": "active",
                "type": "text",
                "field_id": 212749332,
                "label": "Token ID",
                "values": [ { "value": item.tokenID } ],
                "external_id": "token-id"
            },
            {
                "status": "active",
                "type": "text",
                "field_id": 212749333,
                "label": "Donate ID",
                "values": [ { "value": item.clienteID } ],
                "external_id": "donate-id"
            },
            {
                "status": "active",
                "type": "text",
                "field_id": 212749334,
                "label": "Plan ID",
                "values": [ { "value": item.planID } ],
                "external_id": "plan-id"
            },
            {
                "status": "active",
                "type": "text",
                "field_id": 212749335,
                "label": "Suscription ID",
                "values": [ { "value": item.suscriptionID } ],
                "external_id": "suscription-id"
            }
        ]
    }

    console.log("Sending request to Podio"); 
    
    let resp = await podio.newItem(appId, info, appPID, appPToken).catch(console.log);
    
    if(resp === 200) return 200;
    return resp;
}
exports.getDonationPodio = async function getDonationPodio(id) {
    let x = await podio.getItem(id,appPID,appPToken);
    console.log(x)
    /*for (i in x.fields) {
        xx = x.fields[i].values;
        console.log(x.fields[i].label+"-"+x.fields[i].type)
        console.log(xx);
    }*/
}

exports.getAllDonationPodio = async function getAllDonationPodio() {
    let x = await podio.getAllItems(appPID,appPToken);
    console.log(x)

}