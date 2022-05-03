const form = document.querySelector('form');
const search = document.querySelector('input')
const tempDisplay = document.querySelector('.temp');
const locationDisplay = document.querySelector('.location');


console.log('client side js is loaded')





form.addEventListener('submit', (e)=>{
    e.preventDefault()
    const location = search.value

    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {
        response.json().then((data) =>{
            if(data.error){
                tempDisplay.textContent = data.error
            } else {
            console.log(data)
            console.log(data.placeName)
            tempDisplay.textContent = `Temerature: ${data.forecast}`
            locationDisplay.textContent = `Location: ${data.placeName}`
            }
    
        })
    })

    console.log("location: " + location)
})


