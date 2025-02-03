// Обработка формы контактов
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращаем отправку формы

    // Получаем данные из формы
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Проверяем, что все поля заполнены
    if (name && email && message) {
        alert('Спасибо, ' + name + '! Ваше сообщение отправлено.');
        document.getElementById('contactForm').reset(); // Очищаем форму
    } else {
        alert('Пожалуйста, заполните все поля.');
    }
});

// Обработка формы загрузки файлов
document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращаем отправку формы

    const photoFile = document.getElementById('photo').files[0];
    const videoFile = document.getElementById('video').files[0];

    if (photoFile) {
        displayFile(photoFile, 'image');
    }

    if (videoFile) {
        displayFile(videoFile, 'video');
    }

    document.getElementById('uploadForm').reset(); // Очищаем форму
});

// Функция для отображения загруженных файлов
function displayFile(file, type) {
    const reader = new FileReader();
    const uploadedFilesDiv = document.getElementById('uploadedFiles');

    reader.onload = function(e) {
        let mediaElement;
        if (type === 'image') {
            mediaElement = document.createElement('img');
            mediaElement.src = e.target.result;
        } else if (type === 'video') {
            mediaElement = document.createElement('video');
            mediaElement.src = e.target.result;
            mediaElement.controls = true;
        }

        uploadedFilesDiv.appendChild(mediaElement);
    };

    reader.readAsDataURL(file);
}
// Карусель
const carouselInner = document.querySelector('.carousel-inner');
const carouselItems = document.querySelectorAll('.carousel-item');
const prevButton = document.querySelector('.carousel-control.prev');
const nextButton = document.querySelector('.carousel-control.next');
let currentIndex = 0;

// Функция для переключения слайдов
function showSlide(index) {
    const offset = -index * 100;
    carouselInner.style.transform = `translateX(${offset}%)`;
    carouselItems.forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });
}

// Переключение на предыдущий слайд
prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : carouselItems.length - 1;
    showSlide(currentIndex);
});

// Переключение на следующий слайд
nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex < carouselItems.length - 1) ? currentIndex + 1 : 0;
    showSlide(currentIndex);
});

// Автоматическое перелистывание (опционально)
setInterval(() => {
    currentIndex = (currentIndex < carouselItems.length - 1) ? currentIndex + 1 : 0;
    showSlide(currentIndex);
}, 5000); // Интервал 5 секунд
const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' }); // Папка для сохранения файлов

// Обработка загрузки файлов
app.post('/upload', upload.single('file'), (req, res) => {
    res.send('Файл загружен!');
});

// Запуск сервера
app.listen(3000, () => {
    console.log('Сервер запущен на http://localhost:3000');
});
document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const fileInput = document.getElementById('photo');
    const file = fileInput.files[0];

    if (file) {
        const formData = new FormData();
        formData.append('file', file);

        fetch('/upload', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.text())
        .then(message => {
            alert(message);
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
    } else {
        alert('Пожалуйста, выберите файл.');
    }
});