const nama = document.querySelector("#nama");
const role = document.querySelector("#role");
const tombol = document.querySelector("#tombol");

tombol.addEventListener("click", function () {
  nama.textContent = "Hai lagi danika";
  role.textContent = "Profil berhasil berubah karena tombol dipencet";

  nama.style.color = "blue";
  role.style.color = "gray";

});