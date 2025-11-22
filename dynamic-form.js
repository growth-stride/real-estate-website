// Dynamic Form Handler for Different Property Categories

// Property categories and their corresponding types
const propertyCategories = {
    residential: ['apartment', 'house', 'villa', 'penthouse', 'duplex', 'studio', 'farmhouse'],
    commercial: ['office', 'shop', 'commercial', 'warehouse', 'industrial', 'coworking'],
    land: ['plot', 'agricultural', 'commercial-plot', 'industrial-plot']
};

// Get property category from selected type
function getPropertyCategory(propertyType) {
    for (const [category, types] of Object.entries(propertyCategories)) {
        if (types.includes(propertyType)) {
            return category;
        }
    }
    return 'residential'; // default
}

// Fields to show/hide based on category
const fieldVisibility = {
    residential: {
        show: [
            'bedrooms', 'bathrooms', 'balconies', 'parking', 'furnishing',
            'floor', 'totalFloors', 'servantRoom', 'studyRoom', 'poojaRoom',
            'terrace', 'carpetArea', 'superArea', 'facing', 'overlooking',
            'maintenanceCharge', 'gatedSecurity', 'plotArea'
        ],
        hide: []
    },
    commercial: {
        show: [
            'area', 'carpetArea', 'superArea', 'floor', 'totalFloors',
            'parking', 'furnishing', 'cafeteria', 'conferenceRoom',
            'reception', 'pantry', 'washrooms', 'ac', 'fireSystem'
        ],
        hide: [
            'bedrooms', 'bathrooms', 'balconies', 'servantRoom',
            'studyRoom', 'poojaRoom', 'terrace', 'facing', 'overlooking',
            'maintenanceCharge', 'gatedSecurity'
        ]
    },
    land: {
        show: [
            'area', 'plotArea', 'boundaryWall', 'cornerPlot', 'roadWidth',
            'plotLength', 'plotWidth', 'zoning', 'landUse'
        ],
        hide: [
            'bedrooms', 'bathrooms', 'balconies', 'parking', 'furnishing',
            'floor', 'totalFloors', 'servantRoom', 'studyRoom', 'poojaRoom',
            'terrace', 'carpetArea', 'superArea', 'facing', 'overlooking',
            'maintenanceCharge', 'gatedSecurity'
        ]
    }
};

// Initialize form category handler
function initializeDynamicForm() {
    const propertyTypeSelect = document.getElementById('propertyType');
    
    if (!propertyTypeSelect) return;
    
    // Hide all Step 2 content initially
    hideAllStep2Fields();
    
    propertyTypeSelect.addEventListener('change', function() {
        const selectedType = this.value;
        if (!selectedType) return;
        
        const category = getPropertyCategory(selectedType);
        // Store category for later use
        propertyTypeSelect.setAttribute('data-category', category);
        updateStepTitles(category);
    });
    
    // Use MutationObserver to detect when step 2 becomes active
    const step2 = document.querySelector('[data-step="2"]');
    if (step2) {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    if (step2.classList.contains('active')) {
                        const selectedType = propertyTypeSelect.value;
                        if (selectedType) {
                            const category = getPropertyCategory(selectedType);
                            console.log('Step 2 activated, showing fields for:', category);
                            updateFormFields(category);
                        }
                    }
                }
            });
        });
        
        observer.observe(step2, {
            attributes: true,
            attributeFilter: ['class']
        });
    }
}

// Hide all Step 2 fields initially
function hideAllStep2Fields() {
    const step2 = document.querySelector('[data-step="2"]');
    if (!step2) return;
    
    // Hide all sections in Step 2 initially
    const sections = step2.querySelectorAll('.form-section-header, .form-row, .form-group');
    sections.forEach(section => {
        section.style.display = 'none';
    });
}

