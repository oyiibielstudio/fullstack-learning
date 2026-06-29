function MenuCard({ nama, harga, deskripsi, tersedia, bestSeller, onPesan }) {
  return (
    <article className={`menu-card ${!tersedia ? "habis-card" : ""}`}>
      <div className="menu-card-top">
        <div className="badge-wrap">
          {bestSeller ? (
            <span className="badge">Best Seller</span>
          ) : (
            <span className="badge-placeholder"></span>
          )}
        </div>

        <h3>{nama}</h3>

        <p>{deskripsi}</p>
      </div>

      <div className="menu-card-bottom">
        <h4>{harga}</h4>

        <span className={tersedia ? "status tersedia" : "status habis"}>
          {tersedia ? "Tersedia" : "Habis"}
        </span>

        <button disabled={!tersedia} onClick={onPesan}>
          {tersedia ? "Pesan Sekarang" : "Tidak Tersedia"}
        </button>
      </div>
    </article>
  );
}

export default MenuCard;