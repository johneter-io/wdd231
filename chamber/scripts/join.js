document.addEventListener("DOMContentLoaded", () => {
    // 1. TIMESTAMP FIELD
    // Fills the hidden field with the exact date and time upon loading
    const timestampInput = document.querySelector("#timestamp");
    if (timestampInput) {
        timestampInput.value = new Date().toISOString();
    }

    // ----------------------------------------------------------------------
    // 2. MODAL CONTROLS (<dialog>)
    const openModalButtons = document.querySelectorAll(".card-link");
    const closeModalButtons = document.querySelectorAll(".modal-close");
    const allModals = document.querySelectorAll(".membership-modal");

    // A. Open the modal corresponding to the clicked button (using the data-modal attribute)
    openModalButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modalId = button.getAttribute("data-modal");
            const targetModal = document.getElementById(modalId);
            
            if (targetModal) {
                targetModal.showModal();
            }
        });
    });

    // B. Close the modal when the “Close” button is clicked
    closeModalButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modal = button.closest("dialog");
            if (modal) {
                modal.close();
            }
        });
    });

    // C. Close the modal if the user clicks on the dark background (backdrop)
    allModals.forEach(modal => {
        modal.addEventListener("click", (event) => {
            const rect = modal.getBoundingClientRect();
            const isInDialog = (
                rect.top <= event.clientY &&
                event.clientY <= rect.top + rect.height &&
                rect.left <= event.clientX &&
                event.clientX <= rect.left + rect.width
            );

            if (!isInDialog) {
                modal.close();
            }
        });
    });
});