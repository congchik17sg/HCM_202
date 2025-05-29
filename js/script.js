document.addEventListener("DOMContentLoaded", () => {
  const imageElements = document.querySelectorAll('.image-sidebar img');
  const textContainer = document.getElementById('history-text');
  const historySection = document.querySelector('.history-section');
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-img');
  
  const historyTexts = [
    "Khởi nguồn Nghề đan tre đã xuất hiện từ hàng nghìn năm trước,gắn liền với đời sống lao động và sinh hoạt của người dân vùng nông thôn. Từ những vật dụng thô sơ như rổ, rá, giỏ... làm từ tre, con người đã biết tận dụng loại vật liệu sẵn có trong tự nhiên để phục vụ nhu cầu hàng ngày. Đây là giai đoạn nghề đan tre hình thành một cách tự phát, phản ánh sự sáng tạo và khéo léo của người xưa trong việc chinh phục thiên nhiên.",
    "Thời phong kiến Qua các triều đại phong kiến, nghề đan tre dần được nâng tầm trở thành một nghề thủ công truyền thống phổ biến. Không chỉ là phương tiện mưu sinh của nhiều gia đình, sản phẩm tre đan còn được sử dụng rộng rãi trong các sinh hoạt lễ hội, tín ngưỡng và đời sống cung đình. Nghề đan tre bắt đầu có sự phân hóa kỹ thuật, mẫu mã, và nhiều làng nghề đan tre nổi tiếng cũng hình thành trong giai đoạn này.",
    "Thời hiện đại – mai một và hồi sinh Bước vào thời kỳ hiện đại, cùng với sự phát triển của công nghiệp và các vật liệu nhân tạo, nghề đan tre từng rơi vào tình trạng mai một. Nhiều làng nghề truyền thống bị lãng quên, thợ thủ công chuyển sang nghề khác để mưu sinh. Tuy nhiên, nhờ vào các chương trình bảo tồn văn hóa phi vật thể và sự quan tâm của chính quyền cùng các tổ chức văn hóa, nghề đan tre đã có cơ hội hồi sinh. Lớp trẻ ngày nay cũng bắt đầu quay lại học nghề, kế thừa tinh hoa của cha ông.",
    "Phát triển và hội nhập Ngày nay, nghề đan tre không chỉ phục vụ nhu cầu trong nước mà còn vươn ra thị trường quốc tế. Sản phẩm tre đan được xuất khẩu sang nhiều quốc gia, được đánh giá cao bởi tính thẩm mỹ, độ bền và giá trị văn hóa đặc sắc. Nhờ ứng dụng công nghệ mới và sáng tạo trong thiết kế, nghề đan tre đã và đang khẳng định vị thế trong xu thế phát triển bền vững, thân thiện với môi trường."
  ];

  const historyImageURLs = [
    "image/nghenhan.jpg",
    "image/nghenhan2.jpg",
    "image/nghenhan3.jpg",
    "image/nghenhan4.jpg"
  ];

  // ✅ Hiển thị mặc định hình số 1 và đoạn văn số 1
  const defaultIndex = 0;
  historySection.style.backgroundImage = `url(${historyImageURLs[defaultIndex]})`;
  textContainer.innerHTML = `<p>${historyTexts[defaultIndex]}</p>`;

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
