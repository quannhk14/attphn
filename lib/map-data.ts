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
  { id: "hoan-kiem", name: "Hoàn Kiếm", safeCount: 312, violationCount: 8, reviewCount: 15, coordinates: { x: 35, y: 42 } },
  { id: "hai-ba-trung", name: "Hai Bà Trưng", safeCount: 245, violationCount: 12, reviewCount: 18, coordinates: { x: 58, y: 35 } },
  { id: "dong-da", name: "Đống Đa", safeCount: 198, violationCount: 15, reviewCount: 22, coordinates: { x: 55, y: 68 } },
  { id: "cau-giay", name: "Cầu Giấy", safeCount: 287, violationCount: 9, reviewCount: 14, coordinates: { x: 20, y: 55 } },
  { id: "ba-dinh", name: "Ba Đình", safeCount: 156, violationCount: 5, reviewCount: 8, coordinates: { x: 25, y: 25 } },
  { id: "tay-ho", name: "Tây Hồ", safeCount: 134, violationCount: 7, reviewCount: 11, coordinates: { x: 28, y: 15 } },
  { id: "long-bien", name: "Long Biên", safeCount: 189, violationCount: 11, reviewCount: 16, coordinates: { x: 75, y: 25 } },
  { id: "hoang-mai", name: "Hoàng Mai", safeCount: 267, violationCount: 14, reviewCount: 19, coordinates: { x: 70, y: 60 } },
  { id: "thanh-xuan", name: "Thanh Xuân", safeCount: 223, violationCount: 10, reviewCount: 17, coordinates: { x: 45, y: 78 } },
  { id: "ha-dong", name: "Hà Đông", safeCount: 178, violationCount: 8, reviewCount: 12, coordinates: { x: 25, y: 85 } },
  { id: "nam-tu-liem", name: "Nam Từ Liêm", safeCount: 156, violationCount: 6, reviewCount: 9, coordinates: { x: 15, y: 70 } },
  { id: "bac-tu-liem", name: "Bắc Từ Liêm", safeCount: 202, violationCount: 7, reviewCount: 15, coordinates: { x: 18, y: 40 } },
];

