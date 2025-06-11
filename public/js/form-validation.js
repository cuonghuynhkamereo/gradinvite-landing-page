document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('requestForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    // Thêm dấu * cho tất cả các trường bắt buộc có thể bị누락
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

    if (form) {
        form.addEventListener('submit', function(e) {
            let isValid = true;

            // Clear previous error messages
            clearErrors();

            // Validate name
            if (!validateName(nameInput.value)) {
                showError(nameInput, 'Please enter a valid name.');
                isValid = false;
            }

            // Validate email
            if (emailInput.value !== '' && !validateEmail(emailInput.value)) {
                showError(emailInput, 'Please enter a valid email address.');
                isValid = false;
            }

            // Validate message
            if (!validateMessage(messageInput.value)) {
                showError(messageInput, 'Message cannot be empty.');
                isValid = false;
            }

            // Kiểm tra số điện thoại
            const phoneInput = document.getElementById('phone');
            const phonePattern = /^(0|\+84)[0-9]{9}$/;

            if (!phonePattern.test(phoneInput.value)) {
                e.preventDefault();
                alert('Vui lòng nhập số điện thoại hợp lệ (10 số, bắt đầu bằng 0 hoặc +84)');
                phoneInput.focus();
                return false;
            }

            // Hiển thị thông báo lỗi rõ ràng khi submit form
            const invalidFields = form.querySelectorAll('input:invalid, select:invalid');

            if (invalidFields.length > 0) {
                e.preventDefault();
                // Focus vào field lỗi đầu tiên
                invalidFields[0].focus();

                // Hiển thị thông báo
                const errorMsg = document.createElement('div');
                errorMsg.className = 'form-error-message';
                errorMsg.textContent = 'Vui lòng điền đầy đủ thông tin bắt buộc';

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

            // If the form is valid, submit it
            if (isValid) {
                form.submit();
            } else {
                e.preventDefault();
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

    function validateName(name) {
        return name.trim() !== '';
    }

    function validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    function validateMessage(message) {
        return message.trim() !== '';
    }

    function showError(input, message) {
        const error = document.createElement('div');
        error.className = 'error-message';
        error.textContent = message;
        input.parentElement.appendChild(error);
    }

    function clearErrors() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(function(error) {
            error.remove();
        });
    }
});