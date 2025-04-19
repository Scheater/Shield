// 🔐 KeyAuth Config – deine App-Daten
const appName = "Invite-Code test";
const ownerId = "22DRjHMre0";
const version = "1.0";

// 🔓 Login-Funktion
function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    document.getElementById("message").innerText = "Please fill in all fields.";
    return;
  }

  const url = `https://keyauth.win/api/1.1/?name=${appName}&ownerid=${ownerId}&type=login&username=${username}&pass=${password}&ver=${version}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        // ✅ Login erfolgreich – User speichern
        localStorage.setItem("shield_user", username);
        alert("Login successful!");
        window.location.href = "../main/";
      } else {
        document.getElementById("message").innerText = data.message;
      }
    })
    .catch(() => {
      document.getElementById("message").innerText = "Connection error. Try again.";
    });
}