export const foodPlaces: FoodPlace[] = [
  {
    id: 1,
    name: "Phở 10 Lý Quốc Sư",
    address: "10 Lý Quốc Sư, Hoàn Kiếm",
    district: "Hoàn Kiếm",
    type: "Nhà hàng",
    status: "safe",
    rating: 4.8,
    lastInspection: "15/03/2026",
    phone: "024-3825-7338",
    coordinates: { x: 30, y: 32 },
    inspectionHistory: [
      { date: "15/03/2026", result: "pass", notes: "Đạt tất cả tiêu chuẩn" },
      { date: "15/12/2025", result: "pass", notes: "Đạt tất cả tiêu chuẩn" },
      { date: "15/09/2025", result: "pass", notes: "Đạt tất cả tiêu chuẩn" },
    ],
  },
  {
    id: 2,
    name: "Bún Chả Hương Liên",
    address: "24 Lê Văn Hưu, Hai Bà Trưng",
    district: "Hai Bà Trưng",
    type: "Quán ăn",
    status: "safe",
    rating: 4.9,
    lastInspection: "10/03/2026",
    phone: "024-3943-4106",
    coordinates: { x: 50, y: 28 },
    inspectionHistory: [
      { date: "10/03/2026", result: "pass", notes: "Xuất sắc" },
      { date: "10/12/2025", result: "pass", notes: "Đạt tiêu chuẩn" },
    ],
  },
  {
    id: 3,
    name: "Quán ăn góc phố",
    address: "45 Tôn Đức Thắng, Đống Đa",
    district: "Đống Đa",
    type: "Quán ăn",
    status: "violation",
    rating: 3.2,
    lastInspection: "12/03/2026",
    coordinates: { x: 65, y: 45 },
    inspectionHistory: [
      { date: "12/03/2026", result: "fail", notes: "Vi phạm vệ sinh" },
      { date: "12/12/2025", result: "pending", notes: "Cần cải thiện" },
    ],
  },
  {
    id: 4,
    name: "Chả Cá Lã Vọng",
    address: "14 Chả Cá, Hoàn Kiếm",
    district: "Hoàn Kiếm",
    type: "Nhà hàng",
    status: "safe",
    rating: 4.7,
    lastInspection: "08/03/2026",
    phone: "024-3825-3929",
    coordinates: { x: 38, y: 55 },
    inspectionHistory: [
      { date: "08/03/2026", result: "pass", notes: "Đạt tiêu chuẩn cao" },
    ],
  },
  {
    id: 5,
    name: "Quán nướng chợ đêm",
    address: "Chợ đêm Đồng Xuân, Hoàn Kiếm",
    district: "Đống Đa",
    type: "Hàng rong",
    status: "review",
    rating: 3.8,
    lastInspection: "01/03/2026",
    coordinates: { x: 72, y: 62 },
    inspectionHistory: [
      { date: "01/03/2026", result: "pending", notes: "Đang xem xét" },
    ],
  },
  {
    id: 6,
    name: "Cà Phê Giảng",
    address: "39 Nguyễn Hữu Huân, Hoàn Kiếm",
    district: "Hoàn Kiếm",
    type: "Quán cà phê",
    status: "safe",
    rating: 4.6,
    lastInspection: "05/03/2026",
    phone: "024-3825-0910",
    coordinates: { x: 25, y: 70 },
    inspectionHistory: [
      { date: "05/03/2026", result: "pass", notes: "Đạt tiêu chuẩn" },
    ],
  },
  {
    id: 7,
    name: "Bánh Mì 25",
    address: "25 Hàng Cá, Hoàn Kiếm",
    district: "Hoàn Kiếm",
    type: "Hàng rong",
    status: "safe",
    rating: 4.5,
    lastInspection: "03/03/2026",
    coordinates: { x: 55, y: 75 },
    inspectionHistory: [
      { date: "03/03/2026", result: "pass", notes: "Tốt" },
    ],
  },
  {
    id: 8,
    name: "Cơm Rang Dương Châu",
    address: "12 Trần Duy Hưng, Cầu Giấy",
    district: "Cầu Giấy",
    type: "Quán ăn",
    status: "review",
    rating: 4.0,
    lastInspection: "28/02/2026",
    coordinates: { x: 78, y: 30 },
    inspectionHistory: [
      { date: "28/02/2026", result: "pending", notes: "Chờ kiểm tra lại" },
    ],
  },
  {
    id: 9,
    name: "Phở Thìn",
    address: "13 Lò Đúc, Hai Bà Trưng",
    district: "Hai Bà Trưng",
    type: "Quán ăn",
    status: "safe",
    rating: 4.6,
    lastInspection: "14/03/2026",
    phone: "024-3821-2709",
    coordinates: { x: 60, y: 38 },
    inspectionHistory: [
      { date: "14/03/2026", result: "pass", notes: "Rất tốt" },
    ],
  },
  {
    id: 10,
    name: "Bún Đậu Mắm Tôm Hàng Khay",
    address: "1 Hàng Khay, Hoàn Kiếm",
    district: "Hoàn Kiếm",
    type: "Quán ăn",
    status: "safe",
    rating: 4.4,
    lastInspection: "11/03/2026",
    coordinates: { x: 42, y: 45 },
    inspectionHistory: [
      { date: "11/03/2026", result: "pass", notes: "Đạt chuẩn" },
    ],
  },
  {
    id: 11,
    name: "Xôi Yến",
    address: "35B Nguyễn Hữu Huân, Hoàn Kiếm",
    district: "Hoàn Kiếm",
    type: "Quán ăn",
    status: "safe",
    rating: 4.3,
    lastInspection: "09/03/2026",
    coordinates: { x: 33, y: 48 },
    inspectionHistory: [
      { date: "09/03/2026", result: "pass", notes: "Tốt" },
    ],
  },
  {
    id: 12,
    name: "Quán Bún Bò Huế",
    address: "67 Mai Hắc Đế, Hai Bà Trưng",
    district: "Hai Bà Trưng",
    type: "Quán ăn",
    status: "violation",
    rating: 3.5,
    lastInspection: "07/03/2026",
    coordinates: { x: 68, y: 42 },
    inspectionHistory: [
      { date: "07/03/2026", result: "fail", notes: "Không đạt vệ sinh" },
    ],
  },
  {
    id: 13,
    name: "Lotteria Vincom",
    address: "191 Bà Triệu, Hai Bà Trưng",
    district: "Hai Bà Trưng",
    type: "Nhà hàng",
    status: "safe",
    rating: 4.2,
    lastInspection: "13/03/2026",
    coordinates: { x: 52, y: 50 },
    inspectionHistory: [
      { date: "13/03/2026", result: "pass", notes: "Đạt chuẩn" },
    ],
  },
  {
    id: 14,
    name: "Quán Chè 4 Mùa",
    address: "4 Ngõ Gạch, Hoàn Kiếm",
    district: "Hoàn Kiếm",
    type: "Quán ăn",
    status: "safe",
    rating: 4.1,
    lastInspection: "06/03/2026",
    coordinates: { x: 28, y: 58 },
    inspectionHistory: [
      { date: "06/03/2026", result: "pass", notes: "Tốt" },
    ],
  },
  {
    id: 15,
    name: "Highlands Coffee Times City",
    address: "458 Minh Khai, Hai Bà Trưng",
    district: "Hai Bà Trưng",
    type: "Quán cà phê",
    status: "safe",
    rating: 4.4,
    lastInspection: "12/03/2026",
    coordinates: { x: 75, y: 48 },
    inspectionHistory: [
      { date: "12/03/2026", result: "pass", notes: "Xuất sắc" },
    ],
  },
  {
    id: 16,
    name: "Quán ăn vỉa hè",
    address: "Phố Huế, Hai Bà Trưng",
    district: "Hai Bà Trưng",
    type: "Hàng rong",
    status: "review",
    rating: 3.6,
    lastInspection: "02/03/2026",
    coordinates: { x: 58, y: 55 },
    inspectionHistory: [
      { date: "02/03/2026", result: "pending", notes: "Đang chờ xem xét" },
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
