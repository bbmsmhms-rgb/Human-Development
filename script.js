/* ===========================
   Sidebar
=========================== */
function toggleMenu() {
  document.getElementById("sidebar").classList.toggle("active");
}

document.addEventListener('click', function(e){
  const sidebar = document.getElementById("sidebar");
  const menuIcon = document.querySelector(".menu-icon");
  if(sidebar.classList.contains("active") &&
     !sidebar.contains(e.target) &&
     !menuIcon.contains(e.target)){
      sidebar.classList.remove("active");
  }
});

/* ===========================
   Slider المحسن
=========================== */
const slider = document.getElementById('slider');
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.querySelector('.dots');
const totalSlides = slides.length;
let currentIndex = 0;

// إنشاء النقاط (Dots) تلقائياً
for (let i = 0; i < totalSlides; i++) {
  const dot = document.createElement('span');
  dot.addEventListener('click', () => { 
      currentIndex = i; // الانتقال مباشرة للصورة i
      updateSlider(); 
  });
  dotsContainer.appendChild(dot);
}

const dots = dotsContainer.querySelectorAll('span');

// تحديث السلايدر
function updateSlider() {
  slider.style.transform = `translateX(-${currentIndex * 100}%)`; // حركة سلسة
  dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
}

// الأسهم
function nextSlide() { 
  currentIndex = (currentIndex + 1) % totalSlides;
  updateSlider(); 
}
function prevSlide() { 
  currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
  updateSlider(); 
}

// الحركة التلقائية
setInterval(nextSlide, 4000); // كل 4 ثواني يتحرك السلايدر

/* ===========================
   اختيار الموضوع
=========================== */
let lockedTopic = "";
function selectTopic(topic) {
  const input = document.getElementById('messageInput');
  lockedTopic = topic;
  input.value = lockedTopic;
  input.focus();
}

document.getElementById('messageInput').addEventListener('input', function () {
  if (lockedTopic && !this.value.startsWith(lockedTopic)) {
    this.value = lockedTopic;
  }
});

/* ===========================
   إرسال الرسالة
=========================== */
document.getElementById('sendBtn').addEventListener('click', () => {
  const message = document.getElementById('messageInput').value.trim();
  if(message) {
    alert("تم إرسال الرسالة: " + message);
    document.getElementById('messageInput').value = '';
    lockedTopic = "";
  } else {
    alert("الرجاء كتابة رسالة قبل الإرسال");
  }
});

/* ===========================
   زر الدليل التوعوي الموحد
=========================== */
document.getElementById("guideBtn").addEventListener("click", function() {
  window.open("https://www.uohamdaniya.edu.iq/wp-content/uploads/2025/11/%D8%A7%D9%84%D8%AF%D9%84%D9%8A%D9%84-%D8%A7%D9%84%D8%AA%D9%88%D8%B9%D9%88%D9%8A-%D8%A7%D9%84%D9%85%D9%88%D8%AD%D8%AF-pdf.pdf","_blank");
});

/* ===========================
   تشغيل السلايدر عند البداية
=========================== */
updateSlider();
