// Search functionality for properties
function initSearch() {
  const searchInput = document.querySelector('.search-bar input');
  const searchButton = document.querySelector('.search-bar button');
  
  if (searchButton && searchInput) {
    searchButton.addEventListener('click', function() {
      performSearch();
    });
    
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        performSearch();
      }
    });
  }
}

function performSearch() {
  const searchInput = document.querySelector('.search-bar input');
  const searchTerm = searchInput.value.toLowerCase();
  const listings = document.querySelectorAll('.property-card');
  
  listings.forEach(card => {
    const title = card.querySelector('h3').textContent.toLowerCase();
    const location = card.querySelector('p').textContent.toLowerCase();
    
    if (title.includes(searchTerm) || location.includes(searchTerm)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// Initialize dropdown functionality - hover to show, click to navigate
function initDropdown() {
  const dropdowns = document.querySelectorAll('.dropdown');
  
  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector('.dropdown-toggle');
    const menu = dropdown.querySelector('.dropdown-menu');
    
    if (toggle && menu) {
      // Show dropdown on hover
      dropdown.addEventListener('mouseenter', function() {
        // Close all other dropdowns first
        document.querySelectorAll('.dropdown-menu.show').forEach(openMenu => {
          if (openMenu !== menu) {
            openMenu.classList.remove('show');
          }
        });
        
        menu.classList.add('show');
      });
      
      // Hide dropdown on mouse leave (with small delay)
      dropdown.addEventListener('mouseleave', function() {
        setTimeout(() => {
          menu.classList.remove('show');
        }, 100);
      });
      
      // Allow click on toggle to navigate (don't prevent default)
      // The href will handle navigation naturally
    }
  });
  
  // Close all dropdowns when clicking outside
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.dropdown')) {
      document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
        menu.classList.remove('show');
      });
    }
  });
  
  // Close dropdown on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
        menu.classList.remove('show');
      });
    }
  });
}

// Property storage system
let propertyListings = JSON.parse(localStorage.getItem('propertyListings') || '[]');

// Initialize all functionality when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  initSearch();
  initDropdown();
  initFilters();
  initSellForm();
  initMultiStepForm();
  initAdvancedSearch();
  handleURLParameters();
  loadDynamicProperties();
  initParallax3D();
  initScrollAnimations();
  initCounters();
});

// Note: Map functionality is handled inline in buy.html and rent.html using Leaflet

// Filter functionality for rent page
function initFilters() {
  const filterSelects = document.querySelectorAll('.filter-bar select');
  filterSelects.forEach(select => {
    select.addEventListener('change', function() {
      applyFilters();
    });
  });
}

function applyFilters() {
  const budgetSelect = document.querySelector('.filter-bar select:nth-child(1)');
  const typeSelect = document.querySelector('.filter-bar select:nth-child(2)');
  const furnishingSelect = document.querySelector('.filter-bar select:nth-child(3)');
  
  const listings = document.querySelectorAll('.property-card');
  
  listings.forEach(card => {
    let showCard = true;
    
    // Apply budget filter (simplified logic)
    if (budgetSelect && budgetSelect.value && budgetSelect.value !== 'Budget') {
      const priceText = card.querySelector('p').textContent;
      // Add budget filtering logic here if needed
    }
    
    // Apply type filter (simplified logic)
    if (typeSelect && typeSelect.value && typeSelect.value !== 'Property Type') {
      const title = card.querySelector('h3').textContent.toLowerCase();
      if (!title.includes(typeSelect.value.toLowerCase())) {
        showCard = false;
      }
    }
    
    card.style.display = showCard ? 'block' : 'none';
  });
}

// Sell form functionality
function initSellForm() {
  const sellForm = document.getElementById('sellForm');
  if (sellForm) {
    sellForm.addEventListener('submit', function(e) {
      e.preventDefault();
      handleSellFormSubmission();
    });
  }
}

function handleSellFormSubmission() {
  const form = document.getElementById('sellForm');
  const formData = new FormData(form);
  
  // Get form values
  const title = formData.get('title');
  const type = formData.get('type');
  const location = formData.get('location');
  const price = formData.get('price');
  const contact = formData.get('contact');
  const description = formData.get('description');
  
  // Basic validation
  if (!title || !type || !location || !price || !contact) {
    alert('Please fill in all required fields.');
    return;
  }
  
  // Simulate form submission
  alert(`Property listing submitted successfully!\n\nTitle: ${title}\nType: ${type}\nLocation: ${location}\nPrice: ₹${price}\nContact: ${contact}`);
  
  // Reset form
  form.reset();
}