// Show all base fields for any category
function showBaseFields() {
    const step2 = document.querySelector('[data-step="2"]');
    if (!step2) return;
    
    // Show common fields that appear in all categories
    const baseFieldIds = ['area', 'price', 'pricePerSqft'];
    baseFieldIds.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            const formGroup = field.closest('.form-group');
            if (formGroup) {
                formGroup.style.display = 'block';
                const formRow = formGroup.closest('.form-row');
                if (formRow) formRow.style.display = 'flex';
            }
        }
    });
    
    // Show section headers for pricing
    const pricingHeader = step2.querySelector('.form-section-header h3');
    if (pricingHeader && pricingHeader.textContent.includes('💰')) {
        pricingHeader.closest('.form-section-header').style.display = 'block';
    }
}

// Update form fields based on category
function updateFormFields(category) {
    const visibility = fieldVisibility[category];
    
    // First, hide everything
    hideAllStep2Fields();
    
    // Show base fields
    showBaseFields();
    
    // Show category-specific fields
    if (category === 'residential') {
        showResidentialFields();
    } else if (category === 'commercial') {
        showCommercialFields();
    } else if (category === 'land') {
        showLandFields();
    }
    
    // Update labels and placeholders
    updateFieldLabels(category);
}

// Show residential-specific fields
function showResidentialFields() {
    const step2 = document.querySelector('[data-step="2"]');
    if (!step2) return;
    
    console.log('🏠 showResidentialFields() called - hiding commercial and land sections');
    
    // FIRST: Hide commercial and land sections
    hideCommercialFields();
    hideLandFields();
    
    // SECOND: Show residential section headers
    const headers = step2.querySelectorAll('.form-section-header');
    headers.forEach(header => {
        const headerText = header.querySelector('h3')?.textContent || '';
        // Show residential-relevant headers
        if (headerText.includes('🏠') || headerText.includes('💰') || 
            headerText.includes('🏡') || headerText.includes('🛋') || 
            headerText.includes('📍') || headerText.includes('✨') || 
            headerText.includes('📐')) {
            header.style.display = 'block';
        }
    });
    
    const residentialFields = [
        'bedrooms', 'bathrooms', 'area', 'carpetArea', 'superArea',
        'price', 'pricePerSqft', 'priceNegotiable', 'maintenanceCharge',
        'balconies', 'parking', 'servantRoom', 'studyRoom', 'poojaRoom', 'terrace',
        'furnishing', 'floor', 'totalFloors', 'propertyAge', 'facing', 'overlooking',
        'ownership', 'propertyApproved', 'waterSupply', 'electricityStatus',
        'possessionStatus', 'transactionType', 'gatedSecurity',
        'streetAddress', 'locality', 'landmark', 'city', 'state', 'pincode2', 'country'
    ];
    
    residentialFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            const formGroup = field.closest('.form-group');
            if (formGroup) {
                formGroup.style.display = 'block';
                const formRow = formGroup.closest('.form-row');
                if (formRow) formRow.style.display = 'flex';
            }
        }
    });
    
    // Show amenities section
    const amenitiesSection = step2.querySelector('.amenities-checkbox-grid');
    if (amenitiesSection) {
        amenitiesSection.closest('.form-group').style.display = 'block';
        const amenitiesHeader = Array.from(headers).find(h => h.querySelector('h3')?.textContent?.includes('✨'));
        if (amenitiesHeader) amenitiesHeader.style.display = 'block';
    }
    
    console.log('✅ RESIDENTIAL FIELDS SHOWN | Shown: BHK, bathrooms, balconies, floors, furnishing, parking, amenities');
}

// Hide residential-specific fields
function hideResidentialFields() {
    const residentialFields = [
        'bedrooms', 'bathrooms', 'balconies', 'servantRoom',
        'studyRoom', 'poojaRoom', 'terrace', 'carpetArea', 
        'superArea', 'facing', 'overlooking', 'maintenanceCharge'
    ];
    
    residentialFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            const formGroup = field.closest('.form-group');
            if (formGroup) {
                formGroup.style.display = 'none';
                // Remove required attribute
                field.removeAttribute('required');
            }
        }
    });
}

