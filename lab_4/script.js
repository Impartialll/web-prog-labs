// форма валідація
const nameInput = document.getElementById('name');
const ageInput = document.getElementById('age');
const emailInput = document.getElementById('email');

const nameError = document.getElementById('nameError');
const ageError = document.getElementById('ageError');
const emailError = document.getElementById('emailError');

nameInput.addEventListener('input', () => {
  const value = nameInput.value.trim();
  if (value.length < 3 || value.length > 20) {
    nameError.textContent = "Ім'я має бути від 3 до 20 символів.";
  } else {
    nameError.textContent = "";
  }
});

ageInput.addEventListener('input', () => {
  const value = parseInt(ageInput.value, 10);
  if (isNaN(value) || value < 18 || value > 99) {
    ageError.textContent = "Вік має бути між 18 і 99.";
  } else {
    ageError.textContent = "";
  }
});

emailInput.addEventListener('input', () => {
  const value = emailInput.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(value)) {
    emailError.textContent = "Введіть коректний email.";
  } else {
    emailError.textContent = "";
  }
});

document.getElementById('userForm').addEventListener('submit', (e) => {
  e.preventDefault();
  if (!nameError.textContent && !ageError.textContent && !emailError.textContent) {
    alert("Дані надіслані успішно!");
  } else {
    alert("Виправте помилки у формі.");
  }
});

// галерея
const gallery = document.getElementById('gallery');
const addImageBtn = document.getElementById('addImage');
const removeImageBtn = document.getElementById('removeImage');

function loadGallery() {
  gallery.innerHTML = '';
  const images = JSON.parse(localStorage.getItem('gallery')) || [];
  images.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    gallery.appendChild(img);
  });
}

function addImage() {
  const images = JSON.parse(localStorage.getItem('gallery')) || [];
  const newImage = `https://picsum.photos/200/150?random=${Date.now()}`;
  images.push(newImage);
  localStorage.setItem('gallery', JSON.stringify(images));
  loadGallery();
}

function removeImage() {
  let images = JSON.parse(localStorage.getItem('gallery')) || [];
  images.pop();
  localStorage.setItem('gallery', JSON.stringify(images));
  loadGallery();
}

addImageBtn.addEventListener('click', addImage);
removeImageBtn.addEventListener('click', removeImage);

// завантажити галерею при старті
loadGallery();
