import Rebase from 're-base'
import firebase from 'firebase'

const config = {
    apiKey:  "AIzaSyBEphf4XGL3V5wEZXX2xE_ncsbHHQ-hZXA",
    authDomain: "taco-chukis.firebaseapp.com",
    databaseURL: "https://taco-chukis.firebaseio.com"
}


const app = firebase.initializeApp(config)

export const user = firebase.auth().currentUser;

export const rebase = Rebase.createClass(app.database());

export const googleProvider = new firebase.auth.GoogleAuthProvider();

