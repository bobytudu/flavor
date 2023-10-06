import axios from "axios";
import moment from "moment";

const client = axios.create( {} );
const getToken = async () => {
  let newToken = "";
  const firebaseConfig = {
    // Add your Firebase configuration here
    apiKey: "AIzaSyC0m-3rojKkJRCTsUgLFnujKNzXDi0eVwc",
    authDomain: "affi-86ea9.firebaseapp.com",
    // ...
  };
  await axios
    .post(
      "https://securetoken.googleapis.com/v1/token?key=" +
      firebaseConfig.apiKey,
      {
        grant_type: "refresh_token",
        refresh_token: localStorage.getItem( "refreshToken" ),
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
    .then( ( res ) => {
      newToken = res.data.access_token;
      localStorage.setItem( "accessToken", res.data.access_token );
      localStorage.setItem( "refreshToken", res.data.refresh_token );
      localStorage.setItem( "time", moment.utc().format() );
    } )
    .catch( ( err ) => {
      console.log( err );
      localStorage.clear();
      window.location.href = "/";
    } );
  return newToken;
};

client.interceptors.request.use(
  async ( config: any ) => {
    let token = localStorage.getItem( "accessToken" );
    let time = localStorage.getItem( "time" );
    let currentTime = moment.utc();

    if ( !token ) {
      token = await getToken();
    } else if ( currentTime.diff( time, "minutes" ) >= 60 ) {
      token = await getToken();
    }
    config.headers["idtoken"] = token;
    config['Origin'] = '*';
    return config;
  },
  ( error ) => {
    Promise.reject( error );
  }
);

const makeAIAPIAuthorizedRequest: any = async function ( options: any ) {
  return await client( options )
};

export default makeAIAPIAuthorizedRequest;
