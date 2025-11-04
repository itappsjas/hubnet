# Setup Email dengan Resend

## Masalah: Email Domain Not Verified

`onboarding@resend.dev` memiliki limitasi:
- **Hanya 10 email per hari** untuk development
- Jika sudah melebihi, akan error "domain not verified"

## Solusi: Setup Domain di Resend

### Langkah 1: Login ke Resend Dashboard
1. Kunjungi https://resend.com/login
2. Login dengan akun yang punya API key `re_7DPaJCQb_...`

### Langkah 2: Verifikasi Domain
1. Buka tab **"Domains"** di dashboard
2. Klik **"Add Domain"** atau gunakan domain yang sudah ada
3. Ikuti instruksi untuk setup DNS records (SPF, DKIM)
4. Tunggu sampai domain terverifikasi (status: ✅ Verified)

### Langkah 3: Update .env
Setelah domain terverifikasi, update email `From` di `.env`:

```env
RESEND_FROM_EMAIL=noreply@yourdomain.com
```

Ganti `yourdomain.com` dengan domain yang sudah terverifikasi di Resend.

### Langkah 4: Restart Server
```bash
# Stop server (Ctrl+C)
npm run dev
```

## Alternatif: Untuk Testing

Jika masih dalam development dan tidak punya domain:

### Opsi A: Gunakan delivered@resend.dev
Domain ini biasanya tidak memerlukan verifikasi untuk testing:
```env
RESEND_FROM_EMAIL=delivered@resend.dev
```

### Opsi B: Tambahkan Domain Baru di Resend
1. Buka https://resend.com/domains
2. Klik "Add Domain"
3. Masukkan domain yang Anda punya
4. Setup DNS records sesuai instruksi
5. Update `RESEND_FROM_EMAIL` di `.env`

## Check Status Domain

Di Resend dashboard, status domain bisa:
- ✅ **Verified** - Ready untuk production
- ⏳ **Pending** - Menunggu DNS propagation
- ❌ **Failed** - DNS setup salah

## Troubleshooting

### Error: "Domain not verified"
- Pastikan domain sudah terverifikasi di dashboard
- Check DNS records sudah benar
- Tunggu beberapa menit untuk propagation
- Restart server setelah update `.env`

### Error: "API key invalid"
- Generate API key baru di Resend
- Update `RESEND_API_KEY` di `.env`
- Restart server

### Email tidak terkirim
- Check spam folder
- Pastikan email recipient valid
- Check logs di terminal untuk error detail