// Show commercial-specific fields
function showCommercialFields() {
    const step2 = document.querySelector('[data-step="2"]');
    if (!step2) return;
    
    console.log('🏢 showCommercialFields() called - hiding ALL residential-only fields');
    
    // FIRST: Hide land section
    hideLandFields();
    const existingCommercialSection = document.getElementById('commercial-fields');
    if (existingCommercialSection) {
        existingCommercialSection.style.display = 'none';
    }
    
    // SECOND: FORCE HIDE all residential-only fields
    const residentialOnlyFields = [
        'bedrooms', 'bathrooms', 'balconies', 'servantRoom', 'studyRoom', 'poojaRoom',
        'terrace', 'facing', 'overlooking', 'maintenanceCharge', 'priceNegotiable',
        'plotArea', 'transactionType', 'possessionStatus'
    ];
    
    console.log('🚫 Hiding residential fields:', residentialOnlyFields);
    
    residentialOnlyFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            const formGroup = field.closest('.form-group');
            if (formGroup) {
                formGroup.style.display = 'none';
                console.log(`✅ Hidden: ${fieldId}`);
            } else {
                console.warn(`⚠️ No form-group found for: ${fieldId}`);
            }
        } else {
            console.warn(`⚠️ Field not found: ${fieldId}`);
        }
                const formRow = formGroup.closest('.form-row');
                if (formRow) {
                    const visibleGroups = formRow.querySelectorAll('.form-group');
                    let allHidden = true;
                    visibleGroups.forEach(g => {
                        if (g.style.display !== 'none') allHidden = false;
                    });
                    if (allHidden) formRow.style.display = 'none';
                }
            }
            field.removeAttribute('required');
        }
    });
    
    // THIRD: Hide residential section headers
    const headers = step2.querySelectorAll('.form-section-header');
    headers.forEach(header => {
        const headerText = header.querySelector('h3')?.textContent || '';
        if (headerText.includes('🏠 Property Configuration') || 
            headerText.includes('🏡 Additional Rooms')) {
            header.style.display = 'none';
        }
    });
    
    // Hide amenities that don't apply to commercial
    const amenitiesGrid = step2.querySelector('.amenities-checkbox-grid');
    if (amenitiesGrid) {
        const amenitiesHeader = Array.from(headers).find(h => h.querySelector('h3')?.textContent?.includes('✨'));
        if (amenitiesHeader) amenitiesHeader.style.display = 'none';
        const amenitiesContainer = amenitiesGrid.closest('.form-group');
        if (amenitiesContainer) amenitiesContainer.style.display = 'none';
    
    // FOURTH: Show ONLY commercial-relevant fields
    const commercialFields = ['area', 'carpetArea', 'superArea', 'floor', 'totalFloors',
                              'price', 'pricePerSqft', 'parking', 'furnishing', 'propertyAge',
                              'ownership', 'propertyApproved', 'waterSupply', 'electricityStatus',
                              'gatedSecurity', 'streetAddress', 'locality', 'landmark',
                              'city', 'state', 'pincode2', 'country'];
    
    commercialFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            const formGroup = field.closest('.form-group');
            if (formGroup) {
                formGroup.style.display = 'block';
                const formRow = formGroup.closest('.form-row');
                if (formRow) formRow.style.display = 'flex';
            }
        }
    });
    
    // FIFTH: Show ONLY commercial-relevant section headers
    headers.forEach(header => {
        const headerText = header.querySelector('h3')?.textContent || '';
        // Show area, pricing, furnishing, address headers
        if (headerText.includes('📐 Area') || headerText.includes('💰 Pricing') || 
            headerText.includes('🛋') || headerText.includes('📍 Complete') || 
            headerText.includes('📝 Additional')) {
            header.style.display = 'block';
        } else {
            header.style.display = 'none';
        }
    });
    
    let commercialSection = document.getElementById('commercial-fields');
    
    if (!commercialSection) {
        commercialSection = document.createElement('div');
        commercialSection.id = 'commercial-fields';
        commercialSection.className = 'commercial-specific';
        commercialSection.innerHTML = `
            <div class="form-section-header">
                <h3>🏢 Commercial Property Details</h3>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="commercialType">Commercial Type *</label>
                    <select id="commercialType" name="commercial_type">
                        <option value="">Select Type</option>
                        <option value="retail">Retail Shop</option>
                        <option value="office">Office Space</option>
                        <option value="showroom">Showroom</option>
                        <option value="warehouse">Warehouse</option>
                        <option value="industrial">Industrial Unit</option>
                        <option value="restaurant">Restaurant Space</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="washrooms">Number of Washrooms *</label>
                    <select id="washrooms" name="washrooms">
                        <option value="">Select</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5+</option>
                    </select>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="cabins">Private Cabins</label>
                    <input type="number" id="cabins" name="cabins" placeholder="e.g., 3" min="0">
                </div>
                
                <div class="form-group">
                    <label for="meetingRooms">Meeting Rooms</label>
                    <input type="number" id="meetingRooms" name="meeting_rooms" placeholder="e.g., 2" min="0">
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="pantry">Pantry/Kitchen</label>
                    <select id="pantry" name="pantry">
                        <option value="">Select</option>
                        <option value="none">No</option>
                        <option value="basic">Basic</option>
                        <option value="full">Fully Equipped</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="ac">Air Conditioning</label>
                    <select id="ac" name="air_conditioning">
                        <option value="">Select</option>
                        <option value="none">No AC</option>
                        <option value="partial">Partial AC</option>
                        <option value="central">Central AC</option>
                        <option value="vrf">VRF System</option>
                    </select>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="fireSystem">Fire Safety System</label>
                    <select id="fireSystem" name="fire_system">
                        <option value="">Select</option>
                        <option value="none">No</option>
                        <option value="basic">Basic (Extinguishers)</option>
                        <option value="sprinkler">Sprinkler System</option>
                        <option value="full">Full Fire Safety</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="ceiling">Ceiling Height (ft)</label>
                    <input type="number" id="ceiling" name="ceiling_height" placeholder="e.g., 12" min="8" max="50">
                </div>
            </div>
        `;
        
        // Insert BEFORE the address section
        const addressHeader = Array.from(headers).find(h => 
            h.querySelector('h3')?.textContent?.includes('📍')
        );
        if (addressHeader) {
            addressHeader.before(commercialSection);
        } else {
            // Fallback: insert after furnishing section
            const furnishingHeader = Array.from(headers).find(h => h.querySelector('h3')?.textContent?.includes('🛋'));
            if (furnishingHeader) {
                let insertAfter = furnishingHeader;
                while (insertAfter.nextElementSibling && !insertAfter.nextElementSibling.classList.contains('form-section-header')) {
                    insertAfter = insertAfter.nextElementSibling;
                }
                insertAfter.after(commercialSection);
            } else {
                const configSection = step2.querySelector('.form-section-header');
                if (configSection) {
                    configSection.after(commercialSection);
                }
            }
        }
    } else {
        commercialSection.style.display = 'block';
    }
    
    console.log('✅ COMMERCIAL FIELDS SHOWN | Hidden: BHK, bathrooms, balconies, terrace, facing | Shown: Washrooms, Cabins, AC, Area, Floor, Parking, Address');
}

