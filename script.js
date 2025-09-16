// FAQ Toggle
function toggleFAQ(element) {
    const faqItem = element.closest('.faq-item');
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Lecturer Accordion Toggle
function toggleLecturerAccordion(element) {
    const accordionItem = element.closest('.accordion-item');
    const isActive = accordionItem.classList.contains('active');
    
    // Close all accordion items
    document.querySelectorAll('.accordion-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
        accordionItem.classList.add('active');
    }
}

// Process Step Accordion Toggle
function toggleStep(element) {
    const processStep = element.closest('.process-step');
    const isActive = processStep.classList.contains('active');
    
    // Close all process steps
    document.querySelectorAll('.process-step').forEach(step => {
        step.classList.remove('active');
    });
    
    // Open clicked step if it wasn't active
    if (!isActive) {
        processStep.classList.add('active');
    }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// (Header and mobile menu functionality removed intentionally)

// Testimonials Carousel
let currentTestimonialIndex = 0;
let testimonialInterval;

function initTestimonialsCarousel() {
    const track = document.getElementById('testimonialTrack');
    const dotsContainer = document.getElementById('carouselDots');
    const cards = track.querySelectorAll('.testimonial-card');
    
    if (!track || !dotsContainer || cards.length === 0) return;
    
    // Create dots
    dotsContainer.innerHTML = '';
    cards.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToTestimonial(index));
        dotsContainer.appendChild(dot);
    });
    
    // Auto-play carousel
    startAutoPlay();
    
    // Pause on hover
    const carousel = document.querySelector('.testimonials-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);
    }
}

function moveCarousel(direction) {
    const track = document.getElementById('testimonialTrack');
    const cards = track.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.carousel-dot');
    
    if (!track || cards.length === 0) return;
    
    currentTestimonialIndex += direction;
    
    // Handle wrapping
    if (currentTestimonialIndex >= cards.length) {
        currentTestimonialIndex = 0;
    } else if (currentTestimonialIndex < 0) {
        currentTestimonialIndex = cards.length - 1;
    }
    
    updateCarousel();
}

function goToTestimonial(index) {
    const cards = document.querySelectorAll('.testimonial-card');
    if (index >= 0 && index < cards.length) {
        currentTestimonialIndex = index;
        updateCarousel();
    }
}

function updateCarousel() {
    const track = document.getElementById('testimonialTrack');
    const dots = document.querySelectorAll('.carousel-dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (!track) return;
    
    // Move track
    const translateX = -currentTestimonialIndex * 100;
    track.style.transform = `translateX(${translateX}%)`;
    
    // Update dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentTestimonialIndex);
    });
    
    // Update button states (optional - for infinite loop we don't need to disable)
    if (prevBtn && nextBtn) {
        prevBtn.disabled = false;
        nextBtn.disabled = false;
    }
}

function startAutoPlay() {
    stopAutoPlay(); // Clear any existing interval
    testimonialInterval = setInterval(() => {
        moveCarousel(1);
    }, 5000); // Change slide every 5 seconds
}

function stopAutoPlay() {
    if (testimonialInterval) {
        clearInterval(testimonialInterval);
        testimonialInterval = null;
    }
}

// Inflation Calculator - Updated with verified data
const inflationRates = {
    2021: 0.046,  // 4.6% (SVKI/HICP metinis vidurkis)
    2022: 0.189,  // 18.9% (SVKI/HICP metinis vidurkis)
    2023: 0.087,  // 8.7% (SVKI/HICP metinis vidurkis)
    2024: 0.009,  // 0.9% (SVKI/HICP metinis vidurkis)
    2025: 0.023   // 2.3% (iki 2025-07, vidutinis metinis)
};

const sp500Returns = {
    2021: 0.3848,   // +38.48% (Total Return EUR, su dividendais)
    2022: -0.1274,  // -12.74% (Total Return EUR, su dividendais)
    2023: 0.2201,   // +22.01% (Total Return EUR, su dividendais)
    2024: 0.3337,   // +33.37% (Total Return EUR, su dividendais)
    2025: -0.0001   // -0.01% (YTD iki 2025-09-16)
};

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

function calculateInflationLoss(principal) {
    let realValue = principal;
    let totalLoss = 0;
    
    for (let year in inflationRates) {
        const loss = realValue * inflationRates[year];
        totalLoss += loss;
        realValue = realValue * (1 - inflationRates[year]);
    }
    
    return {
        totalLoss: principal - realValue,
        realValue: realValue
    };
}

function calculateSP500Gains(principal) {
    let portfolioValue = principal;
    
    for (let year in sp500Returns) {
        portfolioValue = portfolioValue * (1 + sp500Returns[year]);
    }
    
    return {
        totalGain: portfolioValue - principal,
        portfolioValue: portfolioValue
    };
}

