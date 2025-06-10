// Function to handle form submission
exports.processForm = (req, res) => {
  const formData = req.body;
  console.log('Form submission received:', formData);
  
  // Xử lý dữ liệu form (có thể lưu vào database hoặc gửi email)
  
  // Phản hồi cho người dùng
  res.json({
    success: true,
    message: 'Form đã được gửi thành công. Chúng tôi sẽ liên hệ với bạn sớm!'
  });
};