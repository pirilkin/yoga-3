
let mask = document.querySelector('.mask');
window.addEventListener('load', () => {
    mask.classList.add('hide');
    setTimeout(() => {
        mask.remove()
    }, 600)
});


document.addEventListener('DOMContentLoaded', function () {
    // запрет выделения
    document.ondragstart = noselect;
    document.onselectstart = noselect;
    // document.oncontextmenu = noselect;
    function noselect() { return false; }
    // конец запреты выделения


    // кнопка наверх начало
    const btnUp = {
        el: document.querySelector('.btn-up'),
        show() {
            // удалим у кнопки класс btn-up_hide
            this.el.classList.remove('btn-up_hide');
        },
        hide() {
            // добавим к кнопке класс btn-up_hide
            this.el.classList.add('btn-up_hide');
        },
        addEventListener() {
            // при прокрутке содержимого страницы
            window.addEventListener('scroll', () => {
                // определяем величину прокрутки
                const scrollY = window.scrollY || document.documentElement.scrollTop;
                // если страница прокручена больше чем на 400px, то делаем кнопку видимой, иначе скрываем
                scrollY > 400 ? this.show() : this.hide();
            });
            // при нажатии на кнопку .btn-up
            document.querySelector('.btn-up').onclick = () => {
                // переместим в начало страницы
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                });
            }
        }
    }

    btnUp.addEventListener();

    // кнопка наверх конец

    // плавное опускание по ссылкам начало
    const smoothLinks = document.querySelectorAll('a[href^="#"]');
    for (let smoothLink of smoothLinks) {
        smoothLink.addEventListener('click', function (e) {
            e.preventDefault();
            const id = smoothLink.getAttribute('href');

            document.querySelector(id).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

        });
    };
    // плавное опускание по ссылкам конец

    // Swiper slider начало
    new Swiper('.image-slider', {
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        slidesPerView: 0.8,
        watchOverflow: true,
        spaceBetween: 40,
        centeredSlides: true,
        // initialSlide: 1,
        loop: true,
        breakpoints: {
            320: {
                slidesPerView: 1,
            },
            650: {
                slidesPerView: 1,
            },
            750: {
                slidesPerView: 1.25,
            },
        }
    });
    // Swiper slider конец


    // gallery popup начало
    const popupLinks = document.querySelectorAll('.gallery-title__link');

    let unlock = true;
    const timeout = 800;
    for (let i = 0; i < popupLinks.length; i++) {
        const popupLink = popupLinks[i];
        popupLink.addEventListener('click', function (e) {
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const curentPopup = document.getElementById(popupName);
            popupOpen(curentPopup);
            e.preventDefault;
        })
    }
    
    const popupCloseIcon = document.querySelectorAll('.close');
    
    for (let i = 0; i < popupCloseIcon.length; i++) {
        const el = popupCloseIcon[i];
        el.addEventListener('click', function (e) {
            popupClose(el.closest('.popup'))
            e.preventDefault;
        })
    }
    function popupOpen(curentPopup){
        if (curentPopup && unlock){
            const popupActive = document.querySelector('.popup.open');
            if (popupActive){
                popupClose(popupActive. false);
            }else{
                bodyLock();
            }
            curentPopup.classList.add('open');
            curentPopup.addEventListener('click', function(e) {
                if(!e.target.closest('.popup__content')){
                    popupClose(e.target.closest('.popup'));
                }
            })
        }
    }
    




    // gallery popup конец





});
