# Website Giới Thiệu & Quảng Bá Đặc Sản Tây Nguyên

Trang web quảng bá văn hóa ẩm thực và đặc sản tiêu biểu của 5 tỉnh Tây Nguyên (Đắk Lắk, Gia Lai, Kon Tum, Lâm Đồng, Đắk Nông).

## 🌟 Cấu trúc Dự án (Project Structure)

```text
tay-nguyen-specialties/
├── index.html          # Trang chủ & giao diện chính
├── README.md           # Hướng dẫn & Giới thiệu dự án
├── package.json        # Thông tin cấu hình dự án
├── assets/
│   ├── images/         # Hình ảnh minh họa sản phẩm & banner
│   ├── icons/          # Biểu tượng giao diện
│   └── fonts/          # Chông chữ tùy chỉnh
├── css/
│   └── style.css       # File style tổng thể (Responsive, Theme Tây Nguyên)
├── js/
│   └── main.js         # Xử lý logic Vanilla JS (Render, Search, Filter, Cart, Form Validation)
├── data/
│   └── products.json   # Tệp dữ liệu 10 sản phẩm đặc sản Tây Nguyên
└── docs/
    └── project-plan.md # Tài liệu định hướng phát triển chức năng đặt hàng & e-commerce
```

## 🍃 Các tính năng chính

1. **Danh sách Đặc sản Tây Nguyên**: Hiển thị 10 đặc sản chuẩn nguồn gốc (Cà phê Buôn Ma Thuột, Thịt bò một nắng Krông Pa, Sâm Ngọc Linh Kon Tum, Rượu cần Tây Nguyên, Mật ong rừng Gia Lai, Hồ tiêu Chư Sê, Macca Lâm Đồng, Bơ 034 Lâm Đồng, Măng khô Rừng Tây Nguyên, Cơm lam gà nướng đóng gói).
2. **Tìm kiếm sản phẩm real-time**: Tìm nhanh theo tên sản phẩm mà không cần tải lại trang.
3. **Lọc theo Danh mục**: Phân loại dễ dàng (Cà phê & Đồ uống, Nông sản & Hạt, Thực phẩm & Chế biến, Dược liệu quý).
4. **Giỏ hàng tương tác (Cart)**: Thêm/Xóa sản phẩm, điều chỉnh số lượng, lưu trữ giỏ hàng trong `localStorage`.
5. **Form Đặt hàng & Validate dữ liệu**: Kiểm tra tính hợp lệ của số điện thoại VN, họ tên, địa chỉ, phương thức thanh toán trước khi gửi đơn hàng.
6. **Thông tin Nguồn gốc 5 tỉnh Tây Nguyên**: Bản đồ thông tin văn hóa - nông sản đặc trưng vùng miền.
7. **Trang Liên hệ**: Form gửi thông tin góp ý và thông tin liên lạc direct.
8. **Kế hoạch Định hướng Phát triển**: Chi tiết roadmap nâng cấp hệ thống bán hàng đa kênh trong `docs/project-plan.md`.

## 🚀 Hướng dẫn khởi chạy

Chỉ cần mở tệp `index.html` trên bất kỳ trình duyệt web hiện đại nào (Chrome, Edge, Firefox, Safari) hoặc chạy bằng Live Server trong VS Code / AGY:

```bash
npx serve .
```
