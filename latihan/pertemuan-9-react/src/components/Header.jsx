function Header({ totalMenu, totalTersedia, totalBestSeller }) {
  return (
    <header className="hero">
      <div className="hero-badge">Oyii Coffee</div>

      <h1>Order coffee favoritmu tanpa ribet.</h1>

      <p>
        Pilih menu, cari minuman favorit, masukkan ke keranjang, lalu checkout
        langsung lewat WhatsApp.
      </p>

      <div className="stats-grid">
        <div className="stat-card">
          <strong>{totalMenu}</strong>
          <span>Total Menu</span>
        </div>

        <div className="stat-card">
          <strong>{totalTersedia}</strong>
          <span>Tersedia</span>
        </div>

        <div className="stat-card">
          <strong>{totalBestSeller}</strong>
          <span>Best Seller</span>
        </div>
      </div>
    </header>
  );
}

export default Header;