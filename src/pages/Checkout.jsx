import { useState } from "react";
import { Link } from "react-router-dom";
import { formatRupiah } from "../data/products.js";
import { useCart } from "../utils/CartContext.jsx";

const VOUCHER_CODE = "HEMAT10";
const VOUCHER_MINIMUM = 500000;
const SHIPPING_COST = 25000;

export default function Checkout() {
  const { cart, subtotal, clearCart } = useCart();
  const [voucherInput, setVoucherInput] = useState("");
  const [voucherApplied, setVoucherApplied] = useState(false);
  const [voucherMessage, setVoucherMessage] = useState("");
  const [order, setOrder] = useState(null);

  const discount =
    voucherApplied && subtotal >= VOUCHER_MINIMUM
      ? Math.round(subtotal * 0.1)
      : 0;
  const total = subtotal + SHIPPING_COST - discount;

  const applyVoucher = (event) => {
    event.preventDefault();
    const code = voucherInput.trim().toLocaleUpperCase("id");

    if (code !== VOUCHER_CODE) {
      setVoucherApplied(false);
      setVoucherMessage("Kode kupon tidak ditemukan. Coba HEMAT10.");
      return;
    }

    if (subtotal < VOUCHER_MINIMUM) {
      setVoucherApplied(false);
      setVoucherMessage(
        `Belanja minimal ${formatRupiah(VOUCHER_MINIMUM)} untuk memakai kupon ini.`,
      );
      return;
    }

    setVoucherApplied(true);
    setVoucherMessage("Kupon berhasil dipakai — hemat 10% dari subtotal.");
  };

  const submitOrder = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const customerName = String(formData.get("name") || "").trim();

    setOrder({
      name: customerName,
      number: `RG-${String(Date.now()).slice(-6)}`,
      total,
    });
    clearCart();
  };

  if (order) {
    return (
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-lg rounded-[1.75rem] bg-white p-7 text-center sm:p-10">
          <span className="mx-auto grid size-14 place-items-center rounded-full bg-[#e9ede5] text-xl text-[#536b4d]">
            ✓
          </span>
          <p className="mt-5 text-xs font-medium uppercase tracking-[0.16em] text-[#858880]">
            Pesanan berhasil dibuat
          </p>
          <h1 className="mt-2 text-3xl font-medium tracking-[-0.06em]">
            Terima kasih, {order.name}.
          </h1>
          <p className="mt-3 text-sm leading-6 text-[#858880]">
            Ini adalah simulasi checkout. Nomor pesananmu{" "}
            <span className="font-medium text-[#20231f]">{order.number}</span>{" "}
            dengan total {formatRupiah(order.total)}.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex rounded-full bg-[#20231f] px-5 py-3 text-sm font-medium text-white hover:bg-[#40463e]"
          >
            Kembali ke beranda
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-5 py-16 text-center sm:px-8 sm:py-24">
        <h1 className="text-3xl font-medium tracking-[-0.055em]">
          Belum ada yang di-checkout.
        </h1>
        <p className="mt-3 text-sm text-[#858880]">
          Tambahkan barang ke tas belanja untuk melanjutkan.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-full bg-[#20231f] px-5 py-3 text-sm font-medium text-white hover:bg-[#40463e]"
        >
          Jelajahi koleksi
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-5 pb-8 pt-9 sm:px-8 sm:pt-14">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#858880]">
        Satu langkah lagi
      </p>
      <h1 className="mt-2 text-3xl font-medium tracking-[-0.06em] sm:text-4xl">
        Checkout
      </h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_20rem]">
        <form
          onSubmit={submitOrder}
          className="space-y-6 rounded-3xl bg-white p-5 sm:p-7"
        >
          <section>
            <h2 className="text-lg font-medium tracking-[-0.04em]">
              Informasi penerima
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="text-xs text-[#686d64] sm:col-span-2">
                Nama lengkap
                <input
                  required
                  name="name"
                  autoComplete="name"
                  placeholder="Nama penerima"
                  className="mt-2 w-full rounded-xl border border-[#e7e6df] px-4 py-3 text-sm text-[#20231f] placeholder:text-[#a1a39c]"
                />
              </label>
              <label className="text-xs text-[#686d64]">
                Nomor telepon
                <input
                  required
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="08xxxxxxxxxx"
                  className="mt-2 w-full rounded-xl border border-[#e7e6df] px-4 py-3 text-sm text-[#20231f] placeholder:text-[#a1a39c]"
                />
              </label>
              <label className="text-xs text-[#686d64]">
                Metode pembayaran
                <select
                  name="payment"
                  className="mt-2 w-full rounded-xl border border-[#e7e6df] bg-white px-4 py-3 text-sm text-[#20231f]"
                >
                  <option>Transfer bank</option>
                  <option>Bayar di tempat</option>
                  <option>E-wallet</option>
                </select>
              </label>
              <label className="text-xs text-[#686d64] sm:col-span-2">
                Alamat pengiriman
                <textarea
                  required
                  name="address"
                  rows="3"
                  autoComplete="street-address"
                  placeholder="Jalan, nomor rumah, kota, dan kode pos"
                  className="mt-2 w-full resize-y rounded-xl border border-[#e7e6df] px-4 py-3 text-sm text-[#20231f] placeholder:text-[#a1a39c]"
                />
              </label>
            </div>
          </section>

          <p className="rounded-xl bg-[#f6f5f1] px-4 py-3 text-xs leading-5 text-[#777a73]">
            Prototipe ini tidak memproses pembayaran atau mengirimkan pesanan
            sungguhan.
          </p>

          <button
            type="submit"
            className="w-full rounded-full bg-[#20231f] px-5 py-3.5 text-sm font-medium text-white transition hover:bg-[#40463e]"
          >
            Buat pesanan · {formatRupiah(total)}
          </button>
        </form>

        <aside className="h-fit rounded-3xl bg-white p-5 sm:p-6">
          <h2 className="text-lg font-medium tracking-[-0.04em]">
            Ringkasan pesanan
          </h2>
          <ul className="mt-4 space-y-3">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between gap-3 text-xs">
                <span className="min-w-0 text-[#686d64]">
                  {item.name} <span className="text-[#a1a39c">× {item.qty}</span>
                </span>
                <span className="shrink-0 font-medium">
                  {formatRupiah(item.price * item.qty)}
                </span>
              </li>
            ))}
          </ul>

          <form onSubmit={applyVoucher} className="mt-5">
            <label
              htmlFor="voucher"
              className="text-xs font-medium text-[#686d64]"
            >
              Punya kode kupon?
            </label>
            <div className="mt-2 flex gap-2">
              <input
                id="voucher"
                value={voucherInput}
                onChange={(event) => {
                  setVoucherInput(event.target.value);
                  setVoucherApplied(false);
                  setVoucherMessage("");
                }}
                placeholder="Masukkan kode"
                className="min-w-0 flex-1 rounded-xl border border-[#e7e6df] px-3 py-2.5 text-xs uppercase placeholder:normal-case placeholder:text-[#a1a39c]"
              />
              <button
                type="submit"
                className="rounded-xl bg-[#e9ede5] px-3 py-2.5 text-xs font-medium text-[#465b42] transition hover:bg-[#dce6d7]"
              >
                Pakai
              </button>
            </div>
            <p
              aria-live="polite"
              className={`mt-2 min-h-4 text-xs ${
                voucherApplied ? "text-[#536b4d]" : "text-[#a35c4a]"
              }`}
            >
              {voucherMessage}
            </p>
            <p className="text-[0.68rem] leading-5 text-[#a1a39c]">
              Coba kode HEMAT10 untuk diskon 10% (minimal belanja{" "}
              {formatRupiah(VOUCHER_MINIMUM)}).
            </p>
          </form>

          <div className="my-4 border-t border-[#e7e6df]" />
          <div className="space-y-2.5 text-xs">
            <p className="flex justify-between text-[#686d64]">
              <span>Subtotal</span>
              <span>{formatRupiah(subtotal)}</span>
            </p>
            <p className="flex justify-between text-[#686d64]">
              <span>Pengiriman</span>
              <span>{formatRupiah(SHIPPING_COST)}</span>
            </p>
            {discount > 0 && (
              <p className="flex justify-between text-[#536b4d]">
                <span>Kupon HEMAT10</span>
                <span>−{formatRupiah(discount)}</span>
              </p>
            )}
            <p className="flex justify-between border-t border-[#e7e6df] pt-3 text-sm font-semibold">
              <span>Total</span>
              <span>{formatRupiah(total)}</span>
            </p>
          </div>
          <Link
            to="/cart"
            className="mt-4 block text-center text-xs text-[#858880] hover:text-[#20231f]"
          >
            Kembali ke tas belanja
          </Link>
        </aside>
      </div>
    </div>
  );
}
