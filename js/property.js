// Properties page JavaScript functionality

// Property data (in a real application, this would come from an API)
const propertyData = [
    {
        id: 1,
        title: "Modern Downtown Apartment",
        type: "apartment",
        bedrooms: 2,
        bathrooms: 2,
        sqft: 1200,
        price: 2500,
        location: "Downtown District",
        address: "123 Main Street, Downtown",
        image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600",
        features: ["In-unit laundry", "Gym access", "Parking included", "Pet-friendly"],
        description: "Beautiful modern apartment in the heart of downtown with stunning city views and premium amenities.",
        available: true
    },
    {
        id: 2,
        title: "Luxury Suburban Home",
        type: "house",
        bedrooms: 4,
        bathrooms: 3,
        sqft: 2800,
        price: 3800,
        location: "Westside Suburbs",
        address: "456 Oak Avenue, Westside",
        image: "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=600",
        features: ["Large backyard", "2-car garage", "Updated kitchen", "Fireplace"],
        description: "Spacious family home in quiet neighborhood with excellent schools and parks nearby.",
        available: true
    },
    {
        id: 3,
        title: "Cozy Studio Loft",
        type: "studio",
        bedrooms: "studio",
        bathrooms: 1,
        sqft: 650,
        price: 1600,
        location: "Arts District",
        address: "789 Creative Boulevard, Arts District",
        image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=600",
        features: ["Exposed brick", "High ceilings", "Hardwood floors", "Walk to galleries"],
        description: "Charming studio loft in the vibrant arts district with unique architectural features.",
        available: true
    },
    {
        id: 4,
        title: "Waterfront Condo",
        type: "condo",
        bedrooms: 3,
        bathrooms: 2,
        sqft: 1800,
        price: 3200,
        location: "Waterfront District",
        address: "321 Harbor View, Waterfront",
        image: "https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=600",
        features: ["Water views", "Balcony", "Pool access", "Concierge"],
        description: "Stunning waterfront condo with panoramic views and luxury amenities.",
        available: true
    },
    {
        id: 5,
        title: "Garden Apartment",
        type: "apartment",
        bedrooms: 1,
        bathrooms: 1,
        sqft: 800,
        price: 1800,
        location: "Garden District",
        address: "654 Garden Lane, Garden District",
        image: "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=600",
        features: ["Private patio", "Garden access", "Quiet location", "Updated appliances"],
        description: "Peaceful garden apartment with private outdoor space and serene surroundings.",
        available: true
    },
    {
        id: 6,
        title: "Executive Townhouse",
        type: "house",
        bedrooms: 3,
        bathrooms: 3,
        sqft: 2200,
        price: 3000,
        location: "Executive Heights",
        address: "987 Executive Drive, Executive Heights",
        image: "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=600",
        features: ["Office space", "Finished basement", "Deck", "Garage"],
        description: "Professional townhouse perfect for executives with dedicated office space.",
        available: true
    },
    {
        id: 7,
        title: "Urban Loft",
        type: "apartment",
        bedrooms: 2,
        bathrooms: 1,
        sqft: 1100,
        price: 2200,
        location: "Urban Core",
        address: "147 Urban Street, Urban Core",
        image: "https://images.pexels.com/photos/1571471/pexels-photo-1571471.jpeg?auto=compress&cs=tinysrgb&w=600",
        features: ["Open floor plan", "Industrial design", "Near transit", "Rooftop access"],
        description: "Modern urban loft with industrial charm in the heart of the city.",
        available: true
    },
    {
        id: 8,
        title: "Family Colonial",
        type: "house",
        bedrooms: 5,
        bathrooms: 4,
        sqft: 3200,
        price: 4200,
        location: "Maple Heights",
        address: "258 Maple Street, Maple Heights",
        image: "https://images.pexels.com/photos/1571474/pexels-photo-1571474.jpeg?auto=compress&cs=tinysrgb&w=600",
        features: ["Large yard", "Formal dining", "Master suite", "Bonus room"],
        description: "Traditional colonial home perfect for large families with generous living spaces.",
        available: true
    },
    {
        id: 9,
        title: "Penthouse Suite",
        type: "condo",
        bedrooms: 2,
        bathrooms: 2,
        sqft: 1600,
        price: 4500,
        location: "Skyline District",
        address: "369 Skyline Avenue, Penthouse",
        image: "https://images.pexels.com/photos/1571477/pexels-photo-1571477.jpeg?auto=compress&cs=tinysrgb&w=600",
        features: ["Panoramic views", "Private elevator", "Luxury finishes", "Terrace"],
        description: "Exclusive penthouse suite with breathtaking city views and premium amenities.",
        available: true
    },
    {
        id: 10,
        title: "Cottage Rental",
        type: "house",
        bedrooms: 2,
        bathrooms: 2,
        sqft: 1400,
        price: 2800,
        location: "Riverside",
        address: "741 River Road, Riverside",
        image: "https://images.pexels.com/photos/1571480/pexels-photo-1571480.jpeg?auto=compress&cs=tinysrgb&w=600",
        features: ["Riverside location", "Fireplace", "Screened porch", "Boat dock"],
        description: "Charming riverside cottage with direct water access and peaceful surroundings.",
        available: true
    },
    {
        id: 11,
        title: "Modern Efficiency",
        type: "studio",
        bedrooms: "studio",
        bathrooms: 1,
        sqft: 500,
        price: 1400,
        location: "Tech Quarter",
        address: "852 Innovation Way, Tech Quarter",
        image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=600",
        features: ["Smart home tech", "Efficient layout", "Near tech companies", "24/7 security"],
        description: "Ultra-modern efficiency apartment in the technology district with smart home features.",
        available: true
    },
    {
        id: 12,
        title: "Historic Brownstone",
        type: "apartment",
        bedrooms: 3,
        bathrooms: 2,
        sqft: 1900,
        price: 3500,
        location: "Historic District",
        address: "963 Heritage Street, Historic District",
        image: "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=600",
        features: ["Original details", "Hardwood floors", "Crown molding", "Period fixtures"],
        description: "Beautiful historic brownstone with original architectural details and modern updates.",
        available: true
    }
];

