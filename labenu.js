const inputElement = document.querySelector('.input-email')
const buttonSendEmail = document.querySelector('.button-email')
const emailElement = document.querySelector(".email")

const showErrorDialog = (email) => {
  alert(`${email} é um email inválido`)
}

const validateEmail = () => {
  let isEmail = inputElement.value.includes('@')
  isEmail = inputElement.value.includes(".com")
  if (isEmail) {
    return emailElement.textContent = `Bem vindo ${inputElement.value}`
  }
  showErrorDialog(inputElement.value)
}

buttonSendEmail.addEventListener('click', validateEmail)
