document.addEventListener("DOMContentLoaded", function () {
  const el = document.getElementById("typewriter-text");
  if (!el) return;

  const text = el.dataset.text || "";
  let cursorPosition = 0;

  const textAdder = setInterval(function () {
    el.textContent = text.substring(0, cursorPosition + 1);
    if (++cursorPosition === text.length) {
      clearInterval(textAdder);
    }
  }, 40);
});
