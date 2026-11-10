# Định hướng triển khai

- Database: dự kiến dùng PostgreSQL trên Neon.
- Đóng gói và triển khai: dự kiến dùng Docker và CI/CD.
- Nền tảng hosting: đang cân nhắc AWS hoặc Vercel, chưa chốt cách triển khai cho từng ứng dụng web và CMS.

## Cấu trúc hiện tại

- `apps/web/Dockerfile` và `apps/cms/Dockerfile`: vị trí dành cho cấu hình build image; hiện còn rỗng.
- `docker-compose.yml`, `docker-compose.dev.yml`, `docker-compose.prod.yml`: hiện còn rỗng.
- Chưa có workflow CI/CD.
- CMS hiện mặc định dùng SQLite và có cấu hình PostgreSQL; chưa chuyển sang Neon.

Thư mục `infra/` đã được bỏ vì chỉ chứa các file khung rỗng, chưa được sử dụng. Khi chốt nền tảng hosting, bổ sung cấu hình triển khai tương ứng và cập nhật tài liệu này.
