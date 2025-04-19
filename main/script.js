// 🔐 Login Check
document.addEventListener("DOMContentLoaded", () => {
  const user = localStorage.getItem("shield_user");

  if (!user) {
    window.location.href = "../login/";
    return;
  }

  // 🔁 Tab click events
  const buttons = document.querySelectorAll(".tab-button");
  const tabs = document.querySelectorAll(".tab-content");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const target = button.getAttribute("data-tab");

      // Deactivate all tabs + buttons
      buttons.forEach(btn => btn.classList.remove("active"));
      tabs.forEach(tab => tab.classList.remove("active"));

      // Activate selected
      button.classList.add("active");
      document.getElementById(target).classList.add("active");
    });
  });
});
