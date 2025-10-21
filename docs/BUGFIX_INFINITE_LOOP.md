# 🐛 Bug Fix: Maximum Update Depth Exceeded

## Masalah yang Terjadi

Error yang muncul:
```
Error: Maximum update depth exceeded. This can happen when a component 
repeatedly calls setState inside componentWillUpdate or componentDidUpdate. 
React limits the number of nested updates to prevent infinite loops.
```

**Penyebab:**
Hook `useAuthCheck` dalam `app/components/withAuth.tsx` menyebabkan infinite loop karena:

1. `useEffect` dijalankan
2. Hook memanggil `toast.error()` dan `router.push()`
3. Component re-render
4. `useEffect` dijalankan lagi karena dependencies yang tidak stabil
5. Loop terus berulang → **Infinite Loop** ❌

---

## Solusi yang Diterapkan

### ✅ **1. Gunakan `useRef` untuk Tracking**
```typescript
const hasCheckedRef = useRef(false)

useEffect(() => {
  // Prevent multiple checks using ref
  if (hasCheckedRef.current) return
  
  const checkAuth = () => {
    hasCheckedRef.current = true
    // ... rest of code
  }
  
  checkAuth()
}, [])
```

**Mengapa ini bekerja:**
- `useRef` tidak trigger re-render ketika nilainya berubah
- Guard `if (hasCheckedRef.current) return` memastikan function hanya run sekali

---

### ✅ **2. Empty Dependency Array**
```typescript
useEffect(() => {
  // ...
}, []) // Empty array = only run once on mount
```

**Mengapa ini bekerja:**
- Empty dependency array `[]` memastikan `useEffect` hanya run sekali saat component mount
- Tidak akan re-run saat props atau state berubah

---

### ✅ **3. setTimeout untuk Router Push**
```typescript
toast.error('Silakan login terlebih dahulu')
setTimeout(() => router.push('/login'), 100)
```

**Mengapa ini bekerja:**
- `setTimeout` memastikan toast muncul dulu sebelum navigation
- Mencegah race condition antara toast dan router push
- Memberikan waktu untuk React menyelesaikan state updates

---

## File yang Diperbaiki

### `app/components/withAuth.tsx`

**Before (❌ Infinite Loop):**
```typescript
export function useAuthCheck(allowedRoles: string[] = []) {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const { authenticated, user: currentUser } = isAuthenticated()

    if (!authenticated) {
      toast.error('Silakan login terlebih dahulu')
      router.push('/login')  // ❌ Causes re-render
      return
    }
    // ...
  }, [router, allowedRoles]) // ❌ Dependencies cause re-runs
}
```

**After (✅ Fixed):**
```typescript
export function useAuthCheck(allowedRoles: string[] = []) {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const hasCheckedRef = useRef(false) // ✅ Use ref for tracking

  useEffect(() => {
    if (hasCheckedRef.current) return // ✅ Guard to prevent multiple runs

    const checkAuth = () => {
      hasCheckedRef.current = true // ✅ Mark as checked

      const { authenticated, user: currentUser } = isAuthenticated()

      if (!authenticated) {
        setIsLoading(false)
        toast.error('Silakan login terlebih dahulu')
        setTimeout(() => router.push('/login'), 100) // ✅ Delayed navigation
        return
      }
      // ...
    }

    checkAuth()
  }, []) // ✅ Empty dependency array
}
```

---

## Testing

Setelah fix ini, test kembali:

1. ✅ **Akses tanpa login:**
   - Buka `/dashboard` tanpa login
   - Harus muncul 1x toast: "Silakan login terlebih dahulu"
   - Redirect ke `/login` tanpa error

2. ✅ **Akses dengan wrong role:**
   - Login sebagai airline
   - Akses `/user` via URL
   - Harus muncul 1x toast: "Anda tidak memiliki akses ke halaman ini"
   - Redirect ke `/dashboard` tanpa error

3. ✅ **Normal access:**
   - Login sebagai admin
   - Akses `/dashboard`
   - Halaman load normal tanpa infinite loop

4. ✅ **Check console:**
   - Tidak ada error "Maximum update depth exceeded"
   - Tidak ada warning infinite loop

---

## Pelajaran untuk Future Development

### ❌ **Jangan Lakukan:**
```typescript
// ❌ BAD: Router push di useEffect tanpa guard
useEffect(() => {
  router.push('/somewhere')
}, [router])

// ❌ BAD: Array dependency yang berubah setiap render
useEffect(() => {
  // ...
}, [someArray]) // Array reference changes every render

// ❌ BAD: setState di useEffect tanpa condition
useEffect(() => {
  setState(someValue) // Causes re-render → infinite loop
})
```

