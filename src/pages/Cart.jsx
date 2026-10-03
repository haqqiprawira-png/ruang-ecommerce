import { Link } from "react-router-dom";
import { formatRupiah } from "../data/products.js";
import { useCart } from "../utils/CartContext.jsx";

export default function Cart() {
  const { cart, updateQty, removeFromCart, subtotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-md text-center">
          <span className="mx-auto grid size-16 place-items-center rounded-full bg-[#e9ede5] text-2xl">
            ♧
          </span>
          <h1 className="mt-5 text-3xl font-medium tracking-[-0.055em]">
            Tasmu masih kosong.
          </h1>
          <p className="mt-3 text-sm leading-6 text-[#858880]">
            Temukan sesuatu yang membuat hari-harimu terasa lebih baik.
          </p>
          <Link
            to="/"
            className="mt-6 inline-flex rounded-full bg-[#20231f] px-5 py-3 text-sm font-medium text-white hover:bg-[#40463e]"
          >
            Jelajahi koleksi
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-5 pb-8 pt-9 sm:px-8 sm:pt-14">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#858880]">
        Hampir jadi milikmu
      </p>
      <h1 className="mt-2 text-3xl font-medium tracking-[-0.06em] sm:text-4xl">
        Tas belanja
      </h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_20rem]">
        <div className="divide-y divide-[#e7e6df] border-y border-[#e7e6df]">
          {cart.map((item) => (
            <article
              key={item.id}
              className="flex gap-4 py-5 sm:items-center sm:gap-5"
            >
              <div
                className={`product-art grid size-24 shrink-0 place-items-center rounded-2xl sm:size-28 ${item.tone}`}
              >
                <span aria-hidden="true" className="text-4xl sm:text-5xl">
                  {item.emoji}
                </span>
              </div>
              <div className="flex min-w-0 flex-1 flex-col justify-center">
                <p className="text-xs text-[#858880]">{item.category}</p>
                <h2 className="mt-1 truncate text-sm font-medium">{item.name}</h2>
                <p className="mt-1 text-sm">{formatRupiah(item.price)}</p>
                <div className="mt-3 flex items-center gap-2">
                  <label className="sr-only" htmlFor={`quantity-${item.id}`}>
                    Jumlah {item.name}
                  </label>
                  <div className="flex items-center rounded-full border border-[#e7e6df] bg-white">
                    <button
                      type="button"
                      onClick={() => updateQty(item.id, item.qty - 1)}
                      aria-label={`Kurangi jumlah ${item.name}`}
                      className="grid size-8 place-items-center text-[#686d64]"
                    >
                      −
                    </button>
                    <input
                      id={`quantity-${item.id}`}
                      type="number"
                      min="1"
                      value={item.qty}
                      onChange={(event) =>
                        updateQty(item.id, Number(event.target.value))
                      }
                      className="w-8 bg-transparent text-center text-xs outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      aria-label={`Tambah jumlah ${item.name}`}
                      className="grid size-8 place-items-center text-[#686d64]"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.id)}
                    className="px-2 text-xs text-[#858880] underline underline-offset-2 hover:text-[#20231f]"
                  >
                    Hapus
                  </button>
                </div>
              </div>
              <p className="hidden text-sm font-medium sm:block">
                {formatRupiah(item.price * item.qty)}
              </p>
            </article>
          ))}
        </div>

        <aside className="h-fit rounded-3xl bg-white p-5 sm:p-6">
          <h2 className="text-lg font-medium tracking-[-0.04em]">
            Ringkasan
          </h2>
          <div className="mt-5 flex justify-between text-sm text-[#686d64]">
            <span>Subtotal · {cart.reduce((sum, item) => sum + item.qty, 0)} barang</span>
            <span>{formatRupiah(subtotal)}</span>
          </div>
          <p className="mt-2 text-xs text-[#858880]">
            Ongkos kirim dihitung saat checkout.
          </p>
          <div className="my-5 border-t border-[#e7e6df]" />
          <Link
            to="/checkout"
            className="block rounded-full bg-[#20231f] px-5 py-3 text-center text-sm font-medium text-white transition hover:bg-[#40463e]"
          >
            Lanjut ke checkout
          </Link>
          <Link
            to="/"
            className="mt-3 block text-center text-xs text-[#858880] hover:text-[#20231f]"
          >
            Lanjut belanja
          </Link>
        </aside>
      </div>
    </div>
  );
}
