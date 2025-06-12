const nodemailer = require('nodemailer');

// Configure email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'cuong.huynh@kamereo.vn', // Replace with your Gmail account
    pass: 'lsev ykiz mrnd apiy' // Use app password for Gmail (not your regular password)
  }
});

// Function to handle form submission
exports.processForm = (req, res) => {
  const formData = req.body;
  console.log('Form submission received:', formData);
  
  // Create email content
  const emailContent = `
    <h2>Yêu cầu tư vấn mới</h2>
    <p><strong>Họ và tên:</strong> ${formData.fullName}</p>
    <p><strong>Số điện thoại:</strong> ${formData.phone}</p>
    <p><strong>Email:</strong> ${formData.email}</p>
    <p><strong>Trường đại học:</strong> ${formData.university}</p>
    <p><strong>Ngày dự kiến lễ tốt nghiệp:</strong> ${formData.graduationDate}</p>
    <p><strong>Gói dịch vụ quan tâm:</strong> ${formData.package}</p>
    <p><strong>Mẫu thiệp yêu thích:</strong> ${formData.template}</p>
    <p><strong>Ghi chú thêm:</strong> ${formData.notes || 'Không có'}</p>
    <p><em>Gửi từ website vào lúc ${new Date().toLocaleString('vi-VN')}</em></p>
  `;

  // Email options
  const mailOptions = {
    from: 'cuong.huynh@kamereo.vn', // Replace with your Gmail
    to: 'anhcuonghuynhnguyen@gmail.com', // Destination email
    subject: `Yêu cầu tư vấn từ ${formData.fullName}`,
    html: emailContent
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.json({
        success: false,
        message: 'Có lỗi xảy ra khi gửi email. Vui lòng thử lại sau.'
      });
    } else {
      console.log('Email sent:', info.response);
      res.json({
        success: true,
        message: 'Form đã được gửi thành công. Chúng tôi sẽ liên hệ với bạn sớm!'
      });
    }
  });
};