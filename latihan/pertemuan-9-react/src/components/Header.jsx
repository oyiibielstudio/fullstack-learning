function Header({ totalMenu, totalTersedia, totalBestSeller }) {
  return (
    <div className="header">
      <p className="header-label">Oyii Coffee</p>

      <h1>Menu Favorit Kami</h1>

      <p className="header-subtitle">
        Pilih menu favorit kamu, masukkan ke keranjang, lalu checkout langsung
        lewat WhatsApp.
      </p>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>{totalMenu}</h3>
          <p>Total Menu</p>
        </div>

        <div className="stat-card">
          <h3>{totalTersedia}</h3>
          <p>Tersedia</p>
        </div>

        <div className="stat-card">
          <h3>{totalBestSeller}</h3>
          <p>Best Seller</p>
        </div>
      </div>
    </div>
  );
}

export default Header;