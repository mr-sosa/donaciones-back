'use strict'

const PodioJS   = require('podio-js').api
const fs        = require('fs')

// Simplifica los request que utilizan autenticacion por App
// method: HTTP method
// podioRequest: Podio API
// Devuelve una promesa con el response de Podio
function request (method, podioRequest, data, appId, appToken) {
    let config        = JSON.parse(fs.readFileSync('./config/config.json'))
    let clientId      = config.podio.clientId
    let clientSecret  = config.podio.clientSecret
    // get the API id/secret
  
    // SDK de Podio con autenticacion por App
    const podio = new PodioJS({
      authType    : 'app',
      clientId    : clientId,
      clientSecret: clientSecret
    })
  
    return new Promise((resolve, reject) => {
      data = data || null
      podio.authenticateWithApp(appId, appToken, (err) => {
        if (err) reject(err)
  
        podio.isAuthenticated()
          .then(() => { // Ready to make API calls in here...
            podio.request(method, podioRequest, data)
              .then(response => {
                console.log('Podio request Complete')
                resolve(response)
              })
              .catch(err => console.log(err))
          })
          .catch(err => console.log(err))
      })
    })
  }

exports.newItem = async function newItem(appId, data, appPid, appTk){
    await request('POST', `/item/app/${appId}/`, data, appPid, appTk)
    .then( responseData => {
      console.log('Creating Item');
    })
    .catch( error => {
      console.log(error)
    })
}