### ✅ **Lakukan:**
```typescript
// ✅ GOOD: Use ref for one-time check
const hasChecked = useRef(false)
useEffect(() => {
  if (hasChecked.current) return
  hasChecked.current = true
  // ... safe to do state updates
}, [])

// ✅ GOOD: Empty dependency for one-time effect
useEffect(() => {
  // Runs only once on mount
}, [])

// ✅ GOOD: Conditional state updates
useEffect(() => {
  if (condition) {
    setState(value)
  }
}, [condition])

// ✅ GOOD: Delayed navigation
useEffect(() => {
  if (!authenticated) {
    toast.error('Error message')
    setTimeout(() => router.push('/login'), 100)
  }
}, [])
```

---

## Summary

**Problem:** Infinite loop di authentication check  
**Root Cause:** Unstable dependencies di useEffect  
**Solution:** useRef + empty dependencies + delayed navigation  
**Status:** ✅ **FIXED**

---

---

## 🐛 Bug Fix #2: Rules of Hooks Violation

### Masalah yang Terjadi

Error yang muncul:
```
Error: React has detected a change in the order of Hooks called by DashboardPage. 
This will lead to bugs and errors if not fixed.
```

**Penyebab:**
Hook `useAuthCheck` ditambahkan dengan early return SEBELUM hooks lain yang sudah ada di component. Ini melanggar **Rules of Hooks** React:

```typescript
// ❌ BAD: Early return before existing hooks
export default function DashboardPage() {
  const { isAuthorized, isLoading } = useAuthCheck(['admin']);
  
  if (isLoading || !isAuthorized) {
    return <LoadingScreen />  // ❌ Early return
  }
  
  const [data, setData] = useState({})  // ❌ This hook won't be called if loading
  const [page, setPage] = useState(1)   // ❌ Order changes between renders
}
```

**Rules of Hooks:**
1. ✅ Only call hooks at the top level
2. ✅ Don't call hooks inside loops, conditions, or nested functions  
3. ✅ **Hooks must be called in the same order every render**

---

### Solusi yang Diterapkan

**✅ Pindahkan ALL hooks ke atas, BEFORE any early return:**

```typescript
// ✅ GOOD: All hooks called first, then conditional return
export default function DashboardPage() {
  const { isAuthorized, isLoading } = useAuthCheck(['admin']);
  const [data, setData] = useState({})        // ✅ Always called
  const [page, setPage] = useState(1)         // ✅ Always called
  const filteredData = useMemo(() => {...})   // ✅ Always called
  
  useEffect(() => {...})                      // ✅ Always called
  
  // NOW safe to do early return (after all hooks)
  if (isLoading || !isAuthorized) {
    return <LoadingScreen />
  }
  
  return <MainContent />
}
```

**Key Point:** 
- ✅ ALL hooks dipanggil di top level
- ✅ Conditional return di BAWAH setelah semua hooks
- ✅ Hook order konsisten di setiap render

---

### Files yang Diperbaiki

**1. `app/dashboard/page.tsx`**
- Removed early return after useAuthCheck
- Moved conditional return after all hooks (useState, useMemo, useEffect)

**2. `app/user/page.tsx`**  
- Moved formData useState to top (before early return)
- Moved conditional return after all hooks (multiple useState, useCallback, useEffect)

**3. `app/airline_flights/page.tsx`**
- Moved pagination useState and useMemo to top
- Moved conditional return after all hooks

**4. `app/airline_detail/page.tsx`**
- Moved conditional return after data declarations
- Consistent pattern with other pages

**5. `app/airline/page.tsx`**
- Added comment for early return placement
- No hooks after, so already OK

---

### Testing

Setelah fix, verify:

1. ✅ **No more React hooks error**
   - Console clean tanpa warning
   - No "order of hooks" error

2. ✅ **Authentication still works**
   - Login redirect bekerja
   - Unauthorized redirect bekerja
   - Toast messages muncul

3. ✅ **All pages load correctly**
   - Dashboard loads
   - User management loads
   - Airline pages load
   - No crashes

---

**Fixed Date:** ${new Date().toLocaleDateString('id-ID', { 
  weekday: 'long', 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
})}

**Files Changed:**
- ✅ `app/components/withAuth.tsx` (Infinite loop fix)
- ✅ `app/dashboard/page.tsx` (Rules of Hooks fix)
- ✅ `app/user/page.tsx` (Rules of Hooks fix)
- ✅ `app/airline_flights/page.tsx` (Rules of Hooks fix)
- ✅ `app/airline_detail/page.tsx` (Rules of Hooks fix)
- ✅ `app/airline/page.tsx` (Rules of Hooks fix)

**Impact:**
- ✅ No more infinite loops
- ✅ No more hooks order errors
- ✅ Toast appears only once
- ✅ Smooth redirect without errors
- ✅ Better performance
- ✅ React best practices followed