// Multi-Step Form Functionality
let currentStep = 1;
const totalSteps = 4;

function initMultiStepForm() {
  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');
  const submitBtn = document.getElementById('submitBtn');
  const form = document.getElementById('multiStepForm');
  const imageInput = document.getElementById('propertyImages');
  
  if (!nextBtn) return; // Not on sell page
  
  nextBtn.addEventListener('click', () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        currentStep++;
        showStep(currentStep);
      }
    }
  });
  
  prevBtn.addEventListener('click', () => {
    if (currentStep > 1) {
      currentStep--;
      showStep(currentStep);
    }
  });
  
  if (imageInput) {
    imageInput.addEventListener('change', handleImageUpload);
  }
  
  if (form) {
    form.addEventListener('submit', handleMultiStepSubmit);
  }
}

function showStep(step) {
  // Hide all steps
  const steps = document.querySelectorAll('.form-step');
  const progressSteps = document.querySelectorAll('.step');
  
  steps.forEach(s => s.classList.remove('active'));
  progressSteps.forEach(s => s.classList.remove('active'));
  
  // Show current step
  const currentFormStep = document.querySelector(`[data-step="${step}"]`);
  const currentProgressStep = document.querySelector(`.step[data-step="${step}"]`);
  
  if (currentFormStep) currentFormStep.classList.add('active');
  if (currentProgressStep) currentProgressStep.classList.add('active');
  
  // Update navigation buttons
  const nextBtn = document.getElementById('nextBtn');
  const prevBtn = document.getElementById('prevBtn');
  const submitBtn = document.getElementById('submitBtn');
  
  prevBtn.style.display = step > 1 ? 'block' : 'none';
  
  if (step === totalSteps) {
    nextBtn.style.display = 'none';
    submitBtn.style.display = 'block';
    populateReview();
  } else {
    nextBtn.style.display = 'block';
    submitBtn.style.display = 'none';
  }
}

function validateStep(step) {
  const currentFormStep = document.querySelector(`.form-step[data-step="${step}"]`);
  const requiredFields = currentFormStep.querySelectorAll('[required]');
  
  let isValid = true;
  requiredFields.forEach(field => {
    if (!field.value.trim()) {
      field.style.borderColor = '#e74c3c';
      isValid = false;
    } else {
      field.style.borderColor = 'var(--border-color)';
    }
  });
  
  if (!isValid) {
    alert('Please fill in all required fields.');
  }
  
  return isValid;
}

function handleImageUpload(event) {
  const files = Array.from(event.target.files);
  const preview = document.getElementById('imagePreview');
  
  preview.innerHTML = '';
  
  files.forEach((file, index) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const previewItem = document.createElement('div');
        previewItem.className = 'preview-item';
        previewItem.innerHTML = `
          <img src="${e.target.result}" alt="Preview ${index + 1}">
          <button type="button" class="remove-image" onclick="removeImage(${index})">×</button>
        `;
        preview.appendChild(previewItem);
      };
      reader.readAsDataURL(file);
    }
  });
}

function removeImage(index) {
  const input = document.getElementById('propertyImages');
  const dt = new DataTransfer();
  const files = Array.from(input.files);
  
  files.forEach((file, i) => {
    if (i !== index) {
      dt.items.add(file);
    }
  });
  
  input.files = dt.files;
  handleImageUpload({ target: input });
}

