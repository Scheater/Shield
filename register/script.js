const appName = "Invite-Code test";
const ownerId = "22DRjHMre0";
const version = "1.0";

// Zuerst Init-Session starten
function initKeyAuth() {
  return fetch(`https://keyauth.win/api/1.1/?type=init&name=${appName}&ownerid=${ownerId}&ver=${version}`)
    .then(res => res.json());
}

// Dann registrieren
function register() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const license = document.getElementById("license").value.trim();
  const message = document.getElementById("message");

  if (!username || !password || !license) {
    message.innerText = "Please fill in all fields.";
    message.style.color = "#ff6b6b";
    return;
  }

  // Session erzeugen
  initKeyAuth().then(initData => {
    console.log("INIT:", initData);

    if (!initData.success) {
      message.innerText = "Init failed: " + initData.message;
      message.style.color = "#ff6b6b";
      return;
    }

    // Jetzt register aufrufen
    const url = `https://keyauth.win/api/1.1/?type=register&name=${appName}&ownerid=${ownerId}&username=${username}&pass=${password}&key=${license}&ver=${version}`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log("REGISTER:", data);

        if (data.success) {
          message.innerText = "✅ Registration successful!";
          message.style.color = "#7bffb0";
        } else {
          message.innerText = data.message;
          message.style.color = "#ff6b6b";
        }
      })
      .catch(err => {
        message.innerText = "Connection error.";
        message.style.color = "#ff6b6b";
        console.error(err);
      });
  });
}
