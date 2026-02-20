let scrollTimer;
let compactApplied = false;

window.addEventListener('scroll', () => {
  const menu = document.querySelector('.menu');
  const header = document.querySelector('#header');
  const headerBottom = header.getBoundingClientRect().bottom;

  // прозрачность 
  menu.classList.add('scrolling');
  clearTimeout(scrollTimer);
  scrollTimer = setTimeout(() => {
    menu.classList.remove('scrolling');
  }, 200);

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

      axolotlImg.src = happySrc;

      feedBtn.textContent = 'Ням!';
	  feedBtn.classList.add('noclick'); 

      if (buttonTexts[feedCount]) {
        setTimeout(() => {
          feedBtn.textContent = buttonTexts[feedCount];
		  feedBtn.classList.remove('noclick');
        }, 1200);
      } else {

        setTimeout(() => {
          feedBtn.textContent = defaultText;
		  feedBtn.classList.remove('noclick'); 
        }, 1200);
      }
	  

      setTimeout(() => {
        axolotlImg.src = normalSrc;
      }, 1200);
    });
  }
});



// Адаптивное меню

document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');

  if (menuBtn && menu) {
    menuBtn.addEventListener('click', () => {
      menu.classList.toggle('active');
    });
  }
});


// Кнопка Вернуться
document.addEventListener('DOMContentLoaded', () => {
  const backToTop = document.getElementById('backToTop');
  let scrollTimer;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }


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

document.addEventListener('DOMContentLoaded', function() {

    showRandomFact();

    setInterval(showRandomFact, 60000);
});




        (function () {

            const form = document.querySelector('form.form-custom');
            const helpType = document.getElementById('help_type');
            const donationBlock = document.getElementById('donation_block');
            const adoptionBlock = document.getElementById('adoption_block');
            const volunteerBlock = document.getElementById('volunteer_block');

            function hideAllBlocks() {
                if (donationBlock) donationBlock.style.display = 'none';
                if (adoptionBlock) adoptionBlock.style.display = 'none';
                if (volunteerBlock) volunteerBlock.style.display = 'none';
            }

            document.addEventListener('DOMContentLoaded', function () {
                try {
                    if (form && typeof form.reset === 'function') form.reset();
                } catch (e) {
                  
                }
                hideAllBlocks();
                if (helpType) {
                    showBlockByValue(helpType.value);
                }
            });

            function showBlockByValue(value) {
    hideAllBlocks();
    if (!value) return;

    const addFadeSlide = (el) => {
        if(el){
            el.style.display = 'block';
            el.classList.add('fade-slide');
            setTimeout(()=>{ el.classList.add('show'); }, 20);
        }
    }

    if(value === 'donation') addFadeSlide(donationBlock);
    if(value === 'adoption') addFadeSlide(adoptionBlock);
    if(value === 'volunteer') addFadeSlide(volunteerBlock);
}

            if (helpType) {
                helpType.addEventListener('change', function () {
                    showBlockByValue(this.value);
                });
            }

            if (form) {
                form.addEventListener('submit', function (e) {
                    setTimeout(function () {
                        try { form.reset(); } catch (err) {}
                        hideAllBlocks();
                    }, 20);
                });
            }
        })();

    const cardNumber = document.getElementById('card_number');

    if(cardNumber){
        cardNumber.addEventListener('input', function(e){
            let value = this.value.replace(/\D/g,''); 
            value = value.substring(0,16); 
            let formatted = '';
            for(let i=0;i<value.length;i++){
                if(i>0 && i%4===0) formatted += ' ';
                formatted += value[i];
            }
            this.value = formatted;
        });
    }

    const cardCvc = document.getElementById('card_cvc');
    if(cardCvc){
        cardCvc.addEventListener('input', function(e){
            this.value = this.value.replace(/\D/g,'').substring(0,3);
        });
    }

    const cardExp = document.getElementById('card_exp');
    if(cardExp){
        cardExp.addEventListener('input', function(e){
            let value = this.value.replace(/\D/g,'').substring(0,4);
            if(value.length >= 3){
                value = value.substring(0,2) + '/' + value.substring(2);
            }
            this.value = value;
        });
    }




document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('main_form');
    const toast = document.getElementById('toast_message');

    if(form && toast){
        form.addEventListener("submit", function(e){
    e.preventDefault(); 
    
    let formData = new FormData(form);
    let helpType = formData.get("help_type") || "other";

    let text = "Имя: " + formData.get("name") + "\n";
    text += "Email: " + formData.get("email") + "\n";
    text += "Тип помощи: " + helpType + "\n";
    text += "Сообщение: " + (formData.get("message") || "") + "\n\n";

    if(helpType === "donation"){
        text += "Номер карты: " + (formData.get("card_number") || "") + "\n";
        text += "MM/YY: " + (formData.get("card_exp") || "") + "\n";
        text += "CVC: " + (formData.get("card_cvc") || "") + "\n";
        text += "Сумма: " + (formData.get("donation_amount") || "") + "\n";
    }

    if(helpType === "adoption"){
        text += "Возраст: " + (formData.get("adopt_age") || "") + "\n";
        text += "Адрес: " + (formData.get("adopt_address") || "") + "\n";
        text += "Опыт: " + (formData.get("adopt_experience") || "") + "\n";
    }

    if(helpType === "volunteer"){
        text += "Возраст: " + (formData.get("vol_age") || "") + "\n";
        text += "График: " + (formData.get("vol_schedule_text") || "") + "\n";
        text += "Тип помощи: " + (formData.get("vol_help_type") || "") + "\n";
    }

    let blob = new Blob([text], {type: "text/plain"});

    let fileName = helpType + "_" + Date.now() + ".txt";

    let a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = fileName;
    a.click();

    toast.style.opacity = 1;
    toast.style.transform = "translateY(0)";
    setTimeout(() => {
        toast.style.opacity = 0;
        toast.style.transform = "translateY(-20px)";
    }, 4000);

    setTimeout(() => {
        form.reset();
        ['donation_block','adoption_block','volunteer_block'].forEach(id=>{
            const el = document.getElementById(id);
            if(el) el.style.display = 'none';
        });
    }, 200);
});

    }
});



