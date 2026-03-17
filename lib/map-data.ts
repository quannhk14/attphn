export interface FoodPlace {
  id: number;
  name: string;
  address: string;
  district: string;
  type: string;
  status: "safe" | "violation" | "review";
  rating: number;
  lastInspection: string;
  phone?: string;
  coordinates: { x: number; y: number };
  inspectionHistory: {
    date: string;
    result: "pass" | "fail" | "pending";
    notes: string;
  }[];
}

export interface District {
  id: string;
  name: string;
  safeCount: number;
  violationCount: number;
  reviewCount: number;
  coordinates: { x: number; y: number };
}

export const districts: District[] = [
  { id: "hoan-kiem", name: "Hoan Kiem", safeCount: 312, violationCount: 8, reviewCount: 15, coordinates: { x: 35, y: 42 } },
  { id: "hai-ba-trung", name: "Hai Ba Trung", safeCount: 245, violationCount: 12, reviewCount: 18, coordinates: { x: 58, y: 35 } },
  { id: "dong-da", name: "Dong Da", safeCount: 198, violationCount: 15, reviewCount: 22, coordinates: { x: 55, y: 68 } },
  { id: "cau-giay", name: "Cau Giay", safeCount: 287, violationCount: 9, reviewCount: 14, coordinates: { x: 20, y: 55 } },
  { id: "ba-dinh", name: "Ba Dinh", safeCount: 156, violationCount: 5, reviewCount: 8, coordinates: { x: 25, y: 25 } },
  { id: "tay-ho", name: "Tay Ho", safeCount: 134, violationCount: 7, reviewCount: 11, coordinates: { x: 28, y: 15 } },
  { id: "long-bien", name: "Long Bien", safeCount: 189, violationCount: 11, reviewCount: 16, coordinates: { x: 75, y: 25 } },
  { id: "hoang-mai", name: "Hoang Mai", safeCount: 267, violationCount: 14, reviewCount: 19, coordinates: { x: 70, y: 60 } },
  { id: "thanh-xuan", name: "Thanh Xuan", safeCount: 223, violationCount: 10, reviewCount: 17, coordinates: { x: 45, y: 78 } },
  { id: "ha-dong", name: "Ha Dong", safeCount: 178, violationCount: 8, reviewCount: 12, coordinates: { x: 25, y: 85 } },
  { id: "nam-tu-liem", name: "Nam Tu Liem", safeCount: 156, violationCount: 6, reviewCount: 9, coordinates: { x: 15, y: 70 } },
  { id: "bac-tu-liem", name: "Bac Tu Liem", safeCount: 202, violationCount: 7, reviewCount: 15, coordinates: { x: 18, y: 40 } },
];

