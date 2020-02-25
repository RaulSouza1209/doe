const button = document.querySelector('header button');
const form = document.querySelector('.form');

button.addEventListener('click', function() {
  form.classList.toggle('hide');
});
