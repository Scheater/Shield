// 🔐 Konfiguration
const appName = "Invite-Code test";
const ownerId = "22DRjHMre0";
const version = "1.0";

// 1️⃣ Initialisierung (erzeugt gültige Session)
function initKeyAuth() {
  const initUrl = `https://keyauth.win/api/1.1/?type=init&name=${appName}&ownerid=${ownerId}&ver=${version}`;
  return fetch(initUrl).then(res => res.json());
}

// 2️⃣ Registrierung (nur nach erfolgreicher Init)
function register() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const license = document.getElementById("license").value.trim();
  const message = document.getElementById("message");

  if (!username || !password || !license) {
    message.style.color = "#ff6b6b";
    message.innerText = "Please fill in all fields.";
    return;
  }

  // Zuerst init aufrufen
  initKeyAuth().then(initData => {
    if (!initData.success) {
      message.style.color = "#ff6b6b";
      message.innerText = "Init failed: " + initData.message;
      return;
    }

    // Danach registrieren
    const registerUrl = `https://keyauth.win/api/1.1/?type=register&name=${appName}&ownerid=${ownerId}&username=${username}&pass=${password}&key=${license}&ver=${version}`;

    fetch(registerUrl)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert("✅ Registered successfully!");
          message.style.color = "#7bffb0";
          message.innerText = "You can now log in.";

          // Eingaben leeren
          document.getElementById("username").value = "";
          document.getElementById("password").value = "";
          document.getElementById("license").value = "";
        } else {
          message.style.color = "#ff6b6b";
          message.innerText = data.message;
        }
      })
      .catch(() => {
        message.style.color = "#ff6b6b";
        message.innerText = "Connection error. Try again.";
      });
  });
}
