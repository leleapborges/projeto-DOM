//criar classe para mapear todas as validações esxistentes
class Validator{
    constructor(){
        this.validations = [
            'data-required',
            'data-max-length',
            'data-min-length',
            'data-email-validate',
            'data-only-letters',
            'data-password-validate',
            'data-equal',

        ]
 
 
    }
    //iniciar a validação de todos os campos
    validate(form){

        //resgatar todas as validações
        let currenteValidattions = document.querySelectorAll('form .error-validation');
    
        if(currenteValidattions.length > 0){
            this.cleanValidations(currenteValidattions);
        }
        //pegar inputs
        let inputs = form.getElementsByTagName('input');
    
        //transforma o que foi recebido,que é um HTML Collection em Arry
        let inputsArray = [...inputs];

        //loop nos inputs e validação mediante ao que forencontrado
        inputsArray.forEach(function(input){
            for(let i = 0; this.validations.length > i ; i++){
                //verifica se a validação atual existe no input
                if(input.getAttribute(this.validations[i]) != null)
                {
                    //limpando a string para virar um método
                    let method = this.validations[i].replace('data-', '').replace('-', '');
                    //valor do input
                    let value = input.getAttribute(this.validations[i]);
                    //invocar o método
                    this[method] (input, value);
                }
            }   
        },this);
    };
    //verificar si o input tem um número minimo de caracters
    minlength(input, minValue){
        let inputLength = input.value.length;
        let errorMessage = `O campo precisa ter pelo menos ${minValue} caracters`;

        if(inputLength < minValue){
            this.printMessage(input, errorMessage); 
        }
    };

    //verificar se um input passou do limite de caracteres
    maxlength(input, maxValue){
        let inputLength = input.value.lenght;
        let errorMessage = `O campo precisa ter menos que ${maxValue} caracters`;

        if(inputLegenth > maxValue){
            this.printMessege(input, errorMessage)
        }
    };

    //validar  emails
    emailvalidate(input){
        let re = /\S+@\S+\.\S+/;
        let email = input.value;
        let errorMessage = 'Insira um e-mail no padrão exemplo@gmail.com';

        if(!re.test(email)){
            this.printMessage(input, errorMessage);
        };
    };

    //validar se os campos tem apenas letras
    onlyletters(input){
        //usando rejex ( re de regular expressions)
        let re = /^[A-Za-z]+$/;
        
        let inputValue = input.value;
        let errorMessage = `Este campo não aceita números nem caracters especiais.`;

        if(!re.test(inputValue)){
            this.printMessage(input, errorMessage);
        };
    };
    //verifica se conteúdos do campo senha são iquais
    equal(input, inputName){
        let inputToCompare = document.getElementsByName(inputName)[0];
        let errorMessage = `Este campo precisa estar iqual ao${inputName}`;

        if(input.value != inputToCompare.value){
        this.printMessage(input, errorMessage);
        };
    };

    //valida o campo de senha
    passwordValidate(input){
        let chatArr = input.value.split("");
        let uppercases = 0;
        let numbers = 0;

        for(let i=0; chatArr.lenght > i; i++){
            if(chatArr[i] === chatArr[i].toUppercase() && isNaN(parseInt(chatArr[i]))){
                    uppercases
            }else if(isNaN(parseInt(chatArr[i]))){
                numbers++;
            }
        }
        if(uppercases === 0 || numbers === 0){
            let errorMessage = `a sennha precisa de pelo menos um caractere minusculo e um número.`;
            this.printMessage(input, errorMessage);
        };

    };

    //metodo para imprimir mensagens de erro na tela
    printMessage(input, msg){


        //quantidade de erros
        let errorQtd = input.parentNode.querySelector('.error-validation');
        if(errorQtd === null){

            let template = document.querySelector('.error-validation').cloneNode(true);
            template.textContent = msg; 
            let inputParent = input.parentNode;
            template.classList.remove('template');
            inputParent.appendChild(template);
        };

    };

//verificar se o input  é requirido (exigido)
required(input){
    let inputValue = input.value;

    if(inputValue === ''){
        let errorMessage = `Este campo é de prenchimento obrigatório.`;

        this.printMessage(input, errorMessage);
    };
};
    cleanValidations(validations){
    validations. forEach(el => el.remove())
    };
};

// pegar os dados do formulario e do botão
let form = document.getElementById("register-form");
let submit = document.getElementById("btn-submit");

//inicindo o objeto Validator
let validator = new Validator();

//evento que vai disparar as validações
submit.addEventListener('click', function(e){
    e.preventDefault();
    validator.validate(form);
});