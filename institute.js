// Плавная прокрутка для навигации по странице
document.addEventListener('DOMContentLoaded', function() {
    const pageNavLinks = document.querySelectorAll('.page-nav-link');
    
    pageNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const navHeight = document.querySelector('.main-menu').offsetHeight + 
                                 document.querySelector('.page-nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

