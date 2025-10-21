# Database Setup Instructions

## 📋 Untuk Fresh Installation

Jika Anda membuat database baru dari awal:

1. Buat database baru:
```sql
CREATE DATABASE hubnet CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE hubnet;
```

2. Import file `hubnet.sql`:
```bash
mysql -u root -p hubnet < hubnet.sql
```

Atau via phpMyAdmin:
- Buka phpMyAdmin
- Pilih database `hubnet`
- Klik tab "Import"
- Pilih file `hubnet.sql`
- Klik "Go"

---

## 🔄 Untuk Update Database yang Sudah Ada

Jika database Anda sudah ada dan ingin menambahkan tabel `tb_airline`:

1. Jalankan migration script:
```bash
mysql -u root -p hubnet < migration_add_airlines.sql
```

Atau via phpMyAdmin:
- Buka phpMyAdmin
- Pilih database `hubnet`
- Klik tab "SQL"
- Copy-paste isi file `migration_add_airlines.sql`
- Klik "Go"

Script ini akan:
- ✅ Membuat tabel `tb_airline` jika belum ada
- ✅ Menambah kolom `id_air` ke tabel `tb_user` jika belum ada
- ✅ Insert 44 airlines (dari 2Y sampai AI)
- ✅ Menambahkan foreign key constraint
- ✅ Aman dijalankan berkali-kali (tidak akan duplicate data)

---

## 🔧 Sync Prisma Schema

Setelah update database, jalankan:

```bash
npx prisma db pull
npx prisma generate
```

Atau jika ingin sync schema ke database:

```bash
npx prisma db push
```

---

## ✈️ Daftar Airlines yang Ditambahkan

Total: **44 Airlines**

### Airlines yang sudah ada sebelumnya:
- 2Y - My Indo Airlines
- AK - Air Asia Malaysia
- AZ - Silkway Airlines
- MH - Malaysia Airlines
- QZ - Air Asia Indonesia
- 0B - BBN Airlines Indonesia
- 2T - West Star Aviation
- 3K - Jetstar Asia Airways
- 5J - Cebu Pacific
- 8B - Transnusa
- 8K - K-Mile
- AX - Air X Charter
- BR - Eva Air
- BS - Bluesky Airways
- BT - Volkswagen Airservice
- CV - Cargolux
- CX - Cathay Pacific
- EI - Alliance Flight Support
- EK - Emirates Airlines
- EY - Etihad Airways
- FS - Airfast Indonesia
- GM - Tri MG
- HZ - Alpha Star Aviation Services
- IG - Skytaxi

### Airlines baru yang ditambahkan:
- IN - Nam Air
- NH - All Nippon Airways
- NZ - Air New Zealand
- OZ - Asiana Airlines
- PR - Philippine Airlines
- QF - Qantas
- QR - Qatar Airways
- SQ - Singapore Airlines
- SV - Saudia
- TA - TACA International
- TK - Turkish Airlines
- VA - Virgin Australia
- WY - Oman Air
- FD - Thai AirAsia
- HO - Juneyao Airlines
- JX - Starlux Airlines
- MU - China Eastern Airlines
- SJ - Sriwijaya Air
- 7B - Kologk Aviation
- AI - Air India

---

## 🚨 Troubleshooting

### Error: Table 'tb_airline' already exists
Ini normal jika tabel sudah ada. Script akan skip create table dan lanjut ke insert data.

### Error: Duplicate entry for key 'PRIMARY'
Script menggunakan `ON DUPLICATE KEY UPDATE`, jadi akan update data yang sudah ada.

### Error: Foreign key constraint fails
Pastikan tabel `tb_airline` sudah dibuat sebelum menambahkan foreign key.

---

## 📝 Notes

- Database charset: `utf8mb4`
- Collation: `utf8mb4_unicode_ci`
- Engine: `InnoDB`
- Foreign key constraint: `ON DELETE SET NULL ON UPDATE CASCADE`

