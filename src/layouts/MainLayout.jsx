import { Link, Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";

export default function MainLayout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="flex min-h-screen flex-col">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <Navbar />
        {isHome && (
          <div className="my-2 flex items-center justify-center gap-2 rounded-full bg-[#e9ede5] px-4 py-2 text-center text-xs text-[#596653] sm:text-sm">
            <span aria-hidden="true">✳</span>
            <span>Barang pilihan, dibuat untuk menemani hari-hari biasa.</span>
          </div>
        )}
      </div>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="mt-16 border-t border-[#e7e6df]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-7 text-xs text-[#858880] sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <Link to="/" className="font-semibold tracking-[-0.04em] text-[#41453e]">
            ruang
          </Link>
          <p>Kurasi sederhana untuk hidup yang lebih berarti.</p>
          <p>Prototipe React · 2026</p>
        </div>
      </footer>
    </div>
  );
}
