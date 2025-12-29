// Прокрутка к следующему экрану
function scrollToNext() {
    const nextScreen = document.getElementById('screen-2');
    if (nextScreen) {
        nextScreen.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function scrollToVideo() {
    const videoScreen = document.getElementById('screen-3');
    if (videoScreen) {
        videoScreen.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', function() {
    // Check if there's a hash in URL on page load
    if (window.location.hash) {
        setTimeout(() => {
            const target = document.querySelector(window.location.hash);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }, 100);
    }
    
    // Handle clicks on menu links with anchors
    document.querySelectorAll('a[href*="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.includes('#')) {
                const hashPart = href.split('#')[1];
                const targetElement = document.getElementById(hashPart);
                
                // Only handle if target is on current page
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

// Анимация печатной машинки
function typeWriter(element, text, speed = 50, callback) {
    element.innerHTML = '';
    element.classList.add('typewriter');
    let i = 0;
    let isTag = false;
    let currentTag = '';
    let visibleText = '';
    
    function type() {
        if (i < text.length) {
            if (text[i] === '<') {
                isTag = true;
                currentTag = '<';
            } else if (text[i] === '>') {
                isTag = false;
                currentTag += '>';
                visibleText += currentTag;
                currentTag = '';
            } else if (isTag) {
                currentTag += text[i];
            } else {
                visibleText += text[i];
                element.innerHTML = visibleText + '|';
            }
            i++;
            setTimeout(type, speed);
        } else {
            element.classList.add('complete');
            element.innerHTML = visibleText;
            if (callback) callback();
        }
    }
    
    type();
}

// Обработчик события после загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const arrowDown = document.querySelector('.arrow-down');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', scrollToNext);
    }
    
    if (arrowDown) {
        arrowDown.addEventListener('click', scrollToNext);
    }
    
    // Анимация текста на втором экране
    const text1 = document.getElementById('text1');
    const text2 = document.getElementById('text2');
    
    if (text1 && text2) {
        // Используем Intersection Observer для запуска анимации при появлении экрана
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.target.id === 'screen-2') {
                    const fullText1 = text1.getAttribute('data-full-text');
                    const fullText2 = text2.getAttribute('data-full-text');
                    
                    // Запускаем анимацию первого текста
                    typeWriter(text1, fullText1, 50, () => {
                        // После завершения первого текста запускаем второй
                        setTimeout(() => {
                            typeWriter(text2, fullText2, 50);
                        }, 500);
                    });
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        const screen2 = document.getElementById('screen-2');
        if (screen2) {
            observer.observe(screen2);
        }
    }
});
