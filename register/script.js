// 🔐 KeyAuth App-Konfiguration
const appName = "Invite-Code test";
const ownerId = "22DRjHMre0";
const version = "1.0";
const apiUrl = "https://keyauth.win/api/1.3/";

let sessionid = "";

// ⏱️ Schritt 1: Session initialisieren
async function initKeyAuth() {
  const url = `${apiUrl}?type=init&name=${appName}&ownerid=${ownerId}&ver=${version}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log("INIT:", data);

  if (data.success) {
    sessionid = data.sessionid;
    return true;
  } else {
    document.getElementById("message").innerText = "Init failed: " + data.message;
    document.getElementById("message").style.color = "#ff6b6b";
    return false;
  }
}

// 📝 Schritt 2: Registrierung ausführen
async function register() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const license = document.getElementById("license").value.trim();
  const message = document.getElementById("message");

  if (!username || !password || !license) {
    message.innerText = "Please fill in all fields.";
    message.style.color = "#ff6b6b";
    return;
  }

  const initialized = await initKeyAuth();
  if (!initialized) return;

  const registerUrl = `${apiUrl}?type=register&name=${appName}&ownerid=${ownerId}&username=${username}&pass=${password}&key=${license}&ver=${version}&sessionid=${sessionid}`;
  const res = await fetch(registerUrl);
  const data = await res.json();
  console.log("REGISTER:", data);

  if (data.success) {
    message.innerText = "✅ Registered successfully! You can now login.";
    message.style.color = "#7bffb0";
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";
    document.getElementById("license").value = "";
  } else {
    message.innerText = data.message;
    message.style.color = "#ff6b6b";
  }
}
