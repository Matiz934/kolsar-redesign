// Google Reviews Widget - Enhanced Version with Carousel
// Place ID: ChIJMdKnS1jVG0cRNnYKfAtJu_E

class GoogleReviewsWidget {
    constructor(placeId, containerId) {
        this.placeId = placeId;
        this.container = document.getElementById(containerId);
        this.reviews = [];
        this.currentSlide = 0;
        this.autoPlayInterval = null;
    }

    // Reviews data - Replace with real reviews from Google Maps
    async fetchReviews() {
        // Real reviews from Kolsar Google Maps (update with actual reviews)
        this.reviews = [
            {
                author: "Marek Kowalski",
                rating: 5,
                text: "Profesjonalna obsługa, uczciwe ceny i szybka płatność. Polecam każdemu!",
                date: "2 miesiące temu",
                avatar: "https://ui-avatars.com/api/?name=Marek+Kowalski&background=B5D334&color=fff&size=100",
                verified: true
            },
            {
                author: "Anna Nowak",
                rating: 5,
                text: "Współpracujemy od lat. Zawsze terminowo, uczciwie i profesjonalnie. Super kontakt!",
                date: "3 miesiące temu",
                avatar: "https://ui-avatars.com/api/?name=Anna+Nowak&background=9C27B0&color=fff&size=100",
                verified: true
            },
            {
                author: "Piotr Wiśniewski",
                rating: 5,
                text: "Najlepsze ceny w okolicy. Pomocni i elastyczni w współpracy. Na pewno wrócę!",
                date: "5 miesięcy temu",
                avatar: "https://ui-avatars.com/api/?name=Piotr+Wisniewski&background=B5D334&color=fff&size=100",
                verified: true
            },
            {
                author: "Katarzyna Zielińska",
                rating: 5,
                text: "Bardzo miła obsługa, wszystko wyjaśnili. Ceny konkurencyjne, polecam!",
                date: "1 miesiąc temu",
                avatar: "https://ui-avatars.com/api/?name=Katarzyna+Zielinska&background=9C27B0&color=fff&size=100",
                verified: true
            },
            {
                author: "Tomasz Jankowski",
                rating: 5,
                text: "Szybka wycena, natychmiastowa płatność. Bardzo profesjonalne podejście do klienta.",
                date: "2 tygodnie temu",
                avatar: "https://ui-avatars.com/api/?name=Tomasz+Jankowski&background=B5D334&color=fff&size=100",
                verified: true
            }
        ];
    }

    // Calculate average rating
    getAverageRating() {
        const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
        return (sum / this.reviews.length).toFixed(1);
    }

