# ✅ Testing Checklist - Security & Access Control

## Quick Testing Guide

Gunakan checklist ini untuk memastikan security access control bekerja dengan baik.

---

## 🔴 Test 1: Akses Tanpa Login

**Steps:**
1. ✅ Buka browser dalam Incognito/Private mode
2. ✅ Ketik URL langsung:
   - `http://localhost:3000/dashboard`
   - `http://localhost:3000/airline`
   - `http://localhost:3000/user`

**Expected:**
- [ ] Muncul toast: "Silakan login terlebih dahulu"
- [ ] Otomatis redirect ke `/login`
- [ ] Tidak bisa akses halaman apapun tanpa login

---

## 🟢 Test 2: Role ADMIN

**Steps:**
1. ✅ Login dengan akun **admin**

**Check Menu Visibility:**
- [ ] Dashboard ✅ (visible)
- [ ] Airline ✅ (visible)
- [ ] User Management ✅ (visible)
- [ ] Report ✅ (visible)

**Check Page Access:**
- [ ] `/dashboard` - ✅ Bisa akses
- [ ] `/airline` - ✅ Bisa akses
- [ ] `/user` - ✅ Bisa akses
- [ ] `/report` - ✅ Bisa akses
- [ ] `/airline_flights` - ✅ Bisa akses
- [ ] `/airline_detail` - ✅ Bisa akses

---

## 🔵 Test 3: Role VIEW

**Steps:**
1. ✅ Login dengan akun **view**

**Check Menu Visibility:**
- [ ] Dashboard ✅ (visible)
- [ ] Airline ✅ (visible)
- [ ] User Management ❌ (HIDDEN)
- [ ] Report ✅ (visible)

**Check Page Access:**
- [ ] `/dashboard` - ✅ Bisa akses
- [ ] `/airline` - ✅ Bisa akses
- [ ] `/report` - ✅ Bisa akses
- [ ] `/airline_flights` - ✅ Bisa akses
- [ ] `/airline_detail` - ✅ Bisa akses

**Check Blocked Access:**
- [ ] Ketik URL: `http://localhost:3000/user`
- [ ] Muncul toast: "Anda tidak memiliki akses ke halaman ini"
- [ ] Otomatis redirect ke `/dashboard`

---

## 🟡 Test 4: Role AIRLINE

**Steps:**
1. ✅ Login dengan akun **airline** (misal: Qatar Airways)

**Check Menu Visibility:**
- [ ] Dashboard ✅ (visible)
- [ ] Airplane icon → langsung ke flights mereka (bukan airline list)
- [ ] Airline List ❌ (HIDDEN)
- [ ] User Management ❌ (HIDDEN)
- [ ] Report ❌ (HIDDEN)

**Check Page Access:**
- [ ] `/dashboard` - ✅ Bisa akses
- [ ] `/airline_flights?airline=QR` - ✅ Bisa akses (airline mereka)
- [ ] `/airline_detail?airline=QR` - ✅ Bisa akses (airline mereka)

**Check Blocked Access:**
- [ ] Ketik URL: `http://localhost:3000/airline`
  - Muncul toast: "Anda tidak memiliki akses ke halaman ini"
  - Redirect ke `/dashboard`
  
- [ ] Ketik URL: `http://localhost:3000/user`
  - Muncul toast: "Anda tidak memiliki akses ke halaman ini"
  - Redirect ke `/dashboard`
  
- [ ] Ketik URL: `http://localhost:3000/report`
  - Muncul toast: "Anda tidak memiliki akses ke halaman ini"
  - Redirect ke `/dashboard`

---

## 🔒 Test 5: Session Expiry

**Steps:**
1. ✅ Login dengan akun apapun
2. ✅ Buka DevTools (F12)
3. ✅ Application → Local Storage
4. ✅ Delete key `logged_in` atau `user`
5. ✅ Refresh halaman

**Expected:**
- [ ] Muncul toast: "Silakan login terlebih dahulu"
- [ ] Otomatis redirect ke `/login`

---

## 🚪 Test 6: Logout

**Steps:**
1. ✅ Login dengan akun apapun
2. ✅ Klik tombol logout di sidebar
3. ✅ Confirm logout

**Expected:**
- [ ] Muncul countdown 3 detik
- [ ] Muncul "Goodbye!" message
- [ ] Redirect ke `/login`
- [ ] LocalStorage ter-clear (check di DevTools)

**After Logout:**
- [ ] Ketik URL halaman protected (misal `/dashboard`)
- [ ] Muncul toast: "Silakan login terlebih dahulu"
- [ ] Redirect ke `/login`

---

## 📱 Test 7: Mobile Navigation

**Steps:**
1. ✅ Resize browser ke mobile size (atau gunakan DevTools device toolbar)
2. ✅ Login dengan masing-masing role

**Check untuk ADMIN:**
- [ ] Bottom nav menampilkan: Home, Airplane, User, Report

**Check untuk VIEW:**
- [ ] Bottom nav menampilkan: Home, Airplane, Report
- [ ] Tidak ada icon User

**Check untuk AIRLINE:**
- [ ] Bottom nav menampilkan: Home, Airplane
- [ ] Tidak ada icon User dan Report
- [ ] Icon Airplane langsung ke flights mereka

---

## ✅ Summary Checklist

Pastikan semua ini berjalan dengan benar:

- [ ] ❌ Tidak ada halaman yang bisa diakses tanpa login
- [ ] ✅ Admin bisa akses semua halaman
- [ ] ✅ View tidak bisa akses User Management
- [ ] ✅ Airline tidak bisa akses Airline List, User Management, Report
- [ ] ✅ Direct URL access ke halaman forbidden langsung di-block
- [ ] ✅ Toast error message muncul dengan jelas
- [ ] ✅ Auto redirect bekerja dengan smooth
- [ ] ✅ Loading state muncul saat check authentication
- [ ] ✅ Sidebar dan Mobile Nav hide menu sesuai role
- [ ] ✅ Logout membersihkan session dengan benar

---

## 🐛 Jika Menemukan Bug

**Scenario:** User bisa akses halaman yang seharusnya tidak bisa

**Debug Steps:**
1. Check localStorage di DevTools → Application → Local Storage
2. Verify data `user` dan `role` yang tersimpan
3. Check console untuk error messages
4. Verify URL yang diakses sesuai dengan permission di `lib/auth-utils.ts`

**Report Format:**
```
Role: [admin/view/airline]
URL: [URL yang diakses]
Expected: [apa yang seharusnya terjadi]
Actual: [apa yang terjadi]
Error Message: [error message jika ada]
```

---

**Last Updated:** ${new Date().toLocaleDateString('id-ID')}
**Status:** Ready for Testing ✅

