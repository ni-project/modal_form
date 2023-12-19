
class AppPresent {
    constructor() {
        this.bindEvents()
    }

    //-----------------------------------------------------
    // Variables
    //-----------------------------------------------------

    body = document.querySelector('body');
    container = document.querySelector('.present');
    button = this.container.querySelector('.present__button');
    modal = this.container.querySelector('.present__modal');
    buttonClose = this.container.querySelector('.present__modal__close');
    formInput = this.container.querySelectorAll('.form__input');

    //-----------------------------------------------------
    // Bind events
    //-----------------------------------------------------

    bindEvents() {
        this.button.addEventListener('click', this.handleClickButtonPresent);
        this.buttonClose.addEventListener('click', this.handleClickButtonCloseModal);
    }

    //-----------------------------------------------------
    // Methods
    //-----------------------------------------------------

    handleClickButtonPresent = () => {
        const isActive = this.button.classList.contains('.present__button--active');

        for (let index = 0; index < this.formInput.length; index++) {
            this.formInput[index].classList.remove('form__input--error');
            this.formInput[index].classList.remove('form__input--active');
            this.formInput[index].querySelector('input').value = '';
        }

        if ( !isActive ) {
            this.body.style.overflowY = 'hidden';
            this.button.classList.add('present__button--active');
            this.modal.classList.add('present__modal__form__active');

            setTimeout(() => {
                this.modal.classList.add('present__modal--active');
            }, 200);
        }
    };

    handleClickButtonCloseModal = () => {
        this.body.style.overflowY = 'auto';
        this.modal.classList.remove('present__modal--active');

        setTimeout(() => {
            this.button.classList.add('present__button--disactive');
            this.button.classList.remove('present__button--active');
            this.modal.querySelector('.modal__form').classList.remove('modal__form--success');
            this.modal.classList.remove('present__modal__form__active');
        }, 800);

        setTimeout(() => {
            this.button.classList.remove('present__button--disactive');
        }, 1200);
    };
}

new AppPresent();
