import { useEffect, useState } from "react";
import MenuCard from "./components/MenuCard";
import Cart from "./components/Cart";
import "./App.css";

const menus = [
  {
    id: 1,
    nama: "Ice Coffee Latte",
    harga: "Rp18.000",
    hargaAngka: 18000,
    deskripsi: "Kopi susu creamy dengan rasa yang seimbang.",
    tersedia: true,
    bestSeller: true,
  },
  {
    id: 2,
    nama: "Matcha Latte",
    harga: "Rp20.000",
    hargaAngka: 20000,
    deskripsi: "Matcha lembut dengan susu yang creamy.",
    tersedia: true,
    bestSeller: true,
  },
  {
    id: 3,
    nama: "Chocolate Cookies",
    harga: "Rp15.000",
    hargaAngka: 15000,
    deskripsi: "Cookies manis dengan chocochips yang melimpah.",
    tersedia: false,
    bestSeller: false,
  },
  {
    id: 4,
    nama: "Americano",
    harga: "Rp16.000",
    hargaAngka: 16000,
    deskripsi: "Kopi hitam ringan untuk yang suka rasa clean.",
    tersedia: true,
    bestSeller: false,
  },
  {
    id: 5,
    nama: "Vanila",
    harga: "Rp17.000",
    hargaAngka: 17000,
    deskripsi: "Kopi susu dengan aroma vanila.",
    tersedia: true,
    bestSeller: false,
  },
  {
    id: 6,
    nama: "Red Velvet",
    harga: "Rp19.000",
    hargaAngka: 19000,
    deskripsi: "Minuman manis creamy dengan rasa red velvet.",
    tersedia: false,
    bestSeller: false,
  },
  {
    id: 7,
    nama: "Taro",
    harga: "Rp21.000",
    hargaAngka: 21000,
    deskripsi: "Minuman manis creamy dengan rasa taro.",
    tersedia: true,
    bestSeller: false,
  },
  {
    id: 8,
    nama: "Lotus Biscoff",
    harga: "Rp23.000",
    hargaAngka: 23000,
    deskripsi: "Minuman manis creamy dengan rasa lotus.",
    tersedia: true,
    bestSeller: true,
  },
  {
    id: 9,
    nama: "Caramel Macchiato",
    harga: "Rp24.000",
    hargaAngka: 24000,
    deskripsi: "Kopi susu dengan caramel yang manis dan creamy.",
    tersedia: true,
    bestSeller: true,
  },
  {
    id: 10,
    nama: "Strawberry Milk",
    harga: "Rp18.000",
    hargaAngka: 18000,
    deskripsi: "Susu strawberry manis dan segar.",
    tersedia: false,
    bestSeller: false,
  },
];


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

      <div className="search-box">
        <input
          type="text"
          placeholder="Cari menu..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="filter-buttons">
        <button
          className={filter === "semua" ? "active" : ""}
          onClick={() => setFilter("semua")}
        >
          Semua
        </button>

        <button
          className={filter === "tersedia" ? "active" : ""}
          onClick={() => setFilter("tersedia")}
        >
          Tersedia
        </button>

        <button
          className={filter === "habis" ? "active" : ""}
          onClick={() => setFilter("habis")}
        >
          Habis
        </button>

        <button
          className={filter === "bestSeller" ? "active" : ""}
          onClick={() => setFilter("bestSeller")}
        >
          Best Seller
        </button>
      </div>

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