// Current filtered properties
let filteredProperties = [...propertyData];

// Initialize properties page
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('propertiesGrid')) {
        initializePropertyFilters();
        renderProperties(filteredProperties);
        initializePropertyModal();
    }
});

/**
 * Initialize property filter functionality
 */
function initializePropertyFilters() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const typeFilter = document.getElementById('typeFilter');
    const bedroomFilter = document.getElementById('bedroomFilter');
    const priceFilter = document.getElementById('priceFilter');
    const resetFilters = document.getElementById('resetFilters');

    // Search functionality
    if (searchInput && searchBtn) {
        const performSearch = () => {
            const searchTerm = searchInput.value.toLowerCase().trim();
            applyFilters(searchTerm);
        };

        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch();
            }
        });

        // Real-time search
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            if (searchTerm === '') {
                applyFilters();
            }
        });
    }

    // Filter change handlers
    [typeFilter, bedroomFilter, priceFilter].forEach(filter => {
        if (filter) {
            filter.addEventListener('change', () => applyFilters());
        }
    });

    // Reset filters
    if (resetFilters) {
        resetFilters.addEventListener('click', function() {
            if (searchInput) searchInput.value = '';
            if (typeFilter) typeFilter.value = '';
            if (bedroomFilter) bedroomFilter.value = '';
            if (priceFilter) priceFilter.value = '';
            applyFilters();
        });
    }
}

/**
 * Apply filters to property list
 */
function applyFilters(searchTerm = '') {
    const typeFilter = document.getElementById('typeFilter')?.value || '';
    const bedroomFilter = document.getElementById('bedroomFilter')?.value || '';
    const priceFilter = document.getElementById('priceFilter')?.value || '';

    filteredProperties = propertyData.filter(property => {
        // Search filter
        const matchesSearch = !searchTerm || 
            property.title.toLowerCase().includes(searchTerm) ||
            property.location.toLowerCase().includes(searchTerm) ||
            property.address.toLowerCase().includes(searchTerm) ||
            property.features.some(feature => feature.toLowerCase().includes(searchTerm));

        // Type filter
        const matchesType = !typeFilter || property.type === typeFilter;

        // Bedroom filter
        const matchesBedrooms = !bedroomFilter || 
            (bedroomFilter === 'studio' && property.bedrooms === 'studio') ||
            (bedroomFilter === '4+' && typeof property.bedrooms === 'number' && property.bedrooms >= 4) ||
            (property.bedrooms.toString() === bedroomFilter);

        // Price filter
        let matchesPrice = true;
        if (priceFilter) {
            const price = property.price;
            switch (priceFilter) {
                case '0-1500':
                    matchesPrice = price <= 1500;
                    break;
                case '1500-2500':
                    matchesPrice = price >= 1500 && price <= 2500;
                    break;
                case '2500-3500':
                    matchesPrice = price >= 2500 && price <= 3500;
                    break;
                case '3500+':
                    matchesPrice = price >= 3500;
                    break;
            }
        }

        return matchesSearch && matchesType && matchesBedrooms && matchesPrice;
    });

    renderProperties(filteredProperties);
    updatePropertyCount(filteredProperties.length);
}

