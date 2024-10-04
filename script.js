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
const emptyCartModal = document.getElementById("empty-cart-modal");
const cartModal = document.getElementById("cart-modal");

let cartItems = [];
let selectedPack = {
  name: "",
  price: 0,
  quantity: 0,
};
let cartClicked = false;

addToCartButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    selectedPack.name = event.target.dataset.pack;
    selectedPack.price = event.target.dataset.price;

    darkOverlay.classList.remove("opacity-0");
    darkOverlay.classList.add("opacity-60");

    confirmationModalOverlay.classList.remove(
      "opacity-0",
      "pointer-events-none"
    );
    confirmationModalOverlay.classList.add("flex", "opacity-100");

    confirmationText.textContent = `Are you sure you want to add ${selectedPack.name} to your cart?`;
  });
});

confirmationButton.addEventListener("click", () => {
  confirmationModalOverlay.classList.add("opacity-0", "pointer-events-none");
  confirmationModalOverlay.classList.remove("opacity-100");

  darkOverlay.classList.add("opacity-0");
  darkOverlay.classList.remove("opacity-60");

  cartButton.classList.add("scale-125");

  const existingItem = cartItems.find(
    (item) =>
      item.name === selectedPack.name && item.price === selectedPack.price
  );

  if (existingItem) {
    existingItem.quantity += 1;
    const itemElement = document.getElementById(
      `cart-item-${selectedPack.name.replace(/\s+/g, "-").toLowerCase()}-${
        selectedPack.price
      }`
    );
    const itemQuantity = itemElement.querySelector(".quantity-display");
    itemQuantity.textContent = existingItem.quantity;
  } else {
    selectedPack.quantity = 1;
    cartItems.push({ ...selectedPack });

    const itemElement = document.createElement("div");
    itemElement.id = `cart-item-${selectedPack.name
      .replace(/\s+/g, "-")
      .toLowerCase()}-${selectedPack.price}`;

    itemElement.className =
      "bg-primary w-full rounded-xl flex justify-start items-center p-4 gap-4";
    itemElement.innerHTML = ` <div>
          <img src="/assets/icons/PriceIcon2.svg" class="size-20" />
        </div>
        <div class="flex flex-col items-center gap-2">
          <h3 class="text-black font-bold">${selectedPack.name}</h3>
          <div class="flex flex-row items-center gap-2">
            <img
              src="/assets/icons/SubstractIcon.svg"
              class="size-8 hover:scale-105 transition-all duration-300"
            />
            <p class="quantity-display">${selectedPack.quantity}</p>
            <img
              src="/assets/icons/AddIcon.svg"
              class="size-8 hover:scale-105 transition-all duration-300"
            />
          </div>
        </div>
        <div
          class="flex flex-col items-center text-base font-medium text-light-grey gap-2"
        >
          <p>$${selectedPack.price}</p>
          <img
            src="/assets/icons/BinIcon.svg"
            class="size-8 hover:bg-light-orange rounded-full p-2"
          />
        </div>
    `;
    cartModal.appendChild(itemElement);
  }
  cartItemsNumber.textContent = cartItems.length;
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

cartButton.addEventListener("click", () => {
  if (cartItems.length === 0) {
    cartClicked = !cartClicked;

    if (cartClicked) {
      emptyCartModal.classList.remove(
        "scale-0",
        "opacity-0",
        "pointer-events-none"
      );
      emptyCartModal.classList.add("scale-100", "opacity-100");
    } else {
      emptyCartModal.classList.add(
        "scale-0",
        "opacity-0",
        "pointer-events-none"
      );
      emptyCartModal.classList.remove("scale-100", "opacity-100");
    }
  }
  if (cartItems.length > 0) {
    cartClicked = !cartClicked;
    if (cartClicked) {
      cartModal.classList.remove("scale-0", "opacity-0", "pointer-events-none");
      cartModal.classList.add("scale-100", "opacity-100");
    } else {
      cartModal.classList.add("scale-0", "opacity-0", "pointer-events-none");
      cartModal.classList.remove("scale-100", "opacity-100");
    }
  }
});
