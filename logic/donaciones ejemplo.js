const CriptoJS = require('crypto-js');

const APIKey = "l243hyHfrFfo0X4GQz8w9euNKX";
const merchantId = "817498";
const accountId = "824677";
let ref = 0;

// Crea el body para la request en formato <x-www-form-urlencoded>
exports.createFormBody = function createFormBody(req){
    let amount = req.body.Amount;
    ++ref;
    let ran = parseInt(Math.random()*100000000);
    //          Para el ReferenceCode --->
    // <N> = número continuo de pago sin que se reinicie la app 
    // <E> = número aleatorio para que sea único la referencia d epago sin importar si se reinicia la app
    let referenceCode = "Donacion-N"+ref+"-E"+ ran; 
    let signature = CriptoJS.MD5(APIKey+"~"+merchantId+"~"+referenceCode+"~"+amount+"~COP");

    let data = {
        merchantId: merchantId+"",
        accountId: accountId+"",
        description: "Aporte al liderazgo juvenil.",
        referenceCode: referenceCode+"",
        amount: amount+"",
        tax: "0",
        taxReturnBase: "0",
        currency: "COP",
        signature: signature+"",
        test: "0",
        responseUrl: "https://aieseccolombia.org/"        
    }

    let formBody = [];
    for (var property in data) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(data[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    return formBody;
}