import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
// 🚨 Look right here: We added onSnapshot to the end of this import
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, deleteDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

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
    // 💥 NEW: Real-time listener for the home page
    listenToMatches: (callback) => {
        return onSnapshot(collection(firestore, "matches"), (snapshot) => {
            const matches = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            callback(matches);
        });
    },

    // Fetch all matches from the cloud (Static one-time fetch)
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
        return docRef.id;
    },

    // Delete a match from the cloud
    deleteMatch: async (id) => {
        try {
            await deleteDoc(doc(firestore, "matches", id));
            return true;
        } catch (error) {
            console.error("Error deleting document: ", error);
            return false;
        }
    }
};
