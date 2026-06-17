export interface Facility {
  id: string;
  name: string;
  category: string;
  price: string;
  rating: number;
  amenities: Array<{
    icon: 'parking' | 'toilet' | 'cafe';
    label: string;
  }>;
  location: string;
  image: string;
  mapsUrl: string;
  lat: number;
  lng: number;
  description?: string;
}

export const FACILITIES: Facility[] = [
  {
    id: 'futsal-1',
    name: 'Futsal Center Bogor',
    category: 'Futsal',
    price: 'Rp 150.000',
    rating: 4.8,
    amenities: [
      { icon: 'parking', label: 'Parkir Luas' },
      { icon: 'toilet', label: 'Toilet Bersih' },
      { icon: 'cafe', label: 'Kantin' },
    ],
    location: 'Jl. Ahmad Yani No. 45, Bogor Pusat',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop',
    mapsUrl: 'https://maps.google.com/?q=Futsal+Center+Bogor',
    lat: -6.5761,
    lng: 106.8142,
    description: 'Fasilitas futsal dengan standar internasional dan permukaan lapangan berkualitas tinggi.',
  },
  {
    id: 'basket-1',
    name: 'Lapangan Basket Sentral',
    category: 'Basket',
    price: 'Rp 200.000',
    rating: 4.6,
    amenities: [
      { icon: 'parking', label: 'Parkir Luas' },
      { icon: 'toilet', label: 'Fasilitas Shower' },
      { icon: 'cafe', label: 'Kafe Olahraga' },
    ],
    location: 'Jl. Merdeka No. 78, Bogor Selatan',
    image: 'https://images.unsplash.com/photo-1546519638-68711109d298?w=400&h=300&fit=crop',
    mapsUrl: 'https://maps.google.com/?q=Lapangan+Basket+Sentral',
    lat: -6.5824,
    lng: 106.8067,
    description: 'Lapangan basket profesional dengan pencahayaan LED dan tribun penonton.',
  },
  {
    id: 'badminton-1',
    name: 'Badminton Court Premium',
    category: 'Badminton',
    price: 'Rp 100.000',
    rating: 4.9,
    amenities: [
      { icon: 'parking', label: 'Parkir Luas' },
      { icon: 'toilet', label: 'Toilet Bersih' },
      { icon: 'cafe', label: 'Kantin' },
    ],
    location: 'Jl. Jenderal Sudirman No. 56, Bogor Tengah',
    image: 'https://images.unsplash.com/photo-1617472658106-86ae8d8b36ef?w=400&h=300&fit=crop',
    mapsUrl: 'https://maps.google.com/?q=Badminton+Court+Premium',
    lat: -6.5915,
    lng: 106.8254,
    description: 'Lapangan badminton dengan standar internasional dan pelatih profesional tersedia.',
  },
  {
    id: 'gym-1',
    name: 'Gym Fitness Modern',
    category: 'Gym',
    price: 'Rp 300.000',
    rating: 4.7,
    amenities: [
      { icon: 'parking', label: 'Parkir Bertingkat' },
      { icon: 'toilet', label: 'Locker & Shower' },
      { icon: 'cafe', label: 'Smoothie Bar' },
    ],
    location: 'Jl. Raya Pajajaran No. 123, Bogor Barat',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop',
    mapsUrl: 'https://maps.google.com/?q=Gym+Fitness+Modern',
    lat: -6.5972,
    lng: 106.8356,
    description: 'Pusat kebugaran modern dengan peralatan terkini dan personal trainer berpengalaman.',
  },
  {
    id: 'renang-1',
    name: 'Kolam Renang Olimpik',
    category: 'Kolam Renang',
    price: 'Rp 75.000',
    rating: 4.5,
    amenities: [
      { icon: 'parking', label: 'Parkir Gratis' },
      { icon: 'toilet', label: 'Ruang Ganti Nyaman' },
      { icon: 'cafe', label: 'Restoran Pinggir Kolam' },
    ],
    location: 'Jl. Ciawi No. 200, Bogor Utara',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
    mapsUrl: 'https://maps.google.com/?q=Kolam+Renang+Olimpik',
    lat: -6.5645,
    lng: 106.7945,
    description: 'Kolam renang Olympic-size dengan fasilitas diving dan area bermain anak.',
  },
  {
    id: 'tenis-1',
    name: 'Tenis Club Bogor',
    category: 'Tenis',
    price: 'Rp 250.000',
    rating: 4.8,
    amenities: [
      { icon: 'parking', label: 'Parkir Luas' },
      { icon: 'toilet', label: 'Fasilitas Lengkap' },
      { icon: 'cafe', label: 'Club House Cafe' },
    ],
    location: 'Jl. Gatot Subroto No. 99, Bogor Sentral',
    image: 'https://images.unsplash.com/photo-1554284591-83f348125c47?w=400&h=300&fit=crop',
    mapsUrl: 'https://maps.google.com/?q=Tenis+Club+Bogor',
    lat: -6.5834,
    lng: 106.8201,
    description: 'Klub tenis eksklusif dengan lapangan tanah liat dan lapangan keras.',
  },
  {
    id: 'voli-1',
    name: 'Arena Voli Sentosa',
    category: 'Voli',
    price: 'Rp 120.000',
    rating: 4.6,
    amenities: [
      { icon: 'parking', label: 'Parkir Tersedia' },
      { icon: 'toilet', label: 'Toilet Bersih' },
      { icon: 'cafe', label: 'Kantin Sederhana' },
    ],
    location: 'Jl. Cikampek No. 67, Bogor Timur',
    image: 'https://images.unsplash.com/photo-1565232273226-e4a1a9f0acbb?w=400&h=300&fit=crop',
    mapsUrl: 'https://maps.google.com/?q=Arena+Voli+Sentosa',
    lat: -6.5688,
    lng: 106.8089,
    description: 'Arena voli dengan lapangan pasir dan lapangan indoor untuk turnamen.',
  },
  {
    id: 'ping-pong-1',
    name: 'Ping Pong Hall Elite',
    category: 'Ping Pong',
    price: 'Rp 80.000',
    rating: 4.7,
    amenities: [
      { icon: 'parking', label: 'Parkir Luas' },
      { icon: 'toilet', label: 'Toilet Bersih' },
      { icon: 'cafe', label: 'Kantin' },
    ],
    location: 'Jl. Letjen Suprapto No. 88, Bogor Tengah',
    image: 'https://images.unsplash.com/photo-1552674605-5defe6aa44bb?w=400&h=300&fit=crop',
    mapsUrl: 'https://maps.google.com/?q=Ping+Pong+Hall+Elite',
    lat: -6.5745,
    lng: 106.8356,
    description: 'Aula ping pong dengan meja berkualitas internasional dan lampu profesional.',
  },
];

export function getFacilitiesByCategory(category: string): Facility[] {
  return FACILITIES.filter((f) => f.category.toLowerCase() === category.toLowerCase());
}

export function searchFacilities(query: string): Facility[] {
  const lowercaseQuery = query.toLowerCase();
  return FACILITIES.filter(
    (f) =>
      f.name.toLowerCase().includes(lowercaseQuery) ||
      f.category.toLowerCase().includes(lowercaseQuery) ||
      f.location.toLowerCase().includes(lowercaseQuery)
  );
}

export function filterFacilities(
  categories: string[],
  searchQuery: string
): Facility[] {
  let filtered = FACILITIES;

  if (categories.length > 0) {
    filtered = filtered.filter((f) =>
      categories.some((cat) => f.id.startsWith(cat))
    );
  }

  if (searchQuery) {
    filtered = filtered.filter((f) =>
      f.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  return filtered;
}
