
class AppForm {
    constructor() {
        this.bindEvents()
    }

    //-----------------------------------------------------
    // Variables
    //-----------------------------------------------------

    form = document.querySelectorAll('.form');
    formPhone = document.querySelector('.form__phone');

    //-----------------------------------------------------
    // Bind events
    //-----------------------------------------------------

    bindEvents() {
        for ( let index = 0; index < this.form.length; index++ ) {
            const container = this.form[index];
            const formInput = container.querySelectorAll('input');

            for ( let indexForm = 0; indexForm < formInput.length; indexForm++ ) {
                formInput[indexForm].addEventListener('input', (event) => this.handleFormInputChange(event, formInput[indexForm]) );
                formInput[indexForm].addEventListener('focus', (event) => this.handleFormInputFocus(event, formInput[indexForm]) );
                formInput[indexForm].addEventListener('blur', (event) => this.handleFormInputBlur(event, formInput[indexForm]) );
            }

            container.addEventListener('submit', (event) => this.formSubmit(event, container));
        }

        this.phoneMaskInit(this.formPhone);
    }

    //-----------------------------------------------------
    // Methods
    //-----------------------------------------------------

    formSubmit = (event, form) => {
        const formData = new FormData(form);
        let data = {};
        let errors = [];

        event.preventDefault();

        for (const [key, value] of formData) {
            if ( value.trim().length === 0 ) {
                errors.push(key);
            } else {
                if ( key === 'phone' ) {
                    if ( value.length === 18 ) {
                        data[key] = value;
                    } else {
                        errors.push(key);
                    }
                } else {
                    data[key] = value;
                }
            }
        }

        if ( errors.length ) {
            errors.map((item) => {
                let inputName = 'input[name="' + item + '"]';
                let formInput = form.querySelector(inputName);

                formInput.closest('.form__input').classList.add('form__input--error');
            });
        } else {
            form.closest('.modal__form').classList.add('modal__form--success')
        }
    };

    phoneMaskInit = (input) => {
        IMask(input, {
            mask: '+{7} (000) 000-00-00'
        })
    };

    handleFormInputChange = (event, el) => {
        const container = el.closest('.form__input');

        if ( event.target.value.length ) {
            container.classList.remove('form__input--error');
        }
    };

    handleFormInputFocus = (event, el) => {
        const container = el.closest('.form__input');

        container.classList.add('form__input--active');
    };

    handleFormInputBlur = (event, el) => {
        const container = el.closest('.form__input');

        container.classList.remove('form__input--active');

        if ( event.target.value.length ) {
            container.classList.add('form__input--active');
            container.classList.remove('form__input--error');
        } else {
            container.classList.remove('form__input--active');
            container.classList.add('form__input--error');
        }
    };
}

new AppForm();
