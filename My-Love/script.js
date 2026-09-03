// --------- 1. كلمة السر --------- //
const userPassword = prompt("دخلي كلمة السر:");
if (userPassword !== "ro7 2lb m7md") {
  alert("كلمة السر غير صحيحة!");
  document.body.innerHTML = "<h2 style='color:white;text-align:center;margin-top:20%'>كلمة السر خطأ</h2>";
}

// --------- 2. التنقل بين التبويبات (الزراير) --------- //
const tabButtons = document.querySelectorAll('.tab-menu__button');
const tabPanels = document.querySelectorAll('.tab-panel');

tabButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    // إزالة التحديد عن كل الأزرار
    tabButtons.forEach(btn => btn.classList.remove('is-active'));
    // إخفاء جميع الأقسام
    tabPanels.forEach(panel => panel.classList.remove('is-active'));

    // تفعيل الزر المضروب عليه والقسم المقابل له
    button.classList.add('is-active');
    if (tabPanels[index]) {
      tabPanels[index].classList.add('is-active');
    }
  });
});

// --------- 3. فتح وإغلاق الرسالة (المودال) --------- //
const modalClose = document.querySelector('.modal-close-button');
const mainContent = document.getElementById("main-content");
const startButton = document.getElementById("start-button");

if (startButton) {
  startButton.addEventListener('click', () => {
    mainContent.classList.remove("hidden");
  });
}

if (modalClose) {
  modalClose.addEventListener('click', () => {
    mainContent.classList.add("hidden");
  });
}

// --------- 4. العداد الزمني --------- //
function updateDayCounter() {
  const startDate = new Date(2025, 11, 27, 10, 34, 15);
  const now = new Date();
  let diff = now - startDate;

  const msInSecond = 1000;
  const msInMinute = msInSecond * 60;
  const msInHour = msInMinute * 60;
  const msInDay = msInHour * 24;

  let days = Math.floor(diff / msInDay);
  diff %= msInDay;
  let hours = Math.floor(diff / msInHour);
  diff %= msInHour;
  let minutes = Math.floor(diff / msInMinute);
  diff %= msInMinute;
  let seconds = Math.floor(diff / msInSecond);

  const counterElement = document.getElementById("day-counter");
  if (counterElement) {
    counterElement.textContent = `${days} يوم، ${hours} ساعة، ${minutes} دقيقة و ${seconds} ثانية`;
  }
}

setInterval(updateDayCounter, 1000);
updateDayCounter();

// --------- 5. التنقل داخل القوائم (الرسائل والتعليمات) --------- //
function createNavigator(containerSelector, navSelector, perPage = 5) {
  const items = document.querySelectorAll(`${containerSelector} .letter`);
  const nav = document.querySelector(navSelector);
  if (!items.length || !nav) return;

  let currentIndex = 0;
  let currentPage = 0;

  function renderButtons() {
    nav.innerHTML = "";
    const start = currentPage * perPage;
    const end = Math.min(start + perPage, items.length);

    if (currentPage > 0) {
      const prevBtn = document.createElement("button");
      prevBtn.textContent = "السابق";
      prevBtn.classList.add("letter-btn");
      prevBtn.addEventListener("click", () => {
        currentPage--;
        renderButtons();
      });
      nav.appendChild(prevBtn);
    }

    for (let i = start; i < end; i++) {
      const btn = document.createElement("button");
      btn.textContent = i + 1;
      btn.classList.add("letter-btn");
      if (i === currentIndex) btn.classList.add("is-active");
      btn.addEventListener("click", () => showItem(i));
      nav.appendChild(btn);
    }

    if (end < items.length) {
      const nextBtn = document.createElement("button");
      nextBtn.textContent = "التالي";
      nextBtn.classList.add("letter-btn");
      nextBtn.addEventListener("click", () => {
        currentPage++;
        renderButtons();
      });
      nav.appendChild(nextBtn);
    }
  }

  function showItem(index) {
    items[currentIndex].classList.remove("is-active");
    currentIndex = index;
    items[currentIndex].classList.add("is-active");
    renderButtons();
  }

  showItem(0);
}

// تشغيل تنقل الرسائل
createNavigator(".cartas", ".cartas-nav");
createNavigator(".leias", ".leias-nav");
