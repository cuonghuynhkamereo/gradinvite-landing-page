document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const callback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(callback, options);

    animatedElements.forEach(element => {
        observer.observe(element);
    });
});

// Hiệu ứng hover cho pricing cards
document.addEventListener('DOMContentLoaded', function() {
  const pricingCards = document.querySelectorAll('.pricing-card');
  
  pricingCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      // Làm cho card khác mờ đi
      pricingCards.forEach(otherCard => {
        if (otherCard !== card) {
          otherCard.style.opacity = '0.7';
          otherCard.style.transform = 'scale(0.98)';
        }
      });
    });
    
    card.addEventListener('mouseleave', function() {
      // Khôi phục trạng thái bình thường
      pricingCards.forEach(otherCard => {
        otherCard.style.opacity = '1';
        if (otherCard.classList.contains('popular')) {
          otherCard.style.transform = 'scale(1.05)';
        } else {
          otherCard.style.transform = 'scale(1)';
        }
      });
    });
    
    // Thêm animation liên tục cho nút CTA của gói Gold
    if (card.classList.contains('popular')) {
      const ctaButton = card.querySelector('.btn');
      if (ctaButton) {
        // Thêm class animation liên tục thay vì sử dụng setInterval
        ctaButton.classList.add('continuous-pulse');
      }
    }
  });
});

// Thêm animation "pulse" cho nút CTA và animation liên tục
document.head.insertAdjacentHTML('beforeend', `
<style>
@keyframes ctaPulse {
  0% {
    box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(99, 102, 241, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(99, 102, 241, 0);
  }
}

.pulse {
  animation: ctaPulse 1.5s ease-out;
}

/* Thêm class mới cho animation liên tục */
.continuous-pulse {
  animation: ctaPulse 1.5s infinite ease-out;
}
</style>
`);