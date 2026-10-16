
const cart = {};

const cartCount = document.getElementById("cart-count");
const cartSummary = document.getElementById("cart-summary");
const checkoutBtn = document.getElementById("checkout-btn");

function updateCart() {
  let count = 0;
  let total = 0;
  const items = [];

  for (const [name, item] of Object.entries(cart)) {
    count += item.quantity;
    total += item.price * item.quantity;
    items.push(
      `${name} x ${item.quantity} — RM ${(item.price * item.quantity).toFixed(2)}`
    );
  }

  cartCount.textContent = count;

  cartSummary.textContent = count === 0
    ? "Your cart is empty. Pick a happy blend! 🥤"
    : `${items.join("\n")}\n\nTotal: RM ${total.toFixed(2)}`;
}

document.querySelectorAll(".add-btn").forEach(button => {
  button.addEventListener("click", () => {
    const name = button.dataset.name;
    const price = Number(button.dataset.price);

    if (!cart[name]) {
      cart[name] = { price, quantity: 0 };
    }

    cart[name].quantity++;
    updateCart();

    const original = button.textContent;
    button.textContent = "✓";

    setTimeout(() => {
      button.textContent = original;
    }, 600);
  });
});

checkoutBtn.addEventListener("click", () => {
  const count = Object.values(cart).reduce(
    (sum, item) => sum + item.quantity, 0
  );

  if (count === 0) {
    alert("Your cart is empty! Add a smoothie first.");
    return;
  }

  const order = Object.entries(cart)
    .map(([name, item]) =>
      `${name} x ${item.quantity} = RM ${(item.price * item.quantity).toFixed(2)}`
    )
    .join("\n");

  const total = Object.values(cart).reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  alert(
    `YOUR BLEND & BLOOM ORDER\n\n${order}\n\nTotal: RM ${total.toFixed(2)}\n\nThis is a demo checkout. Contact the shop to complete your order!`
  );
});

document.getElementById("contact-form").addEventListener("submit", event => {
  event.preventDefault();

  const name = document.getElementById("customer-name").value.trim();
  const message = document.getElementById("form-message");

  if (!name) {
    message.textContent = "Please enter your name.";
    return;
  }

  message.textContent =
    `Thanks, ${name}! Your form works, but sending messages requires a backend or form service.`;

  event.target.reset();
});

document.getElementById("year").textContent = new Date().getFullYear();

updateCart();
