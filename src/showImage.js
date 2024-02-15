/*import React, { useState, useEffect } from 'react';
const showImage = () => {
        const fileInput = document.getElementById('validationCustom06');
        const previewImage = document.getElementById('previewImage');

        const handleImageChange = () => {
            const file = fileInput.files[0];

            if (file) {
                const reader = new FileReader();

                reader.onload = function (e) {
                    previewImage.src = e.target.result;
                };

                reader.readAsDataURL(file);
            } else {
                previewImage.src = '';
            }
        };

        fileInput.addEventListener('change', handleImageChange);

        // Cleanup function to remove the event listener when the component is unmounted
        return () => {
            fileInput.removeEventListener('change', handleImageChange);
        };
};

export default showImage;
*/