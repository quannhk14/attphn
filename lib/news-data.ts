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
    title: "Tiêu chuẩn an toàn thực phẩm mới tại Phố Cổ",
    excerpt:
      "Sở An toàn thực phẩm đã triển khai hướng dẫn toàn diện mới cho các nhà hàng tại quận Hoàn Kiếm lịch sử.",
    content: `
      <p>Sở Y tế Hà Nội vừa ban hành bộ tiêu chuẩn an toàn thực phẩm mới áp dụng cho các cơ sở kinh doanh ăn uống tại khu vực Phố Cổ, quận Hoàn Kiếm. Đây là một trong những bước đi quan trọng nhằm nâng cao chất lượng vệ sinh an toàn thực phẩm tại khu vực du lịch trọng điểm của Thủ đô.</p>
      
      <h2>Những điểm mới trong quy định</h2>
      <p>Bộ tiêu chuẩn mới tập trung vào các vấn đề chính bao gồm:</p>
      <ul>
        <li>Quy định cụ thể về điều kiện cơ sở vật chất, trang thiết bị</li>
        <li>Yêu cầu về nguồn gốc, xuất xứ nguyên liệu thực phẩm</li>
        <li>Quy trình chế biến, bảo quản thức ăn</li>
        <li>Đào tạo nhân viên về vệ sinh an toàn thực phẩm</li>
      </ul>
      
      <h2>Lộ trình áp dụng</h2>
      <p>Theo kế hoạch, bộ tiêu chuẩn sẽ được áp dụng theo 3 giai đoạn:</p>
      <ul>
        <li>Giai đoạn 1 (Tháng 4-6/2026): Tập huấn, hướng dẫn cho các cơ sở</li>
        <li>Giai đoạn 2 (Tháng 7-9/2026): Áp dụng thử nghiệm tại 50 cơ sở</li>
        <li>Giai đoạn 3 (Từ tháng 10/2026): Áp dụng rộng rãi trên toàn khu vực</li>
      </ul>
      
      <h2>Lợi ích cho người tiêu dùng</h2>
      <p>Việc áp dụng bộ tiêu chuẩn mới sẽ giúp người dân và du khách yên tâm hơn khi sử dụng dịch vụ ăn uống tại Phố Cổ. Các cơ sở đạt chuẩn sẽ được cấp biển hiệu nhận diện để giúp người tiêu dùng dễ dàng lựa chọn.</p>
    `,
    date: "12/03/2026",
    readTime: "4 phút",
    image: "📋",
    category: "Quy định",
    author: "Nguyễn Văn A",
    authorRole: "Chuyên viên Sở Y tế",
  },
  {
    id: 2,
    slug: "top-10-quan-an-duong-pho-chung-nhan",
    title: "Top 10 quán ăn đường phố được chứng nhận tại Hà Nội",
    excerpt:
      "Khám phá những quán ăn đường phố đạt chứng nhận an toàn cao nhất từ thanh tra thành phố.",
    content: `
      <p>Trong đợt kiểm tra định kỳ quý I/2026, có 10 quán ăn đường phố đạt điểm vệ sinh an toàn thực phẩm cao nhất. Đây đều là những cơ sở có truyền thống lâu năm và được người dân tin tưởng.</p>
      
      <h2>Danh sách Top 10</h2>
      <ol>
        <li><strong>Phở 10 Lý Quốc Sư</strong> - 98/100 điểm</li>
        <li><strong>Bún Chả Hương Liên</strong> - 97/100 điểm</li>
        <li><strong>Chả Cá Lã Vọng</strong> - 96/100 điểm</li>
        <li><strong>Bún Bò Nam Bộ</strong> - 95/100 điểm</li>
        <li><strong>Bánh Cuốn Bà Hạnh</strong> - 95/100 điểm</li>
        <li><strong>Cà Phê Giảng</strong> - 94/100 điểm</li>
        <li><strong>Bánh Mì 25</strong> - 94/100 điểm</li>
        <li><strong>Phở Thìn</strong> - 93/100 điểm</li>
        <li><strong>Bún Đậu Mắm Tôm Hàng Khay</strong> - 93/100 điểm</li>
        <li><strong>Xôi Yến</strong> - 92/100 điểm</li>
      </ol>
      
      <h2>Tiêu chí đánh giá</h2>
      <p>Các cơ sở được chấm điểm dựa trên 5 tiêu chí chính:</p>
      <ul>
        <li>Cơ sở vật chất và trang thiết bị (20 điểm)</li>
        <li>Nguồn gốc nguyên liệu (25 điểm)</li>
        <li>Quy trình chế biến (20 điểm)</li>
        <li>Bảo quản thực phẩm (15 điểm)</li>
        <li>Vệ sinh cá nhân của nhân viên (20 điểm)</li>
      </ul>
    `,
    date: "10/03/2026",
    readTime: "6 phút",
    image: "🍜",
    category: "Nổi bật",
    author: "Trần Thị B",
    authorRole: "Phóng viên An toàn Thực phẩm",
  },
  {
    id: 3,
    slug: "bao-cao-kiem-tra-thang-2-2026",
    title: "Báo cáo kiểm tra tháng 2/2026",
    excerpt:
      "Tổng quan về các đợt kiểm tra an toàn thực phẩm tại 12 quận trong tháng qua.",
    content: `
      <p>Trong tháng 2/2026, Đoàn kiểm tra liên ngành đã tiến hành kiểm tra 856 cơ sở kinh doanh thực phẩm trên địa bàn 12 quận/huyện của Hà Nội. Kết quả cho thấy tình hình an toàn thực phẩm có nhiều chuyển biến tích cực.</p>
      
      <h2>Kết quả tổng quát</h2>
      <ul>
        <li>Tổng số cơ sở kiểm tra: 856</li>
        <li>Cơ sở đạt yêu cầu: 809 (94.5%)</li>
        <li>Cơ sở vi phạm: 47 (5.5%)</li>
        <li>Tổng số tiền phạt: 1.2 tỷ đồng</li>
      </ul>
      
      <h2>Các vi phạm phổ biến</h2>
      <p>Những vi phạm thường gặp bao gồm:</p>
      <ul>
        <li>Không có giấy chứng nhận cơ sở đủ điều kiện ATTP (15 trường hợp)</li>
        <li>Không có giấy khám sức khỏe cho nhân viên (12 trường hợp)</li>
        <li>Bảo quản thực phẩm không đúng quy định (10 trường hợp)</li>
        <li>Không có hợp đồng nguồn gốc thực phẩm (10 trường hợp)</li>
      </ul>
      
      <h2>Kế hoạch tháng tiếp theo</h2>
      <p>Tháng 3/2026, đoàn kiểm tra sẽ tập trung vào các khu vực có mật độ kinh doanh thực phẩm cao và các cơ sở phục vụ khách du lịch.</p>
    `,
    date: "08/03/2026",
    readTime: "8 phút",
    image: "📊",
    category: "Báo cáo",
    author: "Lê Văn C",
    authorRole: "Trưởng đoàn Kiểm tra",
  },
  {
    id: 4,
    slug: "cach-nhan-biet-co-so-an-uong-an-toan",
    title: "Cách nhận biết cơ sở ăn uống an toàn",
    excerpt:
      "Hướng dẫn giúp người dân nhận biết các nhà hàng và quán ăn được chứng nhận an toàn.",
    content: `
      <p>Để bảo vệ sức khỏe bản thân và gia đình, việc lựa chọn cơ sở ăn uống đảm bảo vệ sinh an toàn thực phẩm là vô cùng quan trọng. Dưới đây là những dấu hiệu giúp bạn nhận biết một cơ sở an toàn.</p>
      
      <h2>Các dấu hiệu nhận biết</h2>
      
      <h3>1. Giấy tờ pháp lý</h3>
      <ul>
        <li>Có treo Giấy chứng nhận cơ sở đủ điều kiện ATTP</li>
        <li>Giấy phép kinh doanh còn hiệu lực</li>
        <li>Biển hiệu "Cơ sở an toàn thực phẩm" (màu xanh)</li>
      </ul>
      
      <h3>2. Cơ sở vật chất</h3>
      <ul>
        <li>Khu vực chế biến sạch sẽ, thoáng mát</li>
        <li>Có tủ bảo quản thực phẩm riêng biệt</li>
        <li>Thùng rác có nắp đậy</li>
        <li>Có bồn rửa tay cho khách</li>
      </ul>
      
      <h3>3. Nhân viên</h3>
      <ul>
        <li>Mặc đồng phục sạch sẽ</li>
        <li>Đeo tạp dề, găng tay khi chế biến</li>
        <li>Không hút thuốc trong khu vực phục vụ</li>
      </ul>
      
      <h2>Sử dụng ứng dụng kiểm tra</h2>
      <p>Bạn có thể sử dụng ứng dụng "An toàn thực phẩm Hà Nội" để kiểm tra thông tin các cơ sở đã được chứng nhận. Ứng dụng cũng cung cấp tính năng phản ánh vi phạm trực tuyến.</p>
    `,
    date: "05/03/2026",
    readTime: "5 phút",
    image: "✅",
    category: "Hướng dẫn",
    author: "Phạm Thị D",
    authorRole: "Chuyên gia ATTP",
  },
  {
    id: 5,
    slug: "hoi-thao-an-toan-thuc-pham-dong-da",
    title: "Hội thảo an toàn thực phẩm thành công tại Đống Đa",
    excerpt:
      "Hơn 200 chủ nhà hàng tham dự khóa đào tạo về vệ sinh an toàn thực phẩm.",
    content: `
      <p>Ngày 01/03/2026, UBND quận Đống Đa phối hợp với Sở Y tế Hà Nội tổ chức thành công Hội thảo "Nâng cao nhận thức về an toàn thực phẩm trong kinh doanh ăn uống" với sự tham gia của hơn 200 chủ cơ sở kinh doanh thực phẩm.</p>
      
      <h2>Nội dung chính</h2>
      <p>Hội thảo tập trung vào các chủ đề:</p>
      <ul>
        <li>Cập nhật quy định mới về an toàn thực phẩm</li>
        <li>Hướng dẫn quy trình tự kiểm tra tại cơ sở</li>
        <li>Kỹ năng xử lý sự cố về an toàn thực phẩm</li>
        <li>Giới thiệu hệ thống quản lý chất lượng theo chuẩn ISO</li>
      </ul>
      
      <h2>Phản hồi từ người tham dự</h2>
      <p>Ông Nguyễn Văn E, chủ quán Bún Bò 123 cho biết: "Hội thảo rất bổ ích, tôi đã hiểu rõ hơn về các quy định và biết cách áp dụng vào thực tế kinh doanh."</p>
      
      <h2>Kế hoạch tiếp theo</h2>
      <p>Trong quý II/2026, chương trình sẽ được mở rộng tới các quận Cầu Giấy, Thanh Xuân và Hà Đông.</p>
    `,
    date: "03/03/2026",
    readTime: "3 phút",
    image: "👨‍🍳",
    category: "Sự kiện",
    author: "Hoàng Văn F",
    authorRole: "Ban tổ chức",
  },
  {
    id: 6,
    slug: "ung-dung-di-dong-canh-bao-an-toan-thuc-pham",
    title: "Ứng dụng di động mới cảnh báo an toàn thực phẩm",
    excerpt:
      "Người dân có thể nhận thông báo tức thì về cập nhật an toàn thực phẩm trong khu vực.",
    content: `
      <p>Sở Y tế Hà Nội vừa chính thức ra mắt ứng dụng "An toàn Thực phẩm Hà Nội" phiên bản 2.0 với nhiều tính năng mới, giúp người dân dễ dàng truy cập thông tin về an toàn thực phẩm.</p>
      
      <h2>Các tính năng nổi bật</h2>
      <ul>
        <li><strong>Bản đồ cơ sở chứng nhận:</strong> Hiển thị vị trí các nhà hàng, quán ăn đã được chứng nhận an toàn</li>
        <li><strong>Cảnh báo theo khu vực:</strong> Thông báo khi có vi phạm trong phạm vi 1km</li>
        <li><strong>Phản ánh trực tuyến:</strong> Gửi phản ánh kèm hình ảnh về cơ sở nghi ngờ vi phạm</li>
        <li><strong>Lịch sử kiểm tra:</strong> Xem kết quả kiểm tra của các cơ sở</li>
        <li><strong>Tin tức cập nhật:</strong> Thông tin mới nhất về an toàn thực phẩm</li>
      </ul>
      
      <h2>Cách tải và sử dụng</h2>
      <p>Ứng dụng có sẵn trên cả App Store và Google Play. Người dùng chỉ cần tìm kiếm "An toàn Thực phẩm Hà Nội" và cài đặt miễn phí.</p>
      
      <h2>Bảo mật thông tin</h2>
      <p>Ứng dụng cam kết bảo mật thông tin cá nhân của người dùng theo quy định của pháp luật Việt Nam.</p>
    `,
    date: "01/03/2026",
    readTime: "4 phút",
    image: "📱",
    category: "Công nghệ",
    author: "Đỗ Thị G",
    authorRole: "IT Manager - Sở Y tế",
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
