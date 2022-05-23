import {getData} from "../services/services";

function cards() {
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

  getData("http://localhost:3000/menu")
    .then(data => {
      data.forEach(({
        img,
        altimg,
        title,
        descr,
        price
      }) => { //тут деструктуриация объекта 
        new MenuCard(img, altimg, title, descr, price, ".menu .container", "menu__item").render();
      });
    });

    
  // axios.get("http://localhost:3000/menu") // with axios library
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

export default cards;