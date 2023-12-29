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
    
    git clone https://github.com/vuongdat8007/Docare
    cd Docare
    Cài Đặt Các Phụ Thuộc:

Phía backend:

    
    Copy code
    cd backend
    npm install


Phía frontend:

    
    Copy code
    cd frontend
    npm install

Thiết Lập Biến Môi Trường:

    Tạo một file .env trong thư mục backend và thiết lập các biến môi trường cần thiết (ví dụ, URL cơ sở dữ liệu, khóa bí mật cho JWT).

Chạy Ứng Dụng:

    Backend:
        
        Copy code
        npm start

    Frontend:
        
        Copy code
        npm start


Sử Dụng
    Sau khi khởi động ứng dụng, truy cập http://localhost:5173 (hoặc cổng được cấu hình) trong trình duyệt để sử dụng nền tảng Docare.

    Bác Sĩ có thể đăng nhập/đăng ký để quản lý khả năng tiếp nhận bệnh nhân của mình.
    Bệnh Nhân có thể tìm kiếm thông tin bác sĩ, kiểm tra các khung giờ có sẵn, và đặt hẹn.

Đóng Góp
    Chào mừng đóng góp cho dự án Docare!

Fork Dự Án
    Tạo Branch Tính Năng của Bạn (git checkout -b feature/AmazingFeature)
    Commit Thay Đổi của Bạn (git commit -m 'Add some AmazingFeature')
    Push Branch (git push origin feature/AmazingFeature)
    Mở Pull Request
    
Bản Quyền
Phân phối theo Giấy Phép MIT. Xem LICENSE để biết thêm thông tin.

Liên Hệ
Vương Quốc Đạt – vuongdat@gmail.com

Liên kết Dự Án: https://github.com/vuongdat8007/Docare

