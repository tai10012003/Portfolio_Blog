# Giao diện sáng / tối

Các biến màu dùng chung nằm trong `apps/web/src/app/theme.css`:

- `:root`: bảng màu sáng.
- `:root[data-theme="dark"]`: giá trị thay thế cho bảng màu tối.
- Nền/chữ: `--background`, `--foreground`, `--muted`, `--text-subtle`.
- Card/header: `--surface`, `--surface-soft`, `--surface-glass`, `--header-background`.
- Viền/điểm nhấn: `--line`, `--border-hover`, `--accent`, `--accent-soft`, `--on-accent`.
- Các nhóm `--art-*`, `--contact-*`, `--footer-*` dành cho minh họa, liên hệ và footer.

Trang mới nên sử dụng các biến này thay vì gán trực tiếp mã màu. Bố cục, font và spacing giữ nguyên giữa hai theme.

Theme được áp dụng trên `document.documentElement.dataset.theme`. Script trong layout chọn theme trước lần hiển thị đầu tiên: ưu tiên lựa chọn đã lưu trong `localStorage` với key `portfolio-blog.theme`, sau đó dùng thiết lập thiết bị. Khi chưa có lựa chọn riêng, theme theo thay đổi của thiết bị; các tab cũng đồng bộ lựa chọn với nhau. Nếu storage bị chặn, nút chuyển theme vẫn hoạt động trong phiên hiện tại.

`ThemeToggle` đứng trước nút ngôn ngữ. Nhãn truy cập hỗ trợ Việt/Anh; icon mặt trăng/mặt trời cập nhật theo theme. `suppressHydrationWarning` trên `<html>` dành cho thuộc tính theme được script thay trước hydration.

Kiểm tra chức năng: chạy `node --test tests/theme.test.mjs` trong `apps/web`.
