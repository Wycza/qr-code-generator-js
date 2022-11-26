const form = document.getElementById('generate-form');
const qr = document.getElementById('qrcode');

const onGenerateSubmit = (e) => {
  e.preventDefault();

  clearUI();

  const url = document.getElementById('url').value;
  const size = document.getElementById('size').value;

  if (url === '') {
    alert('Please enter a URL');

    return;
  }

  toggleSpinner('block');

  setTimeout(() => {
    toggleSpinner('none');
    generateQRCode(url, size);

    setTimeout(() => {
      const saveUrl = qr.querySelector('img').src;
      createSaveBtn(saveUrl);
    }, 50);
  }, 1000);
}

const toggleSpinner = (display) => {
  document.getElementById('spinner').style.display = display;
}

const generateQRCode = (url, size) => {
  new QRCode(qr, {
    text: url,
    width: size,
    height: size,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });
}

const clearUI = () => {
  qr.innerHTML = '';
  const saveBtn = document.getElementById('save-link');

  if (saveBtn) {
    saveBtn.remove();
  }
}

const createSaveBtn = (saveUrl) => {
  const link = document.createElement('a');
  link.id = 'save-link';
  link.classList = 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5';
  link.href = saveUrl;
  link.download = 'qrcode';
  link.innerHTML = 'Save Image';

  document.getElementById('generated').appendChild(link);
};

toggleSpinner('none');

form.addEventListener('submit', onGenerateSubmit);