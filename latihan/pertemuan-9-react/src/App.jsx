import { useEffect, useState } from "react";
import { menus } from "./data/menus";
import MenuControls from "./components/MenuControls";
import MenuCard from "./components/MenuCard";
import Cart from "./components/Cart";
import "./App.css";


function App() {
  const [filter, setFilter] = useState("semua");
  const [search, setSearch] = useState("");

  const [keranjang, setKeranjang] = useState(() => {
  const dataKeranjang = localStorage.getItem("keranjang");

  if (dataKeranjang) {
    const parsedData = JSON.parse(dataKeranjang);

    return parsedData.map((item) => ({
      ...item,
      jumlah: item.jumlah || 1,
    }));
  }

  return [];
});

  useEffect(() => {
    localStorage.setItem("keranjang", JSON.stringify(keranjang));
  }, [keranjang]);

    const [namaCustomer, setNamaCustomer] = useState("");
    const [nomorCustomer, setNomorCustomer] = useState("");
    const [catatan, setCatatan] = useState("");
    
    const filteredMenus = menus.filter((menu) => {
    const cocokDenganSearch = menu.nama
      .toLowerCase()
      .includes(search.toLowerCase());

    if (filter === "tersedia") {
      return menu.tersedia === true && cocokDenganSearch;
    }

    if (filter === "habis") {
      return menu.tersedia === false && cocokDenganSearch;
    }

    if (filter === "bestSeller") {
      return menu.bestSeller === true && cocokDenganSearch;
    }

    return cocokDenganSearch;
  });
function tambahKeKeranjang(menu) {
  const itemSudahAda = keranjang.find((item) => item.id === menu.id);

  if (itemSudahAda) {
    const keranjangBaru = keranjang.map((item) => {
      if (item.id === menu.id) {
        return {
          ...item,
          jumlah: item.jumlah + 1,
        };
      }

      return item;
    });

    setKeranjang(keranjangBaru);
  } else {
    setKeranjang([...keranjang, { ...menu, jumlah: 1 }]);
  }
}

function tambahJumlah(id) {
  const keranjangBaru = keranjang.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        jumlah: item.jumlah + 1,
      };
    }

    return item;
  });

  setKeranjang(keranjangBaru);
}

function kurangJumlah(id) {
  const keranjangBaru = keranjang.map((item) => {
    if (item.id === id && item.jumlah > 1) {
      return {
        ...item,
        jumlah: item.jumlah - 1,
      };
    }

    return item;
  });

  setKeranjang(keranjangBaru);
}

function hapusDariKeranjang(id) {
  const keranjangBaru = keranjang.filter((item) => item.id !== id);
  setKeranjang(keranjangBaru);
}
  const totalItem = keranjang.reduce((total, item) => {
    return total + item.jumlah;
  }, 0);

  const totalHarga = keranjang.reduce((total, item) => {
    return total + item.hargaAngka * item.jumlah;
  }, 0);

function checkoutWhatsApp() {
  if (keranjang.length === 0) {
    alert("Keranjang masih kosong.");
    return;
  }

  if (!namaCustomer || !nomorCustomer) {
    alert("Nama dan nomor WhatsApp wajib diisi.");
    return;
  }

  const daftarPesanan = keranjang
    .map((item, index) => {
      const subtotal = item.hargaAngka * item.jumlah;

      return `${index + 1}. ${item.nama} x${item.jumlah} - Rp${subtotal.toLocaleString(
        "id-ID"
      )}`;
    })
    .join("\n");

  const pesan = `Halo Oyii Coffee, saya mau pesan.\n\nNama: ${namaCustomer}\nNo WA: ${nomorCustomer}\nCatatan: ${
    catatan || "-"
  }\n\nPesanan:\n${daftarPesanan}\n\nTotal: Rp${totalHarga.toLocaleString(
    "id-ID"
  )}`;

  const nomorWhatsApp = "6281234567890";
  const url = `https://wa.me/${nomorWhatsApp}?text=${encodeURIComponent(
    pesan
  )}`;

  window.open(url, "_blank");
}

  return (
    <main className="container">
      <div className="header">
        <p>Oyii Coffee</p>
        <h1>Menu Favorit Kami</h1>
      </div>

      <MenuControls
      search={search}
      setSearch={setSearch}
      filter={filter}
      setFilter={setFilter}
      />

      {filteredMenus.length > 0 ? (
        <div className="menu-grid">
          {filteredMenus.map((menu) => (
            <MenuCard
              key={menu.id}
              nama={menu.nama}
              harga={menu.harga}
              deskripsi={menu.deskripsi}
              tersedia={menu.tersedia}
              bestSeller={menu.bestSeller}
              onPesan={() => tambahKeKeranjang(menu)}
            />
          ))}
        </div>
      ) : (
        <p className="empty-message">Menu tidak ditemukan.</p>
      )}
<Cart
  keranjang={keranjang}
  totalItem={totalItem}
  totalHarga={totalHarga}
  checkoutWhatsApp={checkoutWhatsApp}
  setKeranjang={setKeranjang}
  namaCustomer={namaCustomer}
  setNamaCustomer={setNamaCustomer}
  nomorCustomer={nomorCustomer}
  setNomorCustomer={setNomorCustomer}
  catatan={catatan}
  setCatatan={setCatatan}
  tambahJumlah={tambahJumlah}
  kurangJumlah={kurangJumlah}
  hapusDariKeranjang={hapusDariKeranjang}
/>
    </main>
  );
}

export default App;