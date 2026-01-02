// Global state
let allUsecases = [];
let filteredUsecases = [];
let selectedCategories = new Set();
let selectedIndustries = new Set();
let selectedTechStacks = new Set();
let searchQuery = '';

// Load and initialize
async function init() {
    try {
        // Load data from both sources
        await loadUsecases();

        // Initialize UI
        populateFilters();
        applyFilters();

        // Set up event listeners
        setupEventListeners();

        console.log(`Successfully loaded ${allUsecases.length} use cases`);
    } catch (error) {
        console.error('Error initializing app:', error);
    }
}

// Load use cases from JSON file and usecases.js
async function loadUsecases() {
    try {
        allUsecases = [];

        // Load from usecases_101.json with cache busting
        try {
            const timestamp = new Date().getTime();
            const response1 = await fetch(`usecases_101.json?v=${timestamp}`);
            if (response1.ok) {
                const jsonData1 = await response1.json();
                allUsecases = [...allUsecases, ...jsonData1];
                console.log(`Loaded ${jsonData1.length} use cases from usecases_101.json`);
            } else {
                console.warn(`Could not load usecases_101.json: Status ${response1.status}`);
            }
        } catch (e) {
            console.warn('Could not load usecases_101.json:', e);
        }

        // Load from usecases.js (which sets window.additionalUsecases)
        if (typeof window.additionalUsecases !== 'undefined' && Array.isArray(window.additionalUsecases)) {
            allUsecases = [...allUsecases, ...window.additionalUsecases];
            console.log(`Loaded ${window.additionalUsecases.length} use cases from usecases.js`);
        } else {
            console.warn('window.additionalUsecases is not defined or not an array');
        }

        // Ensure each usecase has a valid ID
        allUsecases = allUsecases.map((uc, index) => {
            // Only assign ID if missing, or if it's the 0-100 range (from 101.json) ensure it's 1-based
            // Actually, best to trust the source IDs if they exist and are unique.
            // But for safety and the gap check, let's just use the ID if present.
            return {
                ...uc,
                usecase_id: uc.usecase_id || (index + 1)
            };
        });

    } catch (error) {
        console.error('Error loading use cases:', error);
        allUsecases = [];
    }
}

// Extract unique categories and industries
function getUniqueValues(key) {
    const values = new Set();
    allUsecases.forEach(uc => {
        if (uc[key]) {
            values.add(uc[key]);
        }
    });
    return Array.from(values).sort();
}

// Populate filter checkboxes
function populateFilters() {
    const categories = getUniqueValues('category');
    const industries = getUniqueValues('industry');

    // Get unique tech stack items
    const techStackSet = new Set();
    allUsecases.forEach(uc => {
        if (uc.sections && uc.sections.tech_stack && uc.sections.tech_stack.items) {
            uc.sections.tech_stack.items.forEach(item => techStackSet.add(item));
        }
    });
    const techStacks = Array.from(techStackSet).sort();

    const categoryContainer = document.getElementById('categoryFilters');
    const industryContainer = document.getElementById('industryFilters');
    const techStackContainer = document.getElementById('techStackFilters');

    // Populate categories
    categories.forEach(category => {
        const div = document.createElement('div');
        div.className = 'filter-option';
        div.innerHTML = `
            <input type="checkbox" id="cat-${category}" value="${category}" data-filter="category">
            <label for="cat-${category}">${category}</label>
        `;
        categoryContainer.appendChild(div);
    });

    // Populate industries
    industries.forEach(industry => {
        const div = document.createElement('div');
        div.className = 'filter-option';
        div.innerHTML = `
            <input type="checkbox" id="ind-${industry}" value="${industry}" data-filter="industry">
            <label for="ind-${industry}">${industry}</label>
        `;
        industryContainer.appendChild(div);
    });

    // Populate tech stacks (limit to top 30 for performance/UI if list is huge, or all)
    techStacks.forEach(tech => {
        const div = document.createElement('div');
        div.className = 'filter-option';
        div.innerHTML = `
            <input type="checkbox" id="tech-${tech.replace(/\s+/g, '-')}" value="${tech}" data-filter="tech-stack">
            <label for="tech-${tech.replace(/\s+/g, '-')}">${tech}</label>
        `;
        techStackContainer.appendChild(div);
    });
}

// Set up event listeners
function setupEventListeners() {
    // Search input
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase();
        applyFilters();
    });

    // Filter checkboxes
    document.querySelectorAll('input[type="checkbox"][data-filter]').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const filterType = e.target.dataset.filter;
            const value = e.target.value;

            if (filterType === 'category') {
                if (e.target.checked) {
                    selectedCategories.add(value);
                } else {
                    selectedCategories.delete(value);
                }
            } else if (filterType === 'industry') {
                if (e.target.checked) {
                    selectedIndustries.add(value);
                } else {
                    selectedIndustries.delete(value);
                }
            } else if (filterType === 'tech-stack') {
                if (e.target.checked) {
                    selectedTechStacks.add(value);
                } else {
                    selectedTechStacks.delete(value);
                }
            }

            applyFilters();
        });
    });

    // Modal close
    const modal = document.getElementById('usecaseModal');
    const overlay = modal.querySelector('.modal-overlay');
    const closeBtn = modal.querySelector('.modal-close');

    overlay.addEventListener('click', closeModal);
    closeBtn.addEventListener('click', closeModal);
}

