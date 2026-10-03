import { Link, NavLink } from "react-router-dom";
import { useCart } from "../utils/CartContext.jsx";

const linkClass = ({ isActive }) =>
  `whitespace-nowrap rounded-full px-2.5 py-2 text-sm transition sm:px-4 ${
    isActive
      ? "bg-[#20231f] text-white"
      : "text-[#666a63] hover:bg-[#eeede7] hover:text-[#20231f]"
  }`;

export default function Navbar() {
  const { totalQty } = useCart();

  return (
    <nav
      aria-label="Navigasi utama"
      className="flex items-center justify-between gap-2 py-5 sm:gap-4"
    >
      <Link aria-label="Ruang, kembali ke beranda" to="/" className="group">
        <span className="flex items-center gap-2 text-[1.35rem] font-semibold tracking-[-0.07em]">
          <span className="grid size-8 place-items-center rounded-full bg-[#dce6d7] text-sm text-[#465b42]">
            r.
          </span>
          ruang
        </span>
      </Link>

      <div className="flex items-center gap-1 rounded-full bg-white/70 p-1">
        <NavLink to="/" end className={linkClass}>
          Jelajahi
        </NavLink>
        <NavLink to="/cart" className={linkClass}>
          <span className="flex items-center gap-2">
            Tas belanja
            {totalQty > 0 && (
              <span className="grid min-w-5 place-items-center rounded-full bg-[#dce6d7] px-1.5 text-xs font-semibold text-[#465b42]">
                {totalQty}
              </span>
            )}
          </span>
        </NavLink>
      </div>
    </nav>
  );
}
