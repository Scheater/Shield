// 🔐 KeyAuth Config
const appName = "Invite-Code test";
const ownerId = "22DRjHMre0";
const version = "1.0";

// 📝 Register-Funktion
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

  const url = `https://keyauth.win/api/1.1/?name=${appName}&ownerid=${ownerId}&type=register&username=${username}&pass=${password}&key=${license}&ver=${version}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        message.style.color = "#7bffb0";
        message.innerText = "Registration successful! You can now log in manually.";
        alert("✅ Registered successfully!");

        // ✅ Felder leeren
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
}
