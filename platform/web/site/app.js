(() => {
  const button = document.querySelector(".composer button");
  const input = document.querySelector(".composer input");
  const messages = document.querySelector(".chat-panel");

  if (!button || !input || !messages) return;

  const addMessage = (role, text) => {
    const div = document.createElement("div");
    div.className = `message ${role}`;
    div.textContent = text;
    messages.insertBefore(div, document.querySelector(".composer"));
  };

  button.addEventListener("click", () => {
    const value = input.value.trim();
    if (!value) return;
    addMessage("user", value);
    addMessage("assistant", "Preview ready. Butr would check your ISA state, calculate the quantity, and wait for approval.");
    input.value = "";
  });
})();
