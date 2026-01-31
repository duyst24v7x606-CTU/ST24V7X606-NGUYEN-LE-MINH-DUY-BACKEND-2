const express = require("express");
const cors = require("cors");
const contactsRouter = require("./app/routes/contact.route");
const ApiError = require("./app/api-error");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Welcome to contact book application." });
});
app.use("/api/contacts", contactsRouter);
// Middleware xử lý lỗi 404 (Khi không tìm thấy route)
app.use((req, res, next) => {
    // Code ở đây sẽ chạy khi không có route được định nghĩa nào khớp với yêu cầu
    return next(new ApiError(404, "Resource not found"));
});

// Middleware xử lý lỗi tập trung (Đặt ở cuối cùng)
app.use((err, req, res, next) => {
    // Trong các đoạn code xử lý ở các route, gọi next(error) sẽ chuyển về đây
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});
module.exports = app;