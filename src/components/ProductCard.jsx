import { Link } from "react-router-dom";
import { formatRupiah } from "../data/products.js";
import { useCart } from "../utils/CartContext.jsx";

export default function ProductCard({ p }) {
  const { addToCart } = useCart();

  return (
    <article className="group min-w-0">
      <Link
        to={`/product/${p.slug}`}
        className={`product-art flex aspect-[4/3] items-center justify-center rounded-[1.35rem] ${p.tone}`}
        aria-label={`Lihat detail ${p.name}`}
      >
        {p.badge && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-white/85 px-3 py-1 text-[0.68rem] font-medium tracking-wide text-[#4e534c]">
            {p.badge}
          </span>
        )}
        <span
          aria-hidden="true"
          className="select-none text-[5.5rem] drop-shadow-[0_14px_14px_rgba(32,35,31,0.12)] transition duration-300 group-hover:scale-110 sm:text-[6.5rem]"
        >
          {p.emoji}
        </span>
        <span className="absolute bottom-3 right-3 rounded-full bg-white/75 px-2.5 py-1 text-xs font-medium text-[#60645e]">
          ★ {p.rating}
        </span>
      </Link>

      <div className="flex items-start justify-between gap-2 pt-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs text-[#858880]">{p.category}</p>
          <Link
            to={`/product/${p.slug}`}
            className="mt-1 inline-block truncate text-[0.95rem] font-medium tracking-[-0.02em] hover:text-[#667d61]"
          >
            {p.name}
          </Link>
          <p className="mt-1 text-sm font-semibold">{formatRupiah(p.price)}</p>
        </div>
        <button
          type="button"
          onClick={() => addToCart(p)}
          aria-label={`Tambahkan ${p.name} ke tas belanja`}
          className="mt-4 grid size-9 shrink-0 place-items-center rounded-full border border-[#e7e6df] bg-white text-lg transition hover:border-[#20231f] hover:bg-[#20231f] hover:text-white"
        >
          +
        </button>
      </div>
    </article>
  );
}
