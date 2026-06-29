function Cart({
  keranjang,
  totalItem,
  totalHarga,
  checkoutWhatsApp,
  setKeranjang,
  namaCustomer,
  setNamaCustomer,
  nomorCustomer,
  setNomorCustomer,
  catatan,
  setCatatan,
  errors,
  tambahJumlah,
  kurangJumlah,
  hapusDariKeranjang,
}) {
  return (
    <section className="cart-section">
      <div className="cart-header">
        <span>Checkout</span>
        <h2>Keranjang Pesanan</h2>
        <p>Review pesanan kamu sebelum checkout ke WhatsApp.</p>
      </div>

      <div className="cart-summary">
        <div>
          <span>Total Item</span>
          <strong>{totalItem}</strong>
        </div>

        <div>
          <span>Total Harga</span>
          <strong>Rp{totalHarga.toLocaleString("id-ID")}</strong>
        </div>
      </div>

      {keranjang.length > 0 ? (
        <>
          <div className="customer-form">
            <label>Nama Customer</label>
            <input
              type="text"
              placeholder="Masukkan nama"
              value={namaCustomer}
              onChange={(e) => setNamaCustomer(e.target.value)}
            />
            {errors.nama && <small className="error-text">{errors.nama}</small>}

            <label>Nomor WhatsApp</label>
            <input
              type="tel"
              placeholder="Contoh: 08123456789"
              value={nomorCustomer}
              onChange={(e) => setNomorCustomer(e.target.value)}
            />
            {errors.nomor && (
              <small className="error-text">{errors.nomor}</small>
            )}

            <label>Catatan Pesanan</label>
            <textarea
              placeholder="Contoh: less ice, less sugar"
              value={catatan}
              maxLength="100"
              onChange={(e) => setCatatan(e.target.value)}
            ></textarea>

            <small className="form-hint">{catatan.length}/100 karakter</small>
            {errors.catatan && (
              <small className="error-text">{errors.catatan}</small>
            )}
          </div>

          <div className="cart-actions">
            <button className="checkout-button" onClick={checkoutWhatsApp}>
              Checkout WhatsApp
            </button>

            <button className="clear-button" onClick={() => setKeranjang([])}>
              Kosongkan Keranjang
            </button>
          </div>

          <ul className="cart-list">
            {keranjang.map((item) => (
              <li key={item.id}>
                <div className="cart-info">
                  <strong>{item.nama}</strong>
                  <span>
                    {item.jumlah} x {item.harga}
                  </span>
                  <small>
                    Subtotal: Rp
                    {(item.hargaAngka * item.jumlah).toLocaleString("id-ID")}
                  </small>
                </div>

                <div className="quantity-buttons">
                  <button onClick={() => kurangJumlah(item.id)}>-</button>
                  <button onClick={() => tambahJumlah(item.id)}>+</button>
                  <button
                    className="delete-button"
                    onClick={() => hapusDariKeranjang(item.id)}
                  >
                    Hapus
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="empty-cart">Belum ada pesanan.</p>
      )}
    </section>
  );
}

export default Cart;