// Hide commercial-specific fields
function hideCommercialFields() {
    const commercialSection = document.getElementById('commercial-fields');
    if (commercialSection) {
        commercialSection.style.display = 'none';
    }
}

// Show land-specific fields
function showLandFields() {
    const step2 = document.querySelector('[data-step="2"]');
    if (!step2) return;
    
    console.log('🌾 showLandFields() called - hiding ALL building/residential fields');
    
    // FIRST: Hide commercial and land sections if they exist
    hideCommercialFields();
    const existingLandSection = document.getElementById('land-fields');
    if (existingLandSection) {
        existingLandSection.style.display = 'none';
    }
    
    // SECOND: FORCE HIDE ALL residential and building fields
    const allBuildingFields = [
        'bedrooms', 'bathrooms', 'balconies', 'servantRoom', 'studyRoom', 'poojaRoom',
        'terrace', 'facing', 'overlooking', 'maintenanceCharge', 'floor', 'totalFloors',
        'furnishing', 'carpetArea', 'superArea', 'parking', 'gatedSecurity',
        'possessionStatus', 'transactionType', 'propertyAge', 'plotArea', 'priceNegotiable'
    ];
    
    allBuildingFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            const formGroup = field.closest('.form-group');
            if (formGroup) {
                formGroup.style.display = 'none';
                const formRow = formGroup.closest('.form-row');
                if (formRow) {
                    // Check if ALL children in this row are hidden
                    const visibleGroups = formRow.querySelectorAll('.form-group');
                    let allHidden = true;
                    visibleGroups.forEach(g => {
                        if (g.style.display !== 'none') allHidden = false;
                    });
                    if (allHidden) formRow.style.display = 'none';
                }
            }
            field.removeAttribute('required');
        }
    });
    
    // THIRD: Hide residential-specific section headers
    const headers = step2.querySelectorAll('.form-section-header');
    headers.forEach(header => {
        const headerText = header.querySelector('h3')?.textContent || '';
        if (headerText.includes('🏠') || headerText.includes('🏡') || 
            headerText.includes('🛋') || headerText.includes('📐 Area Details')) {
            header.style.display = 'none';
        }
    });
    
    // Hide amenities section (not needed for land)
    const amenitiesGrid = step2.querySelector('.amenities-checkbox-grid');
    if (amenitiesGrid) {
        const amenitiesContainer = amenitiesGrid.closest('.form-group') || amenitiesGrid.closest('.form-section-header')?.nextElementSibling;
        if (amenitiesContainer) amenitiesContainer.style.display = 'none';
        const amenitiesHeader = Array.from(headers).find(h => h.querySelector('h3')?.textContent?.includes('✨'));
        if (amenitiesHeader) amenitiesHeader.style.display = 'none';
    }
    
    // FOURTH: Show ONLY land-relevant common fields
    const landCommonFields = ['area', 'price', 'pricePerSqft',
                              'ownership', 'propertyApproved', 'waterSupply', 'electricityStatus',
                              'streetAddress', 'locality', 'landmark', 'city', 'state', 'pincode2', 'country'];
    
    landCommonFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            const formGroup = field.closest('.form-group');
            if (formGroup) {
                formGroup.style.display = 'block';
                const formRow = formGroup.closest('.form-row');
                if (formRow) formRow.style.display = 'flex';
            }
        }
    });
    
    // FIFTH: Show ONLY land-relevant section headers
    headers.forEach(header => {
        const headerText = header.querySelector('h3')?.textContent || '';
        // Show ONLY pricing, address, and additional info headers
        if (headerText.includes('💰 Pricing') || headerText.includes('📍 Complete') || headerText.includes('📝 Additional')) {
            header.style.display = 'block';
        } else {
            // Hide all other headers
            header.style.display = 'none';
        }
    });
    
    let landSection = document.getElementById('land-fields');
    
    if (!landSection) {
        landSection = document.createElement('div');
        landSection.id = 'land-fields';
        landSection.className = 'land-specific';
        landSection.innerHTML = `
            <div class="form-section-header">
                <h3>🌾 Land Details</h3>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="plotLength">Plot Length (ft) *</label>
                    <input type="number" id="plotLength" name="plot_length" placeholder="e.g., 60" min="1" required>
                </div>
                
                <div class="form-group">
                    <label for="plotWidth">Plot Width (ft) *</label>
                    <input type="number" id="plotWidth" name="plot_width" placeholder="e.g., 40" min="1" required>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="boundaryWall">Boundary Wall</label>
                    <select id="boundaryWall" name="boundary_wall">
                        <option value="">Select</option>
                        <option value="none">No Boundary</option>
                        <option value="partial">Partial Boundary</option>
                        <option value="full">Fully Walled</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="cornerPlot">Corner Plot</label>
                    <select id="cornerPlot" name="corner_plot">
                        <option value="">Select</option>
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                    </select>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="roadWidth">Main Road Width (ft)</label>
                    <input type="number" id="roadWidth" name="road_width" placeholder="e.g., 30" min="1">
                </div>
                
                <div class="form-group">
                    <label for="roadFacing">Road Facing</label>
                    <select id="roadFacing" name="road_facing">
                        <option value="">Select</option>
                        <option value="single">Single Road</option>
                        <option value="double">Double Road</option>
                        <option value="triple">Triple Road</option>
                    </select>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="zoning">Zoning/Usage *</label>
                    <select id="zoning" name="zoning" required>
                        <option value="">Select Zoning</option>
                        <option value="residential">Residential</option>
                        <option value="commercial">Commercial</option>
                        <option value="industrial">Industrial</option>
                        <option value="agricultural">Agricultural</option>
                        <option value="mixed">Mixed Use</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="constructionAllowed">Construction Allowed</label>
                    <select id="constructionAllowed" name="construction_allowed">
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                        <option value="restricted">With Restrictions</option>
                    </select>
                </div>
            </div>
            
            <div class="form-row">
                <div class="form-group">
                    <label for="soilType">Soil Type</label>
                    <select id="soilType" name="soil_type">
                        <option value="">Select</option>
                        <option value="clay">Clay</option>
                        <option value="sandy">Sandy</option>
                        <option value="loamy">Loamy</option>
                        <option value="rocky">Rocky</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="terrain">Terrain</label>
                    <select id="terrain" name="terrain">
                        <option value="">Select</option>
                        <option value="flat">Flat</option>
                        <option value="slope">Slope</option>
                        <option value="undulating">Undulating</option>
                    </select>
                </div>
            </div>
        `;
        
        // Insert BEFORE the address section
        const addressHeader = Array.from(headers).find(h => 
            h.querySelector('h3')?.textContent?.includes('📍')
        );
        if (addressHeader) {
            addressHeader.before(landSection);
        } else {
            // Fallback: insert after pricing section
            const pricingHeader = Array.from(headers).find(h => h.querySelector('h3')?.textContent?.includes('💰'));
            if (pricingHeader) {
                let insertAfter = pricingHeader;
                // Find all elements between this header and next header
                while (insertAfter.nextElementSibling && !insertAfter.nextElementSibling.classList.contains('form-section-header')) {
                    insertAfter = insertAfter.nextElementSibling;
                }
                insertAfter.after(landSection);
            } else {
                step2.appendChild(landSection);
            }
        }
    } else {
        landSection.style.display = 'block';
    }
    
    console.log('✅ LAND FIELDS SHOWN | Hidden: BHK, bathrooms, balconies, floors, furnishing, parking, amenities | Shown: Area, Price, Land details, Address');
}

