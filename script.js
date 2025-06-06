const container = document.querySelector('.container'),
qrInput = container.querySelector('.conteudo input'),
generateBtn = container.querySelector('.conteudo button'),
qrImg = container.querySelector('.area-qr-code .imagem');
qrdow = container.querySelector('.area-qr-code .dow');

generateBtn.addEventListener('click', () => {
    let qrValue = qrInput.value;
    if (!qrValue) {
        alert("Insira uma URL ou texto para gerar o qr code");
        return;
    }
    generateBtn.innerText = 'Gerando um Qr code...';
    let qrCodeURL = `https://api.qrserver.com/v1/create-qr-code/?size=170x170&data=${qrValue}`;

    // Atualiza a imagem
    qrImg.src = qrCodeURL;
    qrImg.addEventListener('load', () => {
        generateBtn.innerText = 'Gerar QR CODE';
        container.classList.add('active');

        // Cria um link de download pelo Blob
        fetch(qrCodeURL)
            .then(response => response.blob())
            .then(blob => {
                let blobURL = URL.createObjectURL(blob);
                qrdow.href = blobURL;
                qrdow.download = "qrcode.png";
            });
    });
});

qrInput.addEventListener('keyup', () => {
    if(!qrInput.value) {
        container.classList.remove('active');
    };
});