export const foodPlaces: FoodPlace[] = [
  {
    id: 1,
    name: "Pho 10 Ly Quoc Su",
    address: "10 Ly Quoc Su, Hoan Kiem",
    district: "Hoan Kiem",
    type: "Nha hang",
    status: "safe",
    rating: 4.8,
    lastInspection: "15/03/2026",
    phone: "024-3825-7338",
    coordinates: { x: 30, y: 32 },
    inspectionHistory: [
      { date: "15/03/2026", result: "pass", notes: "Dat tat ca tieu chuan" },
      { date: "15/12/2025", result: "pass", notes: "Dat tat ca tieu chuan" },
      { date: "15/09/2025", result: "pass", notes: "Dat tat ca tieu chuan" },
    ],
  },
  {
    id: 2,
    name: "Bun Cha Huong Lien",
    address: "24 Le Van Huu, Hai Ba Trung",
    district: "Hai Ba Trung",
    type: "Quan an",
    status: "safe",
    rating: 4.9,
    lastInspection: "10/03/2026",
    phone: "024-3943-4106",
    coordinates: { x: 50, y: 28 },
    inspectionHistory: [
      { date: "10/03/2026", result: "pass", notes: "Xuat sac" },
      { date: "10/12/2025", result: "pass", notes: "Dat tieu chuan" },
    ],
  },
  {
    id: 3,
    name: "Quan an goc pho",
    address: "45 Ton Duc Thang, Dong Da",
    district: "Dong Da",
    type: "Quan an",
    status: "violation",
    rating: 3.2,
    lastInspection: "12/03/2026",
    coordinates: { x: 65, y: 45 },
    inspectionHistory: [
      { date: "12/03/2026", result: "fail", notes: "Vi pham ve sinh" },
      { date: "12/12/2025", result: "pending", notes: "Can cai thien" },
    ],
  },
  {
    id: 4,
    name: "Cha Ca La Vong",
    address: "14 Cha Ca, Hoan Kiem",
    district: "Hoan Kiem",
    type: "Nha hang",
    status: "safe",
    rating: 4.7,
    lastInspection: "08/03/2026",
    phone: "024-3825-3929",
    coordinates: { x: 38, y: 55 },
    inspectionHistory: [
      { date: "08/03/2026", result: "pass", notes: "Dat tieu chuan cao" },
    ],
  },
  {
    id: 5,
    name: "Quan nuong cho dem",
    address: "Cho dem Dong Xuan, Hoan Kiem",
    district: "Dong Da",
    type: "Hang rong",
    status: "review",
    rating: 3.8,
    lastInspection: "01/03/2026",
    coordinates: { x: 72, y: 62 },
    inspectionHistory: [
      { date: "01/03/2026", result: "pending", notes: "Dang xem xet" },
    ],
  },
  {
    id: 6,
    name: "Ca Phe Giang",
    address: "39 Nguyen Huu Huan, Hoan Kiem",
    district: "Hoan Kiem",
    type: "Quan ca phe",
    status: "safe",
    rating: 4.6,
    lastInspection: "05/03/2026",
    phone: "024-3825-0910",
    coordinates: { x: 25, y: 70 },
    inspectionHistory: [
      { date: "05/03/2026", result: "pass", notes: "Dat tieu chuan" },
    ],
  },
  {
    id: 7,
    name: "Banh Mi 25",
    address: "25 Hang Ca, Hoan Kiem",
    district: "Hoan Kiem",
    type: "Hang rong",
    status: "safe",
    rating: 4.5,
    lastInspection: "03/03/2026",
    coordinates: { x: 55, y: 75 },
    inspectionHistory: [
      { date: "03/03/2026", result: "pass", notes: "Tot" },
    ],
  },
  {
    id: 8,
    name: "Com Rang Duong Chau",
    address: "12 Tran Duy Hung, Cau Giay",
    district: "Cau Giay",
    type: "Quan an",
    status: "review",
    rating: 4.0,
    lastInspection: "28/02/2026",
    coordinates: { x: 78, y: 30 },
    inspectionHistory: [
      { date: "28/02/2026", result: "pending", notes: "Cho kiem tra lai" },
    ],
  },
  {
    id: 9,
    name: "Pho Thin",
    address: "13 Lo Duc, Hai Ba Trung",
    district: "Hai Ba Trung",
    type: "Quan an",
    status: "safe",
    rating: 4.6,
    lastInspection: "14/03/2026",
    phone: "024-3821-2709",
    coordinates: { x: 60, y: 38 },
    inspectionHistory: [
      { date: "14/03/2026", result: "pass", notes: "Rat tot" },
    ],
  },
  {
    id: 10,
    name: "Bun Dau Mam Tom Hang Khay",
    address: "1 Hang Khay, Hoan Kiem",
    district: "Hoan Kiem",
    type: "Quan an",
    status: "safe",
    rating: 4.4,
    lastInspection: "11/03/2026",
    coordinates: { x: 42, y: 45 },
    inspectionHistory: [
      { date: "11/03/2026", result: "pass", notes: "Dat chuan" },
    ],
  },
  {
    id: 11,
    name: "Xoi Yen",
    address: "35B Nguyen Huu Huan, Hoan Kiem",
    district: "Hoan Kiem",
    type: "Quan an",
    status: "safe",
    rating: 4.3,
    lastInspection: "09/03/2026",
    coordinates: { x: 33, y: 48 },
    inspectionHistory: [
      { date: "09/03/2026", result: "pass", notes: "Tot" },
    ],
  },
  {
    id: 12,
    name: "Quan Bun Bo Hue",
    address: "67 Mai Hac De, Hai Ba Trung",
    district: "Hai Ba Trung",
    type: "Quan an",
    status: "violation",
    rating: 3.5,
    lastInspection: "07/03/2026",
    coordinates: { x: 68, y: 42 },
    inspectionHistory: [
      { date: "07/03/2026", result: "fail", notes: "Khong dat ve sinh" },
    ],
  },
  {
    id: 13,
    name: "Lotteria Vincom",
    address: "191 Ba Trieu, Hai Ba Trung",
    district: "Hai Ba Trung",
    type: "Nha hang",
    status: "safe",
    rating: 4.2,
    lastInspection: "13/03/2026",
    coordinates: { x: 52, y: 50 },
    inspectionHistory: [
      { date: "13/03/2026", result: "pass", notes: "Dat chuan" },
    ],
  },
  {
    id: 14,
    name: "Quan Che 4 Mua",
    address: "4 Ngo Gach, Hoan Kiem",
    district: "Hoan Kiem",
    type: "Quan an",
    status: "safe",
    rating: 4.1,
    lastInspection: "06/03/2026",
    coordinates: { x: 28, y: 58 },
    inspectionHistory: [
      { date: "06/03/2026", result: "pass", notes: "Tot" },
    ],
  },
  {
    id: 15,
    name: "Highlands Coffee Times City",
    address: "458 Minh Khai, Hai Ba Trung",
    district: "Hai Ba Trung",
    type: "Quan ca phe",
    status: "safe",
    rating: 4.4,
    lastInspection: "12/03/2026",
    coordinates: { x: 75, y: 48 },
    inspectionHistory: [
      { date: "12/03/2026", result: "pass", notes: "Xuat sac" },
    ],
  },
  {
    id: 16,
    name: "Quan an via he",
    address: "Pho Hue, Hai Ba Trung",
    district: "Hai Ba Trung",
    type: "Hang rong",
    status: "review",
    rating: 3.6,
    lastInspection: "02/03/2026",
    coordinates: { x: 58, y: 55 },
    inspectionHistory: [
      { date: "02/03/2026", result: "pending", notes: "Dang cho xem xet" },
    ],
  },
];

export function getPlacesByDistrict(district: string): FoodPlace[] {
  return foodPlaces.filter((place) => place.district === district);
}

export function getPlacesByStatus(status: FoodPlace["status"]): FoodPlace[] {
  return foodPlaces.filter((place) => place.status === status);
}

export function getPlaceById(id: number): FoodPlace | undefined {
  return foodPlaces.find((place) => place.id === id);
}

export function searchPlaces(query: string): FoodPlace[] {
  const lowercaseQuery = query.toLowerCase();
  return foodPlaces.filter(
    (place) =>
      place.name.toLowerCase().includes(lowercaseQuery) ||
      place.address.toLowerCase().includes(lowercaseQuery) ||
      place.district.toLowerCase().includes(lowercaseQuery)
  );
}
