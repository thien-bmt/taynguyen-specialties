# Tài Liệu Định Hướng Phát Triển Chức Năng Đặt Hàng & E-Commerce
## Dự án: Đặc Sản Tây Nguyên

---

## 🎯 Mục Tiêu Tổng Quan

Tài liệu này đưa ra định hướng chiến lược và kịch bản kỹ thuật chi tiết để chuyển đổi trang giới thiệu **Đặc Sản Tây Nguyên** từ một ứng dụng **Front-end Web App (Vanilla JS)** thành một **Hệ Thống Thương Mại Điện Tử Đa Vùng (Multi-region E-Commerce Platform)** hoàn chỉnh.

---

## 🗺️ Lộ Trình Phát Triển (Development Roadmap)

### Giai Đoạn 1: Client-Side Ordering & Validation (Hiện Tại)
- [x] Hiển thị danh sách 10 sản phẩm từ `data/products.json`.
- [x] Tìm kiếm và Lọc danh mục không tải lại trang (Single Page Feel).
- [x] Quản lý giỏ hàng phía Trình duyệt (sử dụng `localStorage`).
- [x] Kiểm tra tính hợp lệ dữ liệu form đặt hàng (Form Validation cho Họ tên, SĐT 10 số, Địa chỉ, PTTT).
- [x] Giả lập quy trình gửi đơn hàng và hiển thị hóa đơn thành công.

### Giai Đoạn 2: Xây Dựng Backend & Cơ Sở Dữ Liệu (Backend Integration)
- **Kiến trúc đề xuất**: Node.js (Express.js / NestJS) hoặc Python (FastAPI).
- **Cơ sở dữ liệu**: PostgreSQL hoặc MongoDB.
- **Tính năng chính**:
  1. **API Quản lý Sản phẩm**: Quản lý tồn kho real-time (`stock`), cập nhật giá bán, chương trình khuyến mãi.
  2. **API Đơn hàng (Order Management API)**:
     - Endpoint `POST /api/v1/orders`: Tiếp nhận đơn hàng, sinh mã đơn tự động (`TN-YYYYMMDD-XXXX`).
     - Endpoint `GET /api/v1/orders/:id`: Tra cứu trạng thái đơn hàng.
  3. **Xác thực Người dùng (Authentication & Authorization)**:
     - Đăng nhập / Đăng ký qua OTP SMS / Zalo / Google / Email.
     - Phân quyền Người mua (Customer) và Quản trị viên (Admin/Nông hộ).

### Giai Đoạn 3: Tích Hợp Thanh Toán & Đơn Vị Vận Chuyển
- **Cổng thanh toán điện tử**:
  - Tích hợp Chuyển khoản ngân hàng qua VietQR (tạo mã QR động chứa exact tiền và nội dung chuyển khoản).
  - Tích hợp ví điện tử MoMo, ZaloPay, VNPay.
  - Hỗ trợ COD (Thanh toán khi nhận hàng) với tính năng xác minh OTP SĐT.
- **Đối tác vận chuyển**:
  - Kết nối API Giao Hàng Nhanh (GHN), Giao Hàng Tiết Kiệm (GHTK), Viettel Post.
  - Tự động tính phí ship theo trọng lượng nông sản (ví dụ: bơ, cà phê, sâm Ngọc Linh) và khoảng cách địa lý từ Tây Nguyên tới các tỉnh thành.

### Giai Đoạn 4: Trang Quản Trị (Admin Dashboard) & Quản Lý Chuỗi Cung Ứng Nông Nông Nghiệp
- Thống kê doanh thu theo từng vùng nguồn gốc (Đắk Lắk, Gia Lai, Kon Tum, Lâm Đồng, Đắk Nông).
- Quản lý kho hàng nông sản theo mùa vụ (ví dụ: mùa bơ 034, mùa thu hoạch cà phê).
- Theo dõi đơn hàng theo thời gian thực từ khâu thu hái -> đóng gói -> vận chuyển.

---

## 🛠️ Thiết Kế Mô Hình Dữ Liệu Đơn Hàng (Order Schema Model)

```json
{
  "orderId": "TN-20260930-8891",
  "customer": {
    "fullName": "Nguyễn Văn A",
    "phone": "0912345678",
    "email": "nguyenvana@gmail.com",
    "shippingAddress": "123 Đường Lê Duẩn, Thành phố Buôn Ma Thuột, Đắk Lắk"
  },
  "items": [
    {
      "productId": "sp01",
      "name": "Cà Phê Buôn Ma Thuột Nguyên Chất",
      "unitPrice": 180000,
      "quantity": 2,
      "subtotal": 360000
    },
    {
      "productId": "sp03",
      "name": "Sâm Ngọc Linh Kon Tum Thượng Hạng",
      "unitPrice": 3500000,
      "quantity": 1,
      "subtotal": 3500000
    }
  ],
  "summary": {
    "subtotal": 3860000,
    "shippingFee": 30000,
    "discount": 0,
    "totalAmount": 3890000
  },
  "paymentMethod": "COD",
  "orderStatus": "PENDING",
  "createdAt": "2026-09-30T14:15:00Z"
}
```

---

## 💡 Giải Pháp Nâng Cao Trải Nghiệm Khách Hàng (UX/UI Enhancements)

1. **Gợi ý sản phẩm liên quan**: Đưa ra gợi ý theo vùng nguồn gốc (Ví dụ: Khách mua Cà phê Đắk Lắk -> gợi ý Thịt bò một nắng Krông Pa Gia Lai).
2. **Thông báo SMS/Zalo ZNS**: Tự động gửi tin nhắn xác nhận đơn và link tracking hành trình giao hàng.
3. **Đánh giá & Trải nghiệm Nông sản**: Cho phép người tiêu dùng để lại nhận xét, hình ảnh thực tế và đánh giá sao cho từng đặc sản.
