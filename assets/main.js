// ==========================================================================
// 아원팜 종합 경영분석 리포트 - Main JavaScript
// ==========================================================================

// ==========================================================================
// Smooth Scrolling for Navigation Links
// ==========================================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // 네비게이션 높이 고려
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================================================
// Active Navigation Highlighting
// ==========================================================================

function highlightActiveSection() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 150) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightActiveSection);

// ==========================================================================
// Navbar Scroll Effect
// ==========================================================================

let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 3px rgba(0,0,0,0.12)';
    }
    
    lastScroll = currentScroll;
});

// ==========================================================================
// Progress Bar Animation on Scroll
// ==========================================================================

function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    progressBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top < windowHeight && rect.bottom > 0) {
            const targetWidth = bar.style.width;
            bar.style.transition = 'width 1s ease-out';
            
            // 이미 애니메이션이 실행되지 않은 경우에만
            if (!bar.classList.contains('animated')) {
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = targetWidth;
                }, 100);
                bar.classList.add('animated');
            }
        }
    });
}

window.addEventListener('scroll', animateProgressBars);
window.addEventListener('load', animateProgressBars);

// ==========================================================================
// Score Circle Animation
// ==========================================================================

function animateScoreCircle() {
    const scoreCircle = document.querySelector('.score-circle svg circle:last-child');
    if (!scoreCircle) return;
    
    const rect = scoreCircle.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    if (rect.top < windowHeight && rect.bottom > 0) {
        if (!scoreCircle.classList.contains('animated')) {
            const targetOffset = 113; // 79.5% of 565
            scoreCircle.style.strokeDashoffset = '565';
            setTimeout(() => {
                scoreCircle.style.transition = 'stroke-dashoffset 2s ease-out';
                scoreCircle.style.strokeDashoffset = targetOffset;
            }, 500);
            scoreCircle.classList.add('animated');
        }
    }
}

window.addEventListener('scroll', animateScoreCircle);
window.addEventListener('load', animateScoreCircle);

// ==========================================================================
// Checklist Functionality
// ==========================================================================

const checkboxes = document.querySelectorAll('.checklist input[type="checkbox"]');

checkboxes.forEach(checkbox => {
    // 로컬 스토리지에서 체크 상태 복원
    const checklistId = checkbox.parentElement.textContent.trim();
    const isChecked = localStorage.getItem(checklistId) === 'true';
    checkbox.checked = isChecked;
    
    // 체크박스 상태 변경 이벤트
    checkbox.addEventListener('change', function() {
        const checklistId = this.parentElement.textContent.trim();
        localStorage.setItem(checklistId, this.checked);
        
        // 체크 시 시각적 피드백
        if (this.checked) {
            this.parentElement.style.textDecoration = 'line-through';
            this.parentElement.style.opacity = '0.6';
        } else {
            this.parentElement.style.textDecoration = 'none';
            this.parentElement.style.opacity = '1';
        }
    });
    
    // 초기 스타일 적용
    if (checkbox.checked) {
        checkbox.parentElement.style.textDecoration = 'line-through';
        checkbox.parentElement.style.opacity = '0.6';
    }
});

// ==========================================================================
// Number Counter Animation
// ==========================================================================

function animateNumber(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16); // 60fps
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current).toLocaleString('ko-KR');
    }, 16);
}

function animateMetricCards() {
    const metricValues = document.querySelectorAll('.metric-value');
    
    metricValues.forEach(value => {
        const rect = value.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (rect.top < windowHeight && rect.bottom > 0) {
            if (!value.classList.contains('animated')) {
                const text = value.textContent;
                const number = parseInt(text.replace(/[^0-9]/g, ''));
                
                if (!isNaN(number) && number > 0) {
                    value.textContent = '0';
                    setTimeout(() => {
                        animateNumber(value, 0, number, 2000);
                        
                        // 숫자 외의 텍스트 추가
                        if (text.includes('원')) {
                            setTimeout(() => {
                                value.textContent = value.textContent + '원';
                            }, 2000);
                        } else if (text.includes('%')) {
                            setTimeout(() => {
                                value.textContent = value.textContent + '%';
                            }, 2000);
                        } else if (text.includes('점')) {
                            setTimeout(() => {
                                value.textContent = value.textContent + '점';
                            }, 2000);
                        }
                    }, 300);
                }
                value.classList.add('animated');
            }
        }
    });
}

window.addEventListener('scroll', animateMetricCards);
window.addEventListener('load', animateMetricCards);

