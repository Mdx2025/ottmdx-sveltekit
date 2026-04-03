document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');
    const errorMessageDiv = document.getElementById('error-message');
    const last_message = document.getElementById('last-message');
    const submit_btn = document.getElementById('submit-button');
    const endpoint = 'https://wordpress-1263703-4570132.cloudwaysapps.com/wp-json/contact-form-7/v1/contact-forms/6/feedback'
    const successMessageDiv = document.createElement('div');
    successMessageDiv.id = 'success-message';

    const fields = {
        name: document.getElementById('name'),
        phone: document.getElementById('phone'),
        email: document.getElementById('email'),
        scaling: document.querySelectorAll('input[name="scaling"]'),
        meaning: document.querySelectorAll('input[name="meaning"]'),
        income: document.querySelectorAll('input[name="income"]'),
        message: document.getElementById('message')
    };

    const validations = {
        name:value => /^[a-zA-ZÀ-ÿ\s]+$/.test(value.trim()),
        phone: value => /^\d{10,15}$/.test(value.replace(/\D/g, '')),
        email: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        scaling: () => Array.from(fields.scaling).some(input => input.checked),
        meaning: () => Array.from(fields.meaning).some(input => input.checked),
        income: () => Array.from(fields.income).some(input => input.checked),
        message: value => value.trim().length >= 10
    };

    const clear_fields = () => {
        fields.name.value = '';
        fields.phone.value = '';
        fields.email.value = '';
        fields.scaling.forEach(input => input.checked = false);
        fields.meaning.forEach(input => input.checked = false);
        fields.income.forEach(input => input.checked = false);
        fields.message.value = '';
    }

    const validateField = (field, value) => {
        const isValid = validations[field](value);
        const fieldElements = fields[field] instanceof NodeList ? fields[field] : [fields[field]];
        
        fieldElements.forEach(el => {
            if (isValid) {
                el.classList.remove('error');
                el.classList.add('success');
            } else {
                el.classList.remove('success');
                el.classList.add('error');
            }
        });
        return isValid;
    };

    const checkAllFieldsValid = () => {
        let allValid = true;
        Object.keys(fields).forEach(field => {
            const fieldElements = fields[field] instanceof NodeList ? fields[field] : [fields[field]];
            let value;
            if (fieldElements[0].type === 'radio') {
                value = ''; 
            } else {
                value = fieldElements[0].value;
            }
            if (!validateField(field, value)) {
                allValid = false;
            }
        });
        return allValid;
    };

    Object.keys(fields).forEach(field => {
        const fieldElements = fields[field] instanceof NodeList ? fields[field] : [fields[field]];
        
        fieldElements.forEach(el => {
            el.addEventListener('input', (e) => {
                if (e.target.type === 'radio') {
                    validateField(field, '');
                } else {
                    validateField(field, e.target.value);
                }
                if (checkAllFieldsValid()) {
                    errorMessageDiv.textContent = '';
                }
            });
        });
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        errorMessageDiv.textContent = '';
        successMessageDiv.textContent = '';
        let allValid = true;

        Object.keys(fields).forEach(field => {
            const fieldElements = fields[field] instanceof NodeList ? fields[field] : [fields[field]];
            let value;
            if (fieldElements[0].type === 'radio') {
                value = ''; 
            } else {
                value = fieldElements[0].value;
            }
            
            if (!validations[field](value)) {
                allValid = false;
                validateField(field, value);
            }
        });

        if (allValid) {
            errorMessageDiv.textContent = '';
            submit_btn.innerHTML = `
                <img class="arrow light" src="/icons/arrow_black.svg" alt="subscribe" loading="lazy" />
                <div class="loader"></div>
            `
            submit_btn.disabled = true;
            const formData = new FormData();
            formData.append('_wpcf7_unit_tag', 'wpcf7-f6-o1');
            formData.append('your_name', fields.name.value);
            formData.append('your_phone', fields.phone.value);
            formData.append('your_email', fields.email.value);
            formData.append('scaling', Array.from(fields.scaling).find(input => input.checked).value);
            formData.append('meaning', Array.from(fields.meaning).find(input => input.checked).value);
            formData.append('income', Array.from(fields.income).find(input => input.checked).value);
            formData.append('your_message', fields.message.value);

            fetch(endpoint, {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'mail_sent') {
                    successMessageDiv.textContent = 'Message sent successfully, thank you.';
                    successMessageDiv.classList.add('success-message');
                    clear_fields();
                    last_message.appendChild(successMessageDiv);
                    document.querySelectorAll('.success').forEach(el => el.classList.remove('success')); 
                } else {
                    clear_fields();
                    errorMessageDiv.textContent = data.message;
                }
            })

            .catch(error => {
                console.error('Error:', error);
                errorMessageDiv.textContent = 'There was an error submitting the form.';
            })

            .finally(() => {
                submit_btn.disabled = false;
                submit_btn.innerHTML = `
                <img class="arrow light" src="/icons/arrow_black.svg" alt="subscribe" loading="lazy" />
                Submit
                `;
            });
    
        } else {
            errorMessageDiv.textContent = 'Please check all fields are filled in correctly.';
        }
    });
});