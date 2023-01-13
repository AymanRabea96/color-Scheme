console.clear()
// color picker
const chooseColor = document.getElementById('choose-color')

document.getElementById('get-color-btn').addEventListener('click', function () {
    const selectedScheme = document.getElementById('select-scheme').value

    const pickedColor = chooseColor.value.substring(1)

    fetch(`https://www.thecolorapi.com/scheme?hex=${pickedColor}&count=20&mode=${selectedScheme}`)
        .then(res => res.json())
        .then(data => {

            let imgHtml = ''
            const colorsArray = data.colors

            for (let color of colorsArray) {
                let imageSrc = color.image.bare
                let hexValue = color.hex.value

                imgHtml += `
           <div>
           <img class="color-img" src="${imageSrc}" />
           <p class="hex-value">${hexValue}</p>
        
           </div>
            `
            }

            document.getElementById('colors-container').innerHTML = imgHtml

            let hexValueEls = document.getElementsByClassName('hex-value')

            for (let hexValueEl of hexValueEls) {
                let hexValueElcurrent = hexValueEl.textContent
                hexValueEl.addEventListener('click', function () {
                    navigator.clipboard.writeText(hexValueEl.textContent)
                    hexValueEl.textContent = 'copied'
                    setTimeout(() => {
                        hexValueEl.textContent = hexValueElcurrent
                    }, 1500);
                })
            }

        }

        )
})
