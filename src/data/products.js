export const products = [
  {
    id: 1,
    slug: "headphone-studio",
    name: "Headphone Studio",
    category: "Teknologi",
    price: 1249000,
    rating: 4.9,
    reviews: 128,
    badge: "Favorit",
    emoji: "🎧",
    tone: "bg-[#e4e9df]",
    description:
      "Temani fokus dan jeda dengan suara jernih, bantalan empuk, dan desain yang tetap nyaman dipakai sepanjang hari.",
  },
  {
    id: 2,
    slug: "everyday-tote",
    name: "Everyday Tote",
    category: "Aksesori",
    price: 389000,
    rating: 4.8,
    reviews: 86,
    badge: "Pilihan editor",
    emoji: "👜",
    tone: "bg-[#f0e7dc]",
    description:
      "Tas kanvas ringan dengan ruang yang cukup untuk rutinitas harian, dibuat untuk menemani perjalanan dari pagi hingga pulang.",
  },
  {
    id: 3,
    slug: "minimal-watch",
    name: "Minimal Watch",
    category: "Aksesori",
    price: 829000,
    rating: 4.7,
    reviews: 64,
    badge: "",
    emoji: "⌚",
    tone: "bg-[#e7e5ef]",
    description:
      "Jam tangan dengan tampilan bersih dan strap yang nyaman, memberi sentuhan sederhana pada gaya sehari-hari.",
  },
  {
    id: 4,
    slug: "pour-over-set",
    name: "Pour Over Set",
    category: "Rumah",
    price: 249000,
    rating: 4.9,
    reviews: 52,
    badge: "Baru",
    emoji: "☕",
    tone: "bg-[#eee4dd]",
    description:
      "Mulai pagi dengan ritual seduh yang lebih personal. Set ringkas ini pas untuk menikmati kopi favorit di rumah.",
  },
  {
    id: 5,
    slug: "mini-speaker",
    name: "Mini Speaker",
    category: "Teknologi",
    price: 689000,
    rating: 4.6,
    reviews: 41,
    badge: "",
    emoji: "🔊",
    tone: "bg-[#dfe9e8]",
    description:
      "Suara yang mengisi ruang tanpa mengambil banyak tempat. Bentuk ringkas dan mudah dibawa untuk menemani aktivitas.",
  },
  {
    id: 6,
    slug: "cloud-knit-sneakers",
    name: "Cloud Knit Sneakers",
    category: "Gaya hidup",
    price: 959000,
    rating: 4.8,
    reviews: 73,
    badge: "Terlaris",
    emoji: "👟",
    tone: "bg-[#ece8d9]",
    description:
      "Langkah ringan dengan material rajut yang fleksibel dan siluet minimal untuk dipakai dari hari kerja sampai akhir pekan.",
  },
];

export const formatRupiah = (amount) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
