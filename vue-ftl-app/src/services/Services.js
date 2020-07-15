const devapi= 'http://127.0.0.1:3000/'
const prodapi= 'http://les-planetes2kentin.fr/api'

class Services {

  forgeUrl (enpoint)
  {
    
    switch (process.env.NODE_ENV) {
        case "development": return (devapi+enpoint) ;
        case "production": return (prodapi+enpoint) ;
    }
    return enpoint;
  }
  
}

export default Services
