# 🚀 Quick Fix - Airline Database Issue

## 🎯 Yang Sudah Diperbaiki

1. ✅ **Database SQL lengkap** dengan tabel `tb_airline` (44 airlines)
2. ✅ **Kolom `id_air`** ditambahkan ke `tb_user`
3. ✅ **API Airlines** diperbaiki (tidak ada duplikasi)
4. ✅ **User Management** auto-reload airlines saat buka modal
5. ✅ **Migration script** untuk update database yang sudah ada

---

## ⚡ Cara Menggunakan (Pilih Salah Satu)

### Option 1: Database Baru (Fresh Install)

Jika mau mulai dari awal:

```bash
# 1. Drop database lama (HATI-HATI!)
mysql -u root -p -e "DROP DATABASE IF EXISTS hubnet; CREATE DATABASE hubnet CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# 2. Import database baru
mysql -u root -p hubnet < db/hubnet.sql

# 3. Sync Prisma
npx prisma generate

# 4. Restart dev server
npm run dev
```

---

### Option 2: Update Database yang Ada (Recommended)

Jika sudah ada data dan tidak mau hilang:

```bash
# 1. Jalankan migration
mysql -u root -p hubnet < db/migration_add_airlines.sql

# 2. Sync Prisma
npx prisma db pull
npx prisma generate

# 3. Restart dev server
npm run dev
```

---

### Option 3: Via phpMyAdmin (Mudah)

1. Buka **phpMyAdmin**
2. Pilih database `hubnet`
3. Klik tab **"SQL"**
4. Copy-paste isi file `db/migration_add_airlines.sql`
5. Klik **"Go"**
6. Di terminal jalankan:
   ```bash
   npx prisma db pull
   npx prisma generate
   npm run dev
   ```

---

## ✅ Test Apakah Berhasil

1. Login sebagai **admin**
2. Buka menu **User Management**
3. Klik **Add New User**
4. Pilih role **"Airline"**
5. **Dropdown airline harus muncul** dengan 44 airlines
6. Pilih salah satu airline
7. Klik **Create User**
8. ✅ **User tersimpan dengan airline yang dipilih**

---

## 📁 Files yang Berubah

### Files Baru:
- `db/migration_add_airlines.sql` - Script update database
- `db/README.md` - Dokumentasi database
- `docs/AIRLINE_DATABASE_FIX.md` - Dokumentasi lengkap
- `QUICK_FIX_AIRLINES.md` - File ini

### Files yang Diupdate:
- `db/hubnet.sql` - Database lengkap + airlines
- `app/api/airlines/route.ts` - API diperbaiki
- `app/user/page.tsx` - Auto-reload airlines

---

## 🔍 Airlines yang Ditambahkan (44 Total)

| Code | Airline Name |
|------|-------------|
| 2Y | My Indo Airlines |
| AK | Air Asia Malaysia |
| QR | Qatar Airways |
| SQ | Singapore Airlines |
| EK | Emirates Airlines |
| IN | Nam Air |
| NH | All Nippon Airways |
| ... | (dan 37 lainnya) |

**Lihat list lengkap di:** `docs/AIRLINE_DATABASE_FIX.md`

---

## ⚠️ Troubleshooting

### Error: "Table 'tb_airline' doesn't exist"
➡️ Jalankan migration script: `mysql -u root -p hubnet < db/migration_add_airlines.sql`

### Error: "Column 'id_air' doesn't exist"
➡️ Jalankan migration script (sudah include add column)

### Dropdown airline kosong
➡️ Pastikan API `/api/airlines` return data:
```bash
# Test API
curl http://localhost:3000/api/airlines
```

### Data airlines tidak update
➡️ Clear browser cache atau hard refresh (Ctrl+Shift+R)

---

## 📞 Need Help?

Lihat dokumentasi lengkap:
- `db/README.md` - Setup database
- `docs/AIRLINE_DATABASE_FIX.md` - Penjelasan detail

---

**Ready to Go! 🚀**