// ==========================================================================
// Intersection Observer for Fade-in Animations
// ==========================================================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 애니메이션 대상 요소들
const animatedElements = document.querySelectorAll('.metric-card, .summary-card, .lifecycle-stage, .risk-item, .timeline-item, .chart-container');

animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(element);
});

// ==========================================================================
// Mobile Menu Toggle (반응형)
// ==========================================================================

function createMobileMenu() {
    const navbar = document.querySelector('.navbar .container');
    const navMenu = document.querySelector('.nav-menu');
    
    // 모바일 메뉴 버튼 생성
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    menuToggle.style.cssText = `
        display: none;
        background: none;
        border: none;
        font-size: 1.5rem;
        color: var(--primary-color);
        cursor: pointer;
        padding: 0.5rem;
    `;
    
    // 768px 이하에서 표시
    if (window.innerWidth <= 768) {
        menuToggle.style.display = 'block';
        navMenu.style.display = 'none';
    }
    
    navbar.insertBefore(menuToggle, navMenu);
    
    // 메뉴 토글 기능
    menuToggle.addEventListener('click', () => {
        if (navMenu.style.display === 'none') {
            navMenu.style.display = 'flex';
            navMenu.style.flexDirection = 'column';
            navMenu.style.position = 'absolute';
            navMenu.style.top = '60px';
            navMenu.style.right = '0';
            navMenu.style.background = 'white';
            navMenu.style.padding = '1rem';
            navMenu.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
            navMenu.style.borderRadius = '8px';
            menuToggle.innerHTML = '<i class="fas fa-times"></i>';
        } else {
            navMenu.style.display = 'none';
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
    
    // 윈도우 리사이즈 시 처리
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navMenu.style.display = 'flex';
            navMenu.style.flexDirection = 'row';
            navMenu.style.position = 'static';
            navMenu.style.padding = '0';
            navMenu.style.boxShadow = 'none';
            menuToggle.style.display = 'none';
        } else {
            menuToggle.style.display = 'block';
            navMenu.style.display = 'none';
        }
    });
}

// 페이지 로드 시 모바일 메뉴 초기화
window.addEventListener('load', createMobileMenu);

// ==========================================================================
// Print Function
// ==========================================================================

document.querySelector('.print-btn')?.addEventListener('click', () => {
    // 프린트 전 차트 크기 조정
    const charts = document.querySelectorAll('canvas');
    charts.forEach(chart => {
        chart.style.maxHeight = 'none';
    });
    
    window.print();
    
    // 프린트 후 차트 크기 복원
    setTimeout(() => {
        charts.forEach(chart => {
            chart.style.maxHeight = '400px';
        });
    }, 100);
});

// ==========================================================================
// Tooltip Functionality
// ==========================================================================

const badges = document.querySelectorAll('.badge');

badges.forEach(badge => {
    badge.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.transition = 'transform 0.2s ease';
    });
    
    badge.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// ==========================================================================
// Loading Animation
// ==========================================================================

window.addEventListener('load', () => {
    // 페이지 로드 완료 후 스무스한 페이드인
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // 초기 애니메이션 실행
    highlightActiveSection();
    animateProgressBars();
    animateScoreCircle();
    animateMetricCards();
});

// ==========================================================================
// Utility Functions
// ==========================================================================

// 숫자 포맷팅
function formatNumber(num) {
    return new Intl.NumberFormat('ko-KR').format(num);
}

// 퍼센트 계산
function calculatePercentage(value, total) {
    return ((value / total) * 100).toFixed(1);
}

// 날짜 포맷팅
function formatDate(date) {
    return new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(new Date(date));
}

// ==========================================================================
// Export for external use
// ==========================================================================

window.farmReport = {
    formatNumber,
    calculatePercentage,
    formatDate,
    animateNumber,
    highlightActiveSection
};

// ==========================================================================
// Console Info
// ==========================================================================

console.log('%c아원팜 종합 경영분석 리포트', 'color: #4CAF50; font-size: 20px; font-weight: bold;');
console.log('%c2025년 영농 데이터 ROI 분석 및 리스크 관리', 'color: #757575; font-size: 14px;');
console.log('%c분석 기간: 2025.02.27 ~ 2025.10.23', 'color: #2196F3; font-size: 12px;');

// ==========================================================================
// Performance Monitoring
// ==========================================================================

if ('performance' in window) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`페이지 로드 시간: ${pageLoadTime}ms`);
    });
}