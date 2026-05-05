// Servis Kartları Animasyonu
const cards = document.querySelectorAll(".service");
cards.forEach((card) => {
  card.addEventListener("click", () => {
    cards.forEach((c) => {
      if (c !== card) c.classList.remove("active");
    });
    card.classList.toggle("active");
  });
});

const sliderTrack = document.querySelector(".slider-track");
const initialItems = Array.from(sliderTrack.children);

function filterSlider(category) {
  sliderTrack.innerHTML = "";

  const filtered = initialItems.filter(
    (item) => category === "all" || item.dataset.category === category,
  );

  filtered.forEach((item) => {
    sliderTrack.appendChild(item.cloneNode(true));
  });

  const currentContent = sliderTrack.innerHTML;
  sliderTrack.innerHTML = currentContent + currentContent;

  gsap.killTweensOf(sliderTrack);
  gsap.set(sliderTrack, { x: 0 });

  gsap.to(sliderTrack, {
    xPercent: -50,
    ease: "none",
    duration: 25,
    repeat: -1,
  });
}

filterSlider("all");

const buttons = document.querySelectorAll(".category-btn");
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    buttons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;
    filterSlider(filter);
  });
});
