document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('requestForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

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