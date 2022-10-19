import "./css/index.css"

const ccBgColor01 = document.querySelector('.cc-bg svg > g g:first-child path')
const ccBgColor02 = document.querySelector('.cc-bg svg > g g:last-child path')

ccBgColor01.setAttribute('fill', 'green')
ccBgColor02.setAttribute('fill', 'red')