// Hide land-specific fields
function hideLandFields() {
    const landSection = document.getElementById('land-fields');
    if (landSection) {
        landSection.style.display = 'none';
    }
    
    // Show area fields
    ['carpetArea', 'superArea'].forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            const formGroup = field.closest('.form-group');
            if (formGroup) formGroup.style.display = 'block';
        }
    });
}

// Update step titles based on category
function updateStepTitles(category) {
    const step2 = document.querySelector('[data-step="2"] h2');
    if (step2) {
        if (category === 'commercial') {
            step2.textContent = 'Commercial Property Details';
        } else if (category === 'land') {
            step2.textContent = 'Land Details';
        } else {
            step2.textContent = 'Property Details';
        }
    }
}

// Update field labels based on category
function updateFieldLabels(category) {
    const areaLabel = document.querySelector('label[for="area"]');
    if (areaLabel) {
        if (category === 'land') {
            areaLabel.textContent = 'Total Land Area (sq.ft) *';
        } else if (category === 'commercial') {
            areaLabel.textContent = 'Total Area (sq.ft) *';
        } else {
            areaLabel.textContent = 'Built-up Area (sq.ft) *';
        }
    }
}

// Initialize conditional field logic
function initializeConditionalFields() {
    // Listing Type - Show rent-specific fields only for rent
    const listingTypeSelect = document.getElementById('listingType');
    if (listingTypeSelect) {
        listingTypeSelect.addEventListener('change', function() {
            const rentFields = ['expectedRent', 'securityDeposit'];
            rentFields.forEach(fieldId => {
                const field = document.getElementById(fieldId);
                if (field) {
                    const formGroup = field.closest('.form-group');
                    if (formGroup) {
                        if (this.value === 'rent') {
                            formGroup.style.display = 'block';
                            field.setAttribute('required', 'required');
                        } else {
                            formGroup.style.display = 'none';
                            field.removeAttribute('required');
                            field.value = '';
                        }
                    }
                }
            });
        });
    }
    
    // Possession Status - Show date picker only for under-construction
    const possessionStatus = document.getElementById('possessionStatus');
    const possessionDateGroup = document.getElementById('possessionDateGroup');
    if (possessionStatus && possessionDateGroup) {
        possessionStatus.addEventListener('change', function() {
            if (this.value === 'under-construction') {
                possessionDateGroup.style.display = 'block';
                document.getElementById('possessionDate')?.setAttribute('required', 'required');
            } else {
                possessionDateGroup.style.display = 'none';
                document.getElementById('possessionDate')?.removeAttribute('required');
            }
        });
    }
    
    // Property Age - Show possession date for under-construction
    const propertyAge = document.getElementById('propertyAge');
    if (propertyAge) {
        propertyAge.addEventListener('change', function() {
            if (this.value === 'under-construction' && possessionDateGroup) {
                possessionDateGroup.style.display = 'block';
            }
        });
    }
    
    // Furnishing Status - Show furnishing details only if semi/fully furnished
    const furnishingSelect = document.getElementById('furnishing');
    if (furnishingSelect) {
        furnishingSelect.addEventListener('change', function() {
            handleFurnishingDetails(this.value);
        });
    }
    
    // Transaction Type - Show resale-specific fields
    const transactionType = document.getElementById('transactionType');
    if (transactionType) {
        transactionType.addEventListener('change', function() {
            handleTransactionTypeFields(this.value);
        });
    }
    
    // Parking - Show parking details based on selection
    const parkingSelect = document.getElementById('parking');
    if (parkingSelect) {
        parkingSelect.addEventListener('change', function() {
            handleParkingDetails(this.value);
        });
    }
    
    // Calculate price per sqft automatically
    const priceInput = document.getElementById('price');
    const areaInput = document.getElementById('area');
    const pricePerSqftInput = document.getElementById('pricePerSqft');
    
    function calculatePricePerSqft() {
        if (priceInput && areaInput && pricePerSqftInput) {
            const price = parseFloat(priceInput.value);
            const area = parseFloat(areaInput.value);
            if (price && area && area > 0) {
                const pricePerSqft = Math.round(price / area);
                pricePerSqftInput.value = pricePerSqft.toLocaleString('en-IN');
            }
        }
    }
    
    if (priceInput) priceInput.addEventListener('input', calculatePricePerSqft);
    if (areaInput) areaInput.addEventListener('input', calculatePricePerSqft);
}

