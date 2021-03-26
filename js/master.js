/*----------------------- Global Variables ---------- */
let randomOption = true,
    backgroundInterval;
/* ---------------------------------Local Storage data -------------------------*/
//Store Data-colors in Local Storage
color_list = localStorage.getItem('color_data');

if (color_list != null) {

    document.documentElement.style.setProperty('--main-color', color_list);

    document.querySelectorAll('.color-list li').forEach(element => {
        element.classList.remove('active')

        if (element.dataset.color === color_list) {
            element.classList.add('active')
        }
    })
}

//Store background options in Local Storage
backgroundOption = localStorage.getItem('background_data');
if (backgroundOption != null) {

    document.querySelectorAll('.random_background span').forEach(element => {

        element.classList.remove('active')
    })

    if (backgroundOption === 'true') {
        document.querySelector('.yes').classList.add('active')
        randomOption = true
    } else {
        document.querySelector('.no').classList.add('active')
        randomOption = false
    }
}


/* --------------------------------- Settings box  -------------------------*/
// getting the setting box
let gear = document.querySelector('.gear'),
    setting_box = document.querySelector('.setting-box');

//toggle class in settings box
gear.onclick = () => {
    gear.classList.toggle('fa-spin')
    setting_box.classList.toggle('open-settings')
}

/*------------------------------------- Landing Page: random background --------------------------*/
let landingPage = document.querySelector('.landing-page')

let images = ["img1", 'img3', 'img4', 'img7', 'img8', 'programmer']

randomImageBak = () => {
    if (randomOption) {
        backgroundInterval = setInterval(() => {
            let randomNumber = Math.floor(Math.random() * images.length)

            landingPage.style.background = `url(./images/${images[randomNumber]}.jpg)`;//getting random background
            landingPage.style.backgroundSize = 'cover'
        }, 1500)
    }
}

randomImageBak()


/*-----------------------------------------Random colors : Change the color of the root element --------------*/

const listItem = document.querySelectorAll('.color-list li');//Change the color of the main-color

listItem.forEach(Item => {//add event listener for each item in the list

    Item.addEventListener('click', (e) => {

        //let color = Item.getAttribute('data-color');
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);
        localStorage.setItem('color_data', e.target.dataset.color);//set the data-color value in localStorage
        localStorage.setItem('class_active', e.target.classList.add('active'));

        e.target.parentElement.querySelectorAll('.active').forEach(element => {
            element.classList.remove('active')
        })

        e.target.classList.add('active')

    })
});

/*------------------------------------Random background : enable or disable the random background --------------*/

const spans = document.querySelectorAll('.random_background span');

spans.forEach(span => {//add event listener for each span

    span.addEventListener('click', (e) => {


        e.target.parentElement.querySelectorAll('.active').forEach(element => {
            element.classList.remove('active')
        })

        e.target.classList.add('active')

        if (e.target.dataset.background === 'yes') {
            randomOption = true
            randomImageBak()
            localStorage.setItem('background_data', randomOption)

        } else if (e.target.dataset.background === 'no') {
            randomOption = false
            clearInterval(backgroundInterval)
            localStorage.setItem('background_data', randomOption)

        }

    })
});

/*------------------------------ Our Skills js section ------------------- */
let ourSkills = document.querySelector('.skills')
window.onscroll = () => {

    let skillsOffsetTop = ourSkills.offsetTop,//skills offset top

        skillsOuterHeight = ourSkills.offsetHeight,//skills outer height

        windowHeight = this.innerHeight,//window height

        windowScrollTop = this.pageYOffset;//windo scroll top

    let allProgessSpan = ourSkills.querySelectorAll('.skill-progress span')// all skills 

    if ((windowScrollTop + 350) > (skillsOffsetTop)) {

        allProgessSpan.forEach(skill => {

            skill.style.width = skill.dataset.progress
            skill.innerHTML = skill.dataset.progress

        })
    } else {
        allProgessSpan.forEach(skill => {

            skill.style.width = '100%'
            skill.textContent = '100%'

        })
    }
}

/* ------------------------------------- Our Galery Section --------------------------- */
let ourGalery = document.querySelectorAll('.Galery img');

ourGalery.forEach(img => {

    img.addEventListener('click', () => {

        let overlayDiv = document.createElement('div'),//create div element
            imgOverLay = document.createElement('img');//create img element

        overlayDiv.className = 'pop-up-img';//div class name

        document.body.appendChild(overlayDiv);//append it to body

        imgOverLay.src = img.src

        //div container of the img + h2 
        let popDiv = document.createElement('div');
        popDiv.className = 'popDiv'
        //add heading descritive to the current image
        if (img.alt !== null) {
            let imgHeading = document.createElement('h2'),
                textNode = document.createTextNode(img.alt);

            imgHeading.appendChild(textNode)
            imgHeading.className = 'popUp-head'
            popDiv.appendChild(imgHeading)
        }
        popDiv.appendChild(imgOverLay)

        overlayDiv.appendChild(popDiv)
        imgOverLay.onclick = () => {
            overlayDiv.remove()
        }

    })



})








