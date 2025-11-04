# Email Troubleshooting Guide

## Issue: "Failed to send email. Please try again."

Jika Anda mengalami error "Failed to send email" saat mencoba reset password, ikuti langkah-langkah berikut:

### Langkah 1: Periksa Environment Variables

1. Pastikan file `.env` ada di root project
2. Pastikan `RESEND_API_KEY` sudah di-set:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxx
DATABASE_URL=mysql://root:@localhost:3306/hubnet
```

3. **Restart dev server** setelah mengubah `.env` file:
   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```

### Langkah 2: Periksa Database

Pastikan email yang Anda gunakan:
1. Ada di database (`tb_user`)
2. Field `is_active = 1` (aktif)
3. Format email valid

```sql
SELECT id_usr, email, is_active 
FROM tb_user 
WHERE email = 'your@email.com';
```

### Langkah 3: Periksa Logs

Saat mencoba reset password, perhatikan logs di terminal:

```bash
# Logs yang akan muncul:
Resend API Key exists: true/false
Sending email to: your@email.com
Reset token: ABC123
From email: onboarding@resend.dev
Email response data: ...
Email response error: ...
```

**Pastikan untuk melihat error message yang spesifik** - sekarang sudah lebih detail!

### Langkah 4: Uji Resend API

Untuk memastikan API key valid:

1. Kunjungi https://resend.com/api-keys
2. Pastikan API key aktif
3. Coba buat API key baru jika perlu
4. Update di `.env` dan restart server

### Penyebab Umum

1. **API Key Invalid/Expired**
   - Solusi: Generate new API key di Resend dashboard
   - Update `.env` file
   - Restart server

2. **Domain Tidak Terverifikasi**
   - `onboarding@resend.dev` adalah domain default dan mungkin terbatas
   - Solusi: Verifikasi custom domain di Resend
   - Atau gunakan domain yang sudah terverifikasi

3. **Email Tidak Ada di Database**
   - Solusi: Pastikan email terdaftar dan `is_active = 1`

4. **Format Email Salah**
   - Solusi: Pastikan format email valid

### Testing

1. Buka http://localhost:3000/forgot-password
2. Masukkan email yang **sudah terdaftar** dan **aktif** di database
3. Check **terminal logs** untuk error message yang detail
4. Error message sekarang akan lebih spesifik!

### Jika Masih Error

Coba dengan email provider yang berbeda (Gmail, Yahoo, dll) untuk memastikan bukan masalah email provider.

Cek juga:
- **Spam folder** di email
- **Console browser** (F12 → Network tab)
- **Terminal logs** untuk error yang lebih detail

---

## Perubahan yang Sudah Dilakukan

✅ **Improved error handling** - Error messages sekarang lebih spesifik  
✅ **Better logging** - Console logs untuk debugging  
✅ **Environment check** - Menampilkan error jika API key tidak ada  
✅ **Detailed error response** - Menunjukkan penyebab error yang sebenarnya  

Sekarang coba lagi dan perhatikan **error message yang spesifik** di toast atau console logs!
