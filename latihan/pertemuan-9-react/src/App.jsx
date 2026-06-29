import { useEffect, useState } from "react";
import { menus } from "./data/menus";
import Header from "./components/Header";
import MenuControls from "./components/MenuControls";
import MenuList from "./components/MenuList";
import Cart from "./components/Cart";
import "./App.css";

function App() {
  const [filter, setFilter] = useState("semua");
  const [search, setSearch] = useState("");

  const [keranjang, setKeranjang] = useState(() => {
    const dataKeranjang = localStorage.getItem("keranjang");

    if (dataKeranjang) {
      try {
        const parsedData = JSON.parse(dataKeranjang);

        if (Array.isArray(parsedData)) {
          return parsedData.map((item) => ({
            ...item,
            jumlah: item.jumlah || 1,
          }));
        }
      } catch (error) {
        return [];
      }
    }

    return [];
  });

  const [namaCustomer, setNamaCustomer] = useState("");
  const [nomorCustomer, setNomorCustomer] = useState("");
  const [catatan, setCatatan] = useState("");

  const [errors, setErrors] = useState({
    nama: "",
    nomor: "",
    catatan: "",
  });

  useEffect(() => {
    localStorage.setItem("keranjang", JSON.stringify(keranjang));
  }, [keranjang]);

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

  function validasiCustomer() {
    let errorBaru = {
      nama: "",
      nomor: "",
      catatan: "",
    };

    const nomorBersih = nomorCustomer.replace(/\D/g, "");

    if (!namaCustomer.trim()) {
      errorBaru.nama = "Nama wajib diisi.";
    }

    if (!nomorCustomer.trim()) {
      errorBaru.nomor = "Nomor WhatsApp wajib diisi.";
    } else if (nomorBersih.length < 10) {
      errorBaru.nomor = "Nomor WhatsApp minimal 10 digit.";
    }

    if (catatan.length > 100) {
      errorBaru.catatan = "Catatan maksimal 100 karakter.";
    }

    setErrors(errorBaru);

    return !errorBaru.nama && !errorBaru.nomor && !errorBaru.catatan;
  }

  function checkoutWhatsApp() {
    if (keranjang.length === 0) {
      alert("Keranjang masih kosong.");
      return;
    }

    const formValid = validasiCustomer();

    if (!formValid) {
      return;
    }

    const daftarPesanan = keranjang
      .map((item, index) => {
        const subtotal = item.hargaAngka * item.jumlah;

        return `${index + 1}. ${item.nama} x${
          item.jumlah
        } - Rp${subtotal.toLocaleString("id-ID")}`;
      })
      .join("\n");

    const pesan = `Halo Oyii Coffee, saya mau pesan.\n\nNama: ${namaCustomer.trim()}\nNo WA: ${nomorCustomer.trim()}\nCatatan: ${
      catatan.trim() || "-"
    }\n\nPesanan:\n${daftarPesanan}\n\nTotal: Rp${totalHarga.toLocaleString(
      "id-ID"
    )}`;

    const nomorWhatsApp = "6281234567890";
    const url = `https://wa.me/${nomorWhatsApp}?text=${encodeURIComponent(
      pesan
    )}`;

    window.open(url, "_blank");
  }

  const totalMenu = menus.length;
  const totalTersedia = menus.filter((menu) => menu.tersedia).length;
  const totalBestSeller = menus.filter((menu) => menu.bestSeller).length;

  return (
    <main className="page">
      <section className="app-container">
        <Header
          totalMenu={totalMenu}
          totalTersedia={totalTersedia}
          totalBestSeller={totalBestSeller}
        />

        <MenuControls
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
        />

        <MenuList
          filteredMenus={filteredMenus}
          tambahKeKeranjang={tambahKeKeranjang}
        />

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
          errors={errors}
          tambahJumlah={tambahJumlah}
          kurangJumlah={kurangJumlah}
          hapusDariKeranjang={hapusDariKeranjang}
        />
      </section>
    </main>
  );
}

export default App;