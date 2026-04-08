const form = document.querySelector(".signup-form");
const statusEl = document.querySelector(".signup-status");

if (form && statusEl) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const email = String(data.get("email") || "").trim();
    const name = String(data.get("name") || "").trim();
    const terms = data.get("terms") === "on";
    const privacy = data.get("privacy") === "on";
    const isa = data.get("isa") === "on";
    const ack = data.get("ack") === "on";
    const updates = data.get("updates") === "on";

    if (!email || !terms || !privacy || !isa || !ack) {
      statusEl.textContent = "Please complete the required fields and acknowledgements.";
      return;
    }

    const signupEmail = form.dataset.signupEmail || "hello@butr.app";
    const subject = encodeURIComponent("Butr waitlist signup");
    const body = encodeURIComponent(
      [
        `Email: ${email}`,
        name ? `Name: ${name}` : null,
        `Terms accepted: yes`,
        `Privacy acknowledged: yes`,
        `Stocks & Shares ISA only: yes`,
        `Control layer acknowledgement: yes`,
        `Product updates: ${updates ? "yes" : "no"}`
      ]
        .filter(Boolean)
        .join("\n")
    );

    statusEl.textContent = "Opening your email app...";
    window.location.href = `mailto:${signupEmail}?subject=${subject}&body=${body}`;
  });
}