// Handle furnishing details
function handleFurnishingDetails(furnishingStatus) {
    let furnishingDetailsSection = document.getElementById('furnishing-details-section');
    
    if (furnishingStatus === 'semi-furnished' || furnishingStatus === 'fully-furnished') {
        if (!furnishingDetailsSection) {
            furnishingDetailsSection = document.createElement('div');
            furnishingDetailsSection.id = 'furnishing-details-section';
            furnishingDetailsSection.innerHTML = `
                <div class="form-section-header">
                    <h3>🛋️ Furnishing Details</h3>
                </div>
                <div class="form-group">
                    <label>What's Included?</label>
                    <div class="amenities-checkbox-grid">
                        <label class="checkbox-item">
                            <input type="checkbox" name="furnishing_items" value="beds">
                            <span>🛏️ Beds</span>
                        </label>
                        <label class="checkbox-item">
                            <input type="checkbox" name="furnishing_items" value="wardrobe">
                            <span>🚪 Wardrobes</span>
                        </label>
                        <label class="checkbox-item">
                            <input type="checkbox" name="furnishing_items" value="sofa">
                            <span>🛋️ Sofa</span>
                        </label>
                        <label class="checkbox-item">
                            <input type="checkbox" name="furnishing_items" value="dining-table">
                            <span>🍽️ Dining Table</span>
                        </label>
                        <label class="checkbox-item">
                            <input type="checkbox" name="furnishing_items" value="ac">
                            <span>❄️ Air Conditioner</span>
                        </label>
                        <label class="checkbox-item">
                            <input type="checkbox" name="furnishing_items" value="tv">
                            <span>📺 TV</span>
                        </label>
                        <label class="checkbox-item">
                            <input type="checkbox" name="furnishing_items" value="fridge">
                            <span>🧊 Refrigerator</span>
                        </label>
                        <label class="checkbox-item">
                            <input type="checkbox" name="furnishing_items" value="washing-machine">
                            <span>🧺 Washing Machine</span>
                        </label>
                        <label class="checkbox-item">
                            <input type="checkbox" name="furnishing_items" value="stove">
                            <span>🔥 Stove/Cooktop</span>
                        </label>
                        <label class="checkbox-item">
                            <input type="checkbox" name="furnishing_items" value="microwave">
                            <span>📻 Microwave</span>
                        </label>
                        <label class="checkbox-item">
                            <input type="checkbox" name="furnishing_items" value="geyser">
                            <span>🚿 Geyser/Water Heater</span>
                        </label>
                        <label class="checkbox-item">
                            <input type="checkbox" name="furnishing_items" value="curtains">
                            <span>🪟 Curtains/Blinds</span>
                        </label>
                    </div>
                </div>
            `;
            
            const furnishingSelect = document.getElementById('furnishing');
            const parentSection = furnishingSelect.closest('.form-section-header')?.parentElement;
            if (parentSection) {
                const nextSection = parentSection.querySelector('.form-section-header:nth-of-type(2)');
                if (nextSection) {
                    nextSection.before(furnishingDetailsSection);
                }
            }
        }
        furnishingDetailsSection.style.display = 'block';
    } else if (furnishingDetailsSection) {
        furnishingDetailsSection.style.display = 'none';
    }
}

