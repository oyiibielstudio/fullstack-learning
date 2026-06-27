import { useState } from "react";
import "./App.css";

const menus = [
  {
    id: 1,
    nama: "Ice Coffee Latte",
    harga: "Rp18.000",
    deskripsi: "Kopi susu creamy dengan rasa yang seimbang.",
    tersedia: true,
    bestSeller: true,
  },
  {
    id: 2,
    nama: "Matcha Latte",
    harga: "Rp20.000",
    deskripsi: "Matcha lembut dengan susu yang creamy.",
    tersedia: true,
    bestSeller: true,
  },
  {
    id: 3,
    nama: "Chocolate Cookies",
    harga: "Rp15.000",
    deskripsi: "Cookies manis dengan chocochips yang melimpah.",
    tersedia: false,
    bestSeller: false,
  },
  {
    id: 4,
    nama: "Americano",
    harga: "Rp16.000",
    deskripsi: "Kopi hitam ringan untuk yang suka rasa clean.",
    tersedia: true,
    bestSeller: false,
  },
  {
    id: 5,
    nama: "Vanila",
    harga: "Rp17.000",
    deskripsi: "Kopi susu dengan aroma vanila.",
    tersedia: true,
    bestSeller: false,
  },
  {
    id: 6,
    nama: "Red Velvet",
    harga: "Rp19.000",
    deskripsi: "Minuman manis creamy dengan rasa red velvet.",
    tersedia: false,
    bestSeller: false,
  },
  {
    id: 7,
    nama: "Taro",
    harga: "Rp21.000",
    deskripsi: "Minuman manis creamy dengan rasa taro.",
    tersedia: true,
    bestSeller: false,
  },
  {
    id: 8,
    nama: "Lotus Biscoff",
    harga: "Rp23.000",
    deskripsi: "Minuman manis creamy dengan rasa lotus.",
    tersedia: true,
    bestSeller: true,
  },
  {
    id: 9,
    nama: "Caramel Macchiato",
    harga: "Rp24.000",
    deskripsi: "Kopi susu dengan caramel yang manis dan creamy.",
    tersedia: true,
    bestSeller: true,
  },
  {
    id: 10,
    nama: "Strawberry Milk",
    harga: "Rp18.000",
    deskripsi: "Susu strawberry manis dan segar.",
    tersedia: false,
    bestSeller: false,
  },
];

function MenuCard({ nama, harga, deskripsi, tersedia, bestSeller, onPesan }) {
  return (
    <div className={`menu-card ${!tersedia ? "habis-card" : ""}`}>
      {bestSeller && <span className="badge">Best Seller</span>}

      <h3>{nama}</h3>
      <p>{deskripsi}</p>
      <h4>{harga}</h4>

      <p className={tersedia ? "status tersedia" : "status habis"}>
        {tersedia ? "Tersedia" : "Habis"}
      </p>

      <button disabled={!tersedia} onClick={onPesan}>
        {tersedia ? "Pesan Sekarang" : "Tidak Tersedia"}
      </button>
    </div>
  );
}

function App() {
  const [filter, setFilter] = useState("semua");
  const [search, setSearch] = useState("");
  const [keranjang, setKeranjang] = useState([]);

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
    setKeranjang([...keranjang, menu]);
  }

  function hapusDariKeranjang(indexYangDihapus) {
    const keranjangBaru = keranjang.filter((item, index) => {
      return index !== indexYangDihapus;
    });

    setKeranjang(keranjangBaru);
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

      <div className="cart">
        <h2>Keranjang Pesanan</h2>
        <p>Total item: {keranjang.length}</p>

        {keranjang.length > 0 ? (
          <ul>
            {keranjang.map((item, index) => (
              <li key={index}>
                <span>
                  {item.nama} - {item.harga}
                </span>

                <button
                  className="delete-button"
                  onClick={() => hapusDariKeranjang(index)}
                >
                  Hapus
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Belum ada pesanan.</p>
        )}
      </div>
    </main>
  );
}

export default App;