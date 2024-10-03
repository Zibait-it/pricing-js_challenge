const addToCartButtons = document.querySelectorAll(".add-to-cart");
const closeModalButton = document.getElementById("close-modal-button");
const cancelConfirmationButton = document.getElementById(
  "cancel-confirmation-button"
);
const darkOverlay = document.getElementById("dark-overlay");
const confirmationModalOverlay = document.getElementById(
  "confirmation-modal-overlay"
);
const confirmationText = document.getElementById("confirmation-text");
const confirmationButton = document.getElementById("confirmation-button");
const cartItemsContainer = document.getElementById("cart-items-container");
const cartItemsNumber = document.getElementById("cart-items-number");
const cartButton = document.getElementById("cart-button");

let cartItems = 0;

addToCartButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    selectedPack = event.target.dataset.pack;

    darkOverlay.classList.remove("opacity-0");
    darkOverlay.classList.add("opacity-60");

    confirmationModalOverlay.classList.remove(
      "opacity-0",
      "pointer-events-none"
    );
    confirmationModalOverlay.classList.add("flex", "opacity-100");

    confirmationText.textContent = `Are you sure you want to add ${selectedPack} to your cart?`;
  });
});

confirmationButton.addEventListener("click", () => {
  cartItems++;
  cartItemsNumber.textContent = cartItems;

  confirmationModalOverlay.classList.add("opacity-0", "pointer-events-none");
  confirmationModalOverlay.classList.remove("opacity-100");

  darkOverlay.classList.add("opacity-0");
  darkOverlay.classList.remove("opacity-60");

  cartButton.classList.add("scale-125");

  setTimeout(() => {
    cartButton.classList.remove("scale-125");
    cartItemsContainer.classList.remove("hidden");
    cartItemsContainer.classList.add("flex");
  }, 500);
});

cancelConfirmationButton.addEventListener("click", () => {
  confirmationModalOverlay.classList.add("opacity-0", "pointer-events-none");
  confirmationModalOverlay.classList.remove("opacity-100");

  darkOverlay.classList.add("opacity-0");
  darkOverlay.classList.remove("opacity-60");
});

const closeModal = () => {
  confirmationModalOverlay.classList.add("opacity-0", "pointer-events-none");
  confirmationModalOverlay.classList.remove("opacity-100");

  darkOverlay.classList.add("opacity-0");
  darkOverlay.classList.remove("opacity-60");
};

closeModalButton.addEventListener("click", closeModal);
cancelConfirmationButton.addEventListener("click", closeModal);
