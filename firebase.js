// 👉 apna Firebase config yahan paste karo
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } 
from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } 
from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR-API-KEY",
  authDomain: "YOUR-PROJECT.firebaseapp.com",
  projectId: "YOUR-PROJECT-ID",
  storageBucket: "YOUR-PROJECT.appspot.com",
  messagingSenderId: "SENDER-ID",
  appId: "APP-ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 🔹 Show/hide forms
window.showLogin = () => {
  document.getElementById("registerBox").classList.add("hidden");
  document.getElementById("loginBox").classList.remove("hidden");
}
window.showRegister = () => {
  document.getElementById("loginBox").classList.add("hidden");
  document.getElementById("registerBox").classList.remove("hidden");
}

// 🔹 Register
window.register = async () => {
  const name = document.getElementById("regName").value;
  const phone = document.getElementById("regPhone").value;
  const email = document.getElementById("regEmail").value;
  const pass = document.getElementById("regPass").value;

  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, pass);
    await setDoc(doc(db, "users", userCred.user.uid), {
      name, phone, email, balance: 0
    });
    alert("Registration successful ✅");
    showLogin();
  } catch (e) {
    alert(e.message);
  }
};

// 🔹 Login
window.login = async () => {
  const email = document.getElementById("loginEmail").value;
  const pass = document.getElementById("loginPass").value;
  try {
    const userCred = await signInWithEmailAndPassword(auth, email, pass);
    const snap = await getDoc(doc(db, "users", userCred.user.uid));
    const data = snap.data();

    document.getElementById("userName").innerText = "👤 " + data.name;
    document.getElementById("userPhone").innerText = "📱 " + data.phone;
    document.getElementById("userEmail").innerText = "✉️ " + data.email;
    document.getElementById("userBalance").innerText = data.balance;

    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("profileBox").classList.remove("hidden");
  } catch (e) {
    alert(e.message);
  }
};

// 🔹 Logout
window.logout = async () => {
  await signOut(auth);
  document.getElementById("profileBox").classList.add("hidden");
  document.getElementById("loginBox").classList.remove("hidden");
};

// Recharge & Withdraw placeholder
window.recharge = () => alert("Recharge option coming soon");
window.withdraw = () => alert("Withdraw option coming soon");
