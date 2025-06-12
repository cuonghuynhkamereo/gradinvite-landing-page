document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('requestForm');
    
    if (form) {
        // Add validation styling for required fields
        const requiredFields = document.querySelectorAll('input[required], select[required]');
        requiredFields.forEach(field => {
            const label = field.previousElementSibling;
            if (label && label.tagName === 'LABEL' && !label.querySelector('.required-mark')) {
                const requiredMark = document.createElement('span');
                requiredMark.className = 'required-mark';
                requiredMark.textContent = '*';
                label.appendChild(requiredMark);
            }
        });
        
        // Handle form submission
        form.addEventListener('submit', function(e) {
            // Kiểm tra các field bắt buộc
            const invalidFields = form.querySelectorAll('input:invalid, select:invalid');
            
            if (invalidFields.length > 0) {
                e.preventDefault();
                // Focus vào field lỗi đầu tiên
                invalidFields[0].focus();

                // Hiển thị thông báo
                const errorMsg = document.createElement('div');
                errorMsg.className = 'form-error-message';
                errorMsg.innerHTML = '<i class="fas fa-exclamation-circle"></i> Vui lòng điền đầy đủ thông tin bắt buộc';

                // Xóa thông báo lỗi cũ nếu có
                const oldError = form.querySelector('.form-error-message');
                if (oldError) {
                    oldError.remove();
                }

                // Thêm thông báo lỗi mới
                form.insertBefore(errorMsg, form.firstChild);

                // Tự động ẩn thông báo sau 5 giây
                setTimeout(() => {
                    errorMsg.classList.add('fade-out');
                    setTimeout(() => errorMsg.remove(), 500);
                }, 5000);
            }
        });

        // Highlight input khi focus
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
            });
        });
    }
});