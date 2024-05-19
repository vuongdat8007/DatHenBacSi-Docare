# Docare - Hệ Thống Đặt Hẹn Bác Sĩ

Docare là một nền tảng trực quan và thân thiện với người dùng, được thiết kế để đơn giản hóa quá trình đặt hẹn với các bác sĩ. Ứng dụng này kết nối bệnh nhân với các chuyên gia y tế, cho phép lên lịch hiệu quả, quản lý khả năng tiếp nhận bệnh nhân của bác sĩ, và đặt hẹn một cách thuận tiện.

## Tính Năng

- **Bảng Điều Khiển Bác Sĩ**: Bác sĩ có thể quản lý khả năng tiếp nhận bệnh nhân của mình, thiết lập các ngày cụ thể và khung giờ họ có sẵn cho tư vấn.
- **Giao Diện Bệnh Nhân**: Bệnh nhân có thể xem hồ sơ của bác sĩ, bao gồm chuyên môn và các khung giờ có sẵn, và đặt hẹn một cách tiện lợi.
- **Quản Lý Hẹn**: Người dùng có thể xem, lên lịch, và hủy hẹn. Hệ thống cũng hỗ trợ thông báo và nhắc nhở cho các cuộc hẹn sắp tới.
- **Xác Thực An Toàn**: Cả bác sĩ và bệnh nhân đều có quyền truy cập an toàn vào bảng điều khiển của mình với xác thực người dùng và bảo vệ dữ liệu.

## Công Nghệ Đã Sử Dụng

- **Frontend**: React.js, HTML, CSS
- **Backend**: Node.js, Express.js
- **Cơ Sở Dữ Liệu**: MongoDB
- **Công Cụ Khác**: Mongoose, JWT cho xác thực, Axios cho các yêu cầu API

## Cài Đặt

Để chạy ứng dụng tại máy cục bộ:

1. **Sao Chép Repository:**

    ```sh
    git clone https://github.com/vuongdat8007/DatHenBacSi-Docare.git
    cd DatHenBacSi-Docare
    ```

2. **Cài Đặt Các Phụ Thuộc:**

    Phía backend:
    
    ```sh
    cd backend
    npm install
    ```

    Phía frontend:
    
    ```sh
    cd frontend
    npm install
    ```

3. **Thiết Lập Biến Môi Trường:**

    Tạo một file `.env` trong thư mục `backend` và thiết lập các biến môi trường cần thiết (ví dụ, URL cơ sở dữ liệu, khóa bí mật cho JWT).

4. **Chạy Ứng Dụng:**

    Backend:

    ```sh
    cd backend
    npm run start-dev
    ```

    Frontend:

    ```sh
    cd frontend
    npm run dev
    ```

## Sử Dụng

Sau khi khởi động ứng dụng, truy cập [http://localhost:5173](http://localhost:5173) (hoặc cổng được cấu hình) trong trình duyệt để sử dụng nền tảng Docare.

- Bác Sĩ có thể đăng nhập/đăng ký để quản lý khả năng tiếp nhận bệnh nhân của mình.
- Bệnh Nhân có thể đăng ký, đăng nhập và tìm kiếm thông tin bác sĩ, kiểm tra các khung giờ có sẵn, và đặt hẹn, trả tiền hẹn khám bệnh.
- Admin ([http://localhost:5173/admin](http://localhost:5173/admin)) quản trị trang web có thể thêm/xóa/sửa bệnh nhân, bác sĩ, quản lý lịch hẹn khám bệnh, quản lý review.
-- Default admin:
---
    ```sh
    login: admin@docare.site 
    password: 123
    ```
## Đóng Góp

Chào mừng đóng góp cho dự án Docare!

1. Fork Dự Án
2. Tạo Branch Tính Năng của Bạn (`git checkout -b feature/AmazingFeature`)
3. Commit Thay Đổi của Bạn (`git commit -m 'Add some AmazingFeature'`)
4. Push Branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## Bản Quyền

Phân phối theo Giấy Phép MIT. Xem LICENSE để biết thêm thông tin.

## Liên Hệ

Vương Quốc Đạt – vuongdat@gmail.com

Liên kết Dự Án: [https://github.com/vuongdat8007/DatHenBacSi-Docare](https://github.com/vuongdat8007/DatHenBacSi-Docare)