function populateReview() {
  const form = document.getElementById('multiStepForm');
  const formData = new FormData(form);
  const reviewContainer = document.getElementById('reviewContainer');
  
  const data = {
    title: formData.get('title'),
    type: formData.get('type'),
    listing_type: formData.get('listing_type'),
    location: formData.get('location'),
    bedrooms: formData.get('bedrooms'),
    bathrooms: formData.get('bathrooms'),
    area: formData.get('area'),
    price: formData.get('price'),
    furnishing: formData.get('furnishing'),
    owner_name: formData.get('owner_name'),
    contact: formData.get('contact'),
    email: formData.get('email'),
    description: formData.get('description')
  };
  
  reviewContainer.innerHTML = `
    <div class="review-section">
      <h3>Basic Information</h3>
      <div class="review-item"><strong>Title:</strong> <span>${data.title}</span></div>
      <div class="review-item"><strong>Type:</strong> <span>${data.type}</span></div>
      <div class="review-item"><strong>Listing For:</strong> <span>${data.listing_type}</span></div>
      <div class="review-item"><strong>Location:</strong> <span>${data.location}</span></div>
    </div>
    
    <div class="review-section">
      <h3>Property Details</h3>
      <div class="review-item"><strong>Bedrooms:</strong> <span>${data.bedrooms || 'Not specified'}</span></div>
      <div class="review-item"><strong>Bathrooms:</strong> <span>${data.bathrooms || 'Not specified'}</span></div>
      <div class="review-item"><strong>Area:</strong> <span>${data.area} sq.ft</span></div>
      <div class="review-item"><strong>Price:</strong> <span>₹${Number(data.price).toLocaleString()}</span></div>
      <div class="review-item"><strong>Furnishing:</strong> <span>${data.furnishing || 'Not specified'}</span></div>
    </div>
    
    <div class="review-section">
      <h3>Contact Information</h3>
      <div class="review-item"><strong>Owner:</strong> <span>${data.owner_name}</span></div>
      <div class="review-item"><strong>Contact:</strong> <span>${data.contact}</span></div>
      <div class="review-item"><strong>Email:</strong> <span>${data.email}</span></div>
    </div>
    
    ${data.description ? `
    <div class="review-section">
      <h3>Description</h3>
      <p>${data.description}</p>
    </div>
    ` : ''}
  `;
}

function handleMultiStepSubmit(event) {
  event.preventDefault();
  
  const form = document.getElementById('multiStepForm');
  const formData = new FormData(form);
  
  const propertyData = {
    id: Date.now().toString(),
    title: formData.get('title'),
    type: formData.get('type'),
    listing_type: formData.get('listing_type'),
    location: formData.get('location'),
    bedrooms: formData.get('bedrooms'),
    bathrooms: formData.get('bathrooms'),
    area: formData.get('area'),
    price: formData.get('price'),
    furnishing: formData.get('furnishing'),
    owner_name: formData.get('owner_name'),
    contact: formData.get('contact'),
    email: formData.get('email'),
    description: formData.get('description'),
    date_added: new Date().toISOString(),
    images: [] // In a real app, you'd upload images to a server
  };
  
  // Add to property listings
  propertyListings.push(propertyData);
  localStorage.setItem('propertyListings', JSON.stringify(propertyListings));
  
  // Show success message
  alert(`Property listing submitted successfully!\n\nYour property "${propertyData.title}" has been added to our listings.\n\nIt will appear on the ${propertyData.listing_type === 'sell' ? 'Buy' : 'Rent'} page.`);
  
  // Reset form and redirect
  form.reset();
  currentStep = 1;
  showStep(1);
  
  // Redirect to appropriate page
  setTimeout(() => {
    window.location.href = propertyData.listing_type === 'sell' ? 'buy.html' : 'rent.html';
  }, 2000);
}

// Load dynamic properties on buy/rent pages
function loadDynamicProperties() {
  const currentPage = window.location.pathname;
  const propertyList = document.querySelector('.property-list');
  
  if (!propertyList || propertyListings.length === 0) return;
  
  let filteredProperties = [];
  
  if (currentPage.includes('buy.html')) {
    filteredProperties = propertyListings.filter(p => p.listing_type === 'sell');
  } else if (currentPage.includes('rent.html')) {
    filteredProperties = propertyListings.filter(p => p.listing_type === 'rent');
  }
  
  if (filteredProperties.length > 0) {
    // Add user properties to existing ones
    filteredProperties.forEach(property => {
      const propertyCard = createPropertyCard(property);
      propertyList.appendChild(propertyCard);
    });
  }
}

