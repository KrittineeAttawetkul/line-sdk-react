import Swal from 'sweetalert2';
import './popUp.css'


export const POPUP = {
    successPopUp,
    warningPopUp,
    erroePopUp,
    textAreaPopUp
};

function successPopUp(content) {
    Swal.fire({
        title: content.title,
        text: content.text,
        html: content.html,
        icon: "success",
        confirmButtonText: 'เรียบร้อย',
        confirmButtonColor: "#29AE4C",
        width: 350,
        allowOutsideClick: false,
        customClass: {
            popup: 'custom-popup', // Add a custom class to the popup
            text: 'custom-text',
            confirmButton: 'custom-button', // Add a custom class to the confirm button
        }
    }).then(() => {
        // Call the function if it exists
        if (content.function) {
            content.function();
        }
    });
}

function warningPopUp(content) {
    Swal.fire({
        title: content.title,
        text: content.text,
        icon: "warning",
        confirmButtonText: 'ปิด',
        confirmButtonColor: "#C7C7C7",
        width: 350,
        allowOutsideClick: false,
        customClass: {
            popup: 'custom-popup', // Add a custom class to the popup
            title: 'custom-title',
            content: 'custom-text',
            confirmButton: 'custom-button', // Add a custom class to the confirm button
        }
    }).then(() => {
        // Call the function if it exists
        if (content.function) {
            content.function();
        }
    });
}

function erroePopUp(content) {
    Swal.fire({
        title: content.title,
        text: content.text,
        icon: "error",
        confirmButtonText: 'ปิด',
        confirmButtonColor: "#C7C7C7",
        width: 350,
        allowOutsideClick: false,
        customClass: {
            popup: 'custom-popup', // Add a custom class to the popup
            title: 'custom-title',
            content: 'custom-text',
            confirmButton: 'custom-button', // Add a custom class to the confirm button
        }
    }).then(() => {
        // Call the function if it exists
        if (content.function) {
            content.function();
        }
    });
}

function textAreaPopUp(content) {
    Swal.fire({
        input: "textarea",
        inputLabel: content.inputLabel,
        inputPlaceholder: content.inputPlaceholder,
        inputAttributes: {
            style: "height: 200px;",
        },
        confirmButtonText: 'ตกลง',
        showCancelButton: true,
        cancelButtonText: 'ยกเลิก',
        allowOutsideClick: false,
        customClass: {
            popup: 'custom-popup', // Add a custom class to the popup
            inputLabel: 'custom-input-label',
            input: 'custom-textarea',
            inputPlaceholder: 'custom-input-placeholder',
            confirmButton: 'custom-confirm-button', // Add a custom class to the confirm button
            cancelButton: 'custom-cancel-button',// Add a custom class to the cancel button // Add a custom class to the textarea
        }
    })
}