function generateYearlyBreakdown(principal) {
    const years = Object.keys(inflationRates);
    const breakdown = [];
    
    let inflationBalance = principal;
    let sp500Balance = principal;
    
    years.forEach(year => {
        const inflationLoss = inflationBalance * inflationRates[year];
        inflationBalance -= inflationLoss;
        
        const sp500Gain = sp500Balance * sp500Returns[year];
        sp500Balance += sp500Gain;
        
        breakdown.push({
            year: year,
            inflationRate: (inflationRates[year] * 100).toFixed(1) + '%',
            inflationLoss: -inflationLoss,
            sp500Return: (sp500Returns[year] * 100).toFixed(1) + '%',
            sp500Gain: sp500Gain,
            difference: sp500Gain + inflationLoss
        });
    });
    
    return breakdown;
}

function updateTable(principal) {
    const breakdown = generateYearlyBreakdown(principal);
    const tableBody = document.getElementById('tableBody');
    
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    let cumulativeInflationLoss = 0;
    let cumulativeSP500Gain = 0;
    
    breakdown.forEach(row => {
        cumulativeInflationLoss += row.inflationLoss;
        cumulativeSP500Gain += row.sp500Gain;
        
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${row.year}</td>
            <td class="negative">${row.inflationRate}</td>
            <td class="negative">${formatCurrency(row.inflationLoss)}</td>
            <td class="${row.sp500Gain >= 0 ? 'positive' : 'negative'}">${row.sp500Return}</td>
            <td class="${row.sp500Gain >= 0 ? 'positive' : 'negative'}">${formatCurrency(row.sp500Gain)}</td>
            <td class="positive">${formatCurrency(row.difference)}</td>
        `;
        tableBody.appendChild(tr);
    });
    
    // Calculate averages
    const years = Object.keys(inflationRates);
    const avgInflation = (Object.values(inflationRates).reduce((a, b) => a + b, 0) / years.length * 100).toFixed(1);
    const avgSP500 = (Object.values(sp500Returns).reduce((a, b) => a + b, 0) / years.length * 100).toFixed(1);
    
    // Add total row
    const totalRow = document.createElement('tr');
    totalRow.style.fontWeight = 'bold';
    totalRow.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
    totalRow.innerHTML = `
        <td>VISO</td>
        <td class="negative">${avgInflation}% (vid.)</td>
        <td class="negative">${formatCurrency(cumulativeInflationLoss)}</td>
        <td class="positive">${avgSP500}% (vid.)</td>
        <td class="positive">${formatCurrency(cumulativeSP500Gain)}</td>
        <td class="positive">${formatCurrency(cumulativeSP500Gain - cumulativeInflationLoss)}</td>
    `;
    tableBody.appendChild(totalRow);
}

function updateCalculations() {
    const principal = parseFloat(document.getElementById('initialAmount').value);
    
    const inflationResult = calculateInflationLoss(principal);
    const sp500Result = calculateSP500Gains(principal);
    const opportunityCost = sp500Result.portfolioValue - inflationResult.realValue;
    
    // Update display values
    const inflationLossEl = document.getElementById('inflationLoss');
    const realValueEl = document.getElementById('realValue');
    const potentialGainEl = document.getElementById('potentialGain');
    const portfolioValueEl = document.getElementById('portfolioValue');
    const opportunityCostEl = document.getElementById('opportunityCost');
    
    if (inflationLossEl) inflationLossEl.textContent = formatCurrency(-inflationResult.totalLoss);
    if (realValueEl) realValueEl.textContent = formatCurrency(inflationResult.realValue);
    if (potentialGainEl) potentialGainEl.textContent = '+' + formatCurrency(sp500Result.totalGain);
    if (portfolioValueEl) portfolioValueEl.textContent = formatCurrency(sp500Result.portfolioValue);
    if (opportunityCostEl) opportunityCostEl.textContent = formatCurrency(opportunityCost);
    
    // Update table
    updateTable(principal);
}

function initCalculator() {
    const initialAmountInput = document.getElementById('initialAmount');
    const amountSlider = document.getElementById('amountSlider');
    
    if (!initialAmountInput || !amountSlider) return;
    
    // Event listeners
    initialAmountInput.addEventListener('input', function(e) {
        amountSlider.value = e.target.value;
        updateCalculations();
    });
    
    amountSlider.addEventListener('input', function(e) {
        initialAmountInput.value = e.target.value;
        updateCalculations();
    });
    
    // Initial calculation
    updateCalculations();
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initTestimonialsCarousel();
    initCalculator();
});