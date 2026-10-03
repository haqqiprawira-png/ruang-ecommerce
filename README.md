# Ruang — E-Commerce Prototype

Prototipe single-page e-commerce menggunakan React, Vite, Tailwind CSS, dan React Router. Struktur dan pola komponen, halaman, props, state lokal, serta Context keranjang mengikuti modul yang disimpan di [`docs/BAB II Frontend Programming State Management.pdf`](./docs/BAB%20II%20Frontend%20Programming%20State%20Management.pdf).

## Fitur

- Katalog produk dengan pencarian dan filter kategori.
- Detail produk dengan form rating dan ulasan.
- Tas belanja global menggunakan React Context, termasuk ubah jumlah dan hapus barang.
- Simulasi checkout dengan formulir alamat dan metode pembayaran.
- **Fitur tambahan: kupon `HEMAT10`**, diskon 10% dengan minimum belanja Rp500.000.
- Layout responsif untuk layar ponsel dan desktop.

## Menjalankan secara lokal

Persyaratan: Node.js dan npm.

```bash
npm install
npm run dev
```

Build produksi lokal:

```bash
npm run build
npm run preview
```

## Deployment

Workflow GitHub Actions di `.github/workflows/deploy.yml` membangun aplikasi dan menerbitkannya ke GitHub Pages pada setiap push ke branch `main`. Aktifkan GitHub Pages di pengaturan repository dengan sumber **GitHub Actions**.

- GitHub Repository URL: belum dibuat.
- Publish URL: tersedia setelah workflow GitHub Pages berhasil dijalankan.

## Laporan dan bukti

Lihat [`LAPORAN_PROYEK.md`](./LAPORAN_PROYEK.md) untuk ringkasan implementasi, skenario pengujian, dan tempat menyimpan tangkapan layar aplikasi.
