import React, { useState, useEffect } from 'react';
import infosList from './infosList';
import InfoImage from './InfoImage';
import showImage from './showImage';
function SignUpForm() {
    const [validationErrors, setValidationErrors] = useState({});
   

    useEffect(() => {
        const forms = document.querySelectorAll('.needs-validation');

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
                hideValidationMessage(confirmPasswordInput);
            });
        });

        function validatePassword(form) {
            const passwordInput = form.querySelector('#validationCustom04');
            const confirmPasswordInput = form.querySelector('#validationCustom05');

            if (passwordInput.value !== confirmPasswordInput.value) {
                alert('passwords do not match')
                displayValidationMessage(confirmPasswordInput, 'Passwords do not match');
                return false;
            }
            return true;
        }

        function displayValidationMessage(element, message) {
            element.setCustomValidity(message);
        }

        function hideValidationMessage(element) {
            element.setCustomValidity('');
        }
    }, []);

    useEffect(() => {
        const fileInput = document.getElementById('validationCustom06');
        const previewImage = document.getElementById('previewImage');

        fileInput.addEventListener('change', function () {
            const file = this.files[0];

            if (file) {
                const reader = new FileReader();

                reader.onload = function (e) {
                    previewImage.src = e.target.result;
                };

                reader.readAsDataURL(file);
            } else {
                previewImage.src = '';
            }
        });
    }, []);

    return (

        <div className="col-lg-7 col-s-1">
            <form className="row g-3 needs-validation SignUpScreen d-flex p-2" noValidate>
                {infosList}
                <InfoImage />
                <div className="col-12">
                    <button className="btn btn-primary" id="danger-btn" name="move1" type="submit">Sign Up</button>
                </div>
            </form>
        </div>
    );
}

export default SignUpForm;