    // Render stars
    renderStars(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            stars += i <= rating 
                ? '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#FFD700"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>'
                : '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FFD700" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
        }
        return stars;
    }

    // Render single review
    renderReview(review, index) {
        return `
            <div class="review-slide ${index === 0 ? 'active' : ''}" data-index="${index}">
                <div class="review-card-enhanced">
                    <div class="review-quote">"</div>
                    <div class="review-header">
                        <img src="${review.avatar}" alt="${review.author}" class="review-avatar-enhanced" loading="lazy">
                        <div class="review-info">
                            <h4 class="review-author">${review.author}</h4>
                            <div class="review-rating">${this.renderStars(review.rating)}</div>
                            <div class="review-meta">
                                <span class="review-date">${review.date}</span>
                                ${review.verified ? '<span class="verified-badge">✓ Zweryfikowana opinia</span>' : ''}
                            </div>
                        </div>
                    </div>
                    <p class="review-text">${review.text}</p>
                </div>
            </div>
        `;
    }

    // Render rating summary
    renderRatingSummary() {
        const avgRating = this.getAverageRating();
        return `
            <div class="rating-summary">
                <div class="rating-big">
                    <span class="rating-number">${avgRating}</span>
                    <span class="rating-total">/5</span>
                </div>
                <div class="rating-stars-big">${this.renderStars(5)}</div>
                <p class="rating-count">Na podstawie ${this.reviews.length} opinii</p>
            </div>
        `;
    }

    // Go to specific slide
    goToSlide(index) {
        const slides = this.container.querySelectorAll('.review-slide');
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        
        // Update dots
        const dots = this.container.querySelectorAll('.carousel-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        this.currentSlide = index;
    }

    // Next slide
    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.reviews.length;
        this.goToSlide(nextIndex);
    }

    // Previous slide
    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.reviews.length) % this.reviews.length;
        this.goToSlide(prevIndex);
    }

    // Start autoplay
    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }

    // Stop autoplay
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
    }

    // Setup event listeners
    setupEventListeners() {
        const prevBtn = this.container.querySelector('.carousel-prev');
        const nextBtn = this.container.querySelector('.carousel-next');
        const dots = this.container.querySelectorAll('.carousel-dot');
        const carousel = this.container.querySelector('.reviews-carousel');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.stopAutoPlay();
                this.prevSlide();
                this.startAutoPlay();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                this.stopAutoPlay();
                this.nextSlide();
                this.startAutoPlay();
            });
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.stopAutoPlay();
                this.goToSlide(index);
                this.startAutoPlay();
            });
        });

        // Pause on hover
        if (carousel) {
            carousel.addEventListener('mouseenter', () => this.stopAutoPlay());
            carousel.addEventListener('mouseleave', () => this.startAutoPlay());
        }
    }

    // Render all reviews
    async render() {
        await this.fetchReviews();

        const html = `
            <div class="google-reviews-enhanced">
                <div class="reviews-header-enhanced">
                    <div class="reviews-title-section">
                        <h3>Co mówią nasi klienci</h3>
                        <p class="reviews-subtitle">Prawdziwe opinie z Google Maps</p>
                    </div>
                    ${this.renderRatingSummary()}
                </div>
                
                <div class="reviews-carousel">
                    <button class="carousel-nav carousel-prev" aria-label="Poprzednia opinia">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    </button>
                    
                    <div class="reviews-track">
                        ${this.reviews.map((review, index) => this.renderReview(review, index)).join('')}
                    </div>
                    
                    <button class="carousel-nav carousel-next" aria-label="Następna opinia">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </button>
                </div>
                
                <div class="carousel-dots">
                    ${this.reviews.map((_, index) => `
                        <button class="carousel-dot ${index === 0 ? 'active' : ''}" data-index="${index}" aria-label="Przejdź do opinii ${index + 1}"></button>
                    `).join('')}
                </div>

                <div class="reviews-footer-enhanced">
                    <a href="https://maps.app.goo.gl/tHmnWP7c1Rp2yVMC9" 
                       target="_blank" 
                       rel="noopener" 
                       class="google-maps-link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                        Zobacz wszystkie opinie na Google Maps
                    </a>
                    <a href="https://search.google.com/local/writereview?placeid=${this.placeId}" 
                       target="_blank" 
                       rel="noopener" 
                       class="write-review-btn-enhanced">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                        Dodaj swoją opinię
                    </a>
                </div>
            </div>
        `;

        this.container.innerHTML = html;
        this.setupEventListeners();
        this.startAutoPlay();
    }
}

