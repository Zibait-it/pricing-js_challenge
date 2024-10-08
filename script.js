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
const cartSummary = document.getElementById("cart-summary");

let cartItems = [];
let selectedPack = {
  id: "",
  name: "",
  price: 0,
  quantity: 0,
  icon: "",
};
let cartClicked = false;

const closeModal = () => {
  confirmationModalOverlay.classList.replace("opacity-100", "opacity-0");
  confirmationModalOverlay.classList.add("pointer-events-none");

  darkOverlay.classList.replace("opacity-60", "opacity-0");
};
const toggleModalVisibility = (modal, isOpen) => {
  if (isOpen) {
    modal.classList.replace("opacity-0", "opacity-100");
    modal.classList.replace("scale-0", "scale-100");
    modal.classList.remove("pointer-events-none");
  } else {
    modal.classList.replace("opacity-100", "opacity-0");
    modal.classList.replace("scale-100", "scale-0");
    modal.classList.add("pointer-events-none");
  }
};

const calculateTotal = () => {
  let total = 0;
  cartItems.forEach((item) => {
    total += item.price * item.quantity;
  });
  return total;
};
const updateTotalDisplay = () => {
  const total = calculateTotal();
  document.getElementById("total-cart-display").textContent = `$${total}`;
};

addToCartButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const { name, price, icon, id } = event.target.dataset;
    Object.assign(selectedPack, { name, price: parseFloat(price), icon, id });

    darkOverlay.classList.replace("opacity-0", "opacity-60");

    confirmationModalOverlay.classList.replace("opacity-0", "opacity-100");
    confirmationModalOverlay.classList.remove("pointer-events-none");
    confirmationModalOverlay.classList.add("flex");

    confirmationText.textContent = `Are you sure you want to add ${name} to your cart?`;
  });
});

confirmationButton.addEventListener("click", () => {
  confirmationModalOverlay.classList.replace("opacity-100", "opacity-0");
  confirmationModalOverlay.classList.add("pointer-events-none");

  darkOverlay.classList.replace("opacity-60", "opacity-0");

  cartButton.classList.add("scale-125");

  const existingItem = cartItems.find(
    ({ name, price }) =>
      name === selectedPack.name && price === selectedPack.price
  );

  if (existingItem) {
    existingItem.quantity += 1;
    const itemElement = document.getElementById(`cart-item-${selectedPack.id}`);
    const itemQuantity = itemElement.querySelector(".quantity-display");
    itemQuantity.textContent = existingItem.quantity;

    const summaryElement = document.getElementById(
      `summary-item-${selectedPack.id}`
    );
    const itemSubtotal = summaryElement.querySelector(".subtotal-display");
    itemSubtotal.textContent = `$${existingItem.price * existingItem.quantity}`;
  } else {
    selectedPack.quantity = 1;
    cartItems.push({ ...selectedPack });

    const itemElement = document.createElement("div");
    itemElement.id = `cart-item-${selectedPack.id}`;

    itemElement.className =
      "bg-primary w-full rounded-xl flex justify-start items-center p-4 gap-4";
    itemElement.innerHTML = ` <div>
          <img src="/assets/icons/${selectedPack.icon}" class="size-20" />
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

    const summaryElement = document.createElement("div");
    summaryElement.id = `summary-item-${selectedPack.id}`;

    summaryElement.className = "flex justify-between text-sm font-semibold";
    summaryElement.innerHTML = `<p class="text-light-grey">${
      selectedPack.name
    }</p><p class="subtotal-display">$${
      selectedPack.price * selectedPack.quantity
    }</p>`;

    cartSummary.appendChild(summaryElement);
  }

  cartItemsNumber.textContent = cartItems.length;

  updateTotalDisplay();

  setTimeout(() => {
    cartButton.classList.remove("scale-125");
    cartItemsContainer.classList.replace("hidden", "flex");
  }, 500);
});

closeModalButton.addEventListener("click", closeModal);
cancelConfirmationButton.addEventListener("click", closeModal);

cartButton.addEventListener("click", () => {
  cartClicked = !cartClicked;

  const modalToToggle = cartItems.length === 0 ? emptyCartModal : cartModal;
  toggleModalVisibility(modalToToggle, cartClicked);
});
