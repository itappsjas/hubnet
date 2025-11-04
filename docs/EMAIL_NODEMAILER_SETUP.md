# Email Configuration dengan Nodemailer

Proyek ini sekarang menggunakan **Nodemailer** dengan SMTP server untuk mengirim email ke semua alamat yang tersimpan di database, bukan hanya email hardcoded.

## Keuntungan Nodemailer

1. ✅ **Mendukung semua email**: Bisa kirim ke email apapun yang ada di database
2. ✅ **SMTP Fleksibel**: Bisa pakai server internal atau Google SMTP
3. ✅ **Murah**: Tidak perlu API key premium
4. ✅ **Kontrol Penuh**: Penuh kontrol atas konfigurasi email

## Konfigurasi Environment Variables

Tambahkan konfigurasi berikut ke file `.env.local` Anda:

### Option 1: Internal SMTP Server (Recommended untuk produksi)

```env
# Internal SMTP Server (berdasarkan konfigurasi PHP Anda)
SMTP_HOST=50.1.1.6
SMTP_PORT=25
SMTP_SECURE=false
SMTP_USER=
SMTP_PASSWORD=
SMTP_TIMEOUT=30000
EMAIL_FROM=noreply@ptjas.co.id
```

### Option 2: Google SMTP (Alternative)

Jika Anda ingin menggunakan Google SMTP:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_TIMEOUT=30000
EMAIL_FROM=your-email@gmail.com
```

**Catatan untuk Google SMTP:**
1. Gunakan **App Password**, bukan password regular
2. Aktifkan 2FA dulu di akun Google Anda
3. Generate App Password: https://myaccount.google.com/apppasswords

### Option 3: Baggage Handling SMTP

Berdasarkan konfigurasi email PHP Anda yang lain:

```env
SMTP_HOST=mail.baggagehandlingptjas.co.id
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=ab.handling@baggagehandlingptjas.co.id
SMTP_PASSWORD=P@ssw0rd2023#
SMTP_TIMEOUT=30000
EMAIL_FROM=ab.handling@baggagehandlingptjas.co.id
```

## Struktur Implementasi

### 1. Library Utama: `lib/nodemailer-config.ts`

File ini berisi:
- `createEmailTransporter()`: Membuat transporter Nodemailer
- `getDefaultSender()`: Mendapatkan email pengirim default
- `sendEmail()`: Fungsi universal untuk mengirim email

### 2. Email Action: `app/actions/send-email.ts`

Action untuk password reset yang sekarang menggunakan Nodemailer.

### 3. Test Route: `app/api/send/route.ts`

Route untuk testing email functionality.

## Cara Menggunakan

### Mengirim Email dari Server Action

```typescript
import { sendEmail } from '@/lib/nodemailer-config';

// Kirim email ke satu penerima
await sendEmail({
  to: 'user@example.com',
  subject: 'Test Email',
  html: '<h1>Hello World!</h1>',
});

// Kirim email ke banyak penerima
await sendEmail({
  to: ['user1@example.com', 'user2@example.com'],
  subject: 'Test Email',
  html: '<h1>Hello World!</h1>',
});
```

### Mengirim Email dengan React Email Component

```typescript
import { render } from '@react-email/render';
import { PasswordResetEmail } from '@/components/password-reset-email';
import { sendEmail } from '@/lib/nodemailer-config';

const html = await render(PasswordResetEmail({ resetToken: 'ABC123' }));

await sendEmail({
  to: 'user@example.com',
  subject: 'Reset Password',
  html: html,
});
```

## Testing

### 1. Test dengan Browser

Buka di browser:
```
http://localhost:3000/api/send
```

### 2. Test Password Reset

1. Buka halaman forgot password
2. Masukkan email yang ada di database
3. Submit form
4. Cek email atau console log untuk token

## Troubleshooting

### Email tidak terkirim

1. **Check Environment Variables**
   - Pastikan semua SMTP variables sudah di-set
   - Restart server setelah menambah environment variables

2. **Check Console Logs**
   - Cari error message di console
   - Token akan muncul di console sebagai fallback

3. **Check SMTP Server**
   - Pastikan SMTP server bisa diakses
   - Test dengan telnet: `telnet <SMTP_HOST> <SMTP_PORT>`

4. **Check Firewall**
   - Pastikan port SMTP tidak di-block firewall
   - Port 25 mungkin di-block di beberapa ISP

### Google SMTP Issues

1. **"Less secure app access" Error**
   - Gunakan App Password, bukan regular password

2. **Authentication Failed**
   - Pastikan 2FA sudah diaktifkan
   - Generate App Password baru

### Internal SMTP Issues

1. **Connection Timeout**
   - Pastikan IP `50.1.1.6` bisa diakses
   - Check network connectivity

2. **No Auth Required**
   - Beberapa internal SMTP tidak perlu authentication
   - Kosongkan `SMTP_USER` dan `SMTP_PASSWORD`

## Migration dari Resend

Proyek ini sudah **migrated** dari Resend ke Nodemailer:

### Perubahan Utama

- ❌ **Before**: Menggunakan `Resend` dengan API key
- ✅ **After**: Menggunakan `Nodemailer` dengan SMTP

### Keuntungan Migration

1. Tidak perlu verifikasi domain (untuk internal SMTP)
2. Tidak terbatas pada email tertentu
3. Lebih fleksibel dalam konfigurasi
4. Biaya lebih rendah (bahkan gratis untuk internal SMTP)

## Catatan Penting

⚠️ **Security**
- Jangan commit `.env.local` ke git
- Simpan credentials dengan aman
- Gunakan environment variables untuk semua secrets

⚠️ **Testing**
- Selalu test di development dulu
- Email akan muncul di console jika SMTP gagal (fallback)
- Check email spam folder juga

⚠️ **Production**
- Pastikan SMTP server reliable
- Setup monitoring untuk email failures
- Consider email queue untuk bulk sending

## Support

Jika ada masalah dengan email configuration:

1. Check console logs untuk error detail
2. Review environment variables
3. Test SMTP connection
4. Check firewall/network settings

## Referensi

- [Nodemailer Documentation](https://nodemailer.com/about/)
- [SMTP Configuration Guide](https://nodemailer.com/smtp/)
- [React Email Components](https://react.email/)


