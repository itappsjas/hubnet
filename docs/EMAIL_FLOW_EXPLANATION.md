# 🔄 Flow Pengiriman Email - Source Code Explanation

## 📍 Lokasi File-File Penting:

1. **Frontend (Form)**: `app/forgot-password/page.tsx`
2. **Server Action**: `app/actions/send-email.ts`
3. **Environment**: `.env`

---

## 🔢 STEP-BY-STEP FLOW:

### **STEP 1: User Mengisi Email** 
📍 File: `app/forgot-password/page.tsx` (Line 246-254)

```tsx
<form action={formAction} className="space-y-6">
  <input
    name="email"           // ← NAMA FIELD (penting!)
    type="email"
    placeholder="Enter your email address"
    required
  />
  <button type="submit">Send Reset Token</button>
</form>
```

**Key Points:**
- Field name adalah `"email"` ← ini yang diambil oleh server action
- Form submit akan mengirim FormData ke `formAction`

---

### **STEP 2: Form Submit → Server Action**
📍 File: `app/forgot-password/page.tsx` (Line 24-37)

```tsx
const [, formAction, isPending] = useActionState(async (prevState, formData: FormData) => {
  const result = await sendEmail(formData);  // ← FormData dikirim ke sendEmail()
  
  if (result.success) {
    const emailValue = formData.get('email') as string;  // ← Ambil email dari FormData
    setEmail(emailValue);
    setCurrentStep(2);  // Pindah ke step 2 (token verification)
    toast.success(result.message);
  } else {
    toast.error(result.message);  // Tampilkan error
  }
  
  return result;
}, null);
```

**Key Points:**
- FormData berisi field `email` dari input
- Dipanggil function `sendEmail(formData)` dari `app/actions/send-email.ts`

---

### **STEP 3: Server Action Mengambil Email**
📍 File: `app/actions/send-email.ts` (Line 33-44)

```typescript
export async function sendEmail(formData: FormData) {
  // 📧 LINE INI YANG MENGAMBIL EMAIL DARI FORM!
  const email = formData.get('email') as string;
  
  if (!email) {
    return { success: false, message: "Email address is required." };
  }
  
  // Validasi format email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, message: "Please enter a valid email address." };
  }
```

**Key Points:**
- `formData.get('email')` ← mengambil value dari field dengan name="email"
- Validasi email format dengan regex

---

### **STEP 4: Check User di Database**
📍 File: `app/actions/send-email.ts` (Line 54-64)

```typescript
// Cek apakah user ada di database
const user = await prisma.tb_user.findFirst({
  where: {
    email: email,        // ← Email dari form
    is_active: 1          // ← Harus aktif
  }
});

if (!user) {
  return { success: false, message: "Email address not found in our system." };
}
```

**Key Points:**
- Mencari user dengan email yang diberikan
- Harus `is_active = 1` (aktif)
- Jika tidak ada → return error

---

### **STEP 5: Update Database dengan Token**
📍 File: `app/actions/send-email.ts` (Line 67-75)

```typescript
await prisma.tb_user.update({
  where: {
    id_usr: user.id_usr
  },
  data: {
    reset_token: resetToken,           // ← Generate token
    reset_token_expires: resetTokenExpires  // ← Expires 10 menit
  }
});
```

**Key Points:**
- Generate 6-character alphanumeric token
- Simpan token ke database
- Set expiration 10 menit

---

### **STEP 6: Kirim Email via Resend**
📍 File: `app/actions/send-email.ts` (Line 84-107)

```typescript
const resend = new Resend(process.env.RESEND_API_KEY);

console.log('Sending email to:', email);  // ← EMAIL YANG DIKIRIM!
console.log('From email:', process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev');

// 🚀 INI YANG MENGIRIM EMAIL!
const { data, error } = await resend.emails.send({
  from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',  // ← Email pengirim
  to: email,              // ← EMAIL PENERIMA (dari form user)
  subject: 'Password Reset Verification Code',
  html: `...`  // Template HTML
});
```

**Key Points:**
- `to: email` ← **INI EMAIL YANG DITERIMA DARI FORM USER**
- `from: ...` ← Email pengirim (dari .env atau default)
- Resend mengirim email ke email yang user masukkan

---

## 🎯 RINGKASAN: Dimana Email Ditentukan?

### **Email Penerima (TO):**
```typescript
// STEP 1: User input di form
<input name="email" />  // ← User ketik emailnya di sini

// STEP 3: Diambil dari FormData
const email = formData.get('email') as string;

// STEP 6: Digunakan untuk mengirim email
await resend.emails.send({
  to: email,  // ← Email yang user masukkan
  from: "pengirim@domain.com",
  ...
});
```

**📍 DETERMINED BY:** User input di form (field name="email")

---

### **Email Pengirim (FROM):**
```typescript
// STEP 6: Diambil dari environment variables
from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'
```

**📍 DETERMINED BY:** `.env` file:
```env
RESEND_FROM_EMAIL=delivered@resend.dev
```

---

## 🔍 LOGGING UNTUK DEBUGGING:

Di `app/actions/send-email.ts` sudah ada logging:

```typescript
console.log('Resend API Key exists:', !!process.env.RESEND_API_KEY);
console.log('Sending email to:', email);        // ← EMAIL PENERIMA
console.log('Reset token:', resetToken);
console.log('From email:', process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev');  // ← EMAIL PENGIRIM
console.log('Email response data:', JSON.stringify(data, null, 2));
console.log('Email response error:', JSON.stringify(error, null, 2));
```

**Cek terminal** saat submit form untuk melihat logs!

---

## ✅ SUMMARY:

| Item | Source | Location |
|------|--------|----------|
| **Email Penerima** | User input (form) | `app/forgot-password/page.tsx` → `app/actions/send-email.ts` Line 93 |
| **Email Pengirim** | Environment (.env) | `.env` → `app/actions/send-email.ts` Line 92 |
| **API Key** | Environment (.env) | `.env` → `app/actions/send-email.ts` Line 84 |
| **Token** | Generated server | `app/actions/send-email.ts` Line 48 |

---

## 🧪 CARA TEST:

1. Buka terminal, jalankan `npm run dev`
2. Buka: http://localhost:3000/forgot-password
3. Masukkan email: `admin@jas.com`
4. **Perhatikan terminal logs:**
   ```
   Sending email to: admin@jas.com
   Reset token: ABC123
   From email: delivered@resend.dev
   Email response data: {...}
   ```

5. Email akan dikirim ke: `admin@jas.com` (email penerima)
6. Email dari: `delivered@resend.dev` (email pengirim)

