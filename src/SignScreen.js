import React, { useState, useEffect, useRef } from 'react';
import infosList from './infosList';
import InfoImage from './InfoImage';
import { Link } from 'react-router-dom';

function SignUpForm() {
    const [allFormsValidated, setAllFormsValidated] = useState(false);
    const formsRef = useRef([]);

    useEffect(() => {
        formsRef.current = document.querySelectorAll('.needs-validation');

        Array.from(formsRef.current).forEach(form => {
            form.addEventListener('submit', handleFormSubmit, false);

            const confirmPasswordInput = form.querySelector('#validationCustom05');
            confirmPasswordInput.addEventListener('input', () => {
                confirmPasswordInput.setCustomValidity('')
            });
        });

        return () => {
            Array.from(formsRef.current).forEach(form => {
                form.removeEventListener('submit', handleFormSubmit);
            });
        };
    }, []);

    function handleFormSubmit(event) {
        event.preventDefault();
        const form = event.target;
        if (!form.checkValidity() || !validatePassword(form)) {
            event.stopPropagation();
        } else {
            sendDataToServer(form);
        }

        form.classList.add('was-validated');

    }

    function validatePassword(form) {
        const passwordInput = form.querySelector('#validationCustom04');
        const confirmPasswordInput = form.querySelector('#validationCustom05');

        if (passwordInput.value !== confirmPasswordInput.value) {
            alert('passwords do not match')
            confirmPasswordInput.setCustomValidity('Passwords do not match')
            return false;
        }
        return true;
    }
    function readImageFile() {
        const fileInput = document.getElementById('validationCustom06');
        const file = fileInput.files[0];

        return new Promise((resolve, reject) => {
            if (!file) {
                reject(new Error('No file selected'));
            }

            const reader = new FileReader();

            reader.onload = function () {
                resolve(reader.result);
            };

            reader.onerror = function (error) {
                reject(error);
            };

            reader.readAsDataURL(file);
        });
    }


    async function sendDataToServer(form) {
            const imageData = await readImageFile();
            const response = await fetch('http://localhost:12345/api/users', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userName: document.getElementById('validationCustom03').value,
                    password: document.getElementById('validationCustom04').value,
                    firstName: document.getElementById('validationCustom01').value,
                    lastName: document.getElementById('validationCustom02').value,
                    profilePic: imageData,
                })
            });

            if (response.status === 409) {
                alert('UserName already exists. Try another username');
            } else if (response.ok) {
                const data = await response.json();
                console.log('Server response:', data);
                setAllFormsValidated(true);
            } 
        
    }

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
        <div className="col-lg-7 col-s-1" openingscree="true" id='openingScreen'>
            <form className="row g-3 needs-validation SignUpScreen d-flex p-2" noValidate>
                {infosList}
                <InfoImage />
                <div className="col-12">
                    <button className="btn btn-primary" id="danger-btn" name="move1" type="submit">Sign Up</button>

                    {allFormsValidated &&
                        <Link to='/'>
                            <button className='btn btn-primary'>
                                Welcome! Log In
                            </button>
                        </Link>
                    }
                </div>
            </form>
        </div>
    );
}

export default SignUpForm;
