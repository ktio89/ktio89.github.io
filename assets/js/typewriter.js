document.addEventListener("DOMContentLoaded", function () {
  const el = document.getElementById("typewriter-text");
  if (!el) return;

  const chars = Array.from(el.dataset.text || "");
  let cursorPosition = 0;

  const textAdder = setInterval(function () {
    el.textContent = chars.slice(0, cursorPosition + 1).join("");
    if (++cursorPosition === chars.length) {
      clearInterval(textAdder);
    }
  }, 20);
});
