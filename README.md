# Gawean — Platform Kerja Sampingan & Bantuan Tugas

**Gawean** adalah prototipe aplikasi web marketplace jasa mikro dan pekerjaan sampingan (*side-gig marketplace*) yang mempertemukan pemberi kerja (**Klien**) dengan pekerja lepas (**Mitra**). Platform ini mengusung sistem dana aman (*escrow*), transparansi komisi, dan kemudahan berganti peran dalam satu akun.

---

## 📌 Fitur Utama

1. **Landing Page Interaktif (`index.html`)**
   - Presentasi nilai utama: kerjaan online maupun on-site (di lokasi), KYC tidak wajib, sistem penahanan dana.
   - Contoh pekerjaan mikro langsung dengan tag kategori dan nominal bayaran.
   - Kalkulator simulasi komisi transparan (potongan komisi 15%).
   - Accordion FAQ dan bagian penawaran khusus bisnis/operasional.
   - *Dark mode* dan *light mode toggle* yang tersimpan di preferensi lokal (`localStorage`).

2. **Alur Onboarding Interaktif (`onboarding.html`)**
   - *Multi-step wizard* (4 langkah):
     1. **Pemilihan Peran Awal:** Mitra atau Klien.
     2. **Data Diri:** Nama lengkap, nomor telepon (dengan validasi format Indonesia), dan kota domisili.
     3. **Minat Bidang:** Pilihan kategori gawean (Media sosial, Desain, Antri & titip, dll.).
     4. **Konfirmasi & Pengalihan:** Penyimpanan nama di `localStorage` dan langsung diarahkan ke beranda sesuai peran yang dipilih.

3. **Dasbor Peran Ganda (Dual-Role Dashboard)**
   - **Beranda Mitra (`home-mitra.html`):**
     - Ringkasan statistik (kerjaan aktif, menunggu dicek, selesai).
     - Daftar kerjaan aktif dengan status (*Dikerjakan*, *Menunggu dicek*, *Perlu revisi*).
     - Rekomendasi kerjaan dengan filter kategori (*Semua*, *Online*, *Di lokasi*) serta tombol aksi interaktif untuk mengambil tugas (*take gig*).
     - Ringkasan saldo dompet dan progres kelengkapan profil.
   - **Beranda Klien (`home-klien.html`):**
     - Ringkasan total dana ditahan (*escrow*), kerjaan berjalan, dan hasil yang perlu dicek.
     - Review hasil kerja Mitra: persetujuan (*approval*) langsung mencairkan dana bersih (dipotong 15%), atau permintaan revisi.
     - Daftar status pekerjaan yang telah diposting (*Terbuka*, *Berjalan*, *Selesai*).
   - **Dasbor Terintegrasi (`dashboard.html`):**
     - Halaman all-in-one yang memungkinkan peralihan instan antara tampilan Mitra dan Klien menggunakan segmented control toggle.

4. **Desain & Tema Responsif**
   - Mendukung tema Gelap (Dark) dan Terang (Light) secara otomatis mendeteksi sistem (`prefers-color-scheme`) atau tombol manual.
   - Responsif di berbagai ukuran layar: Ponsel, Tablet, dan Desktop.
   - Komponen UI modern menggunakan tipografi Google Fonts (*Bricolage Grotesque* & *Figtree*).
   - Sistem notifikasi *toast* untuk feedback aksi pengguna.

---

## 📁 Struktur Direktori

```text
.
├── index.html              # Landing page utama Gawean
├── onboarding.html         # Halaman pendaftaran dan onboarding bertahap
├── home-mitra.html         # Halaman dasbor khusus peran Mitra
├── home-klien.html         # Halaman dasbor khusus peran Klien
├── dashboard.html          # Dasbor gabungan (toggle Mitra / Klien)
└── assets/
    ├── css/
    │   ├── style.css       # Gaya global, tema warna, variabel CSS, dan tata letak dasbor
    │   └── onboarding.css  # Gaya khusus langkah-langkah onboarding
    └── js/
        ├── common.js       # Utilitas bersama (tema dark/light, toast, avatar, format mata uang)
        ├── mitra.js        # Logika interaktif dasbor Mitra (filter gawean, ambil kerjaan)
        ├── klien.js        # Logika interaktif dasbor Klien (approval dana, minta revisi)
        └── onboarding.js   # Logika navigasi langkah pendaftaran & validasi formulir
```

---

## 🛠️ Teknologi yang Digunakan

- **HTML5:** Struktur semantik modern (`<main>`, `<section>`, `<aside>`, `<details>`, `<summary>`).
- **CSS3:**
  - CSS Custom Properties / Variables (`--bg`, `--accent`, `--surface`, `--ink`).
  - CSS Grid & Flexbox untuk tata letak responsif.
  - Media queries untuk responsive design dan *prefers-color-scheme*.
- **JavaScript (Vanilla / ES6):**
  - Manipulasi DOM native tanpa dependensi eksternal.
  - Simulasi state reaktif dan interaksi data dinamis.
  - `localStorage` API untuk menyimpan preferensi tema dan data pengguna.
- **Fonts:** Bricolage Grotesque (Heading) & Figtree (Body text).

---

## 🚀 Cara Menjalankan

Project ini dibangun murni menggunakan teknologi web standar (tanpa perlu proses kompilasi atau bundler).

### 1. Langsung lewat Browser
Cukup buka file `index.html` dengan mengklik dua kali atau *drag and drop* ke browser modern apa pun (Chrome, Firefox, Safari, Edge).

### 2. Menggunakan Local Web Server (Direkomendasikan)
Untuk pengalaman terbaik dan menghindari pembatasan lokal browser tertentu:

**Menggunakan Python:**
```bash
# Python 3
python3 -m http.server 3000
```
Buka browser dan kunjungi `http://localhost:3000`.

**Menggunakan Node.js (npx):**
```bash
npx serve .
# atau
npx live-server
```

**Menggunakan VS Code:**
Pasang ekstensi *Live Server*, lalu klik kanan pada `index.html` dan pilih **Open with Live Server**.

---

## 🧭 Alur Pengguna (User Flow)

1. **Jelajahi Informasi:** Kunjungi `index.html` untuk mempelajari cara kerja platform dan simulasi potongan komisi 15%.
2. **Mulai Onboarding:** Klik tombol **"Buka Gawean"** atau **"Daftar jadi Mitra"** menuju `onboarding.html`.
3. **Pilih Peran:** Tentukan apakah ingin mendaftar sebagai *Mitra* atau *Klien*.
4. **Isi Biodata:** Masukkan nama dan nomor HP. Nama depan pengguna akan otomatis dipersonalisasi di dasbor dan avatar profil.
5. **Pilih Kategori Minat:** Pilih minimal satu bidang pekerjaan yang diminati atau dibutuhkan.
6. **Eksplorasi Dasbor:**
   - Di dasbor Mitra (`home-mitra.html`): filter pekerjaan, klik **"Ambil"** pada gawean yang diminati untuk memindahkannya ke daftar kerjaan aktif.
   - Di dasbor Klien (`home-klien.html`): periksa hasil pekerjaan, klik **"Setujui"** untuk menyalurkan dana atau **"Minta revisi"**.
   - Beralih peran kapan saja melalui tombol navigasi peran di bagian atas header.

---

## 📄 Lisensi

Hak Cipta © 2026 Gawean. Semua hak dilindungi.
