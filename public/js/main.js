document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navbarMenu = document.querySelector('.navbar-menu');
    const body = document.body;
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navbarMenu.classList.toggle('active');
            body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking a nav link on mobile
        const navLinks = document.querySelectorAll('.navbar-nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navbarMenu.classList.remove('active');
                body.classList.remove('menu-open');
            });
        });
    }
    
    // Template filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to current button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter templates based on package type, with inclusive filtering
            galleryItems.forEach(item => {
                const itemPackage = item.getAttribute('data-package');
                
                if (filterValue === 'all') {
                    // Show all items
                    item.classList.remove('hidden');
                } else if (filterValue === 'platinum') {
                    // Platinum shows all items (Basic, Gold, and Platinum)
                    item.classList.remove('hidden');
                } else if (filterValue === 'gold') {
                    // Gold shows Basic and Gold items
                    if (itemPackage === 'basic' || itemPackage === 'gold') {
                        item.classList.remove('hidden');
                    } else {
                        item.classList.add('hidden');
                    }
                } else if (filterValue === 'basic') {
                    // Basic shows only Basic items
                    if (itemPackage === 'basic') {
                        item.classList.remove('hidden');
                    } else {
                        item.classList.add('hidden');
                    }
                }
            });
        });
    });

    // Xử lý FAQ - loại bỏ event listener lồng nhau 
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const toggle = item.querySelector('.faq-toggle');
        
        if (toggle) {
            toggle.addEventListener('click', () => {
                // Đóng các FAQ khác
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-toggle').textContent = '+';
                    }
                });
                
                // Toggle FAQ hiện tại
                item.classList.toggle('active');
                toggle.textContent = item.classList.contains('active') ? '−' : '+';
            });
        }
    });
    
    // Thêm sự kiện click cho cả câu hỏi (không chỉ nút toggle)
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', (e) => {
                // Không xử lý khi click vào nút toggle (sẽ do sự kiện trên xử lý)
                if (e.target.classList.contains('faq-toggle') || e.target === item.querySelector('.faq-toggle')) {
                    return;
                }
                
                const toggle = item.querySelector('.faq-toggle');
                
                // Đóng các FAQ khác
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-toggle').textContent = '+';
                    }
                });
                
                // Toggle FAQ hiện tại
                item.classList.toggle('active');
                if (toggle) {
                    toggle.textContent = item.classList.contains('active') ? '−' : '+';
                }
            });
        }
    });
    
    // Xử lý cho các nút trong gallery
    const viewButtons = document.querySelectorAll('.view-button');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const packageType = this.closest('.gallery-item').getAttribute('data-package');
                        
            // Scroll to contact form
            document.querySelector('#contact-form').scrollIntoView({ 
                behavior: 'smooth' 
            });
            
            // Chọn template tương ứng trong form
            const packageSelect = document.querySelector('#package');
            if (packageSelect) {
                // Set package based on template type
                if (packageType === 'platinum') {
                    packageSelect.value = 'platinum';
                } else if (packageType === 'gold') {
                    packageSelect.value = 'gold';
                } else {
                    packageSelect.value = 'basic';
                }
            }
        });
    });
    
    // Form submission
    const contactForm = document.getElementById('requestForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Xử lý form submission
            const formData = new FormData(this);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Gửi dữ liệu qua AJAX
            fetch('/submit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formObject)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Cảm ơn bạn đã gửi thông tin! Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.');
                    contactForm.reset();
                } else {
                    alert('Có lỗi xảy ra, vui lòng thử lại sau.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Có lỗi xảy ra, vui lòng thử lại sau.');
            });
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Hiệu ứng hiển thị template khi scroll
document.addEventListener('DOMContentLoaded', function() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  const options = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('fade-in');
        }, entry.target.dataset.delay || 0);
        observer.unobserve(entry.target);
      }
    });
  }, options);
  
  galleryItems.forEach((item, index) => {
    item.classList.add('opacity-0');
    item.dataset.delay = index * 100;
    observer.observe(item);
  });
});

// Thêm hiệu ứng xem trước mẫu template
const viewButtons = document.querySelectorAll('.view-button');

viewButtons.forEach(button => {
  button.addEventListener('mouseenter', function() {
    const templateImg = this.closest('.gallery-item').querySelector('img');
    templateImg.classList.add('preview-zoom');
  });
  
  button.addEventListener('mouseleave', function() {
    const templateImg = this.closest('.gallery-item').querySelector('img');
    templateImg.classList.remove('preview-zoom');
  });
});

