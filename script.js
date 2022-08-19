document.getElementById('cargo').selectedIndex = -1;

function showHeaderMenu() {
  const nav = document.getElementById('nav');

  if (nav.classList.contains('active')) {
    nav.classList.remove('active');
  } else {
    nav.classList.add('active');
  }
}

function showDropdownMenu() {
  const menu = document.getElementById('menu-2');

  if (menu.classList.contains('active')) {
    menu.classList.remove('active');
  } else {
    menu.classList.add('active');
  }
}

function validateEmail(input) {
  const regexEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

  if (input.value === '') {
    document.getElementById('email-input-error').removeAttribute('style');

    input.setCustomValidity('');
    return;
  }

  if (!regexEmail.test(input.value)) {
    input.setCustomValidity('Email inválido. Digite novamente');
    document.getElementById('email-input-error').innerHTML =
      input.validationMessage;
    document.getElementById('email-input-error').style.display = 'block';
  } else {
    document.getElementById('email-input-error').removeAttribute('style');
    input.setCustomValidity('');
  }
}

function passwordTest(input) {
  let passwordTest = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,10}$/;

  if (input.value === '') {
    document.getElementById('password-input-error').removeAttribute('style');

    input.setCustomValidity('');
    return;
  }

  if (!passwordTest.test(input.value)) {
    input.setCustomValidity('Senha inválida. Digite novamente');
    document.getElementById('password-input-error').innerHTML =
      input.validationMessage;
    document.getElementById('password-input-error').style.display = 'block';
  } else {
    document.getElementById('password-input-error').removeAttribute('style');
    input.setCustomValidity('');
  }
}

function checkMatchingPassword(input) {
  console.log(input);
  if (input.value != document.getElementById('password').value) {
    input.setCustomValidity('As senhas não são iguais');
    document.getElementById('password-input-error').innerHTML =
      input.validationMessage;
    document.getElementById('password-input-error').style.display = 'block';
  } else {
    document.getElementById('password-input-error').removeAttribute('style');
    input.setCustomValidity('');
  }
}

function handleClickRadio(input) {
  console.log('radio', input);
  const radio1 = document.getElementById('site');
  const siteInput = document.getElementById('form_site');
  const radio2 = document.getElementById('site-dont');

  if (input === radio1) {
    siteInput.removeAttribute('disabled');
    siteInput.setAttribute('required', '');
  }
  if (input === radio2) {
    siteInput.setAttribute('disabled', '');
    siteInput.removeAttribute('required');

    siteInput.value = '';
    document.getElementById('url-input-error').innerText = '';
    document.getElementById('url-input-error').removeAttribute('style');
  }
}

function togglePasswordVisibility(icon) {
  console.log(icon.getAttribute('id'));
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirm-password');

  if (icon.getAttribute('id') === 'password_icon') {
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      icon.firstChild.innerText = 'visibility_off';
    } else {
      passwordInput.type = 'password';
      icon.firstChild.innerText = 'visibility';
    }
  }

  if (icon.getAttribute('id') === 'confirm_password_icon') {
    if (confirmPasswordInput.type === 'password') {
      confirmPasswordInput.type = 'text';
      icon.firstChild.innerText = 'visibility_off';
    } else {
      confirmPasswordInput.type = 'password';
      icon.firstChild.innerText = 'visibility';
    }
  }
}
function checkUrl(input) {
  const regexUrl =
    /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;

  if (input.value === '') {
    document.getElementById('url-input-error').removeAttribute('style');

    input.setCustomValidity('');
    return;
  }

  if (!regexUrl.test(input.value)) {
    input.setCustomValidity('Url inválida. Digite novamente');
    document.getElementById('url-input-error').innerHTML =
      input.validationMessage;
    document.getElementById('url-input-error').style.display = 'block';
  } else {
    document.getElementById('url-input-error').removeAttribute('style');
    input.setCustomValidity('');
  }
}

function playVideo() {
  const clip = document.querySelector('.clip');

  clip.classList.add('active');
}

function closeVideo() {
  const clip = document.querySelector('.clip');

  const source = clip.firstElementChild.src;
  clip.firstElementChild.src = '';
  clip.firstElementChild.src = source;
  clip.classList.remove('active');
}

function formSubmit(e) {
  const form = document.getElementById('form');
  e.preventDefault();
  const formData = new FormData(form);
  console.log('FORMDATA', formData);

  fetch('https://app.rdstation.com.br/signup', {
    method: 'post',
    body: formData,
    mode: 'no-cors',
  })
    .then(function (response) {
      console.log('SUCCESS');
      formSuccess();
      return;
    })
    .then(function (text) {});
}

function formSuccess() {
  const form = document.getElementById('form');
  const formSuccess = document.querySelector('.form-success');

  form.classList.add('inactive');
  formSuccess.classList.add('active');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function mascaraTelefone(event) {
  console.log(event);
  let tecla = event.key;
  let telefone = event.target.value.replace(/\D+/g, '');

  if (/^[0-9]$/i.test(tecla)) {
    telefone = telefone + tecla;
    let tamanho = telefone.length;

    if (tamanho >= 12) {
      return false;
    }

    if (tamanho > 10) {
      telefone = telefone.replace(/^(\d\d)(\d{5})(\d{4}).*/, '($1) $2-$3');
    } else if (tamanho > 5) {
      telefone = telefone.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, '($1) $2-$3');
    } else if (tamanho > 2) {
      telefone = telefone.replace(/^(\d\d)(\d{0,5})/, '($1) $2');
    } else {
      telefone = telefone.replace(/^(\d*)/, '($1');
    }

    event.target.value = telefone;
  }

  if (['Backspace', 'Delete'].includes(tecla)) {
    if (/^[0-9]$/i.test(tecla)) {
      if (tamanho > 5 && tamanho <= 10) {
        telefone = telefone.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, '($1) $2-$3');
      }

      event.target.value = telefone;
    }
  }

  if (!['Backspace', 'Delete'].includes(tecla)) {
    return false;
  }
}
