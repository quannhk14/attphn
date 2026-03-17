export interface NewsArticle {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
  author: string;
  authorRole: string;
}

export const newsArticles: NewsArticle[] = [
  {
    id: 1,
    slug: "tieu-chuan-an-toan-thuc-pham-moi-tai-pho-co",
    title: "Tieu chuan an toan thuc pham moi tai Pho Co",
    excerpt:
      "So An toan thuc pham da trien khai huong dan toan dien moi cho cac nha hang tai quan Hoan Kiem lich su.",
    content: `
      <p>So Y te Ha Noi vua ban hanh bo tieu chuan an toan thuc pham moi ap dung cho cac co so kinh doanh an uong tai khu vuc Pho Co, quan Hoan Kiem. Day la mot trong nhung buoc di quan trong nham nang cao chat luong ve sinh an toan thuc pham tai khu vuc du lich trong diem cua Thu do.</p>
      
      <h2>Nhung diem moi trong quy dinh</h2>
      <p>Bo tieu chuan moi tap trung vao cac van de chinh bao gom:</p>
      <ul>
        <li>Quy dinh cu the ve dieu kien co so vat chat, trang thiet bi</li>
        <li>Yeu cau ve nguon goc, xuat xu nguyen lieu thuc pham</li>
        <li>Quy trinh che bien, bao quan thuc an</li>
        <li>Dao tao nhan vien ve ve sinh an toan thuc pham</li>
      </ul>
      
      <h2>Lo trinh ap dung</h2>
      <p>Theo ke hoach, bo tieu chuan se duoc ap dung theo 3 giai doan:</p>
      <ul>
        <li>Giai doan 1 (Thang 4-6/2026): Tap huan, huong dan cho cac co so</li>
        <li>Giai doan 2 (Thang 7-9/2026): Ap dung thu nghiem tai 50 co so</li>
        <li>Giai doan 3 (Tu thang 10/2026): Ap dung rong rai tren toan khu vuc</li>
      </ul>
      
      <h2>Loi ich cho nguoi tieu dung</h2>
      <p>Viec ap dung bo tieu chuan moi se giup nguoi dan va du khach yen tam hon khi su dung dich vu an uong tai Pho Co. Cac co so dat chuan se duoc cap bien hieu nhan dien de giup nguoi tieu dung de dang lua chon.</p>
    `,
    date: "12/03/2026",
    readTime: "4 phut",
    image: "📋",
    category: "Quy dinh",
    author: "Nguyen Van A",
    authorRole: "Chuyen vien So Y te",
  },
  {
    id: 2,
    slug: "top-10-quan-an-duong-pho-chung-nhan",
    title: "Top 10 quan an duong pho duoc chung nhan tai Ha Noi",
    excerpt:
      "Kham pha nhung quan an duong pho dat chung nhan an toan cao nhat tu thanh tra thanh pho.",
    content: `
      <p>Trong dot kiem tra dinh ky quy I/2026, co 10 quan an duong pho dat diem ve sinh an toan thuc pham cao nhat. Day deu la nhung co so co truyen thong lau nam va duoc nguoi dan tin tuong.</p>
      
      <h2>Danh sach Top 10</h2>
      <ol>
        <li><strong>Pho 10 Ly Quoc Su</strong> - 98/100 diem</li>
        <li><strong>Bun Cha Huong Lien</strong> - 97/100 diem</li>
        <li><strong>Cha Ca La Vong</strong> - 96/100 diem</li>
        <li><strong>Bun Bo Nam Bo</strong> - 95/100 diem</li>
        <li><strong>Banh Cuon Ba Hanh</strong> - 95/100 diem</li>
        <li><strong>Ca Phe Giang</strong> - 94/100 diem</li>
        <li><strong>Banh Mi 25</strong> - 94/100 diem</li>
        <li><strong>Pho Thin</strong> - 93/100 diem</li>
        <li><strong>Bun Dau Mam Tom Hang Khay</strong> - 93/100 diem</li>
        <li><strong>Xoi Yen</strong> - 92/100 diem</li>
      </ol>
      
      <h2>Tieu chi danh gia</h2>
      <p>Cac co so duoc cham diem dua tren 5 tieu chi chinh:</p>
      <ul>
        <li>Co so vat chat va trang thiet bi (20 diem)</li>
        <li>Nguon goc nguyen lieu (25 diem)</li>
        <li>Quy trinh che bien (20 diem)</li>
        <li>Bao quan thuc pham (15 diem)</li>
        <li>Ve sinh ca nhan cua nhan vien (20 diem)</li>
      </ul>
    `,
    date: "10/03/2026",
    readTime: "6 phut",
    image: "🍜",
    category: "Noi bat",
    author: "Tran Thi B",
    authorRole: "Phong vien An toan Thuc pham",
  },
  {
    id: 3,
    slug: "bao-cao-kiem-tra-thang-2-2026",
    title: "Bao cao kiem tra thang 2/2026",
    excerpt:
      "Tong quan ve cac dot kiem tra an toan thuc pham tai 12 quan trong thang qua.",
    content: `
      <p>Trong thang 2/2026, Doan kiem tra lien nganh da tien hanh kiem tra 856 co so kinh doanh thuc pham tren dia ban 12 quan/huyen cua Ha Noi. Ket qua cho thay tinh hinh an toan thuc pham co nhieu chuyen bien tich cuc.</p>
      
      <h2>Ket qua tong quat</h2>
      <ul>
        <li>Tong so co so kiem tra: 856</li>
        <li>Co so dat yeu cau: 809 (94.5%)</li>
        <li>Co so vi pham: 47 (5.5%)</li>
        <li>Tong so tien phat: 1.2 ty dong</li>
      </ul>
      
      <h2>Cac vi pham pho bien</h2>
      <p>Nhung vi pham thuong gap bao gom:</p>
      <ul>
        <li>Khong co giay chung nhan co so du dieu kien ATTP (15 truong hop)</li>
        <li>Khong co giay kham suc khoe cho nhan vien (12 truong hop)</li>
        <li>Bao quan thuc pham khong dung quy dinh (10 truong hop)</li>
        <li>Khong co hop dong nguon goc thuc pham (10 truong hop)</li>
      </ul>
      
      <h2>Ke hoach thang tiep theo</h2>
      <p>Thang 3/2026, doan kiem tra se tap trung vao cac khu vuc co mat do kinh doanh thuc pham cao va cac co so phuc vu khach du lich.</p>
    `,
    date: "08/03/2026",
    readTime: "8 phut",
    image: "📊",
    category: "Bao cao",
    author: "Le Van C",
    authorRole: "Truong doan Kiem tra",
  },
  {
    id: 4,
    slug: "cach-nhan-biet-co-so-an-uong-an-toan",
    title: "Cach nhan biet co so an uong an toan",
    excerpt:
      "Huong dan giup nguoi dan nhan biet cac nha hang va quan an duoc chung nhan an toan.",
    content: `
      <p>De bao ve suc khoe ban than va gia dinh, viec lua chon co so an uong dam bao ve sinh an toan thuc pham la vo cung quan trong. Duoi day la nhung dau hieu giup ban nhan biet mot co so an toan.</p>
      
      <h2>Cac dau hieu nhan biet</h2>
      
      <h3>1. Giay to phap ly</h3>
      <ul>
        <li>Co treo Giay chung nhan co so du dieu kien ATTP</li>
        <li>Giay phep kinh doanh con hieu luc</li>
        <li>Bien hieu "Co so an toan thuc pham" (mau xanh)</li>
      </ul>
      
      <h3>2. Co so vat chat</h3>
      <ul>
        <li>Khu vuc che bien sach se, thoang mat</li>
        <li>Co tu bao quan thuc pham rieng biet</li>
        <li>Thung rac co nap day</li>
        <li>Co bon rua tay cho khach</li>
      </ul>
      
      <h3>3. Nhan vien</h3>
      <ul>
        <li>Mac dong phuc sach se</li>
        <li>Deo tap de, gang tay khi che bien</li>
        <li>Khong hut thuoc trong khu vuc phuc vu</li>
      </ul>
      
      <h2>Su dung ung dung kiem tra</h2>
      <p>Ban co the su dung ung dung "An toan thuc pham Ha Noi" de kiem tra thong tin cac co so da duoc chung nhan. Ung dung cung cung cap tinh nang phan anh vi pham truc tuyen.</p>
    `,
    date: "05/03/2026",
    readTime: "5 phut",
    image: "✅",
    category: "Huong dan",
    author: "Pham Thi D",
    authorRole: "Chuyen gia ATTP",
  },
  {
    id: 5,
    slug: "hoi-thao-an-toan-thuc-pham-dong-da",
    title: "Hoi thao an toan thuc pham thanh cong tai Dong Da",
    excerpt:
      "Hon 200 chu nha hang tham du khoa dao tao ve ve sinh an toan thuc pham.",
    content: `
      <p>Ngay 01/03/2026, UBND quan Dong Da phoi hop voi So Y te Ha Noi to chuc thanh cong Hoi thao "Nang cao nhan thuc ve an toan thuc pham trong kinh doanh an uong" voi su tham gia cua hon 200 chu co so kinh doanh thuc pham.</p>
      
      <h2>Noi dung chinh</h2>
      <p>Hoi thao tap trung vao cac chu de:</p>
      <ul>
        <li>Cap nhat quy dinh moi ve an toan thuc pham</li>
        <li>Huong dan quy trinh tu kiem tra tai co so</li>
        <li>Ky nang xu ly su co ve an toan thuc pham</li>
        <li>Gioi thieu he thong quan ly chat luong theo chuan ISO</li>
      </ul>
      
      <h2>Phan hoi tu nguoi tham du</h2>
      <p>Ong Nguyen Van E, chu quan Bun Bo 123 cho biet: "Hoi thao rat bo ich, toi da hieu ro hon ve cac quy dinh va biet cach ap dung vao thuc te kinh doanh."</p>
      
      <h2>Ke hoach tiep theo</h2>
      <p>Trong quy II/2026, chuong trinh se duoc mo rong toi cac quan Cau Giay, Thanh Xuan va Ha Dong.</p>
    `,
    date: "03/03/2026",
    readTime: "3 phut",
    image: "👨‍🍳",
    category: "Su kien",
    author: "Hoang Van F",
    authorRole: "Ban to chuc",
  },
  {
    id: 6,
    slug: "ung-dung-di-dong-canh-bao-an-toan-thuc-pham",
    title: "Ung dung di dong moi canh bao an toan thuc pham",
    excerpt:
      "Nguoi dan co the nhan thong bao tuc thi ve cap nhat an toan thuc pham trong khu vuc.",
    content: `
      <p>So Y te Ha Noi vua chinh thuc ra mat ung dung "An toan Thuc pham Ha Noi" phien ban 2.0 voi nhieu tinh nang moi, giup nguoi dan de dang truy cap thong tin ve an toan thuc pham.</p>
      
      <h2>Cac tinh nang noi bat</h2>
      <ul>
        <li><strong>Ban do co so chung nhan:</strong> Hien thi vi tri cac nha hang, quan an da duoc chung nhan an toan</li>
        <li><strong>Canh bao theo khu vuc:</strong> Thong bao khi co vi pham trong pham vi 1km</li>
        <li><strong>Phan anh truc tuyen:</strong> Gui phan anh kem hinh anh ve co so nghi ngo vi pham</li>
        <li><strong>Lich su kiem tra:</strong> Xem ket qua kiem tra cua cac co so</li>
        <li><strong>Tin tuc cap nhat:</strong> Thong tin moi nhat ve an toan thuc pham</li>
      </ul>
      
      <h2>Cach tai va su dung</h2>
      <p>Ung dung co san tren ca App Store va Google Play. Nguoi dung chi can tim kiem "An toan Thuc pham Ha Noi" va cai dat mien phi.</p>
      
      <h2>Bao mat thong tin</h2>
      <p>Ung dung cam ket bao mat thong tin ca nhan cua nguoi dung theo quy dinh cua phap luat Viet Nam.</p>
    `,
    date: "01/03/2026",
    readTime: "4 phut",
    image: "📱",
    category: "Cong nghe",
    author: "Do Thi G",
    authorRole: "IT Manager - So Y te",
  },
];

export function getArticleBySlug(slug: string): NewsArticle | undefined {
  return newsArticles.find((article) => article.slug === slug);
}

export function getRelatedArticles(
  currentSlug: string,
  limit: number = 3
): NewsArticle[] {
  return newsArticles
    .filter((article) => article.slug !== currentSlug)
    .slice(0, limit);
}