// Add smooth scrolling with progress indicators
document.addEventListener('DOMContentLoaded', function() {
  // Create scroll progress indicator
  const body = document.body;
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  body.appendChild(progressBar);
  
  // Update progress bar on scroll
  window.addEventListener('scroll', function() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
    
    // Activate navbar items based on scroll position
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (winScroll >= sectionTop && winScroll < sectionTop + sectionHeight) {
        document.querySelector('.navbar-nav a[href*=' + sectionId + ']')?.classList.add('active');
      } else {
        document.querySelector('.navbar-nav a[href*=' + sectionId + ']')?.classList.remove('active');
      }
    });
  });
});

// Add template preview modal functionality
document.addEventListener('DOMContentLoaded', function() {
  const viewButtons = document.querySelectorAll('.view-button');
  
  // Create modal container
  const modalContainer = document.createElement('div');
  modalContainer.className = 'template-modal-container';
  modalContainer.innerHTML = `
    <div class="template-modal">
      <div class="modal-header">
        <h3 class="modal-title">Template Preview</h3>
        <button class="modal-close">&times;</button>
      </div>
      <div class="modal-body">
        <div class="preview-image-container">
          <img class="preview-image" src="" alt="Template Preview">
        </div>
        <div class="preview-details">
          <h4 class="preview-title"></h4>
          <p class="preview-description"></p>
          <div class="preview-features">
            <div class="feature">
              <i class="fas fa-mobile-alt"></i> Responsive
            </div>
            <div class="feature">
              <i class="fas fa-pen"></i> Customizable
            </div>
            <div class="feature">
              <i class="fas fa-share-alt"></i> Easy Sharing
            </div>
          </div>
          <button class="btn btn-primary choose-template">Tôi chọn mẫu này</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modalContainer);
  
  // Modal interactions
  const modal = document.querySelector('.template-modal-container');
  const closeBtn = document.querySelector('.modal-close');
  const chooseBtn = document.querySelector('.choose-template');
  
  closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
  });
  
  // Open modal when clicking view button
  viewButtons.forEach(button => {
    button.addEventListener('click', function() {
      const item = this.closest('.gallery-item');
      const img = item.querySelector('img');
      const title = item.querySelector('h3').textContent;
      const desc = item.querySelector('p').textContent;
      
      document.querySelector('.preview-image').src = img.src;
      document.querySelector('.preview-title').textContent = title;
      document.querySelector('.preview-description').textContent = desc;
      
      modal.classList.add('active');
      document.body.classList.add('modal-open');
    });
  });
  
  // Choose template action
  chooseBtn.addEventListener('click', () => {
    const title = document.querySelector('.preview-title').textContent;
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
    
    // Scroll to contact form
    document.querySelector('#contact-form').scrollIntoView({
      behavior: 'smooth'
    });
    
    // Add notification that template was selected
    const notification = document.createElement('div');
    notification.className = 'template-selected-notification';
    notification.innerHTML = `<i class="fas fa-check-circle"></i> Đã chọn mẫu: ${title}`;
    
    const contactForm = document.querySelector('.contact-form');
    contactForm.insertBefore(notification, contactForm.firstChild);
    
    // Auto-focus on name field
    document.getElementById('fullName').focus();
    
    // Remove notification after 5 seconds
    setTimeout(() => {
      notification.classList.add('fade-out');
      setTimeout(() => notification.remove(), 500);
    }, 5000);
  });
});

// Add page loading animation
document.addEventListener('DOMContentLoaded', function() {
  // Hide loader when page is fully loaded
  const loader = document.querySelector('.page-loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('loaded');
      setTimeout(() => {
        loader.style.display = 'none';
      }, 500);
    }, 800);
  }
  
  // Lazy load images with fade-in effect
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
  }
});

// Add FAB functionality
document.addEventListener('DOMContentLoaded', function() {
  const fab = document.querySelector('.fab-button');
  const fabOptions = document.querySelector('.fab-options');
  const fabContainer = document.querySelector('.floating-action-button');
  
  if (fab && fabOptions && fabContainer) {
    let hideTimeout;
    
    // Hiện options khi hover vào nút
    fabContainer.addEventListener('mouseenter', function() {
      clearTimeout(hideTimeout);
      fabOptions.classList.add('show');
    });
    
    // Ẩn options sau 2 giây khi rời khỏi cả nút và options
    fabContainer.addEventListener('mouseleave', function() {
      hideTimeout = setTimeout(() => {
        fabOptions.classList.remove('show');
      }, 1000);
    });
    
    // Click event cho thiết bị di động
    fab.addEventListener('click', function() {
      clearTimeout(hideTimeout);
      fabOptions.classList.toggle('show');
      
      // Nếu đã hiển thị, thiết lập timeout để ẩn sau 2 giây
      if (fabOptions.classList.contains('show')) {
        hideTimeout = setTimeout(() => {
          fabOptions.classList.remove('show');
        }, 1000);
      }
    });
    
    // Xử lý riêng cho các tùy chọn
    fabOptions.addEventListener('mouseenter', function() {
      clearTimeout(hideTimeout);
    });
    
    fabOptions.addEventListener('mouseleave', function() {
      hideTimeout = setTimeout(() => {
        fabOptions.classList.remove('show');
      }, 1000);
    });
    
    // Xử lý cho thiết bị di động
    fabOptions.addEventListener('touchstart', function(e) {
      clearTimeout(hideTimeout);
      e.stopPropagation();
    });
  }
});

// Add testimonial carousel
document.addEventListener('DOMContentLoaded', function() {
  const testimonials = document.querySelector('.testimonials-grid');
  
  if (testimonials) {
    // Create arrow controls
    const prevBtn = document.createElement('button');
    prevBtn.className = 'testimonial-control prev';
    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
    
    const nextBtn = document.createElement('button');
    nextBtn.className = 'testimonial-control next';
    nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
    
    testimonials.parentElement.appendChild(prevBtn);
    testimonials.parentElement.appendChild(nextBtn);
    
    // Add pagination dots
    const paginationContainer = document.createElement('div');
    paginationContainer.className = 'testimonial-pagination';
    
    const testimonialCards = testimonials.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.className = 'pagination-dot';
      if (index === 0) dot.classList.add('active');
      paginationContainer.appendChild(dot);
    });
    
    testimonials.parentElement.appendChild(paginationContainer);
    
    // Handle navigation
    let currentSlide = 0;
    const dots = document.querySelectorAll('.pagination-dot');
    
    function showSlide(index) {
      // Update active slide
      testimonials.style.transform = `translateX(-${index * 100}%)`;
      
      // Update active dot
      dots.forEach(dot => dot.classList.remove('active'));
      dots[index].classList.add('active');
      
      // Enable/disable controls as needed
      prevBtn.disabled = index === 0;
      nextBtn.disabled = index === testimonialCards.length - 1;
    }
    
    prevBtn.addEventListener('click', () => {
      if (currentSlide > 0) {
        currentSlide--;
        showSlide(currentSlide);
      }
    });
    
    nextBtn.addEventListener('click', () => {
      if (currentSlide < testimonialCards.length - 1) {
        currentSlide++;
        showSlide(currentSlide);
      }
    });
    
    // Allow clicking on dots
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
      });
    });
    
    // Add swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    testimonials.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    
    testimonials.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, {passive: true});
    
    function handleSwipe() {
      if (touchEndX < touchStartX - 50) {
        // Swipe left - next slide
        if (currentSlide < testimonialCards.length - 1) {
          currentSlide++;
          showSlide(currentSlide);
        }
      } else if (touchEndX > touchStartX + 50) {
        // Swipe right - previous slide
        if (currentSlide > 0) {
          currentSlide--;
          showSlide(currentSlide);
        }
      }
    }
    
    // Init
    showSlide(0);
  }
});

document.addEventListener('DOMContentLoaded', function() {
    // Existing code remains unchanged...
    
    // Add this new code to handle package selection buttons
    const packageButtons = document.querySelectorAll('.pricing-card .btn');
    
    packageButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get package type from parent pricing-card
            const pricingCard = this.closest('.pricing-card');
            const packageName = pricingCard.querySelector('.pricing-name').textContent.trim().toLowerCase();
            
            // Scroll to contact form
            document.querySelector('#contact-form').scrollIntoView({ 
                behavior: 'smooth' 
            });
            
            // Set package value in dropdown
            const packageSelect = document.querySelector('#package');
            if (packageSelect) {
                if (packageName.includes('platinum')) {
                    packageSelect.value = 'platinum';
                } else if (packageName.includes('gold')) {
                    packageSelect.value = 'gold';
                } else if (packageName.includes('basic')) {
                    packageSelect.value = 'basic';
                }
            }
            
            // Optional: Add notification about selected package
            const notification = document.createElement('div');
            notification.className = 'template-selected-notification';
            notification.innerHTML = `<i class="fas fa-check-circle"></i> Đã chọn: ${pricingCard.querySelector('.pricing-name').textContent}`;
            
            const contactForm = document.querySelector('.contact-form');
            contactForm.insertBefore(notification, contactForm.firstChild);
            
            // Auto-focus on name field
            document.getElementById('fullName').focus();
            
            // Remove notification after 5 seconds
            setTimeout(() => {
                notification.classList.add('fade-out');
                setTimeout(() => notification.remove(), 500);
            }, 5000);
        });
    });
    
    // Rest of your existing code...
});