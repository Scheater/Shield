// 🔐 KeyAuth Config
const appName = "Invite-Code test";
const ownerId = "22DRjHMre0";
const version = "1.0";

// 1️⃣ Session starten
function initKeyAuth() {
  const url = `https://keyauth.win/api/1.1/?type=init&name=${appName}&ownerid=${ownerId}&ver=${version}`;
  return fetch(url).then(res => res.json());
}

// 2️⃣ Login-Funktion mit init
function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const message = document.getElementById("message");

  if (!username || !password) {
    message.style.color = "#ff6b6b";
    message.innerText = "Please enter both username and password.";
    return;
  }

  initKeyAuth().then(initData => {
    if (!initData.success) {
      message.style.color = "#ff6b6b";
      message.innerText = "Init failed: " + initData.message;
      return;
    }

    const loginUrl = `https://keyauth.win/api/1.1/?type=login&name=${appName}&ownerid=${ownerId}&username=${username}&pass=${password}&ver=${version}`;

    fetch(loginUrl)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          localStorage.setItem("shield_user", username);
          alert("✅ Login successful!");
          window.location.href = "../main/";
        } else {
          message.style.color = "#ff6b6b";
          message.innerText = data.message;
        }
      })
      .catch(() => {
        message.style.color = "#ff6b6b";
        message.innerText = "Connection error.";
      });
  });
}
