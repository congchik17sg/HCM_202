document.addEventListener("DOMContentLoaded", () => {
  const imageElements = document.querySelectorAll('.image-sidebar img');
  const textContainer = document.getElementById('history-text');
  const historySection = document.querySelector('.history-section');

  const historyTexts = [
    "Nội dung đoạn 1: Nghề đan tre có từ hàng nghìn năm trước, gắn liền với đời sống nông thôn...",
    "Nội dung đoạn 2: Qua các triều đại phong kiến, đan tre là một nghề truyền thống phổ biến...",
    "Nội dung đoạn 3: Vào thời kỳ hiện đại, nghề từng bị mai một nhưng đã hồi sinh nhờ các chương trình bảo tồn...",
    "Nội dung đoạn 4: Ngày nay, sản phẩm tre đan không chỉ phục vụ nội địa mà còn được xuất khẩu rộng rãi..."
  ];

  const historyImageURLs = [
    "image/nghenhan.jpg",
    "image/nghenhan2.jpg",
    "image/nghenhan3.jpg",
    "image/nghenhan4.jpg"
  ];

  imageElements.forEach((img, index) => {
    img.addEventListener('mouseover', () => {
      historySection.style.backgroundImage = `url(${historyImageURLs[index]})`;
      textContainer.innerHTML = `<p>${historyTexts[index]}</p>`;
    });

    img.addEventListener('click', () => {
      document.getElementById('image-modal').style.display = 'block';
      document.getElementById('modal-img').src = historyImageURLs[index];
    });
  });

  document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('image-modal').style.display = 'none';
  });

  // thong ke
  function updateBuyCount(views) {
    const estimatedBuyers = Math.floor(views * 0.15);
    const buyCountElem = document.getElementById("buy-count");
    const buyIconElem = document.getElementById("buy-icon");

    let count = localStorage.getItem("buyCount");
    count = count ? parseInt(count) : estimatedBuyers;
    buyCountElem.textContent = count;

    buyIconElem.addEventListener("click", function () {
      count++;
      buyCountElem.textContent = count;
      localStorage.setItem("buyCount", count);
    });
  }

  function waitBusuanzi() {
    const interval = setInterval(function () {
      const busuanziPV = document.getElementById("busuanzi_value_site_pv") || document.getElementById("busuanzi_value_page_pv");
      if (busuanziPV && busuanziPV.innerText) {
        const views = parseInt(busuanziPV.innerText);
        document.getElementById("visit-count").textContent = views;
        updateBuyCount(views);
        clearInterval(interval);
      }
    }, 500);
  }

  waitBusuanzi();

  // san pham
  document.querySelectorAll('.product').forEach(product => {
    const slides = product.querySelectorAll('.slide');
    const nextBtn = product.querySelector('.next');
    const prevBtn = product.querySelector('.prev');

    product.currentIndex = 0;

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        product.currentIndex = (product.currentIndex + 1) % slides.length;
        showSlide(product.currentIndex);
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        product.currentIndex = (product.currentIndex - 1 + slides.length) % slides.length;
        showSlide(product.currentIndex);
      });
    }

    showSlide(product.currentIndex);
  });
});
