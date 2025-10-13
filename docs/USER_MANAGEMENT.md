# User Management System

## Overview
Sistem User Management untuk aplikasi JAS HUBNET yang memungkinkan administrator untuk mengelola pengguna dengan lengkap.

## Features
✅ **CRUD Operations**
- Create: Menambahkan user baru dengan email, password, dan role
- Read: Melihat daftar semua user dengan informasi detail
- Update: Mengubah informasi user (email, password, role, status)
- Delete: Menghapus user dari sistem

✅ **Filtering & Search**
- Search by email
- Filter by role (Admin, Manager, User)
- Filter by status (Active/Inactive)

✅ **User Status Management**
- Toggle user status (Active/Inactive) dengan satu klik
- Visual indicator untuk status user

✅ **Security**
- Password hashing menggunakan bcrypt
- Validasi input form
- Konfirmasi sebelum delete

## File Structure

```
app/
├── user/
│   └── page.tsx                 # Main user management page
├── api/
│   ├── users/
│   │   └── route.ts            # User CRUD API endpoints
│   └── roles/
│       └── route.ts            # Role API endpoints
├── components/
│   ├── Sidebar.tsx             # Sidebar dengan link ke user page
│   └── MobileNav.tsx           # Mobile navigation
```

## API Endpoints

### 1. GET `/api/users`
Mendapatkan daftar semua users dengan optional filters.

**Query Parameters:**
- `role` (optional): Filter by role ID
- `status` (optional): Filter by active status (0 or 1)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id_usr": 1,
      "email": "admin@jas.com",
      "id_role": 1,
      "is_active": 1,
      "role": {
        "id_role": 1,
        "code_role": "Admin",
        "is_active": 1
      }
    }
  ]
}
```

### 2. POST `/api/users`
Membuat user baru.

**Request Body:**
```json
{
  "email": "newuser@example.com",
  "password": "securepassword",
  "id_role": 3,
  "is_active": 1
}
```

**Response:**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": { ... }
}
```

### 3. PUT `/api/users`
Mengupdate user yang sudah ada.

**Request Body:**
```json
{
  "id_usr": 1,
  "email": "updated@example.com",
  "password": "newpassword",  // optional
  "id_role": 2,
  "is_active": 1
}
```

**Response:**
```json
{
  "success": true,
  "message": "User updated successfully",
  "data": { ... }
}
```

### 4. DELETE `/api/users?id_usr=1`
Menghapus user.

**Query Parameters:**
- `id_usr` (required): User ID yang akan dihapus

**Response:**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

### 5. GET `/api/roles`
Mendapatkan daftar semua roles yang aktif.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id_role": 1,
      "code_role": "Admin",
      "is_active": 1
    },
    {
      "id_role": 2,
      "code_role": "Manager",
      "is_active": 1
    },
    {
      "id_role": 3,
      "code_role": "User",
      "is_active": 1
    }
  ]
}
```

## Database Schema

### Table: `tb_user`
```sql
CREATE TABLE tb_user (
  id_usr INT PRIMARY KEY AUTO_INCREMENT,
  id_role INT NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  is_active INT DEFAULT 1,
  FOREIGN KEY (id_role) REFERENCES tb_role(id_role)
);
```

### Table: `tb_role`
```sql
CREATE TABLE tb_role (
  id_role INT PRIMARY KEY AUTO_INCREMENT,
  code_role VARCHAR(50) NOT NULL,
  is_active INT DEFAULT 1
);
```

## Usage Guide

### Accessing User Management
1. Login ke aplikasi
2. Klik icon user (👤) di sidebar atau mobile navigation
3. Anda akan diarahkan ke halaman `/user`

### Adding a New User
1. Klik tombol "➕ Add New User"
2. Isi form dengan:
   - Email (required)
   - Password (required)
   - Role (required)
   - Status (Active/Inactive)
3. Klik "Create"

### Editing a User
1. Cari user yang ingin diedit di tabel
2. Klik tombol "✏️ Edit"
3. Update informasi yang diperlukan
   - Password bisa dikosongkan jika tidak ingin mengubah
4. Klik "Update"

### Deleting a User
1. Cari user yang ingin dihapus
2. Klik tombol "🗑️ Delete"
3. Konfirmasi penghapusan

### Toggle User Status
1. Cari user yang ingin diubah statusnya
2. Klik badge status (✓ Active atau ✕ Inactive)
3. Status akan berubah secara otomatis

### Filtering Users
1. **Search by Email**: Ketik email di search box
2. **Filter by Role**: Pilih role dari dropdown
3. **Filter by Status**: Pilih status (All/Active/Inactive)

## Security Notes

1. **Password Hashing**: Semua password di-hash menggunakan bcrypt sebelum disimpan
2. **Email Validation**: Email harus unique dan valid format
3. **Required Fields**: Email, password (untuk user baru), dan role wajib diisi
4. **Delete Confirmation**: Konfirmasi diperlukan sebelum menghapus user

## Styling

User Management page menggunakan design system yang konsisten dengan halaman login:
- Gradient background (slate-800 to gray-900)
- Glassmorphism effects
- Smooth animations
- Responsive design (mobile & desktop)
- Modern UI dengan hover effects

## Dependencies

- `@prisma/client`: Database ORM
- `bcrypt`: Password hashing
- `react-hot-toast`: Toast notifications
- `react-icons`: Icon library
- `next`: Next.js framework

## Future Enhancements

Fitur yang bisa ditambahkan di masa depan:
- [ ] Pagination untuk daftar user yang panjang
- [ ] Export user data ke Excel/CSV
- [ ] Bulk operations (activate/deactivate multiple users)
- [ ] User activity logs
- [ ] Profile picture upload
- [ ] Password strength indicator
- [ ] Email verification system
- [ ] Two-factor authentication
- [ ] User groups/teams
- [ ] Advanced filtering (by date, last login, etc)

## Troubleshooting

### Database Connection Error
```bash
# Pastikan DATABASE_URL sudah di-set di .env
DATABASE_URL="mysql://user:password@localhost:3306/database_name"

# Jalankan migration
npx prisma migrate dev
```

### Bcrypt Error
```bash
# Install ulang dependencies
npm install bcrypt @types/bcrypt
```

### Toast Not Showing
Pastikan `<Toaster />` component sudah ada di root layout:
```tsx
import { Toaster } from 'react-hot-toast'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
```

## Support

Jika ada pertanyaan atau masalah, silakan hubungi tim development.

---

**Version**: 1.0.0  
**Last Updated**: October 2025  
**Author**: JAS HUBNET Development Team

