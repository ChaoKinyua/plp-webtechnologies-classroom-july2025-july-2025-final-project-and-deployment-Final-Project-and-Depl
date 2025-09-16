// Contact form JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    initializeContactForm();
    prefillFormFromURL();
});

/**
 * Initialize contact form functionality
 */
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    // Add input event listeners for real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearFieldError(input));
    });

    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            this.value = PropertyProUtils.formatPhoneNumber(this.value);
        });
    }

    // Form submission
    contactForm.addEventListener('submit', handleFormSubmission);
}

/**
 * Prefill form from URL parameters (when coming from property page)
 */
function prefillFormFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const subject = urlParams.get('subject');
    const body = urlParams.get('body');

    if (subject) {
        const messageField = document.getElementById('message');
        if (messageField) {
            let message = decodeURIComponent(body || '');
            if (subject) {
                message = `Subject: ${decodeURIComponent(subject)}\n\n${message}`;
            }
            messageField.value = message;
        }
    }
}

/**
 * Handle form submission
 */
async function handleFormSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const formMessage = document.getElementById('formMessage');
    
    // Validate all fields
    if (!validateForm(form)) {
        showFormMessage('Please correct the errors above.', 'error');
        return;
    }
    
    // Show loading state
    const resetLoading = PropertyProUtils.showButtonLoading(submitButton, 'Send Message');
    
    try {
        // Collect form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Simulate API call (in real application, this would be an actual API call)
        await simulateFormSubmission(data);
        
        // Show success message
        showFormMessage('Thank you for your message! We\'ll contact you within 24 hours.', 'success');
        PropertyProUtils.showNotification('Message sent successfully!', 'success');
        
        // Reset form
        form.reset();
        clearAllErrors(form);
        
    } catch (error) {
        console.error('Form submission error:', error);
        showFormMessage('Sorry, there was an error sending your message. Please try again.', 'error');
        PropertyProUtils.showNotification('Error sending message. Please try again.', 'error');
    } finally {
        resetLoading();
    }
}

/**
 * Validate entire form
 */
function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

/**
 * Validate individual field
 */
function validateField(field) {
    const fieldName = field.name;
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Clear previous error
    clearFieldError(field);
    
    // Check if required field is empty
    if (field.hasAttribute('required') && !value) {
        errorMessage = `${getFieldLabel(field)} is required.`;
        isValid = false;
    }
    
    // Field-specific validation
    switch (fieldName) {
        case 'firstName':
        case 'lastName':
            if (value && value.length < 2) {
                errorMessage = `${getFieldLabel(field)} must be at least 2 characters.`;
                isValid = false;
            }
            break;
            
        case 'email':
            if (value && !PropertyProUtils.validateEmail(value)) {
                errorMessage = 'Please enter a valid email address.';
                isValid = false;
            }
            break;
            
        case 'phone':
            if (value && !validatePhoneNumber(value)) {
                errorMessage = 'Please enter a valid phone number.';
                isValid = false;
            }
            break;
            
        case 'message':
            if (value && value.length < 10) {
                errorMessage = 'Message must be at least 10 characters.';
                isValid = false;
            }
            break;
    }
    
    // Show error if validation failed
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

/**
 * Validate phone number format
 */
function validatePhoneNumber(phone) {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length === 10;
}

/**
 * Get field label for error messages
 */
function getFieldLabel(field) {
    const label = field.parentNode.querySelector('label');
    if (label) {
        return label.textContent.replace('*', '').trim();
    }
    return field.name;
}

/**
 * Show field error
 */
function showFieldError(field, message) {
    const errorElement = document.getElementById(field.name + 'Error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    field.classList.add('error');
}

/**
 * Clear field error
 */
function clearFieldError(field) {
    const errorElement = document.getElementById(field.name + 'Error');
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
    
    field.classList.remove('error');
}

/**
 * Clear all form errors
 */
function clearAllErrors(form) {
    const errorMessages = form.querySelectorAll('.error-message');
    errorMessages.forEach(error => {
        error.textContent = '';
        error.style.display = 'none';
    });
    
    const errorFields = form.querySelectorAll('.error');
    errorFields.forEach(field => {
        field.classList.remove('error');
    });
}

/**
 * Show form message
 */
function showFormMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    if (!formMessage) return;
    
    formMessage.textContent = message;
    formMessage.className = `form-message form-message-${type}`;
    formMessage.style.display = 'block';
    
    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
}

/**
 * Simulate form submission (replace with actual API call)
 */
async function simulateFormSubmission(data) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real application, you would send this data to your server
    console.log('Form data submitted:', data);
    
    // Simulate potential network error (uncomment to test error handling)
    // if (Math.random() < 0.1) {
    //     throw new Error('Network error');
    // }
    
    return { success: true };
}

// Add contact form styles
document.addEventListener('DOMContentLoaded', function() {
    addContactFormStyles();
});

/**
 * Add contact form styles
 */
