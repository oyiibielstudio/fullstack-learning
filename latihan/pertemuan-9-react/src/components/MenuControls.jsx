function MenuControls({ search, setSearch, filter, setFilter }) {
  return (
    <>
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
    </>
  );
}

export default MenuControls;