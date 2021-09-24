class ValidatorForm {
    constructor() {
        this.form = document.querySelector('.form');
        this.events();
    }

    events() {
        this.form.addEventListener('submit', e => {
            this.handleSubmit(e);
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        let fieldsAreValid = this.validFields();
         let passAreValid = this.validPass();

         if(fieldsAreValid && passAreValid) {
             alert('formulário enviado com sucesso!')
             this.form.submit();
         }
    }

    validPass() {
        let valid = true;
        let password = this.form.querySelector('.password');
        let repeatPassword = this.form.querySelector('.repeatPassword')
      
        if(password.value !== repeatPassword.value) {
            valid = false;
            this.createError(password, 'Campo Senha e Repetir Senha precisam ser iguais.');
            this.createError(repeatPassword, 'Campo Senha e Repetir Senha precisam ser iguais.');
        }
        if(password.value.length < 6 || password.value.length > 12) {
            valid = false;
            this.createError(password,' Senha precisa conter entre 6 e 12 caracteres.')
        }
        return valid;
    }
    validFields() {
        let valid = true;
        
        for(let textError of this.form.querySelectorAll('.textError')) {
                textError.remove();
            }
        
        for(let field of this.form.querySelectorAll('.valid')) {
            let label = field.previousElementSibling.innerText;
            if(!field.value) {
                valid = false;
                this.createError(field, `Campo "${label}" não pode estra em branco`)
            }
            if(field.classList.contains('cpf')) {
                if(!this.cpfIsValid(field))
                valid = false;
            }    
            if(field.classList.contains('user')) {
                if(!this.validUser(field)) {
                    valid = false;
                }
            }   
        }
        return valid;
    }

    validUser(field) {
        let valid = true;
        if(field.value.length < 3 || field.value.length > 12) {
            valid = false;
            this.createError(field, 'Campo Usuário precisa conter entre 3 e 12 caracteres.')
        }
        if(!field.value.match(/[a-zA-Z0-9]/g)) {
            valid = false;
            this.createError(field, 'Campo Usuário precisa conter apenas letra e números.')
        }
        return valid;
    }

    cpfIsValid(field) {
        
        let cpf = new ValidatorCPF(field.value);
        if(!cpf.validCPF()) {
            this.createError(field, 'CPF inválido');
            return false;
        }
        return true;
    }

    createError(field, msg) {
        let p = document.createElement('p');
        p.innerText = msg;
        p.classList.add('textError')
        field.insertAdjacentElement('afterend', p);
    }
}

let validatorForm = new ValidatorForm();