function addContactFormStyles() {
    if (document.getElementById('contactFormStyles')) return;
    
    const styles = document.createElement('style');
    styles.id = 'contactFormStyles';
    styles.textContent = `
        /* Contact Form Styles */
        .contact-section {
            padding: 80px 0;
        }

        .contact-content {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 64px;
            align-items: start;
        }

        .contact-form-container h2 {
            margin-bottom: 16px;
            color: var(--neutral-800);
        }

        .contact-form-container p {
            color: var(--neutral-600);
            margin-bottom: 32px;
        }

        .contact-form {
            background: white;
            padding: 40px;
            border-radius: 16px;
            box-shadow: 0 4px 25px rgba(0, 0, 0, 0.08);
        }

        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 20px;
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-group label {
            display: block;
            margin-bottom: 6px;
            font-weight: 500;
            color: var(--neutral-700);
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
            width: 100%;
            padding: 12px 16px;
            border: 2px solid var(--neutral-200);
            border-radius: 8px;
            font-size: 16px;
            transition: border-color 0.3s ease, box-shadow 0.3s ease;
            background: white;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: var(--primary-color);
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }

        .form-group input.error,
        .form-group select.error,
        .form-group textarea.error {
            border-color: var(--error-color);
        }

        .form-group textarea {
            resize: vertical;
            min-height: 120px;
        }

        .checkbox-group {
            display: flex;
            align-items: flex-start;
            gap: 12px;
        }

        .checkbox-label {
            display: flex;
            align-items: flex-start;
            gap: 8px;
            cursor: pointer;
            font-size: 0.95rem;
            line-height: 1.4;
        }

        .checkbox-label input[type="checkbox"] {
            width: auto;
            margin: 0;
        }

        .error-message {
            display: none;
            color: var(--error-color);
            font-size: 0.875rem;
            margin-top: 4px;
        }

        .form-message {
            display: none;
            padding: 12px 16px;
            border-radius: 8px;
            margin-top: 16px;
            font-weight: 500;
        }

        .form-message-success {
            background: #dcfce7;
            color: #166534;
            border: 1px solid #bbf7d0;
        }

        .form-message-error {
            background: #fef2f2;
            color: #991b1b;
            border: 1px solid #fecaca;
        }

        /* Contact Info Styles */
        .contact-info-card,
        .office-hours-card {
            background: white;
            padding: 32px;
            border-radius: 16px;
            box-shadow: 0 4px 25px rgba(0, 0, 0, 0.08);
            margin-bottom: 24px;
        }

        .contact-info-card h3,
        .office-hours-card h3 {
            margin-bottom: 24px;
            color: var(--neutral-800);
        }

        .contact-item {
            display: flex;
            gap: 16px;
            margin-bottom: 24px;
            align-items: flex-start;
        }

        .contact-item:last-child {
            margin-bottom: 0;
        }

        .contact-icon {
            font-size: 1.5rem;
            width: 40px;
            height: 40px;
            background: var(--neutral-100);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }

        .contact-text h4 {
            margin-bottom: 4px;
            color: var(--neutral-800);
            font-size: 1.1rem;
        }

        .contact-text p {
            margin-bottom: 4px;
            color: var(--neutral-600);
        }

        .contact-note {
            font-size: 0.875rem;
            color: var(--neutral-500) !important;
        }

        .hours-list {
            space-y: 8px;
        }

        .hours-item {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid var(--neutral-200);
        }

        .hours-item:last-child {
            border-bottom: none;
        }

        .hours-item span:first-child {
            font-weight: 500;
            color: var(--neutral-700);
        }

        .hours-item span:last-child {
            color: var(--neutral-600);
        }

        /* Map Section */
        .map-section {
            background: var(--neutral-100);
            padding: 80px 0;
        }

        .map-section h2 {
            text-align: center;
            margin-bottom: 48px;
        }

        .map-container {
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
        }

        .map-placeholder {
            height: 400px;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            text-align: center;
        }

        .map-content h3 {
            margin-bottom: 16px;
            color: white;
        }

        .map-content p {
            margin-bottom: 16px;
            opacity: 0.9;
        }

        .map-content .btn {
            margin-top: 16px;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
            .contact-content {
                grid-template-columns: 1fr;
                gap: 48px;
            }
            
            .contact-form {
                padding: 32px;
            }
        }

        @media (max-width: 768px) {
            .contact-section {
                padding: 60px 0;
            }
            
            .contact-content {
                gap: 32px;
            }
            
            .contact-form {
                padding: 24px;
            }
            
            .form-row {
                grid-template-columns: 1fr;
                gap: 16px;
            }
            
            .contact-info-card,
            .office-hours-card {
                padding: 24px;
            }
            
            .map-section {
                padding: 60px 0;
            }
            
            .map-placeholder {
                height: 300px;
                padding: 20px;
            }
        }

        @media (max-width: 480px) {
            .contact-form {
                padding: 20px;
            }
            
            .contact-info-card,
            .office-hours-card {
                padding: 20px;
            }
            
            .contact-item {
                gap: 12px;
                margin-bottom: 20px;
            }
            
            .contact-icon {
                width: 35px;
                height: 35px;
                font-size: 1.25rem;
            }
        }
    `;
    
    document.head.appendChild(styles);
}