// Apply filters and search
function applyFilters() {
    filteredUsecases = allUsecases.filter(uc => {
        // Category filter
        if (selectedCategories.size > 0 && !selectedCategories.has(uc.category)) {
            return false;
        }

        // Industry filter
        if (selectedIndustries.size > 0 && !selectedIndustries.has(uc.industry)) {
            return false;
        }

        // Tech Stack filter
        if (selectedTechStacks.size > 0) {
            const ucTech = new Set(uc.sections?.tech_stack?.items || []);
            // Check if ANY selected tech is present (OR logic) or ALL (AND logic)? Usually OR for same group.
            // Let's go with OR logic for filters within the same group, AND across groups.
            // Check if at least one selected tech is in the use case's tech stack
            let hasMatch = false;
            for (const tech of selectedTechStacks) {
                if (ucTech.has(tech)) {
                    hasMatch = true;
                    break;
                }
            }
            if (!hasMatch) return false;
        }

        // Search filter
        if (searchQuery) {
            const searchableText = [
                uc.title,
                uc.summary,
                uc.category,
                uc.industry,
                ...(uc.sections?.tech_stack?.items || [])
            ].join(' ').toLowerCase();

            if (!searchableText.includes(searchQuery)) {
                return false;
            }
        }

        return true;
    });

    renderUsecases();
    updateResultsCount();
}

// Render use case cards
function renderUsecases() {
    const grid = document.getElementById('usecasesGrid');

    if (filteredUsecases.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: #999;">No use cases found matching your criteria.</p>';
        return;
    }

    grid.innerHTML = filteredUsecases.map(uc => {
        const techStack = uc.sections?.tech_stack?.items || [];
        const displayTags = techStack.slice(0, 3);
        const remainingCount = techStack.length - 3;

        return `
            <div class="usecase-card" onclick="openModal(${uc.usecase_id})">
                <div class="usecase-header">
                    <h3 class="usecase-title">${uc.title}</h3>
                    <span class="usecase-category">${uc.category || 'General'}</span>
                </div>
                <p class="usecase-summary">${uc.summary}</p>
                ${techStack.length > 0 ? `
                    <div class="usecase-tags">
                        ${displayTags.map((tag, idx) => `
                            <span class="tag ${idx === 0 ? 'tag-primary' : idx === 1 ? 'tag-secondary' : 'tag-tertiary'}">${tag}</span>
                        `).join('')}
                        ${remainingCount > 0 ? `<span class="tag tag-tertiary">+${remainingCount} more</span>` : ''}
                    </div>
                ` : ''}
                <span class="view-details">Click to view full details →</span>
            </div>
        `;
    }).join('');
}

// Update results count
function updateResultsCount() {
    const countElement = document.getElementById('resultsCount');
    countElement.textContent = `Showing ${filteredUsecases.length} of ${allUsecases.length} use cases`;
}

// Open modal with use case details
function openModal(usecaseId) {
    const usecase = allUsecases.find(uc => uc.usecase_id === usecaseId);
    if (!usecase) return;

    const modal = document.getElementById('usecaseModal');
    const modalBody = document.getElementById('modalBody');

    const sections = usecase.sections || {};
    const businessChallenge = sections.business_challenge || {};
    const techStack = sections.tech_stack || {};
    const blueprint = sections.blueprint || {};

    modalBody.innerHTML = `
        <h2 class="modal-title">${usecase.title}</h2>
        
        <div class="modal-categories">
            <span class="modal-category-tag primary">${usecase.category || 'General'}</span>
            ${usecase.industry ? `<span class="modal-category-tag secondary">${usecase.industry}</span>` : ''}
        </div>
        
        ${usecase.summary ? `
            <div class="modal-section">
                <h3 class="section-heading">
                    <span class="section-icon">📄</span>
                    Summary
                </h3>
                <div class="section-content">${usecase.summary}</div>
            </div>
        ` : ''}
        
        ${businessChallenge.content ? `
            <div class="modal-section">
                <h3 class="section-heading">
                    <span class="section-icon">💼</span>
                    ${businessChallenge.heading || 'Business challenge'}
                </h3>
                <div class="section-content">${businessChallenge.content}</div>
            </div>
        ` : ''}
        
        ${techStack.items && techStack.items.length > 0 ? `
            <div class="modal-section">
                <h3 class="section-heading">
                    <span class="section-icon">⚙️</span>
                    ${techStack.heading || 'Tech stack'}
                </h3>
                <div class="tech-stack-items">
                    ${techStack.items.map(item => `
                        <span class="tech-tag">${item}</span>
                    `).join('')}
                </div>
            </div>
        ` : ''}
        
        ${blueprint.content ? `
            <div class="modal-section">
                <h3 class="section-heading">
                    <span class="section-icon">🔧</span>
                    ${blueprint.heading || 'Blueprint'}
                </h3>
                <div class="blueprint-steps">${formatBlueprint(blueprint.content)}</div>
            </div>
        ` : ''}
        
        <div class="modal-section source-section">
            <h3 class="section-heading">
                <span class="section-icon">🔗</span>
                Source
            </h3>
            <div class="section-content">
                <a href="${usecase.source_url || '#'}" target="_blank" class="source-link" contenteditable="true" onblur="console.log('New link:', this.innerText)">${usecase.source_url || 'Add source link...'}</a>
            </div>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    const modal = document.getElementById('usecaseModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Format blueprint content with arrows
function formatBlueprint(content) {
    // Replace arrows with styled arrows
    return content
        .replace(/->/g, '<span style="color: #d4a24a; font-weight: bold;"> → </span>')
        .replace(/➝/g, '<span style="color: #d4a24a; font-weight: bold;"> → </span>');
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);
