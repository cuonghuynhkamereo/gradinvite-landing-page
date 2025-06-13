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
        
        // Only validate the form, don't submit it
        form.addEventListener('invalid', function(e) {
            e.preventDefault();
            
            // Focus on first invalid field
            const invalidFields = form.querySelectorAll('input:invalid, select:invalid');
            if (invalidFields.length > 0) {
                invalidFields[0].focus();

                // Display error message
                const errorMsg = document.createElement('div');
                errorMsg.className = 'form-error-message';
                errorMsg.innerHTML = '<i class="fas fa-exclamation-circle"></i> Vui lòng điền đầy đủ thông tin bắt buộc';

                // Remove old error messages
                const oldError = form.querySelector('.form-error-message');
                if (oldError) {
                    oldError.remove();
                }

                // Add new error message
                form.insertBefore(errorMsg, form.firstChild);

                // Auto-hide message after 5 seconds
                setTimeout(() => {
                    errorMsg.classList.add('fade-out');
                    setTimeout(() => errorMsg.remove(), 500);
                }, 5000);
            }
        }, true);

        // Highlight input on focus
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