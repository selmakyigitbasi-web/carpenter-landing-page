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

// Slider Filtreleme ve Sonsuz Döngü
const sliderTrack = document.querySelector(".slider-track");
const initialItems = Array.from(sliderTrack.children); // Orijinal itemları yedekle

function filterSlider(category) {
  // Önce içeriği temizle
  sliderTrack.innerHTML = "";

  // Kategoriyi filtrele
  const filtered = initialItems.filter(
    (item) => category === "all" || item.dataset.category === category,
  );

  // Filtrelenenleri track içine ekle
  filtered.forEach((item) => {
    sliderTrack.appendChild(item.cloneNode(true)); // Klonlayarak eklemek daha güvenlidir
  });

  // Sonsuz döngü için aynı seti bir kez daha yanına ekle
  const currentContent = sliderTrack.innerHTML;
  sliderTrack.innerHTML = currentContent + currentContent;

  // Mevcut animasyonları durdur ve başa sar
  gsap.killTweensOf(sliderTrack);
  gsap.set(sliderTrack, { x: 0 });

  // Yeni animasyonu başlat
  gsap.to(sliderTrack, {
    xPercent: -50, // İçeriğin tam yarısı kadar (bir tam set) kaydır
    ease: "none",
    duration: 25, // Hızı buradan ayarla
    repeat: -1,
  });
}

// Başlangıçta hepsini göster
filterSlider("all");

// Kategori Butonları
const buttons = document.querySelectorAll(".category-btn");
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Aktif buton görseli
    buttons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.dataset.filter;
    filterSlider(filter);
  });
});
