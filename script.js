const qrInput = document.getElementById('qr-input');
const generateBtn = document.getElementById('generate-btn');
const canvas = document.getElementById('qr-canvas');
const ctx = canvas.getContext('2d');
const logoInput = document.getElementById('logo-upload');
const downloadLink = document.getElementById('download-link');
const label_do_file = document.getElementsByClassName('custom-file-upload')[0];

let logoImage = null;

logoInput.addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(evt) {
      logoImage = new Image();
      logoImage.src = evt.target.result;
    };
   
    reader.readAsDataURL(file);
      // se a imagem for carregada com sucesso, muda para verde e altera o texto para "imagem carregada!"
    document.querySelector('.custom-file-upload').classList.add('carregado');
    label_do_file.innerHTML = 'Imagem carregada!';
    
  }
});

generateBtn.addEventListener('click', () => {
  const text = qrInput.value;
  if (!text) {
    alert("Insira uma URL ou texto para gerar o QR Code");
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  QRCode.toCanvas(canvas, text, { width: 300 }, function (error) {
     document.querySelector('.container').classList.add('active');
    if (error) {
      console.error(error);
      return;
    }

    if (logoImage && logoImage.complete) {
      const size = 60;
      const x = (canvas.width - size) / 2;
      const y = (canvas.height - size) / 2;
      ctx.drawImage(logoImage, x, y, size, size);
    }

    downloadLink.href = canvas.toDataURL();
  });
});