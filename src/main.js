import "./css/index.css"
import Imask from 'imask'

const ccBgColor01 = document.querySelector('.cc-bg svg > g g:first-child path')
const ccBgColor02 = document.querySelector('.cc-bg svg > g g:last-child path')
const ccLogo = document.querySelector('.cc-logo span:nth-child(2) img')

function setCardType(type = 'default') {
  console.log(cardNumberMasked.masked.currentMask.cardtype)
  const colors = {
    visa: ['#436D99', '#2D57F2'],
    mastercard: ['#DF6F29', '#C69347'],
    default: ['black', 'gray']
  }

  ccBgColor01.setAttribute('fill', colors[type][0])
  ccBgColor02.setAttribute('fill', colors[type][1])

  ccLogo.setAttribute('src', `cc-${type}.svg`)
}

const securityCode = document.querySelector('#security-code')
const securityCodePattern = {
  mask: '0000'
}

const securityCodeMasked = Imask(securityCode, securityCodePattern)

const expirationDate = document.querySelector('#expiration-date')
const exporationDatePattern = {
  mask: 'MM{/}YY',
  blocks: {
    MM: {
      mask: Imask.MaskedRange,
      from: 1,
      to: 12
    },
    YY: {
      mask: Imask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2)
    }
  }
}

globalThis.setCardType = setCardType
const expirationDateMasked = Imask(expirationDate, exporationDatePattern)

const cardNumber = document.querySelector('#card-number')
const cardNumberPattern = {
  mask: [
    {
      mask: '0000 0000 0000 0000',
      regex: /^4\d{0,15}/,
      cardtype: 'visa'
    },
    {
      mask: '0000 0000 0000 0000',
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
      cardtype: 'mastercard'
    },
    {
      mask: '0000 0000 0000 0000',
      cardtype: 'default'
    }
  ],
  dispatch: (appended, dynamicMasked) => {
    const number = (dynamicMasked.value + appended).replace(/\D/g, '')

    // { regex } destructuring the object
    const foundMask = dynamicMasked.compiledMasks.find( ({ regex }) => { return number.match(regex) })

    return foundMask
  }
}

const cardNumberMasked = Imask(cardNumber, cardNumberPattern)

const addButton = document.querySelector('#add-card')

addButton.addEventListener('click', e => {

})

document.querySelector('form').addEventListener('submit', ev => {
  ev.preventDefault()
})


const cardHolder = document.querySelector('#card-holder')

cardHolder.addEventListener('input', ev => {
  const ccHolder = document.querySelector('.cc-holder .value')
  ccHolder.innerText = cardHolder.value || 'Nome do titular'
})

const cardHolderMasked = Imask(cardHolder, {
  mask: String,
  regex: /([a-z])/g
})

securityCodeMasked.on('accept', () => {
  updateSecurityCode(securityCodeMasked.value)
})

const updateSecurityCode = code => {
  const ccSecurity = document.querySelector('.cc-security .value')

  ccSecurity.innerText = code || '123'
}

cardNumberMasked.on('accept', () => {
  updateCardNumber(cardNumberMasked.value)
  const cardType = cardNumberMasked.masked.currentMask.cardtype
  setCardType(cardType)
})

function updateCardNumber(number) {
  const ccNumber = document.querySelector('.cc-number')

  ccNumber.innerText = number || '1234 5678 9012 3456'
}

expirationDateMasked.on('accept', () => {
  updateExpirationDate(expirationDateMasked.value)
})

function updateExpirationDate(date) {
  const ccExpiration = document.querySelector('.cc-extra .value')

  ccExpiration.innerText = date || '02/32'
}