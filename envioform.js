const form = document.querySelector("#EnviaFormulario");

const getFormObject = () => {
    const formObject = {}; 
    const fields = form.querySelectorAll("[name]");

    fields.forEach((field) => {
        formObject[field.getAttribute("name")] = field.value;
    }); 
    return formObject;
}

const sendForm = async (event) => { 
    event.preventDefault();

    const button = document.querySelector('#EnviaFormulario input[type="submit"]');

    button.disabled = true; 

    const data = await client.genericForm.send( getFormObject() ); 
    if ( data ){ 
        form.reset();
        form.innerHTML += '<div id="mensagem-enviada" class="flex-wrap absolute top-0 left-0 w-full h-full flex items-center justify-center p-4" style="background: #1a1e50db;align-content: center;"><p class="text-2xl text-center text-white font-bold w-full">Sua mensagem foi <br>enviada com sucesso!</p><div id="fechar-mensagem-enviado" class="text-white text-2xl border border-white p-4 rounded-full flex items-center justify-center font-light mt-4 cursor-pointer" style="width: 35px;height: 35px;">x</div></div>';
        form.classList.add('sent');
        document.getElementById("fechar-mensagem-enviado").addEventListener("click", function() {
            var mensagemEnviada = document.getElementById("mensagem-enviada");
            if (mensagemEnviada) {
                mensagemEnviada.remove();
            }
        });
    }
}

if (form) form.addEventListener('submit', sendForm);

const inputTelefone = document.getElementById('telefone');
if(inputTelefone){
    inputTelefone.addEventListener('input', function (e) {
        var x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,1})(\d{0,4})(\d{0,4})/);
        e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + '.' + (x[3] ? x[3] + '-' + x[4] : x[3]);
    });
}

const inputCnpj = document.getElementById('cnpj');
if (inputCnpj) {
    inputCnpj.addEventListener('input', function (e) {
        var x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,3})(\d{0,3})(\d{0,4})(\d{0,2})/);
        e.target.value = x[1] + (x[2] ? '.' + x[2] : '') + (x[3] ? '.' + x[3] : '') + (x[4] ? '/' + x[4] : '') + (x[5] ? '-' + x[5] : '');
    });
} 

document.querySelectorAll('.radio-custom').forEach(function(customCheckbox) {
    customCheckbox.addEventListener('click', function() {
        const parent = this.closest('.radio-options');
        parent.querySelectorAll('.radio-custom').forEach(function(childCheckbox) {
            childCheckbox.classList.remove('active');
        });
        this.classList.add('active'); 

        const siblingRadio = this.nextElementSibling;
        if (siblingRadio && siblingRadio.type === 'radio') {
            siblingRadio.checked = true;
        }
    });
});