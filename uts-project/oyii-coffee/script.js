const orderButton = document.querySelector("#orderButton");

orderButton.addEventListener("click", function () {
  alert("Terima kasih! Kamu akan diarahkan untuk pesan lewat WhatsApp.");
  window.open("https://wa.me/6281234567890", "_blank");
});