// Handle transaction type fields
function handleTransactionTypeFields(transactionType) {
    let resaleSection = document.getElementById('resale-details-section');
    
    if (transactionType === 'resale') {
        if (!resaleSection) {
            resaleSection = document.createElement('div');
            resaleSection.id = 'resale-details-section';
            resaleSection.innerHTML = `
                <div class="form-row">
                    <div class="form-group">
                        <label for="ageOfProperty">Age of Construction</label>
                        <select id="ageOfProperty" name="age_of_property">
                            <option value="">Select</option>
                            <option value="0-1">Less than 1 year</option>
                            <option value="1-3">1-3 years</option>
                            <option value="3-5">3-5 years</option>
                            <option value="5-10">5-10 years</option>
                            <option value="10+">More than 10 years</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="previousOwners">Number of Previous Owners</label>
                        <input type="number" id="previousOwners" name="previous_owners" placeholder="e.g., 1" min="0" max="10">
                    </div>
                </div>
            `;
            
            const transactionSelect = document.getElementById('transactionType');
            const formGroup = transactionSelect.closest('.form-row');
            if (formGroup) {
                formGroup.after(resaleSection);
            }
        }
        resaleSection.style.display = 'block';
    } else if (resaleSection) {
        resaleSection.style.display = 'none';
    }
}

