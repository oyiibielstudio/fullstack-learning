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
  tambahJumlah,
  kurangJumlah,
  hapusDariKeranjang,
}) {
  return (
    <div className="cart">
      <h2>Keranjang Pesanan</h2>
      <p>Total item: {totalItem}</p>
      <h3>Total harga: Rp{totalHarga.toLocaleString("id-ID")}</h3>

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

            <label>Nomor WhatsApp</label>
            <input
              type="text"
              placeholder="Contoh: 08123456789"
              value={nomorCustomer}
              onChange={(e) => setNomorCustomer(e.target.value)}
            />

            <label>Catatan Pesanan</label>
            <textarea
              placeholder="Contoh: less ice, less sugar"
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
            ></textarea>
          </div>

          <button className="checkout-button" onClick={checkoutWhatsApp}>
            Checkout WhatsApp
          </button>

          <button className="clear-button" onClick={() => setKeranjang([])}>
            Kosongkan Keranjang
          </button>

          <ul>
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
        <p>Belum ada pesanan.</p>
      )}
    </div>
  );
}

export default Cart;