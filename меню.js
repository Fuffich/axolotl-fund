let scrollTimer;
let compactApplied = false;

window.addEventListener('scroll', () => {
  const menu = document.querySelector('.menu');
  const header = document.querySelector('#header');
  const headerBottom = header.getBoundingClientRect().bottom;

  // прозрачность при скролле
  menu.classList.add('scrolling');
  clearTimeout(scrollTimer);
  scrollTimer = setTimeout(() => {
    menu.classList.remove('scrolling');
  }, 200);

  // плавный переход между состояниями
  if (headerBottom <= 0 && !compactApplied) {
    compactApplied = true;
    menu.classList.add('compact');
  } else if (headerBottom > 0 && compactApplied) {
    compactApplied = false;
    menu.classList.remove('compact');
  }
});
//мини игра
document.addEventListener('DOMContentLoaded', () => {
  const feedBtn = document.getElementById('feedBtn');
  const axolotlImg = document.getElementById('axolotlImg');
  const feedCountText = document.getElementById('feedCount');

  let feedCount = 0;
  feedCountText.textContent = feedCount;

  // Массив надписей для разных количеств кликов
  const buttonTexts = {
    5: "Ещё корма! 🪱",
    10: "Я всё ещё голоден! 😋", 
    15: "Обожаю тебя! ❤️",
    20: "Ты лучший! 🌟",
    30: "Вселенная благодарна! 🌌",
	60: "Мастер кормления! 🥋", 
	75: "Повелитель червяков! 🪱",
	100: "БЕССМЕРТНЫЙ КОРМИЛЕЦ! 💀"
  };

  if (feedBtn && axolotlImg) {
    const normalSrc = axolotlImg.getAttribute('src');
    const happySrc = axolotlImg.dataset.happySrc;
    const defaultText = 'Покормить аксолотля';

    feedBtn.addEventListener('click', () => {
      feedCount++;
      feedCountText.textContent = feedCount;

      // Меняем картинку
      axolotlImg.src = happySrc;
      
      // Временная надпись "Ням!"
      feedBtn.textContent = 'Ням!';

      // Проверяем, нужно ли сменить постоянную надпись
      if (buttonTexts[feedCount]) {
        setTimeout(() => {
          feedBtn.textContent = buttonTexts[feedCount];
        }, 1200);
      } else {
        // Возвращаем обычную надпись
        setTimeout(() => {
          feedBtn.textContent = defaultText;
        }, 1200);
      }

      // Возвращаем картинку через 1.2 сек
      setTimeout(() => {
        axolotlImg.src = normalSrc;
      }, 1200);
    });
  }
});



// 📱 Адаптивное меню

document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');

  if (menuBtn && menu) {
    menuBtn.addEventListener('click', () => {
      menu.classList.toggle('active');
    });
  }
});


// Кнопка "Вернуться"
document.addEventListener('DOMContentLoaded', () => {
  const backToTop = document.getElementById('backToTop');
  let scrollTimer;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }

    // если пользователь перестал листать — показать кнопку
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      if (window.scrollY > 200) {
        backToTop.classList.add('show');
      }
    }, 400);
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});





// Случайные факты об аксолотлях
const axolotlFacts = [
    "Аксолотли могут регенерировать конечности, хвост, сердце и даже части мозга! 🧠",
    "Они остаются в личиночной форме всю жизнь - это называется неотения 🐣",
    "В дикой природе Мексики осталось всего около 1000 особей 🌎",
    "Аксолотли дышат и жабрами, и легкими, и через кожу! 🌊",
    "Их название означает 'водяная собака' на языке ацтеков 🐕",
    "Аксолотли могут вырастать до 30 см в длину! 📏",
    "Они являются хищниками и питаются мелкими ракообразными, червями и мелкой рыбой 🪱",
    "Аксолотли могут менять цвет в зависимости от окружающей среды и стресса 🎨",
    "Они облают отличным обонянием и могут учуть добычу на большом расстоянии 👃",
    "В неволе аксолотли могут прожить до 15 лет! 🎂",
    "Аксолотли ведут ночной образ жизни и наиболее активны в сумерках 🌙",
    "Они откладывают яйца, которые приклеивают к растениям и камням 🥚",
    "Аксолотли имеют плохое зрение и полагаются на другие органы чувств 👁️",
    "Они могут отрастить потерянную конечность за несколько недель! ⚡",
    "Аксолотли - единственные позвоночные, которые могут регенерировать сетчатку глаза 👁️",
    "Они обитают только в двух озерах Мексики - Сочимилько и Чалько 🇲🇽",
    "Аксолотли находятся под угрозой исчезновения из-за загрязнения воды и урбанизации 🚨",
    "Они могут есть как живую, так и мертвую пищу - не привередливы в еде 🍽️",
    "Аксолотли плавают, извиваясь всем телом, как угри 🏊",
    "У них есть маленькие зубы, но они используют их только для удержания добыты 🦷",
    "Аксолотли могут впадать в спячку при неблагоприятных условиях ❄️",
    "Они являются важным объектом научных исследований в области регенерации 🔬",
    "Аксолотли упоминаются в мифологии ацтеков как превращенные боги 📜",
    "Они могут различать цвета, несмотря на плохое зрение 🌈",
    "Аксолотли коммуницируют с помощью химических сигналов и прикосновений 💬"
];

