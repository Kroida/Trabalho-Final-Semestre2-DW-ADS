// Referências aos elementos
const debitRadio = document.getElementById('radioOption1');
const creditRadio = document.getElementById('radioOption2');
const cardInputContainer = document.getElementById('card-input-container');
const popup = document.getElementById('successPopup');
const overlay = document.getElementById('overlay');

// Função para limpar o input do cartão
function clearCardInput() {
    const existingInput = document.getElementById('cardNumberInput');
    if (existingInput) {
        existingInput.value = '';
        cardInputContainer.removeChild(existingInput);
    }
}

// Função para mostrar o campo de cartão
function showCardInput() {
    clearCardInput();
    
    if (!debitRadio.checked && !creditRadio.checked) {
        return;
    }
    
    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'cardNumberInput';
    input.className = 'form-control mt-3';
    input.placeholder = 'Digite o número do cartão';
    input.maxLength = 19;
    input.required = true;
    
    input.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s/g, '');
        value = value.replace(/\D/g, '');
        
        if (value.length > 16) {
            value = value.substr(0, 16);
        }
        
        const groups = value.match(/.{1,4}/g);
        if (groups) {
            e.target.value = groups.join(' ');
        }
    });

    input.addEventListener('blur', function(e) {
        const value = e.target.value.replace(/\s/g, '');
        if (value.length !== 16) {
            input.setCustomValidity('O número do cartão deve ter 16 dígitos');
        } else {
            input.setCustomValidity('');
        }
    });
    
    cardInputContainer.appendChild(input);
}

// Função para lidar com a mudança nos radio buttons
let lastChecked = null;
function handleRadioChange(e) {
    if (e.target.checked && e.target === lastChecked) {
        e.target.checked = false;
        lastChecked = null;
        clearCardInput();
    } else {
        lastChecked = e.target;
        showCardInput();
    }
}

// Event Listeners
debitRadio.addEventListener('click', handleRadioChange);
creditRadio.addEventListener('click', handleRadioChange);

document.querySelector('form').addEventListener('submit', function(e) {
    const cardInput = document.getElementById('cardNumberInput');
    if ((debitRadio.checked || creditRadio.checked) && (!cardInput || !cardInput.value)) {
        e.preventDefault();
        alert('Por favor, insira o número do cartão');
        return;
    }
    e.preventDefault();
    popup.style.display = 'block';
    overlay.style.display = 'block';
});