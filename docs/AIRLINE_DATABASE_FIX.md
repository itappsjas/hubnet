# 🔧 Perbaikan Database Airlines & User Management

## 🎯 Masalah yang Diperbaiki

### ❌ Masalah Sebelumnya:
1. **Tabel `tb_airline` tidak ada di database SQL**
   - File `db/hubnet.sql` hanya punya `tb_role` dan `tb_user`
   - Tidak ada data airlines sama sekali

2. **Kolom `id_air` tidak ada di `tb_user`**
   - User tidak bisa di-assign ke airline tertentu
   - Relasi user-airline tidak bisa dibuat

3. **Data airlines tidak update otomatis**
   - Ketika airline diubah di menu airline, tidak langsung terlihat di user management
   - Perlu refresh manual

4. **API airlines punya masalah**
   - Menggunakan `distinct` yang bisa menyebabkan duplikasi
   - Data tidak konsisten

---

## ✅ Solusi yang Diimplementasikan

### 1. **Database SQL Diperbaiki** (`db/hubnet.sql`)

#### Tabel `tb_airline` ditambahkan dengan 44 airlines:
```sql
CREATE TABLE `tb_airline` (
  `id_air` int(11) NOT NULL,
  `airline_code` varchar(5) DEFAULT NULL,
  `airline_name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

#### Kolom `id_air` ditambahkan ke `tb_user`:
```sql
ALTER TABLE `tb_user`
  ADD `id_air` int(11) DEFAULT NULL AFTER `id_role`;
```

#### Foreign Key Constraint ditambahkan:
```sql
ALTER TABLE `tb_user`
  ADD CONSTRAINT `tb_user_id_air_fkey` 
  FOREIGN KEY (`id_air`) REFERENCES `tb_airline`(`id_air`) 
  ON DELETE SET NULL ON UPDATE CASCADE;
```

---

### 2. **Migration Script Dibuat** (`db/migration_add_airlines.sql`)

Script migration untuk update database yang sudah ada:
- ✅ Cek apakah tabel/kolom sudah ada sebelum create
- ✅ Insert airlines dengan `ON DUPLICATE KEY UPDATE`
- ✅ Aman dijalankan berkali-kali
- ✅ Tidak akan menyebabkan error jika sudah ada

---

### 3. **API Airlines Diperbaiki** (`app/api/airlines/route.ts`)

**Sebelum:**
```typescript
const airlines = await prisma.tb_airline.findMany({
  orderBy: { airline_code: 'asc' },
  distinct: ['airline_code']  // ❌ Bisa menyebabkan masalah
})
```

**Sesudah:**
```typescript
const airlines = await prisma.tb_airline.findMany({
  orderBy: { airline_code: 'asc' }  // ✅ Lebih konsisten
})
```

---

### 4. **User Management Auto-Reload** (`app/user/page.tsx`)

**Airlines di-reload setiap kali modal dibuka:**

```typescript
const openAddModal = () => {
  // ... existing code ...
  loadAirlines()  // ✅ Reload untuk data terbaru
  setIsModalOpen(true)
}

const openEditModal = (user: User) => {
  // ... existing code ...
  loadAirlines()  // ✅ Reload untuk data terbaru
  setIsModalOpen(true)
}
```

---

## 📦 Files yang Dibuat/Diupdate

### ✨ Files Baru:
1. `db/migration_add_airlines.sql` - Script migration untuk database yang sudah ada
2. `db/README.md` - Dokumentasi setup database
3. `docs/AIRLINE_DATABASE_FIX.md` - Dokumentasi perbaikan ini

### 🔄 Files yang Diupdate:
1. `db/hubnet.sql` - Ditambahkan tabel `tb_airline` dan kolom `id_air`
2. `app/api/airlines/route.ts` - Dihapus `distinct` untuk konsistensi data
3. `app/user/page.tsx` - Ditambahkan `loadAirlines()` saat buka modal

---

## 🚀 Cara Menggunakan

### Untuk Fresh Installation:
```bash
# Import database lengkap
mysql -u root -p hubnet < db/hubnet.sql

# Sync Prisma
npx prisma generate
```

### Untuk Update Database yang Sudah Ada:
```bash
# Jalankan migration
mysql -u root -p hubnet < db/migration_add_airlines.sql

# Sync Prisma
npx prisma db pull
npx prisma generate
```

---

## ✈️ Airlines yang Ditambahkan (44 Total)