function showRandomFact() {
    const fact = axolotlFacts[Math.floor(Math.random() * axolotlFacts.length)];
    if(document.getElementById('fact-box')) {
        document.getElementById('fact-box').innerHTML = fact;
    }
}

// Виртуальный аквариум - с картинками аксолотлей
function createAquarium() {
    const aquarium = document.getElementById('aquarium');
    if(!aquarium) return;
    
    // Массив с путями к маленьким картинкам аксолотлей
    const axolotlImages = [
        'images/1.png',
        'images/2.png', 
        'images/3.png',
        'images/3.png'
    ];
    
    // Создаем аксолотлей с картинками
    for (let i = 0; i < 6; i++) {
        const axolotl = document.createElement('img');
        axolotl.className = 'floating-axolotl-img';
        axolotl.src = axolotlImages[Math.floor(Math.random() * axolotlImages.length)];
        axolotl.alt = 'Аксолотль';
        axolotl.style.left = Math.random() * 85 + '%';
        axolotl.style.top = Math.random() * 80 + '%';
        axolotl.style.animationDuration = (Math.random() * 20 + 10) + 's';
        axolotl.style.animationDelay = (Math.random() * 5) + 's';
        aquarium.appendChild(axolotl);
    }
    
    // Добавляем пузыри
    createBubbles();
    
    // Добавляем водоросли
    createSeaweed();
}

// ДОБАВЬ ЭТУ ФУНКЦИЮ ДЛЯ ПУЗЫРЕЙ
function createBubbles() {
    const aquarium = document.getElementById('aquarium');
    if(!aquarium) return;
    
    for (let i = 0; i < 15; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.style.left = Math.random() * 90 + '%';
        bubble.style.animationDuration = (Math.random() * 4 + 2) + 's';
        bubble.style.animationDelay = (Math.random() * 3) + 's';
        bubble.style.width = (Math.random() * 10 + 5) + 'px';
        bubble.style.height = bubble.style.width;
        aquarium.appendChild(bubble);
    }
}

// Еда
function addFood() {
    const aquarium = document.getElementById('aquarium');
    const foods = ['🪱', '🍤', '🐛'];
    
    const food = document.createElement('div');
    food.className = 'food';
    food.innerHTML = foods[Math.floor(Math.random() * foods.length)];
    food.style.left = Math.random() * 80 + '%';
    food.style.top = '0px';
    food.style.fontSize = '1.3em';
    food.style.animation = 'sink 6s linear';
    aquarium.appendChild(food);
    
    setTimeout(() => {
        if (food.parentNode) {
            food.remove();
        }
    }, 6000);
}

// Ручное кормление
function feedAquarium() {
    addFood();
}

// Запускаем всё при загрузке
document.addEventListener('DOMContentLoaded', function() {
    // ПОКАЗЫВАЕМ ФАКТ СРАЗУ ПРИ ЗАГРУЗКЕ
    showRandomFact();
    createAquarium();
    
    // Автосмена фактов каждые 15 секунд
    setInterval(showRandomFact, 60000);
});




// Добавляем водоросли в аквариум
function createSeaweed() {
    const aquarium = document.getElementById('aquarium');
    if(!aquarium) return;
    
    // Создаем несколько водорослей на дне
    for (let i = 0; i < 8; i++) {
        const seaweed = document.createElement('div');
        seaweed.className = 'seaweed';
        seaweed.style.left = Math.random() * 90 + '%';
        seaweed.style.bottom = '0px';
        seaweed.style.height = (Math.random() * 60 + 40) + 'px'; // Высота 40-100px
        seaweed.style.animationDuration = (Math.random() * 10 + 5) + 's'; // Плавное колыхание
        seaweed.style.animationDelay = (Math.random() * 3) + 's';
        aquarium.appendChild(seaweed);
    }
}
