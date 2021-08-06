const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')
const message3 = document.querySelector('#message-3')
const message1Header = document.querySelector('#message-1-header')
const message2Header = document.querySelector('#message-2-header')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    message1Header.textContent = 'loading...'
    message1.textContent = ''
    message2Header.textContent = ''
    message2.textContent = ''
    
    const location = '/weather?address=' + search.value

    console.log(location)
    
    fetch(location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
                message1Header.textContent = data.error
            } else {
                console.log(data)
                message1Header.textContent = 'Current temp:'
                message1.textContent = data.temperature
                message2Header.textContent = 'Feels like:'
                message2.textContent = data.feelsLike
                message3.textContent = data.location
            }
        })
    })
})