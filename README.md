# Portofolio — Muhammad Daffa

Portofolio personal: **Graphic Designer • Internet Technician • Freelancer**
dari Kediri, Jawa Timur.

> Live: https://buildbydin86.netlify.app/

## Isi situs

| Section | Keterangan |
|---|---|
| Hero | Typing effect, stats, foto profil |
| About | Bio + info kontak + sosial |
| Skills | 6 skill dengan progress bar animasi |
| **Projects** | **DAFFTECH** & **Kuradapt** (live) |
| Services | Website, Desain Kreatif, Internet Technician |
| Contact | Form EmailJS + info kontak |

### Project yang ditampilkan

- **DAFFTECH — Katalog Produk Digital** → https://daffaull18.github.io/dafftech-v2/
- **Kuradapt — Kurikulum Hidup** → https://daffaull18.github.io/kuradapt

## Struktur folder

```
portoMe/
├── index.html          # halaman utama
├── css/style.css       # seluruh styling
├── js/script.js        # menu, animasi, form EmailJS
└── images/
    ├── profile.png     # foto profil
    ├── dafftech.png    # screenshot project DAFFTECH
    └── kuradapt.png    # screenshot project Kuradapt
```

## Cara menjalankan lokal

Situs ini statis — tanpa build, tanpa framework.

```bash
# opsi 1
python -m http.server 8080

# opsi 2 (langsung buka)
buka index.html di browser
```

## Cara edit

Semua teks ada di `index.html`. Ganti lalu simpan, refresh browser.

- **Warna / tampilan** → `css/style.css` (variabel di blok `:root`, baris paling atas)
- **Animasi, typing, form** → `js/script.js`

## Cara deploy

### A. Otomatis (sudah aktif ✅)

Push ke GitHub, Netlify deploy sendiri lewat GitHub Actions:

```bash
git add .
git commit -m "update portofolio"
git push
```

Workflow: `.github/workflows/deploy.yml`
Secret: `NETLIFY_AUTH_TOKEN`, `NETLIFY_SITE_ID`

### B. Manual satu perintah

```bash
bash deploy.sh
```

Zip folder → upload ke Netlify → tunggu `ready` → pastikan situs publik & tanpa badge.

### C. Tanpa Git

Seret folder ini ke https://app.netlify.com/drop

## Situs

| | |
|---|---|
| Live | https://muhammad-daffa.netlify.app |
| Admin | https://app.netlify.com/projects/muhammad-daffa |
| GitHub | https://github.com/daffaull18/muhammad-daffa |

Token & site ID disimpan di `~/.netlify_token` dan `~/.netlify_site_id`
(sudah masuk `.gitignore`, tidak ikut ter-commit).

> **Badge "Powered by Netlify":** dimatikan lewat field
> `built_with_badge_enabled: false`. Kalau muncul lagi,
> `deploy.sh` dan workflow otomatis mematikannya.

### Form kontak

Memakai EmailJS. Kalau ganti akun, edit 3 nilai di `js/script.js`:

```js
emailjs.init("PUBLIC_KEY");
emailjs.sendForm("SERVICE_ID", "TEMPLATE_ID", this);
```

## Lisensi

© Muhammad Daffa. Dibuat & dirawat di Indonesia.
