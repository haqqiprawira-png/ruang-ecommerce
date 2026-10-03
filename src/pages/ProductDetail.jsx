import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { formatRupiah, products } from "../data/products.js";
import { useCart } from "../utils/CartContext.jsx";

export default function ProductDetail() {
  const { slug } = useParams();
  const product = products.find((item) => item.slug === slug);
  const { addToCart } = useCart();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <h1 className="text-2xl font-medium">Produk tidak ditemukan.</h1>
        <Link to="/" className="mt-4 inline-block text-sm underline">
          Kembali ke koleksi
        </Link>
      </div>
    );
  }

  const submitReview = (event) => {
    event.preventDefault();
    if (!rating || !review.trim()) return;

    setReviews((previousReviews) => [
      ...previousReviews,
      { id: Date.now(), rating, review: review.trim() },
    ]);
    setRating(0);
    setReview("");
  };

  return (
    <div className="mx-auto max-w-7xl px-5 pb-8 pt-8 sm:px-8 sm:pt-12">
      <Link to="/" className="text-xs text-[#858880] hover:text-[#20231f]">
        ← Kembali ke koleksi
      </Link>
      <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-14">
        <div
          className={`product-art flex min-h-72 items-center justify-center rounded-[1.75rem] sm:min-h-[26rem] ${product.tone}`}
        >
          <span aria-hidden="true" className="text-[10rem] drop-shadow-xl sm:text-[13rem]">
            {product.emoji}
          </span>
          <span className="absolute bottom-5 left-5 rounded-full bg-white/80 px-4 py-2 text-xs">
            {product.category}
          </span>
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#858880]">
            {product.category} · ★ {product.rating} ({product.reviews} ulasan)
          </p>
          <h1 className="mt-3 text-4xl font-medium tracking-[-0.065em] sm:text-5xl">
            {product.name}
          </h1>
          <p className="mt-4 text-xl font-medium">{formatRupiah(product.price)}</p>
          <p className="mt-5 max-w-lg text-sm leading-7 text-[#686d64]">
            {product.description}
          </p>
          <button
            type="button"
            onClick={() => addToCart(product)}
            className="mt-7 w-full rounded-full bg-[#20231f] px-6 py-3.5 text-sm font-medium text-white transition hover:bg-[#40463e] sm:w-fit"
          >
            Tambahkan ke tas
          </button>
          <div className="mt-7 grid grid-cols-2 gap-3 border-t border-[#e7e6df] pt-5 text-xs text-[#777a73]">
            <p>Pengiriman reguler tersedia</p>
            <p>Pilihan kurasi Ruang</p>
          </div>
        </div>
      </div>

      <section className="mt-14 grid gap-8 border-t border-[#e7e6df] pt-8 md:grid-cols-[1fr_0.8fr]">
        <div>
          <h2 className="text-xl font-medium tracking-[-0.04em]">Cerita pembeli</h2>
          {reviews.length === 0 ? (
            <p className="mt-3 text-sm text-[#858880]">
              Belum ada ulasan dari pengunjung. Jadilah yang pertama berbagi.
            </p>
          ) : (
            <ul className="mt-4 space-y-3">
              {reviews.map((item) => (
                <li
                  key={item.id}
                  className="rounded-2xl bg-white p-4 text-sm"
                >
                  <p className="text-amber-600">{"★".repeat(item.rating)}</p>
                  <p className="mt-2 text-[#686d64]">{item.review}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
        <form onSubmit={submitReview} className="rounded-3xl bg-white p-5 sm:p-6">
          <h2 className="font-medium">Bagikan pengalamanmu</h2>
          <fieldset className="mt-4">
            <legend className="text-xs text-[#858880]">Beri nilai</legend>
            <div className="mt-1 flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  aria-label={`Beri ${star} bintang`}
                  aria-pressed={rating === star}
                  className={`text-2xl ${
                    star <= rating ? "text-amber-500" : "text-[#d5d6cf]"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </fieldset>
          <label className="mt-4 block text-xs text-[#858880]">
            Ulasan
            <textarea
              required
              rows="3"
              value={review}
              onChange={(event) => setReview(event.target.value)}
              placeholder="Apa yang paling kamu suka?"
              className="mt-2 w-full resize-y rounded-2xl border border-[#e7e6df] px-4 py-3 text-sm text-[#20231f] placeholder:text-[#a1a39c]"
            />
          </label>
          <button
            type="submit"
            disabled={!rating || !review.trim()}
            className="mt-3 rounded-full bg-[#e9ede5] px-4 py-2 text-xs font-medium text-[#465b42] transition enabled:hover:bg-[#dce6d7] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Kirim ulasan
          </button>
        </form>
      </section>
    </div>
  );
}
