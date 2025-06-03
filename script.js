const container = document.querySelector('.container'),
qrInput = container.querySelector('.conteudo input'),
generateBtn = container.querySelector('.conteudo button'),
qrImg = container.querySelector('.area-qr-code .imagem');

generateBtn.addEventListener('click', () => {
    let qrValue = qrInput.value;
    if (!qrValue) {
        alert("Insira uma URL ou texto para gerar o qr code")
        return;
    }
    generateBtn.innerText = 'Gerando um Qr code...';
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=170x170&data=${qrValue}`;
    qrImg.addEventListener('load', () => {
        generateBtn.innerText = 'Gerar QR CODE';
        container.classList.add('active');
    });
});

qrInput.addEventListener('keyup', () => {
    if(!qrInput.value) {
        container.classList.remove('active');
    };
});