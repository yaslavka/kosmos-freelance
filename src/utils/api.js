// import superagent from 'superagent'
import feathers from 'feathers-client'
import rest from 'feathers-rest/client'
import auth from 'feathers-authentication-client';
//const host = 'http://localhost:3030'
const host = 'https://sheltered-tor-24523.herokuapp.com'


export const app = feathers()
  .configure(rest(host).fetch(fetch))
  .configure(feathers.hooks())
  .configure(auth({ storage: window.localStorage}));
