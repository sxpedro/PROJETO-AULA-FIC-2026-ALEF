function appendValue(value) {
    const resultField = document.getElementById('result');
    if (resultField.value === "0") {
        resultField.value = value;
    } else {
        resultField.value += value;
    }
}

function clearResult() {
    document.getElementById('result').value = '0';
}

function calculateResult() {
    const resultField = document.getElementById('result');
    try {
        let expression = resultField.value.replace(/x/g, '*');
        resultField.value = eval(expression);
    } catch (e) {
        resultField.value = 'Erro';
    }
}