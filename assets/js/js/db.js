// /assets/js/db.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// ✏️ PASTE YOUR FIREBASE KEYS HERE:
const firebaseConfig = {
    apiKey: "AIzaSyCQe6qeePsND7Wfp04BYGvflUS5TL3ywZo",
    authDomain: "streamlive-dev.firebaseapp.com",
    projectId: "streamlive-dev",
    storageBucket: "streamlive-dev.firebasestorage.app",
    messagingSenderId: "889665166601",
    appId: "1:889665166601:web:e5f268e4164d48d89247d8"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export const db = {
    // Fetch all matches from the cloud
    getMatches: async () => {
        const snapshot = await getDocs(collection(firestore, "matches"));
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    
    // Fetch one specific match
    getMatchById: async (id) => {
        const docSnap = await getDoc(doc(firestore, "matches", id));
        return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
    },

    // Save a new match to the cloud
    saveMatch: async (matchData) => {
        const docRef = await addDoc(collection(firestore, "matches"), {
            ...matchData,
            createdAt: new Date().toISOString()
        });
        return docRef.id; // Returns the Firebase Cloud ID
    }
};