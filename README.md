# B-Sport Bogor - Web-GIS Aplikasi Fasilitas Olahraga

Aplikasi Web-GIS modern dan minimalis untuk menemukan fasilitas olahraga terbaik di Kota Bogor.

## 🎯 Fitur Utama

- **Peta Interaktif Layar Penuh**: Menampilkan lokasi semua fasilitas olahraga di Bogor dengan marker interaktif
- **Navbar Glassmorphism**: Navigasi dengan efek blur transparan di bagian atas layar
- **Sidebar Filter**: Filter kategori olahraga (Futsal, Basket, Badminton, Gym, dll) dengan checkbox yang rapi
- **Info Card**: Detail lengkap fasilitas saat marker diklik, termasuk:
  - Foto berkualitas tinggi
  - Harga dan rating
  - Amenities (Parkir, Toilet, Kantin)
  - Tombol integrasi Google Maps
- **Search Bar**: Pencarian fasilitas secara real-time
- **Modal Login Admin**: Autentikasi sederhana untuk admin panel
- **Modal Tentang**: Informasi lengkap tentang aplikasi
- **Responsif Mobile**: UI yang ramah untuk semua ukuran perangkat

## 🎨 Desain & Styling

### Palet Warna (Elegant & Minimalis)
- **Background**: Slate-50 (Light), Slate-900 (Dark)
- **Text**: Slate-900 (Light), Slate-50 (Dark)
- **Accent**: Emerald-600 / Emerald-500
- **Secondary**: Slate-700/800 (Dark elements)

### Tipografi
- **Font**: Geist (Sans) - Clean dan modern
- **Heading**: Font weight 600-700
- **Body**: Font weight 400-500

### Efek Visual
- Glassmorphism pada navbar dan cards
- Smooth transitions dan animations
- Shadow dan depth untuk floating elements
- Responsive design dengan Tailwind CSS

## 📁 Struktur Project

```
/vercel/share/v0-project/
├── app/
│   ├── page.tsx              # Main page dengan state management
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles dan design tokens
├── components/
│   ├── navbar.tsx            # Navbar with search & navigation
│   ├── sidebar-filter.tsx    # Category filter sidebar
│   ├── map-container.tsx     # Interactive map container
│   ├── info-card.tsx         # Facility detail card
│   ├── about-modal.tsx       # About application modal
│   ├── login-modal.tsx       # Admin login modal
│   └── ui/                   # shadcn/ui components
├── lib/
│   ├── facilities.ts         # Facility data & utility functions
│   └── utils.ts              # Helper functions
├── hooks/
│   └── use-mobile.ts         # Mobile detection hook
└── public/                   # Static assets

```

## 🔧 Komponen Utama

### `Navbar` (navbar.tsx)
Navigasi dengan glassmorphism effect:
- Logo "B-Sport"
- Search bar untuk pencarian fasilitas
- Menu: Tentang (Modal), Login Admin (Modal)
- Mobile-responsive menu toggle

### `SidebarFilter` (sidebar-filter.tsx)
Filter kategori olahraga:
- Checkbox untuk 8 kategori olahraga
- Toggle button untuk mobile
- Overlay untuk mobile UX
- Clear filter button

### `MapContainer` (map-container.tsx)
Peta interaktif dengan:
- Marker untuk setiap fasilitas
- Real-time filtering berdasarkan kategori & search
- Map legend
- Hover tooltip pada marker
- Pulse animation untuk visual interest

### `InfoCard` (info-card.tsx)
Detail fasilitas dalam slide-over card:
- Foto fasilitas (dengan fallback gradient)
- Informasi dasar (nama, harga, rating)
- Lokasi dengan map icon
- Amenities display
- Tombol "Buka di Google Maps"
- Description area

### `AboutModal` & `LoginModal`
Modal dialog untuk informasi dan autentikasi:
- Clean dialog design
- Form handling untuk login
- Password visibility toggle
- Loading state

## 📊 Data Fasilitas

Data fasilitas disimpan di `lib/facilities.ts` dengan struktur:

```typescript
interface Facility {
  id: string;              // Unique identifier
  name: string;            // Nama fasilitas
  category: string;        // Kategori (Futsal, Basket, etc)
  price: string;           // Harga per jam
  rating: number;          // Rating 1-5 bintang
  amenities: Array<...>;   // Fasilitas pendukung
  location: string;        // Alamat lengkap
  image: string;          // URL foto
  mapsUrl: string;        // Google Maps URL
  lat: number;            // Latitude
  lng: number;            // Longitude
}
```

## 🚀 Cara Menggunakan

### 1. Instalasi Dependencies
```bash
npm install
# atau
pnpm install
```

### 2. Development Server
```bash
npm run dev
# atau
pnpm dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

### 3. Build Production
```bash
npm run build
npm run start
```

## 🔄 Workflow

1. **Buka aplikasi** → Melihat peta dengan semua fasilitas
2. **Klik marker** → Muncul info card detail fasilitas
3. **Filter kategori** → Sidebar filter untuk kategori spesifik
4. **Search** → Cari fasilitas dengan nama/lokasi
5. **Google Maps** → Klik tombol untuk navigasi real
6. **Login Admin** → Modal untuk akses admin panel

## 💡 Fitur Advanced (Siap untuk Development)

- **Real Map Integration**: Ganti map placeholder dengan Mapbox/Leaflet
- **Authentication**: Integrate dengan backend auth service
- **Database**: Simpan facilities di database
- **User Reviews**: Tambah rating dan review dari user
- **Booking System**: Reservasi fasilitas langsung dari app
- **Payment Integration**: Integrasi pembayaran untuk booking
- **Push Notifications**: Notifikasi untuk promosi dan update

## 🎯 Browser Support

- Chrome (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 License

© 2024 B-Sport Bogor. All rights reserved.

## 👨‍💻 Development

Aplikasi ini dibangun dengan:
- **Framework**: Next.js 16+ (App Router)
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Icons**: Lucide React
- **Language**: TypeScript

---

**Developed with ❤️ using v0.app**
