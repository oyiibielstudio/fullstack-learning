let nama = "Abriel";
let role = "Junior Full-Stack Developer";
let umur = 19;

console.log("Nama saya " + nama);
console.log("Role saya " + role);
console.log("Umur saya " + umur);

let skill = ["HTML", "CSS", "JavaScript"];

console.log("Skill yang sedang dipelajari:");
console.log(skill);

function perkenalan(nama, role) {
  console.log("Halo, saya " + nama + ", saya sedang belajar menjadi " + role);
}

perkenalan(nama, role);

let jamBelajar = 2;

if (jamBelajar >= 3) {
  console.log("Belajar hari ini produktif banget");
} else if (jamBelajar >= 1) {
  console.log("Belajar hari ini cukup bagus");
} else {
  console.log("Belajar hari ini masih kurang");
}