function createPropertyCard(property) {
  const card = document.createElement('div');
  card.className = 'property-card';
  
  const priceText = property.listing_type === 'rent' 
    ? `₹${Number(property.price).toLocaleString()}/month`
    : `₹${Number(property.price).toLocaleString()}`;
    
  const bhkText = property.bedrooms 
    ? `${property.bedrooms} BHK · `
    : '';
    
  const bathText = property.bathrooms
    ? `${property.bathrooms} Bath · `
    : '';
  
  card.innerHTML = `
    <img src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=250&fit=crop" alt="${property.title}">
    <h3>${property.title}</h3>
    <p class="price">${priceText}</p>
    <p>${property.area} sq.ft · ${bhkText}${bathText}${property.furnishing || ''}</p>
    <p>${property.location}</p>
    <p><strong>Contact:</strong> ${property.contact}</p>
    <p><small>Listed by: ${property.owner_name}</small></p>
  `;
  
  return card;
}

// Parallax and 3D scroll animations
function initParallax3D() {
  // Set background images from data attributes
  document.querySelectorAll('.parallax-section').forEach(section => {
    const bg = section.getAttribute('data-bg-image');
    if (bg) section.style.backgroundImage = `url('${bg}')`;
  });

  // Parallax effect on scroll
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    document.querySelectorAll('.parallax-section').forEach(section => {
      const speed = 0.4;
      section.style.backgroundPositionY = -(scrolled * speed) + 'px';
    });
  });

  // Floating shapes parallax
  window.addEventListener('mousemove', (e) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth - 0.5) * 2;
    const y = (e.clientY / innerHeight - 0.5) * 2;

    document.querySelectorAll('.floating-element, .shape').forEach(el => {
      el.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
    });
  });
}

function initScrollAnimations() {
  const animatedEls = document.querySelectorAll('[data-scroll]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const anim = el.getAttribute('data-scroll');
        const delay = parseInt(el.getAttribute('data-delay') || '0', 10);
        setTimeout(() => {
          el.classList.add('animated', `anim-${anim}`);
        }, delay);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.2 });

  animatedEls.forEach(el => observer.observe(el));
}

function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-count]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'), 10);
        let current = 0;
        const duration = 1500;
        const steps = 60;
        const increment = Math.ceil(target / steps);
        const interval = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(interval);
          }
          el.textContent = current.toLocaleString();
        }, duration / steps);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

// Advanced Search and Filtering
function initAdvancedSearch() {
  const searchBtn = document.getElementById('searchBtn');
  const searchInput = document.getElementById('searchLocation');
  const propertyTypeFilter = document.getElementById('propertyTypeFilter');
  const budgetFilter = document.getElementById('budgetFilter');
  const bhkFilter = document.getElementById('bhkFilter');
  const clearFiltersBtn = document.getElementById('clearFilters');
  
  if (!searchBtn) return; // Not on buy/rent page
  
  // Search button click
  searchBtn.addEventListener('click', performAdvancedSearch);
  
  // Search on Enter key
  if (searchInput) {
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        performAdvancedSearch();
      }
    });
  }
  
  // Filter changes
  [propertyTypeFilter, budgetFilter, bhkFilter].forEach(filter => {
    if (filter) {
      filter.addEventListener('change', performAdvancedSearch);
    }
  });
  
  // Clear filters
  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener('click', clearAllFilters);
  }
}

function performAdvancedSearch() {
  const searchInput = document.getElementById('searchLocation');
  const propertyTypeFilter = document.getElementById('propertyTypeFilter');
  const budgetFilter = document.getElementById('budgetFilter');
  const bhkFilter = document.getElementById('bhkFilter');
  const propertyCards = document.querySelectorAll('.property-card');
  
  const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
  const typeFilter = propertyTypeFilter ? propertyTypeFilter.value : '';
  const budgetRange = budgetFilter ? budgetFilter.value : '';
  const bhkValue = bhkFilter ? bhkFilter.value : '';
  
  propertyCards.forEach(card => {
    let showCard = true;
    
    const title = card.querySelector('h3').textContent.toLowerCase();
    const location = card.querySelector('p:last-of-type').textContent.toLowerCase();
    
    // Text search
    if (searchTerm && !title.includes(searchTerm) && !location.includes(searchTerm)) {
      showCard = false;
    }
    
    // Property type filter
    if (typeFilter && !title.includes(typeFilter.toLowerCase())) {
      showCard = false;
    }
    
    // BHK filter
    if (bhkValue && !title.includes(bhkValue + ' bhk')) {
      showCard = false;
    }
    
    // Budget filter (simplified)
    if (budgetRange) {
      const priceElement = card.querySelector('.price');
      if (priceElement) {
        const priceText = priceElement.textContent.replace(/[^₹\d]/g, '');
        const price = parseInt(priceText.replace('₹', ''));
        
        if (budgetRange === '0-50' && price > 5000000) showCard = false;
        else if (budgetRange === '50-100' && (price < 5000000 || price > 10000000)) showCard = false;
        else if (budgetRange === '100-200' && (price < 10000000 || price > 20000000)) showCard = false;
        else if (budgetRange === '200-500' && (price < 20000000 || price > 50000000)) showCard = false;
        else if (budgetRange === '500+' && price < 50000000) showCard = false;
      }
    }
    
    card.style.display = showCard ? 'block' : 'none';
  });
  
  updateResultsCount();
}

