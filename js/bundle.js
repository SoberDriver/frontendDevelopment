/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function calculator() {
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
      result.textContent = Math.round((447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio);
    } else {
      result.textContent = Math.round((88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio);
    }
  }

  function getStaticInformation(selector, activeClass) {
    const elements = document.querySelectorAll(`${selector} div`);
    elements.forEach(elem => {
      elem.addEventListener("click", e => {
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

  initLocalSettings("#gender div", "calculating__choose-item_active");
  initLocalSettings(".calculating__choose_big div", "calculating__choose-item_active");
  calcTotal();
  getStaticInformation("#gender", "calculating__choose-item_active");
  getStaticInformation(".calculating__choose_big", "calculating__choose-item_active");
  getDynamicInformation("#height");
  getDynamicInformation("#weight");
  getDynamicInformation("#age");
}

/* harmony default export */ __webpack_exports__["default"] = (calculator);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
  /**
   * clasess for cards
   */
  class MenuCard {
    constructor(src, alt, title, description, price, parentSelector) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.description = description;
      this.price = price;

      for (var _len = arguments.length, clasess = new Array(_len > 6 ? _len - 6 : 0), _key = 6; _key < _len; _key++) {
        clasess[_key - 6] = arguments[_key];
      }

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

  (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getData)("http://localhost:3000/menu").then(data => {
    data.forEach(_ref => {
      let {
        img,
        altimg,
        title,
        descr,
        price
      } = _ref;
      //тут деструктуриация объекта 
      new MenuCard(img, altimg, title, descr, price, ".menu .container", "menu__item").render();
    });
  }); // axios.get("http://localhost:3000/menu") // with axios library
  //   .then(data => {
  //     data.data.forEach(({
  //       img,
  //       altimg,
  //       title,
  //       descr,
  //       price
  //     }) => { //тут деструктуриация объекта 
  //       new MenuCard(img, altimg, title, descr, price, ".menu .container", "menu__item").render();
  //     });
  //   });
}

/* harmony default export */ __webpack_exports__["default"] = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formSelector, modalTimerId) {
  /**
   *  Forms
   */
  const forms = document.querySelectorAll(formSelector);
  const message = {
    loading: "img/form/spinner.svg",
    success: "Success, we got it!",
    failure: "Something went wrong..."
  };
  forms.forEach(item => {
    bindPostData(item);
  });

  function bindPostData(form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const statusMessage = document.createElement("img");
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
                 display: block;
                 margin: 0 auto;
             `;
      form.insertAdjacentElement("afterend", statusMessage); // const request = new XMLHttpRequest();
      // request.open("POST", "server.php");
      // request.setRequestHeader("Content-type", "application/json");

      /** instead of this commented  lines we now using fetch  */

      const formData = new FormData(form);
      const json = JSON.stringify(Object.fromEntries(formData.entries()));
      const object = {};
      formData.forEach(function (value, key) {
        object[key] = value;
      }); // не нужно так как аменили на postData()
      // fetch("server.php", {  
      //     method: "POST",
      //     headers: {
      //         "Content-type": "application/json"
      //     },
      //     body: JSON.stringify(object)
      // })

      (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)(" http://localhost:3000/requests", json).then(data => {
        console.log(data);
        showThanksModal(message.success);
        statusMessage.remove();
      }).catch(() => {
        showThanksModal(message.failure);
      }).finally(() => {
        form.reset();
      }); // request.addEventListener("load", () => {
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
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)(".modal", modalTimerId);
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
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)(".modal");
    }, 400000);
  }
}

/* harmony default export */ __webpack_exports__["default"] = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": function() { return /* binding */ closeModal; },
/* harmony export */   "openModal": function() { return /* binding */ openModal; }
/* harmony export */ });
function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add('hide');
  modal.classList.remove('show');
  document.body.style.overflow = '';
}

function openModal(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add('show');
  modal.classList.remove('hide');
  document.body.style.overflow = 'hidden';

  if (modalTimerId) {
    clearInterval(modalTimerId);
  }
}

function modal(triggerSelector, modalSelector, modalTimerId) {
  /**
   * Modal
   */
  const modalTrigger = document.querySelectorAll(triggerSelector),
        modal = document.querySelector(modalSelector);
  modalTrigger.forEach(btn => {
    btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
  });
  modal.addEventListener('click', e => {
    if (e.target === modal || e.target.getAttribute("data-close") == "") {
      closeModal(modalSelector);
    }
  });
  document.addEventListener('keydown', e => {
    if (e.code === "Escape" && modal.classList.contains('show')) {
      closeModal(modalSelector);
    }
  });

  function showModalByScroll() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      openModal(modalSelector, modalTimerId);
      window.removeEventListener('scroll', showModalByScroll);
    }
  }

  window.addEventListener('scroll', showModalByScroll);
}

/* harmony default export */ __webpack_exports__["default"] = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function slider(_ref) {
  let {
    container,
    slide,
    nextArrow,
    prevArrow,
    totalCounter,
    currentCounter,
    wrapper,
    filed
  } = _ref;

  /**
   * Slider
   */
  const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(filed),
        width = window.getComputedStyle(slidesWrapper).width;
  let slideIndex = 1;
  let offset = 0;

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
  } // карусель 


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
  }); // навигация слайдера 

  dots.forEach(dot => {
    dot.addEventListener("click", e => {
      const slideTo = e.target.getAttribute("data-slide-to");
      slideIndex = slideTo;
      offset = deleteAllNoneDigits(width) * (slideTo - 1);
      slidesField.style.transform = `translateX(-${offset}px)`;
      changeCurrentSlideNumber();
      lightCurrentDot();
    });
  }); // showSlides(slideIndex); дефолтный слайдер
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
}

/* harmony default export */ __webpack_exports__["default"] = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function tabs(tabsSelector, tabsContentelector, tabsParentSelector, activeClass) {
  /**
   * Tabs
   */
  let tabs = document.querySelectorAll(tabsSelector),
      tabsContent = document.querySelectorAll(tabsContentelector),
      tabsParent = document.querySelector(tabsParentSelector);

  function hideTabContent() {
    tabsContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });
    tabs.forEach(item => {
      item.classList.remove(activeClass);
    });
  }

  function showTabContent() {
    let i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add(activeClass);
  }

  hideTabContent();
  showTabContent();
  tabsParent.addEventListener('click', function (event) {
    const target = event.target;

    if (target && target.classList.contains(tabsSelector.slice(1))) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
}

/* harmony default export */ __webpack_exports__["default"] = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function timer(id, deadline) {
  /**
   * Timer
   */
  function getTimeRemaining(endtime) {
    const t = Date.parse(endtime) - Date.parse(new Date()),
          days = Math.floor(t / (1000 * 60 * 60 * 24)),
          seconds = Math.floor(t / 1000 % 60),
          minutes = Math.floor(t / 1000 / 60 % 60),
          hours = Math.floor(t / (1000 * 60 * 60) % 24);
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

  setClock(id, deadline);
}

/* harmony default export */ __webpack_exports__["default"] = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getData": function() { return /* binding */ getData; },
/* harmony export */   "postData": function() { return /* binding */ postData; }
/* harmony export */ });
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

async function getData(url) {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, status: ${res.status}`);
  }

  return await res.json();
}



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");








window.addEventListener('DOMContentLoaded', function () {
  const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__.openModal)(".modal", modalTimerId), 50000);
  (0,_modules_calculator__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_1__["default"])();
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_2__["default"])("form", modalTimerId);
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_3__["default"])('[data-modal]', ".modal", modalTimerId);
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_4__["default"])({
    container: ".offer__slider",
    slide: ".offer__slide",
    nextArrow: ".offer__slider-next",
    prevArrow: ".offer__slider-prev",
    totalCounter: "#total",
    currentCounter: "#current",
    wrapper: ".offer__slider-wrapper",
    filed: ".offer__slider-inner"
  });
  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_5__["default"])('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__["default"])('.timer', "2022-06-14");
});
}();
/******/ })()
;
//# sourceMappingURL=bundle.js.map