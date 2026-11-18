document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');
  const statusBox = document.getElementById('formStatus');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (statusBox) {
      statusBox.textContent = 'Thank you for reaching out! A RyComm representative will follow up with you shortly.';
      statusBox.classList.remove('hidden');
    } else {
      alert('Thank you for reaching out! A RyComm representative will follow up with you shortly.');
    }

    form.reset();
  });
});
