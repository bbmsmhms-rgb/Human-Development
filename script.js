/* --- 1. القائمة الجانبية (Sidebar) --- */
function toggleMenu(e) {
    e.stopPropagation();
    document.getElementById("sidebar").classList.toggle("active");
}

// زر الدليل التوعوي
const guideBtn = document.getElementById("guideBtn");
if (guideBtn) {
    guideBtn.onclick = () => {
        window.open("https://www.uohamdaniya.edu.iq/wp-content/uploads/2025/11/%D8%A7%D9%84%D8%AF%D9%84%D9%8A%D9%84-%D8%A7%D9%84%D8%AA%D9%88%D8%B9%D9%88%D9%8A-%D8%A7%D9%84%D9%85%D9%88%D8%AD%D8%AF-pdf.pdf", "_blank");
    };
}

// إغلاق القائمة عند النقر خارجها
document.addEventListener('click', function(e) {
    const sidebar = document.getElementById("sidebar");
    const menuIcon = document.querySelector(".menu-icon");
    
    if (sidebar && sidebar.classList.contains("active")) {
        if (!sidebar.contains(e.target) && (!menuIcon || !menuIcon.contains(e.target))) {
            sidebar.classList.remove("active");
        }
    }
});

// تفعيل روابط القائمة الجانبية بشكل صحيح
const sidebarLinks = document.querySelectorAll('.sidebar a');
sidebarLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        // نغلق القائمة أولاً
        document.getElementById("sidebar").classList.remove("active");
        
        // إذا كان الرابط فارغاً أو مجرد "#"، نمنع السلوك الافتراضي
        if (this.getAttribute('href') === "#") {
            e.preventDefault();
        }
        // إذا كان رابطاً لصفحة (مثل about.html)، سيقوم المتصفح بالانتقال تلقائياً
    });
});

/* --- 2. السلايدر الرئيسي المطور لعدد صور غير محدود --- */
let mainIdx = 0;
const mainSlider = document.getElementById('mainSlider');
const dotsCont = document.getElementById('mainDots');

// دالة لجلب عدد الصور الحالي في أي لحظة
function getSlides() {
    return document.querySelectorAll('#mainSlider .slide');
}

function initDots() {
    const slides = getSlides(); // يحسب العدد الفعلي للصور المضافة في HTML
    if (!dotsCont || slides.length === 0) return;
    
    dotsCont.innerHTML = "";
    slides.forEach((_, i) => {
        const dot = document.createElement('span');
        if (i === 0) dot.classList.add('active');
        dot.onclick = () => { mainIdx = i; updateMain(); };
        dotsCont.appendChild(dot);
    });
}

function updateMain() {
    if (!mainSlider) return;
    const offset = mainIdx * 100;
    mainSlider.style.transform = `translateX(${offset}%)`;
    
    // تحديث النقاط لتتناسب مع العدد الجديد
    const dots = document.querySelectorAll('.dots span');
    dots.forEach((d, i) => d.classList.toggle('active', i === mainIdx));
}

window.nextMain = function() {
    const slides = getSlides();
    if (slides.length === 0) return;
    mainIdx = (mainIdx + 1) % slides.length;
    updateMain();
}

window.prevMain = function() {
    const slides = getSlides();
    if (slides.length === 0) return;
    mainIdx = (mainIdx - 1 + slides.length) % slides.length;
    updateMain();
}

// تشغيل السلايدر
if (mainSlider) {
    initDots();
    updateMain();
    // التحريك التلقائي
    setInterval(nextMain, 3000);
}

/* --- 3. إرسال الاقتراحات (EmailJS) --- */

emailjs.init("WP58kW3vT7ZUhhi2Y"); // المفتاح الخاص بك صحيح

const sendBtn = document.getElementById('sendBtn');
if (sendBtn) {
    sendBtn.onclick = function() {
        const msgInput = document.getElementById('messageInput');
        const msg = msgInput.value;

        if (!msg) return alert("يرجى كتابة رسالة");

        this.innerText = "...جاري الإرسال";
        this.disabled = true;

        // التصحيح هنا: تأكد من إغلاق القوس المجعد والفاصلة
        emailjs.send("service_pawogu8", "template_g3msc57", {
            message: msg 
        })
        .then(() => {
            alert("تم الإرسال بنجاح!");
            msgInput.value = "";
        })
        .catch((error) => {
            console.error("FAILED...", error);
            alert("فشل الإرسال: " + JSON.stringify(error));
        })
        .finally(() => {
            this.innerText = "إرسال";
            this.disabled = false;
        });
    };
}
