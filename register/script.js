// KeyAuth App-Konfiguration
const appName = "Invite-Code test";
const ownerId = "22DRjHMre0";
const version = "1.0";

// Erstes: Session initialisieren
function initKeyAuth() {
  return fetch(`https://keyauth.win/api/1.1/?type=init&name=${appName}&ownerid=${ownerId}&ver=${version}`)
    .then(res => res.json());
}

// Zweites: Registrierung ausführen
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

  initKeyAuth().then(initData => {
    console.log("Init:", initData);

    if (!initData.success) {
      message.style.color = "#ff6b6b";
      message.innerText = "Init failed: " + initData.message;
      return;
    }

    const url = `https://keyauth.win/api/1.1/?type=register&name=${appName}&ownerid=${ownerId}&username=${username}&pass=${password}&key=${license}&ver=${version}`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log("Register:", data);

        if (data.success) {
          message.style.color = "#7bffb0";
          message.innerText = "✅ Registered! You can now login.";
        } else {
          message.style.color = "#ff6b6b";
          message.innerText = data.message;
        }
      })
      .catch(err => {
        message.style.color = "#ff6b6b";
        message.innerText = "Connection error.";
        console.error(err);
      });
  });
}
