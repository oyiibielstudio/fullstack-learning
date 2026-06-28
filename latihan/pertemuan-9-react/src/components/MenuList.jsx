import MenuCard from "./MenuCard";

function MenuList({ filteredMenus, tambahKeKeranjang }) {
  if (filteredMenus.length === 0) {
    return <p className="empty-message">Menu tidak ditemukan.</p>;
  }

  return (
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
  );
}

export default MenuList;