// Handle parking details
function handleParkingDetails(parkingValue) {
    let parkingDetailsSection = document.getElementById('parking-details-section');
    
    if (parkingValue && parkingValue !== '0') {
        if (!parkingDetailsSection) {
            parkingDetailsSection = document.createElement('div');
            parkingDetailsSection.id = 'parking-details-section';
            parkingDetailsSection.innerHTML = `
                <div class="form-row">
                    <div class="form-group">
                        <label for="parkingType">Parking Type</label>
                        <select id="parkingType" name="parking_type">
                            <option value="">Select</option>
                            <option value="covered">Covered</option>
                            <option value="open">Open</option>
                            <option value="stilt">Stilt Parking</option>
                            <option value="basement">Basement</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="parkingCharges">Parking Charges (if any)</label>
                        <input type="number" id="parkingCharges" name="parking_charges" placeholder="₹ per month" min="0">
                    </div>
                </div>
            `;
            
            const parkingSelect = document.getElementById('parking');
            const formGroup = parkingSelect.closest('.form-row');
            if (formGroup) {
                formGroup.after(parkingDetailsSection);
            }
        }
        parkingDetailsSection.style.display = 'block';
    } else if (parkingDetailsSection) {
        parkingDetailsSection.style.display = 'none';
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeDynamicForm();
    initializeConditionalFields();
});
