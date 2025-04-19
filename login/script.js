// 🔐 KeyAuth App-Konfiguration
const appName = "Invite-Code test";
const ownerId = "22DRjHMre0";
const version = "1.0";
const apiUrl = "https://keyauth.win/api/1.3/";

let sessionid = "";

// Schritt 1: Init für Session
async function initKeyAuth() {
  const url = `${apiUrl}?type=init&name=${appName}&ownerid=${ownerId}&ver=${version}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log("INIT:", data);

  if (data.success) {
    sessionid = data.sessionid;
    return true;
  } else {
    const message = document.getElementById("message");
    message.style.color = "#ff6b6b";
    message.innerText = "Init failed: " + data.message;
    return false;
  }
}

// Schritt 2: Login
async function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("message");

  if (!username || !password) {
    message.style.color = "#ff6b6b";
    message.innerText = "Please enter both username and password.";
    return;
  }

  const initialized = await initKeyAuth();
  if (!initialized) return;

  const loginUrl = `${apiUrl}?type=login&name=${appName}&ownerid=${ownerId}&username=${username}&pass=${password}&ver=${version}&sessionid=${sessionid}`;
  const res = await fetch(loginUrl);
  const data = await res.json();
  console.log("LOGIN:", data);

  if (data.success) {
    localStorage.setItem("shield_user", username);
    alert("✅ Login successful!");
    window.location.href = "../main/";
  } else {
    message.style.color = "#ff6b6b";
    message.innerText = data.message;
  }
}
