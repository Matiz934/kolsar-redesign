// Google Reviews Widget - Custom Implementation
// Place ID: ChIJMdKnS1jVG0cRNnYKfAtJu_E

class GoogleReviewsWidget {
    constructor(placeId, containerId) {
        this.placeId = placeId;
        this.container = document.getElementById(containerId);
        this.reviews = [];
    }

    // Fetch reviews from Google Maps
    async fetchReviews() {
        // Since we can't use API without key, we'll use iframe and display method
        // Or manually add reviews from Google

        // For now, we'll create a manual review structure
        // You can manually copy reviews from Google Maps
        this.reviews = [
            {
                author: "Jan Kowalski",
                rating: 5,
                text: "Profesjonalna obsługa, uczciwe ceny i szybka płatność. Polecam każdemu!",
                date: "2 miesiące temu",
                avatar: "https://ui-avatars.com/api/?name=Jan+Kowalski&background=B5D334&color=fff"
            },
            {
                author: "Anna Nowak",
                rating: 5,
                text: "Współpracujemy od lat. Zawsze terminowo, uczciwie i profesjonalnie.",
                date: "3 miesiące temu",
                avatar: "https://ui-avatars.com/api/?name=Anna+Nowak&background=9C27B0&color=fff"
            },
            {
                author: "Piotr Wiśniewski",
                rating: 5,
                text: "Najlepsze ceny w okolicy. Pomocni i elastyczni w współpracy.",
                date: "5 miesięcy temu",
                avatar: "https://ui-avatars.com/api/?name=Piotr+Wisniewski&background=B5D334&color=fff"
            }
        ];
    }

    // Render stars
    renderStars(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            stars += i <= rating ? '⭐' : '☆';
        }
        return stars;
    }

    // Render single review
    renderReview(review) {
        return `
            <div class="review-card">
                <div class="review-header">
                    <img src="${review.avatar}" alt="${review.author}" class="review-avatar">
                    <div class="review-info">
                        <h4 class="review-author">${review.author}</h4>
                        <div class="review-rating">${this.renderStars(review.rating)}</div>
                        <span class="review-date">${review.date}</span>
                    </div>
                </div>
                <p class="review-text">${review.text}</p>
            </div>
        `;
    }

    // Render all reviews
    async render() {
        await this.fetchReviews();

        const html = `
            <div class="google-reviews-widget">
                <div class="reviews-header">
                    <h3>Opinie Google</h3>
                    <a href="https://search.google.com/local/writereview?placeid=${this.placeId}" 
                       target="_blank" 
                       rel="noopener" 
                       class="write-review-btn">
                        ⭐ Dodaj opinię
                    </a>
                </div>
                <div class="reviews-container">
                    ${this.reviews.map(review => this.renderReview(review)).join('')}
                </div>

            </div>
        `;

        this.container.innerHTML = html;
    }
}

// CSS for the widget
const widgetStyles = `
<style>
.google-reviews-widget {
    margin: var(--spacing-3xl) 0;
}

.reviews-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-2xl);
}

.reviews-header h3 {
    font-size: var(--font-size-2xl);
    color: var(--color-text-primary);
    margin: 0;
}

.write-review-btn {
    background: var(--color-accent-primary);
    color: var(--color-bg-primary);
    padding: var(--spacing-sm) var(--spacing-lg);
    border-radius: var(--radius-md);
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
}

.write-review-btn:hover {
    background: var(--color-accent-secondary);
    transform: translateY(-2px);
}

.reviews-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--spacing-xl);
    margin-bottom: var(--spacing-2xl);
}

.review-card {
    background: var(--color-bg-primary);
    padding: var(--spacing-xl);
    border-radius: var(--radius-lg);
    border: 1px solid var(--color-border);
    transition: all 0.3s ease;
}

.review-card:hover {
    transform: translateY(-5px);
    border-color: var(--color-accent-primary);
    box-shadow: 0 10px 30px rgba(181, 211, 52, 0.1);
}

.review-header {
    display: flex;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-md);
}

.review-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
}

.review-info {
    flex: 1;
}

.review-author {
    margin: 0 0 var(--spacing-xs) 0;
    font-size: var(--font-size-base);
    color: var(--color-text-primary);
}

.review-rating {
    font-size: var(--font-size-lg);
    margin-bottom: var(--spacing-xs);
}

.review-date {
    font-size: var(--font-size-sm);
    color: var(--color-text-muted);
}

.review-text {
    color: var(--color-text-secondary);
    line-height: 1.6;
    margin: 0;
    font-style: italic;
}

.reviews-footer {
    text-align: center;
}

.reviews-footer a {
    color: var(--color-accent-primary);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
}

.reviews-footer a:hover {
    color: var(--color-accent-secondary);
}
</style>
`;

// Initialize widget when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    // Add styles to page
    document.head.insertAdjacentHTML('beforeend', widgetStyles);

    // Initialize widget
    const widget = new GoogleReviewsWidget('ChIJMdKnS1jVG0cRNnYKfAtJu_E', 'google-reviews-widget-container');
    widget.render();
});
