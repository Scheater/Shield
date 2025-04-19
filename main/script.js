// 🔐 Check if user is logged in
document.addEventListener("DOMContentLoaded", () => {
  const user = localStorage.getItem("shield_user");

  if (!user) {
    // ❌ Not logged in → redirect to login
    window.location.href = "../login/";
    return;
  }

  // 🔁 Tab switching
  const buttons = document.querySelectorAll(".tab-button");
  const tabs = document.querySelectorAll(".tab-content");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const tabId = button.getAttribute("data-tab");

      // Remove active class from all buttons and tabs
      buttons.forEach(btn => btn.classList.remove("active"));
      tabs.forEach(tab => tab.classList.remove("active"));

      // Activate selected button and tab
      button.classList.add("active");
      document.getElementById(tabId).classList.add("active");
    });
  });
});