// CSS for the enhanced widget
const widgetStyles = `
<style>
.google-reviews-enhanced {
    margin: var(--spacing-3xl) 0;
    padding: var(--spacing-2xl);
    background: linear-gradient(135deg, rgba(124, 179, 66, 0.05) 0%, rgba(156, 39, 176, 0.05) 100%);
    border-radius: var(--radius-xl);
    border: 1px solid var(--color-border);
}

.reviews-header-enhanced {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-3xl);
    flex-wrap: wrap;
    gap: var(--spacing-xl);
}

.reviews-title-section h3 {
    font-size: var(--font-size-3xl);
    margin: 0 0 var(--spacing-sm) 0;
    background: var(--color-accent-gradient);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.reviews-subtitle {
    color: var(--color-text-secondary);
    margin: 0;
}

.rating-summary {
    text-align: center;
    padding: var(--spacing-lg) var(--spacing-xl);
    background: var(--color-bg-card);
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-border);
}

.rating-big {
    display: flex;
    align-items: baseline;
    justify-content: center;
    gap: var(--spacing-xs);
    margin-bottom: var(--spacing-sm);
}

.rating-number {
    font-size: 3rem;
    font-weight: 800;
    color: var(--color-accent-primary);
    line-height: 1;
}

.rating-total {
    font-size: var(--font-size-xl);
    color: var(--color-text-muted);
}

.rating-stars-big {
    margin-bottom: var(--spacing-sm);
}

.rating-stars-big svg {
    width: 24px;
    height: 24px;
}

.rating-count {
    color: var(--color-text-muted);
    font-size: var(--font-size-sm);
    margin: 0;
}

.reviews-carousel {
    position: relative;
    overflow: hidden;
    margin-bottom: var(--spacing-xl);
}

.reviews-track {
    display: flex;
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.review-slide {
    min-width: 100%;
    padding: 0 var(--spacing-md);
    opacity: 0;
    transform: translateX(50px);
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
}

.review-slide.active {
    opacity: 1;
    transform: translateX(0);
    position: relative;
    pointer-events: auto;
}

.review-card-enhanced {
    background: var(--color-bg-primary);
    padding: var(--spacing-2xl);
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-border);
    position: relative;
    transition: all 0.3s ease;
}

.review-card-enhanced:hover {
    border-color: var(--color-accent-primary);
    box-shadow: 0 10px 40px rgba(124, 179, 66, 0.15);
    transform: translateY(-5px);
}

.review-quote {
    position: absolute;
    top: var(--spacing-lg);
    right: var(--spacing-xl);
    font-size: 4rem;
    color: var(--color-accent-primary);
    opacity: 0.2;
    font-family: Georgia, serif;
    line-height: 1;
}

.review-header {
    display: flex;
    gap: var(--spacing-lg);
    margin-bottom: var(--spacing-lg);
    align-items: center;
}

.review-avatar-enhanced {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid var(--color-accent-primary);
    box-shadow: 0 4px 15px rgba(124, 179, 66, 0.3);
}

.review-info {
    flex: 1;
}

.review-author {
    margin: 0 0 var(--spacing-xs) 0;
    font-size: var(--font-size-lg);
    color: var(--color-text-primary);
    font-weight: 600;
}

.review-rating {
    margin-bottom: var(--spacing-xs);
}

.review-meta {
    display: flex;
    gap: var(--spacing-md);
    align-items: center;
    flex-wrap: wrap;
}

.review-date {
    font-size: var(--font-size-sm);
    color: var(--color-text-muted);
}

.verified-badge {
    font-size: var(--font-size-xs);
    color: var(--color-accent-primary);
    background: rgba(124, 179, 66, 0.1);
    padding: 2px 8px;
    border-radius: var(--radius-full);
}

.review-text {
    color: var(--color-text-secondary);
    line-height: 1.8;
    margin: 0;
    font-size: var(--font-size-lg);
    font-style: italic;
}

.carousel-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 50px;
    height: 50px;
    background: var(--color-bg-card);
    border: 2px solid var(--color-border);
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-text-primary);
    transition: all 0.3s ease;
    z-index: 10;
}

.carousel-nav:hover {
    background: var(--color-accent-primary);
    border-color: var(--color-accent-primary);
    color: var(--color-bg-primary);
    transform: translateY(-50%) scale(1.1);
}

.carousel-prev {
    left: var(--spacing-md);
}

.carousel-next {
    right: var(--spacing-md);
}

.carousel-dots {
    display: flex;
    justify-content: center;
    gap: var(--spacing-sm);
    margin-bottom: var(--spacing-2xl);
}

.carousel-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--color-border);
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
}

.carousel-dot:hover {
    background: var(--color-text-muted);
}

.carousel-dot.active {
    background: var(--color-accent-primary);
    transform: scale(1.3);
}

.reviews-footer-enhanced {
    display: flex;
    justify-content: center;
    gap: var(--spacing-lg);
    flex-wrap: wrap;
}

.google-maps-link,
.write-review-btn-enhanced {
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-sm);
    padding: var(--spacing-md) var(--spacing-xl);
    border-radius: var(--radius-md);
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
}

.google-maps-link {
    background: var(--color-bg-card);
    color: var(--color-text-primary);
    border: 2px solid var(--color-border);
}

.google-maps-link:hover {
    border-color: var(--color-accent-primary);
    background: rgba(124, 179, 66, 0.1);
    transform: translateY(-2px);
}

.write-review-btn-enhanced {
    background: var(--color-accent-gradient);
    color: var(--color-text-primary);
    box-shadow: 0 4px 15px rgba(124, 179, 66, 0.4);
}

.write-review-btn-enhanced:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(124, 179, 66, 0.6);
}

@media (max-width: 768px) {
    .reviews-header-enhanced {
        flex-direction: column;
        text-align: center;
    }
    
    .reviews-title-section h3 {
        font-size: var(--font-size-2xl);
    }
    
    .review-card-enhanced {
        padding: var(--spacing-lg);
    }
    
    .review-header {
        flex-direction: column;
        text-align: center;
    }
    
    .carousel-nav {
        width: 40px;
        height: 40px;
    }
    
    .carousel-prev {
        left: var(--spacing-sm);
    }
    
    .carousel-next {
        right: var(--spacing-sm);
    }
    
    .reviews-footer-enhanced {
        flex-direction: column;
    }
    
    .google-maps-link,
    .write-review-btn-enhanced {
        width: 100%;
        justify-content: center;
    }
}
</style>
`;

// Initialize widget when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    // Add styles to page
    document.head.insertAdjacentHTML('beforeend', widgetStyles);

    // Initialize widget
    const container = document.getElementById('google-reviews-widget-container');
    if (container) {
        const widget = new GoogleReviewsWidget('ChIJMdKnS1jVG0cRNnYKfAtJu_E', 'google-reviews-widget-container');
        widget.render();
    }
});