/**
 * Render properties grid
 */
function renderProperties(properties) {
    const grid = document.getElementById('propertiesGrid');
    const noResults = document.getElementById('noResults');
    
    if (!grid) return;

    if (properties.length === 0) {
        grid.style.display = 'none';
        if (noResults) noResults.style.display = 'block';
        return;
    }

    if (noResults) noResults.style.display = 'none';
    grid.style.display = 'grid';

    grid.innerHTML = properties.map(property => `
        <div class="property-card" data-property-id="${property.id}" data-aos="fade-up">
            <div class="property-image">
                <img src="${property.image}" alt="${property.title}">
                <div class="property-badge">${property.available ? 'For Rent' : 'Rented'}</div>
            </div>
            <div class="property-info">
                <h3>${property.title}</h3>
                <p class="property-location">📍 ${property.location}</p>
                <div class="property-features">
                    <span>🏠 ${property.bedrooms === 'studio' ? 'Studio' : property.bedrooms + ' Bed'}</span>
                    <span>🚿 ${property.bathrooms} Bath</span>
                    <span>📐 ${property.sqft.toLocaleString()} sq ft</span>
                </div>
                <div class="property-price">$${property.price.toLocaleString()}/month</div>
                <button class="btn btn-primary view-property-btn" onclick="openPropertyModal(${property.id})">
                    View Details
                </button>
            </div>
        </div>
    `).join('');

    // Re-initialize animations for new content
    initializePropertyAnimations();
}

/**
 * Update property count display
 */
function updatePropertyCount(count) {
    const countText = document.getElementById('countText');
    if (countText) {
        const propertyWord = count === 1 ? 'property' : 'properties';
        countText.textContent = `Showing ${count} ${propertyWord}`;
    }
}

/**
 * Initialize property modal functionality
 */
function initializePropertyModal() {
    const modal = document.getElementById('propertyModal');
    const closeBtn = modal?.querySelector('.modal-close');

    // Close modal handlers
    if (closeBtn) {
        closeBtn.addEventListener('click', closePropertyModal);
    }

    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closePropertyModal();
            }
        });
    }

    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal?.style.display === 'flex') {
            closePropertyModal();
        }
    });
}

/**
 * Open property modal
 */
