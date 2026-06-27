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

export default MenuCard;