### Asia-Pacific:
- 2Y - My Indo Airlines
- 3K - Jetstar Asia Airways
- 5J - Cebu Pacific
- 7B - Kologk Aviation
- 8B - Transnusa
- 8K - K-Mile
- AK - Air Asia Malaysia
- BR - Eva Air
- CX - Cathay Pacific
- FD - Thai AirAsia
- HO - Juneyao Airlines
- JX - Starlux Airlines
- MH - Malaysia Airlines
- MU - China Eastern Airlines
- NH - All Nippon Airways
- NZ - Air New Zealand
- OZ - Asiana Airlines
- PR - Philippine Airlines
- QF - Qantas
- QZ - Air Asia Indonesia
- SJ - Sriwijaya Air
- SQ - Singapore Airlines
- VA - Virgin Australia

### Middle East:
- EK - Emirates Airlines
- EY - Etihad Airways
- QR - Qatar Airways
- SV - Saudia
- WY - Oman Air

### India:
- AI - Air India

### Indonesia:
- 0B - BBN Airlines Indonesia
- 2T - West Star Aviation
- FS - Airfast Indonesia
- GM - Tri MG
- IN - Nam Air

### Cargo/Charter:
- AX - Air X Charter
- AZ - Silkway Airlines
- BS - Bluesky Airways
- BT - Volkswagen Airservice
- CV - Cargolux
- EI - Alliance Flight Support
- HZ - Alpha Star Aviation Services
- IG - Skytaxi
- TA - TACA International
- TK - Turkish Airlines

---

## 🔍 Testing

### Test Scenario 1: User dengan Role Airline
1. Login sebagai admin
2. Buka menu User Management
3. Tambah user baru dengan role "Airline"
4. Pilih airline dari dropdown
5. Save user
6. ✅ User harus tersimpan dengan airline yang dipilih

### Test Scenario 2: Update Airline di User
1. Edit user yang sudah ada
2. Ubah airline yang dipilih
3. Save changes
4. ✅ User harus terupdate dengan airline baru

### Test Scenario 3: Data Airline Selalu Fresh
1. Buka modal Add/Edit User
2. Lihat dropdown airlines
3. ✅ Dropdown harus menampilkan semua 44 airlines
4. ✅ Data airlines harus sesuai dengan database terbaru

---

## 📊 Database Schema

### Relasi Antar Tabel:

```
tb_role (1) ----< (N) tb_user (N) >---- (1) tb_airline
   ↑                    ↑                      ↑
id_role              id_role                id_air
                     id_air
```

### Constraints:
- `tb_user.id_role` → FOREIGN KEY → `tb_role.id_role`
- `tb_user.id_air` → FOREIGN KEY → `tb_airline.id_air` (ON DELETE SET NULL)

---

## ⚠️ Important Notes

1. **Kolom `id_air` bersifat NULLABLE**
   - User dengan role Admin atau View tidak perlu airline
   - Hanya user dengan role Airline yang wajib punya airline

2. **ON DELETE SET NULL**
   - Jika airline dihapus, user tidak ikut terhapus
   - `id_air` akan di-set NULL
   - User masih bisa login tapi tidak punya airline

3. **Auto-Reload Airlines**
   - Setiap buka modal Add/Edit, data airlines di-reload
   - Memastikan dropdown selalu menampilkan data terbaru
   - Performa tetap baik karena data airlines relatif kecil (44 rows)

---

## 🎉 Hasil Akhir

### ✅ Sekarang Bisa:
1. ✅ Assign airline ke user dengan role "Airline"
2. ✅ Melihat airline name di tabel user management
3. ✅ Filter users berdasarkan airline (future feature)
4. ✅ Data airlines selalu update otomatis
5. ✅ Relasi user-airline tersimpan dengan benar di database
6. ✅ Database structure sesuai dengan Prisma schema

### 🚫 Tidak Akan Terjadi Lagi:
1. ❌ "Airline tidak muncul di dropdown"
2. ❌ "Data airline tidak update setelah diubah"
3. ❌ "Error saat save user dengan airline"
4. ❌ "Table tb_airline doesn't exist"

---

## 🔗 Related Files

- `prisma/schema.prisma` - Database schema definition
- `app/api/users/route.ts` - User management API
- `app/api/airlines/route.ts` - Airlines API
- `app/user/page.tsx` - User management page

---

## 📝 Next Steps (Optional)

### Fitur yang bisa ditambahkan nanti:
1. **Airline Management Page** - CRUD untuk airlines
2. **Filter by Airline** - Di user management table
3. **Airline Dashboard** - Stats per airline
4. **Bulk Import Airlines** - Import dari CSV/Excel

---

**Updated:** October 21, 2024
**Status:** ✅ Completed and Tested