function clearAllFilters() {
  const searchInput = document.getElementById('searchLocation');
  const propertyTypeFilter = document.getElementById('propertyTypeFilter');
  const budgetFilter = document.getElementById('budgetFilter');
  const bhkFilter = document.getElementById('bhkFilter');
  const propertyCards = document.querySelectorAll('.property-card');
  
  // Reset all inputs
  if (searchInput) searchInput.value = '';
  if (propertyTypeFilter) propertyTypeFilter.value = '';
  if (budgetFilter) budgetFilter.value = '';
  if (bhkFilter) bhkFilter.value = '';
  
  // Show all cards
  propertyCards.forEach(card => {
    card.style.display = 'block';
  });
  
  updateResultsCount();
}

function updateResultsCount() {
  const visibleCards = document.querySelectorAll('.property-card:not([style*="display: none"])');
  const totalCards = document.querySelectorAll('.property-card');
  
  let resultsText = document.querySelector('.results-count');
  if (!resultsText) {
    resultsText = document.createElement('p');
    resultsText.className = 'results-count';
    resultsText.style.cssText = `
      text-align: center;
      margin: 20px 0;
      font-size: 16px;
      color: var(--text-medium);
      font-weight: 600;
    `;
    const propertyList = document.querySelector('.property-list');
    if (propertyList) {
      propertyList.parentNode.insertBefore(resultsText, propertyList);
    }
  }
  
  resultsText.textContent = `Showing ${visibleCards.length} of ${totalCards.length} properties`;
}

// Testimonial Carousel Functions
let currentTestimonialIndex = 1;
const totalTestimonials = 3;

function changeTestimonial(step) {
  currentTestimonialIndex += step;
  if (currentTestimonialIndex > totalTestimonials) currentTestimonialIndex = 1;
  if (currentTestimonialIndex < 1) currentTestimonialIndex = totalTestimonials;
  showTestimonial(currentTestimonialIndex);
}

function currentTestimonial(n) {
  currentTestimonialIndex = n;
  showTestimonial(currentTestimonialIndex);
}

function showTestimonial(n) {
  const cards = document.querySelectorAll('.testimonial-3d-card');
  const dots = document.querySelectorAll('.dot');
  
  cards.forEach(card => card.classList.remove('active'));
  dots.forEach(dot => dot.classList.remove('active'));
  
  if (cards[n - 1]) cards[n - 1].classList.add('active');
  if (dots[n - 1]) dots[n - 1].classList.add('active');
}

// Auto-rotate testimonials (pause on hover could be added if needed)
setInterval(() => {
  if (document.querySelector('.testimonials-section')) {
    changeTestimonial(1);
  }
}, 5000);

// Handle URL parameters for property filtering
function handleURLParameters() {
  const urlParams = new URLSearchParams(window.location.search);
  const propertyType = urlParams.get('type');
  
  if (propertyType && window.location.pathname.includes('buy.html')) {
    // Set the property type filter
    const propertyTypeFilter = document.getElementById('propertyTypeFilter');
    if (propertyTypeFilter) {
      propertyTypeFilter.value = propertyType;
      // Trigger the search with the selected type
      setTimeout(() => {
        performAdvancedSearch();
      }, 100);
    }
  }
}
