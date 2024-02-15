/*import React, { useState, useEffect } from 'react';
import infosList from './infosList';
import InfoImage from './InfoImage';
import showImage from './showImage';
const forms = document.querySelectorAll('.needs-validation');

const CheckValidate = function () { 
    const [validationErrors, setValidationErrors] = useState({});

Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
        if (!form.checkValidity() || !validatePassword(form)) {
            event.preventDefault();
            event.stopPropagation();
        }

        form.classList.add('was-validated');
    }, false);

    const confirmPasswordInput = form.querySelector('#validationCustom05');
    confirmPasswordInput.addEventListener('input', () => {
*//*                hideValidationMessage(confirmPasswordInput);
*//*                confirmPasswordInput.setCustomValidity('');
    });
});

function validatePassword(form) {
    const passwordInput = form.querySelector('#validationCustom04');
    const confirmPasswordInput = form.querySelector('#validationCustom05');

    if (passwordInput.value !== confirmPasswordInput.value) {
        alert('passwords do not match')
        confirmPasswordInput.setCustomValidity('Passwords do not match');*//* if there is problem with the passwords check on ווצאפ איפה שכתבתי !!*//*
        return false;
    }
    return true;
    }
}
export default CheckValidate;*/