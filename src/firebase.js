import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCWdSRD5PHpPc3tsFxWnRRY38FQHiAlrcU",
  authDomain: "lighthall-project-2.firebaseapp.com",
  projectId: "lighthall-project-2",
  storageBucket: "lighthall-project-2.appspot.com",
  messagingSenderId: "314029355896",
  appId: "1:314029355896:web:392f3f4a3e9e9128c28e8d"
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);