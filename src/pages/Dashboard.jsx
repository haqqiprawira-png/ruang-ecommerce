import { useMemo, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";
import { products } from "../data/products.js";

const categories = ["Semua", ...new Set(products.map((product) => product.category))];

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");

  const visibleProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase("id");

    return products.filter((product) => {
      const matchesSearch =
        product.name.toLocaleLowerCase("id").includes(normalizedSearch) ||
        product.category.toLocaleLowerCase("id").includes(normalizedSearch);
      const matchesCategory =
        category === "Semua" || product.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [category, search]);

  return (
    <div className="mx-auto max-w-7xl px-5 pb-4 pt-7 sm:px-8 sm:pt-12">
      <section className="hero-grid relative overflow-hidden rounded-[1.75rem] bg-[#e8e9e1] px-6 py-10 sm:px-10 sm:py-14 lg:px-14">
        <div className="relative z-10 max-w-xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#65705e]">
            Temukan yang terasa tepat
          </p>
          <h1 className="max-w-lg text-4xl font-medium leading-[1.04] tracking-[-0.065em] sm:text-5xl lg:text-[3.7rem]">
            Lebih sedikit, tapi lebih berarti.
          </h1>
          <p className="mt-4 max-w-md text-sm leading-6 text-[#686d64] sm:text-base">
            Pilihan barang yang dirancang dengan baik, dipakai setiap hari, dan
            terasa menyenangkan untuk dimiliki.
          </p>
          <a
            href="#koleksi"
            className="mt-7 inline-flex items-center gap-3 rounded-full bg-[#20231f] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#40463e]"
          >
            Jelajahi koleksi <span aria-hidden="true">↓</span>
          </a>
        </div>
        <div
          aria-hidden="true"
          className="absolute -bottom-14 -right-5 hidden size-80 items-center justify-center rounded-full border border-[#c9d0c2] bg-[#dce3d5]/70 text-[10rem] shadow-[0_25px_80px_rgba(48,57,44,0.08)] md:flex lg:right-10 lg:size-[23rem] lg:text-[12rem]"
        >
          🪴
        </div>
        <div
          aria-hidden="true"
          className="absolute right-16 top-9 hidden size-12 items-center justify-center rounded-full bg-[#f6f5f1] text-lg md:flex lg:right-20"
        >
          ✳
        </div>
      </section>

      <section id="koleksi" className="scroll-mt-6 pt-11 sm:pt-14">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[#858880]">
              Kurasi minggu ini
            </p>
            <h2 className="mt-2 text-2xl font-medium tracking-[-0.055em] sm:text-3xl">
              Teman sehari-hari
            </h2>
          </div>
          <label className="flex w-full items-center gap-2 rounded-full border border-[#e7e6df] bg-white px-4 py-2.5 sm:max-w-xs">
            <span aria-hidden="true" className="text-[#858880]">
              ⌕
            </span>
            <span className="sr-only">Cari produk</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Cari produk..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-[#a1a39c]"
            />
          </label>
        </div>

        <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
              className={`shrink-0 rounded-full px-4 py-2 text-xs transition ${
                category === item
                  ? "bg-[#20231f] text-white"
                  : "bg-white text-[#686d64] hover:bg-[#eeede7]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {visibleProducts.length > 0 ? (
          <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-10">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} p={product} />
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-3xl border border-dashed border-[#d6d7cf] bg-white/50 px-5 py-14 text-center">
            <p className="text-lg font-medium">Belum ada yang cocok.</p>
            <p className="mt-2 text-sm text-[#858880]">
              Coba kata kunci atau kategori yang berbeda.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setCategory("Semua");
              }}
              className="mt-4 text-sm font-medium underline underline-offset-4"
            >
              Hapus pencarian
            </button>
          </div>
        )}
      </section>

      <section className="mt-14 grid gap-5 rounded-[1.5rem] bg-[#f0eee8] p-6 sm:grid-cols-3 sm:p-8">
        {[
          ["01", "Dipilih dengan cermat", "Sedikit barang, banyak pertimbangan."],
          ["02", "Teman untuk harian", "Fungsi baik, bentuk yang bertahan."],
          ["03", "Belanja tanpa terburu", "Jelajahi pilihan sesuai kebutuhanmu."],
        ].map(([number, title, description]) => (
          <div key={number} className="flex gap-3">
            <span className="pt-0.5 text-xs text-[#8c8e85]">{number}</span>
            <div>
              <h3 className="text-sm font-medium">{title}</h3>
              <p className="mt-1 text-xs leading-5 text-[#858880]">
                {description}
              </p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