function openPropertyModal(propertyId) {
    const property = propertyData.find(p => p.id === propertyId);
    if (!property) return;

    const modal = document.getElementById('propertyModal');
    const modalContent = document.getElementById('modalContent');
    
    if (!modal || !modalContent) return;

    modalContent.innerHTML = `
        <div class="property-modal-header">
            <img src="${property.image}" alt="${property.title}" class="property-modal-image">
            <div class="property-modal-badge">${property.available ? 'Available' : 'Rented'}</div>
        </div>
        <div class="property-modal-info">
            <h2>${property.title}</h2>
            <p class="property-modal-location">📍 ${property.address}</p>
            
            <div class="property-modal-details">
                <div class="detail-item">
                    <span class="detail-label">Bedrooms:</span>
                    <span class="detail-value">${property.bedrooms === 'studio' ? 'Studio' : property.bedrooms}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Bathrooms:</span>
                    <span class="detail-value">${property.bathrooms}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Square Feet:</span>
                    <span class="detail-value">${property.sqft.toLocaleString()}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Monthly Rent:</span>
                    <span class="detail-value price">$${property.price.toLocaleString()}</span>
                </div>
            </div>

            <div class="property-modal-description">
                <h3>Description</h3>
                <p>${property.description}</p>
            </div>

            <div class="property-modal-features">
                <h3>Features & Amenities</h3>
                <ul>
                    ${property.features.map(feature => `<li>✅ ${feature}</li>`).join('')}
                </ul>
            </div>

            <div class="property-modal-actions">
                <button class="btn btn-primary" onclick="contactAboutProperty(${property.id})">
                    Contact About This Property
                </button>
                <button class="btn btn-secondary" onclick="scheduleViewing(${property.id})">
                    Schedule Viewing
                </button>
            </div>
        </div>
    `;

    // Add modal styles
    addModalStyles();
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

/**
 * Close property modal
 */
function closePropertyModal() {
    const modal = document.getElementById('propertyModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

/**
 * Contact about property
 */
function contactAboutProperty(propertyId) {
    const property = propertyData.find(p => p.id === propertyId);
    if (property) {
        // In a real application, this would pre-fill a contact form
        const subject = encodeURIComponent(`Inquiry about ${property.title}`);
        const body = encodeURIComponent(`Hi, I'm interested in learning more about the property at ${property.address}. Please contact me with more information.`);
        window.location.href = `contact.html?subject=${subject}&body=${body}`;
    }
}

/**
 * Schedule viewing
 */
function scheduleViewing(propertyId) {
    const property = propertyData.find(p => p.id === propertyId);
    if (property) {
        PropertyProUtils.showNotification(`Viewing request submitted for ${property.title}. We'll contact you within 24 hours to schedule.`, 'success');
        closePropertyModal();
    }
}

/**
 * Initialize property card animations
 */
function initializePropertyAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const propertyCards = document.querySelectorAll('.property-card[data-aos]');
    propertyCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}

/**
 * Add modal styles dynamically
 */
function addModalStyles() {
    if (document.getElementById('modalStyles')) return;

    const styles = document.createElement('style');
    styles.id = 'modalStyles';
    styles.textContent = `
        .modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(5px);
            z-index: 10000;
            display: none;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }

        .modal-content {
            background: white;
            border-radius: 16px;
            max-width: 800px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
            animation: modalSlideIn 0.3s ease;
        }

        @keyframes modalSlideIn {
            from {
                opacity: 0;
                transform: translateY(-50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .modal-close {
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.1);
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            font-size: 24px;
            cursor: pointer;
            z-index: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.3s ease;
        }

        .modal-close:hover {
            background: rgba(0, 0, 0, 0.2);
        }

        .property-modal-image {
            width: 100%;
            height: 300px;
            object-fit: cover;
            border-radius: 16px 16px 0 0;
        }

        .property-modal-badge {
            position: absolute;
            top: 16px;
            left: 16px;
            background: linear-gradient(135deg, var(--accent-color), var(--accent-hover));
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-weight: 500;
            font-size: 0.9rem;
        }

        .property-modal-info {
            padding: 32px;
        }

        .property-modal-info h2 {
            margin-bottom: 8px;
            color: var(--neutral-800);
        }

        .property-modal-location {
            color: var(--neutral-600);
            margin-bottom: 24px;
            font-size: 1.1rem;
        }

        .property-modal-details {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 16px;
            margin-bottom: 32px;
            padding: 24px;
            background: var(--neutral-100);
            border-radius: 12px;
        }

        .detail-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .detail-label {
            font-weight: 500;
            color: var(--neutral-600);
        }

        .detail-value {
            font-weight: 600;
            color: var(--neutral-800);
        }

        .detail-value.price {
            color: var(--primary-color);
            font-size: 1.2rem;
        }

        .property-modal-description,
        .property-modal-features {
            margin-bottom: 32px;
        }

        .property-modal-description h3,
        .property-modal-features h3 {
            margin-bottom: 16px;
            color: var(--neutral-800);
        }

        .property-modal-description p {
            color: var(--neutral-600);
            line-height: 1.6;
        }

        .property-modal-features ul {
            list-style: none;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 8px;
        }

        .property-modal-features li {
            color: var(--neutral-600);
            font-size: 0.95rem;
        }

        .property-modal-actions {
            display: flex;
            gap: 16px;
            flex-wrap: wrap;
        }

        .property-modal-actions .btn {
            flex: 1;
            min-width: 200px;
        }

        @media (max-width: 768px) {
            .modal {
                padding: 10px;
            }

            .property-modal-info {
                padding: 24px 20px;
            }

            .property-modal-details {
                grid-template-columns: 1fr;
                gap: 12px;
                padding: 20px;
            }

            .property-modal-features ul {
                grid-template-columns: 1fr;
            }

            .property-modal-actions {
                flex-direction: column;
            }

            .property-modal-actions .btn {
                min-width: auto;
            }
        }
    `;

    document.head.appendChild(styles);
}