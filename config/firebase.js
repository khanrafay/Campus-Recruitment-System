import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyCKkDTGXgGU7j5J7BNtHXn3g0VvSizhPHc",
  authDomain: "campus-recruitment-syste-ee58c.firebaseapp.com",
  databaseURL:
    "https://campus-recruitment-syste-ee58c-default-rtdb.firebaseio.com",
  projectId: "campus-recruitment-syste-ee58c",
  storageBucket: "campus-recruitment-syste-ee58c.appspot.com",
  messagingSenderId: "737877812927",
  appId: "1:737877812927:web:7219ba55ef4f9e02d1480a",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export default firebase;