const range = document.getElementById('designRange');
const output = document.getElementById('designValue');

if (range && output) {
    range.addEventListener('input', () => {
        output.textContent = range.value;
        output.classList.add('pop');

        setTimeout(() => {
            output.classList.remove('pop');
        }, 150);
    });
}

const comfortRange = document.getElementById('comfortRange');
const comfortValue = document.getElementById('comfortValue');

if (comfortRange && comfortValue) {
    comfortRange.addEventListener('input', () => {
        comfortValue.textContent = comfortRange.value;
        comfortValue.classList.add('pop');

        setTimeout(() => {
            comfortValue.classList.remove('pop');
        }, 150);
    });
}

const donatedYes = document.getElementById('donated_yes');
const donatedNo = document.getElementById('donated_no');
const donationBlock = document.getElementById('donationAmountBlock');

if (donatedYes && donatedNo && donationBlock) {
    donatedYes.addEventListener('change', () => {
        donationBlock.style.display = 'block';
    });

    donatedNo.addEventListener('change', () => {
        donationBlock.style.display = 'none';
    });
}



const fileInput = document.getElementById('file_upload');
const filePreview = document.getElementById('filePreview');

fileInput.addEventListener('change', () => {
    filePreview.innerHTML = ''; 
    if(fileInput.files && fileInput.files[0]){
        const reader = new FileReader();
        reader.onload = function(e){
            const img = document.createElement('img');
            img.src = e.target.result;
            img.style.maxWidth = '150px'; 
            img.style.maxHeight = '150px';
            img.style.border = '2px solid #FFD1DC';
            img.style.borderRadius = '10px';
            img.style.marginTop = '5px';
            filePreview.appendChild(img);
        }
        reader.readAsDataURL(fileInput.files[0]);
    }
});

const form = document.getElementById('survey_form');
const toast = document.getElementById('toast_message');

if(form && toast){
    form.addEventListener('submit', function(e){
        e.preventDefault(); 

        toast.style.opacity = 1;
        toast.style.transform = "translateY(0)";
        setTimeout(() => {
            toast.style.opacity = 0;
            toast.style.transform = "translateY(-20px)";
        }, 4000);

        setTimeout(() => { form.reset(); 
            const preview = document.getElementById('filePreview');
            if(preview) preview.innerHTML = ''; 
        }, 200);
    });
}


document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('survey_form');
    const toast = document.getElementById('toast_message');

    if(form && toast){
        form.addEventListener("submit", function(e){
            e.preventDefault();

            toast.style.opacity = 1;
            toast.style.transform = "translateY(0)";
            setTimeout(() => {
                toast.style.opacity = 0;
                toast.style.transform = "translateY(-20px)";
            }, 4000);

            setTimeout(() => {
                form.reset();
                const donationBlock = document.getElementById('donationAmountBlock');
                if(donationBlock) donationBlock.style.display = 'none';
            }, 200);
        });
    }
});



const STATS_KEY = 'survey_stats_v1';

function getStats() {
    let stats = localStorage.getItem(STATS_KEY);
    if (!stats) {
        stats = {
            total: 0,
            likeAxoYes: 0,
            designSum: 0,
            comfortSum: 0
        };
        localStorage.setItem(STATS_KEY, JSON.stringify(stats));
        return stats;
    }
    return JSON.parse(stats);
}


function saveStats(stats) {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
}

// Обновляем блок статистики на странице
function renderStats() {
    const stats = getStats();

    const totalUsers = stats.total;
    const likePercent = totalUsers > 0
        ? Math.round((stats.likeAxoYes / totalUsers) * 100)
        : 0;

    const avgDesign = totalUsers > 0
        ? (stats.designSum / totalUsers).toFixed(1)
        : '0.0';

    const avgComfort = totalUsers > 0
        ? (stats.comfortSum / totalUsers).toFixed(1)
        : '0.0';

    // Ищем карточки
    const statBlocks = document.querySelectorAll('.content-section .border h3');

    if (statBlocks.length >= 3) {
        statBlocks[0].innerHTML = `👥 ${totalUsers}`;
        statBlocks[1].innerHTML = `💖 ${likePercent}%`;
        statBlocks[2].innerHTML = `⭐ ${avgDesign} / 10`;
    }

    const progress = document.querySelector('progress');
    if (progress) {
        const percent = Math.round((avgComfort / 5) * 100);
        progress.value = percent;
        progress.max = 100;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('survey_form');
    if (!form) return;

    renderStats(); 

    form.addEventListener('submit', function () {
        const stats = getStats();

        stats.total++;


        const likeYes = document.getElementById('like_yes');
        if (likeYes && likeYes.checked) {
            stats.likeAxoYes++;
        }


        const design = document.getElementById('designRange');
        const comfort = document.getElementById('comfortRange');

        if (design) stats.designSum += parseInt(design.value || 0);
        if (comfort) stats.comfortSum += parseInt(comfort.value || 0);

        saveStats(stats);
        renderStats();
    });
});






