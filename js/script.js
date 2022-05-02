window.addEventListener('DOMContentLoaded', function () {

  /**
   * Tabs
   */

  let tabs = document.querySelectorAll('.tabheader__item'),
    tabsContent = document.querySelectorAll('.tabcontent'),
    tabsParent = document.querySelector('.tabheader__items');

  function hideTabContent() {

    tabsContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });

    tabs.forEach(item => {
      item.classList.remove('tabheader__item_active');
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add('tabheader__item_active');
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener('click', function (event) {
    const target = event.target;
    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });


  const deadline = '2022-05-07';

  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
      days = Math.floor((t / (1000 * 60 * 60 * 24))),
      seconds = Math.floor((t / 1000) % 60),
      minutes = Math.floor((t / 1000 / 60) % 60),
      hours = Math.floor((t / (1000 * 60 * 60) % 24));

    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return '0' + num;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {

    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock('.timer', deadline);

  /**
   * Modal
   */

  const modalTrigger = document.querySelectorAll('[data-modal]'),
    modal = document.querySelector('.modal');

  modalTrigger.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  function closeModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }

  function openModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimerId);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute("data-close") == "") {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === "Escape" && modal.classList.contains('show')) {
      closeModal();
    }
  });

  const modalTimerId = setTimeout(openModal, 50000);

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  }
  window.addEventListener('scroll', showModalByScroll);

  /**
   * clasess for cards
   */

  class MenuCard {
    constructor(src, alt, title, description, price, parentSelector, ...clasess) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.description = description;
      this.price = price;
      this.clasess = clasess;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 0.92;
      this.changeToEuro();
    }

    changeToEuro() {
      this.price = Math.round(this.price * this.transfer);
    }

    render() {
      const element = document.createElement("div");
      if (this.clasess.length === 0) {
        this.element = "menu__item";
        element.classList.add(this.element);
      } else {
        this.clasess.forEach(className => element.classList.add(className));
      }

      element.innerHTML = `
        <img src=${this.src} alt=${this.alt}>
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.description}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> Euro/день</div>
        </div>
      `;
      this.parent.append(element);
    }
  }

  const getData = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };

  axios.get("http://localhost:3000/menu")
    .then(data => {
      data.data.forEach(({
        img,
        altimg,
        title,
        descr,
        price
      }) => { //тут деструктуриация объекта 
        new MenuCard(img, altimg, title, descr, price, ".menu .container", "menu__item").render();
      });
    });

  // getData("http://localhost:3000/menu")
  //     .then(data => {
  //         data.forEach(({img, altimg, title, descr, price}) => { //тут деструктуриация объекта 
  //             new MenuCard(img, altimg, title, descr, price, ".menu .container", "menu__item").render();
  //         });
  //     });

  // getData("http://localhost:3000/menu")
  //     .then(data =>  createCard(data)); для более адаптивной верстки

  // function createCard(data) {
  //     data.forEach(({img, altimg, title, descr, price}) => {
  //         const element = document.createElement("div");

  //         element.classList.add("menu__item");
  //         element.innerHTML = `
  //             <img src=${img} alt=${altimg}>
  //             <h3 class="menu__item-subtitle">${title}</h3>
  //             <div class="menu__item-descr">${descr}</div>
  //             <div class="menu__item-divider"></div>
  //             <div class="menu__item-price">
  //                 <div class="menu__item-cost">Цена:</div>
  //                 <div class="menu__item-total"><span>${price}</span> Euro/день</div>
  //             </div>
  //         `;

  //         document.querySelector(".menu .container").append(element);
  //     });
  // }

  // new MenuCard(
  //     "img/tabs/vegy.jpg",
  //     "vegy",
  //     `Меню "Фитнес"`,
  //     `Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!`,
  //     15,
  //     ".menu .container",
  //     "menu__item"
  // ).render();

  // new MenuCard(
  //     "img/tabs/elite.jpg",
  //     "elite",
  //     `Меню “Премиум”`,
  //     `В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!`,
  //     20,
  //     ".menu .container",
  //     "menu__item"
  // ).render();

  // new MenuCard(
  //     "img/tabs/post.jpg",
  //     "post",
  //     `Меню "Постное"`,
  //     `Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.`,
  //     25,
  //     ".menu .container",
  //     "menu__item"
  // ).render();

  /**
   *  Forms
   */

  const forms = document.querySelectorAll("form");

  const message = {
    loading: "img/form/spinner.svg",
    success: "Success, we got it!",
    failure: "Something went wrong..."
  };

  forms.forEach(item => {
    bindPostData(item);
  });

  const postData = async (url, data) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: data
    });

    return await res.json();
  };

  function bindPostData(form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const statusMessage = document.createElement("img");
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
      form.insertAdjacentElement("afterend", statusMessage);

      // const request = new XMLHttpRequest();
      // request.open("POST", "server.php");
      // request.setRequestHeader("Content-type", "application/json");
      /** instead of this commented  lines we now using fetch  */

      const formData = new FormData(form);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      const object = {};
      formData.forEach(function (value, key) {
        object[key] = value;
      });
      // не нужно так как аменили на postData()
      // fetch("server.php", {  
      //     method: "POST",
      //     headers: {
      //         "Content-type": "application/json"
      //     },
      //     body: JSON.stringify(object)
      // })
      postData(" http://localhost:3000/requests", json)
        .then(data => {
          console.log(data);
          showThanksModal(message.success);

          statusMessage.remove();
        }).catch(() => {
          showThanksModal(message.failure);
        }).finally(() => {
          form.reset();
        });
      // request.addEventListener("load", () => {
      //     if (request.status === 200 && request.statusText === "OK") {
      //         console.log(request);
      //         showThanksModal(message.success);
      //         console.log(statusMessage.textContext);
      //         form.reset();
      //         statusMessage.remove();
      //     } else {
      //         showThanksModal(message.failure);
      //     }
      // });
    });
  }

  function showThanksModal(message) {
    const beforeModalDialog = document.querySelector(".modal__dialog");

    beforeModalDialog.classList.add("hide");
    openModal();

    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
            <div class="modal__content">
              <div class="modal__close" data-close>&times;</div>
              <div class="modal__title">${message}</div>
            </div>
        `;

    document.querySelector(".modal").append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      beforeModalDialog.classList.add("show");
      beforeModalDialog.classList.remove("hide");
      closeModal();
    }, 400000);
  }

  /**
   * Slider
   */

  const slides = document.querySelectorAll(".offer__slide"),
    slider = document.querySelector(".offer__slider"),
    prev = document.querySelector(".offer__slider-prev"),
    next = document.querySelector(".offer__slider-next"),
    total = document.querySelector("#total"),
    current = document.querySelector("#current"),
    slidesWrapper = document.querySelector(".offer__slider-wrapper"),
    slidesField = document.querySelector(".offer__slider-inner"),
    width = window.getComputedStyle(slidesWrapper).width;
  let slideIndex = 1;
  let offset = 0;
  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
  }
  // карусель 

  slidesField.style.width = 100 * slides.length + "%";
  slidesField.style.display = "flex";
  slidesField.style.transition = "0.5s all";

  slidesWrapper.style.overflow = "hidden";

  slides.forEach(slide => {
    slide.style.width = width;
  });

  slider.style.position = "relative";

  const indicators = document.createElement("ol"),
    dots = [];
  indicators.classList.add("carousel-indicators");

  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("li");
    dot.setAttribute("data-slide-to", i + 1);
    dot.classList.add("dot");
    if (i == 0) {
      dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
  }

  function lightCurrentDot() {
    dots.forEach(dot => dot.style.opacity = ".5");
    dots[slideIndex - 1].style.opacity = 1;
  }

  function changeCurrentSlideNumber() {
    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
  }

  function deleteAllNoneDigits(string) {
    return +string.replace(/\D/g, "");
  }

  next.addEventListener("click", () => {
    if (offset == deleteAllNoneDigits(width) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += deleteAllNoneDigits(width);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    changeCurrentSlideNumber();
    lightCurrentDot();
  });

  prev.addEventListener("click", () => {
    if (offset == 0) {
      offset = deleteAllNoneDigits(width) * (slides.length - 1);

    } else {
      offset -= deleteAllNoneDigits(width);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    changeCurrentSlideNumber();
    lightCurrentDot();
  });

  // навигация слайдера 

  dots.forEach(dot => {
    dot.addEventListener("click", (e) =>{
      const slideTo = e.target.getAttribute("data-slide-to");
      slideIndex = slideTo;
      offset = deleteAllNoneDigits(width) * (slideTo - 1);
      slidesField.style.transform = `translateX(-${offset}px)`;

      changeCurrentSlideNumber();
      lightCurrentDot();
    });
  });


  // showSlides(slideIndex); дефолтный слайдер

  // if (slides.length < 10) {
  //     total.textContent = `0${slides.length}`;
  // } else {
  //     total.textContent = slides.length;
  // }

  // function showSlides (index) {
  //     if (index > slides.length) {
  //         slideIndex = 1;
  //     }

  //     if (index < 1) {
  //         slideIndex = slides.length;
  //     }

  //     slides.forEach(item => item.style.display = "none");

  //     slides[slideIndex -1].style.display = "block";

  //     if (slides.length < 10) {
  //         current.textContent = `0${slideIndex}`;
  //     } else {
  //         current.textContent = slideIndex;
  //     }
  // }


  // function plusSlides(n) {
  //     showSlides(slideIndex += n);
  // }

  // prev.addEventListener("click", () => {
  //     plusSlides(-1);
  // });

  // next.addEventListener("click", () => {
  //     plusSlides(1);
  // });


  /**
   * Calculator
   */

  const result = document.querySelector(".calculating__result span");
  
  let sex, height, age, weight, ratio;

  if (localStorage.getItem("sex")) {
    sex = localStorage.getItem("sex");
  } else {
    sex = "female";
    localStorage.setItem("sex", "female");
  }

  if (localStorage.getItem("ratio")) {
    ratio = localStorage.getItem("ratio");
  } else {
    ratio = 1.375;
    localStorage.setItem("ratio", 1.375);
  }

  function initLocalSettings(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

    elements.forEach(elem => {
      elem.classList.remove(activeClass);
      if (elem.getAttribute("id") === localStorage.getItem("sex")) {
        elem.classList.add(activeClass);
      }
      if (elem.getAttribute("data-ratio") === localStorage.getItem("ratio")) {
        elem.classList.add(activeClass);
      }
    });
  }

  function calcTotal() {
    if (!sex || !height || !age || !weight || !ratio) {
      result.textContent = "_____";
      return;
    } 

    if (sex === "female") {
      result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
    } else {
      result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
    }
  }

  function getStaticInformation(selector, activeClass) {
    const elements = document.querySelectorAll(`${selector} div`);

    elements.forEach(elem => {
      elem.addEventListener("click", (e) => {
        if (e.target.getAttribute("data-ratio")) {
          ratio = +e.target.getAttribute("data-ratio");
          localStorage.setItem("ratio", +e.target.getAttribute("data-ratio"));
        } else {
          sex = e.target.getAttribute("id");
          localStorage.setItem("sex", sex);
        }
  
        elements.forEach(elem => {
          elem.classList.remove(activeClass);
        });
        e.target.classList.add(activeClass);
        calcTotal();
      });
    });
  }

  function getDynamicInformation(selector) {
    const input = document.querySelector(selector);

    input.addEventListener("input", () => {
      if (input.value.match(/\D/g)) {
        input.style.border = "1px solid red";
      } else {
        input.style.border = "none";
      }

      switch (input.getAttribute("id")) {
        case "height":
          height = +input.value;
          break;
        case "weight":
          weight = +input.value;
          break;
        case "age":
          age = +input.value;
          break;
      }
      calcTotal();
    });
  }

  initLocalSettings("#gender div","calculating__choose-item_active");
  initLocalSettings(".calculating__choose_big div","calculating__choose-item_active");
  calcTotal();
  
  getStaticInformation("#gender", "calculating__choose-item_active");
  getStaticInformation(".calculating__choose_big", "calculating__choose-item_active");

  getDynamicInformation("#height");
  getDynamicInformation("#weight");
  getDynamicInformation("#age");
});