import Rebase from 're-base'
import firebase from 'firebase'

const config = {
    apiKey:  "AIzaSyBEphf4XGL3V5wEZXX2xE_ncsbHHQ-hZXA",
    authDomain: "taco-chukis.firebaseapp.com",
    databaseURL: "https://taco-chukis.firebaseio.com"
}


const app = firebase.initializeApp(config)
const base = Rebase.createClass(app.database())


export default base;