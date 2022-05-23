import {closeModal, openModal} from "./modal";
import {postData} from "../services/services";

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
    openModal(".modal", modalTimerId);

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
      closeModal(".modal");
    }, 400000);
  }
}

export default forms;