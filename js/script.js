
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
    const body = document.querySelector('body');
    const lockPadding = document.querySelectorAll('.lock-padding');
    const popup_link__form = document.querySelectorAll('.popup-link__form');

    let unlock = true;

    const timeout = 800;

    for (let i = 0; i < popupLinks.length; i++) {
        const popupLink = popupLinks[i];
        popupLink.addEventListener('click', function (e) {
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const curentPopup = document.getElementById(popupName);
            popupOpen(curentPopup);
            e.preventDefault();
        })
    }

    const popupCloseIcon = document.querySelectorAll('.close');

    for (let i = 0; i < popupCloseIcon.length; i++) {
        const el = popupCloseIcon[i];
        el.addEventListener('click', function (e) {
            popupClose(el.closest('.popup'))
            e.preventDefault();
        })
    }

    function popupOpen(curentPopup) {
        if (curentPopup && unlock) {
            const popupActive = document.querySelector('.popup.open');
            if (popupActive) {
                popupClose(popupActive, false);
            } else {
                bodyLock();
            }
            curentPopup.classList.add('open');
            curentPopup.addEventListener('click', function (e) {
                if (!e.target.closest('.popup__content')) {
                    popupClose(e.target.closest('.popup'));
                }
            })
        }
    }
    function popupClose(popupActive, doUnlock = true) {
        if (unlock) {
            popupActive.classList.remove('open');
            if (doUnlock) {
                bodyUnLock();
            }
        }
    }
    function bodyLock() {
        const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
        if (lockPadding.length > 0) {
            for (let i = 0; i < lockPadding.length; i++) {
                const el = lockPadding[i];
                el.style.paddingRight = lockPaddingValue;
            }
        }
        body.style.paddingRight = lockPaddingValue;
        body.classList.add('lock');

        unlock = false;
        setTimeout(function () {
            unlock = true;
        }, timeout);
    }

    function bodyUnLock() {
        setTimeout(function () {
            if (lockPadding.length > 0) {
                for (let i = 0; i < lockPadding.length; i++) {
                    const el = lockPadding[i];
                    el.style.paddingRight = '0px';
                }
            }
            body.style.paddingRight = '0px';
            body.classList.remove('lock');
        }, timeout);

        unlock = false;
        setTimeout(function () {
            unlock = true;
        }, timeout);
    }
    document.addEventListener('keydown', function (e) {
        if (e.which === 27) {
            const popupActive = document.querySelector('.popup.open');
            popupClose(popupActive);
        }
    });
   
    for (let i = 0; i < popup_link__form.length; i++) {
        const popupLinkForm = popup_link__form[i];
        popupLinkForm.addEventListener('click', function (e) {
            popupClose(el.closest('.popup'))
        })
        
    }
    // gallery popup конец
    
    
    // burger menu 
    const header_link = document.querySelector('.header-list')
    const burger_menu = document.querySelector('.burger-menu_button');
    const header_list = document.querySelector('.header-list');
    if (document.documentElement.clientWidth < 1200) {
        document.getElementById("about-bg__img").src = "./img/about-bg__lg.png";
        burger_menu.onclick = function (e) {
            e.preventDefault();
            burger_menu.classList.toggle("burger-menu_active");
            // console.log(burger_menu)
            if (burger_menu.classList.contains("burger-menu_active")) {
                // header_link.style.display = "flex";
                header_list.classList.add('header-list__active');
            } else {
                header_list.classList.remove('header-list__active');
                // header_link.style.display = "none";
                
            }
        }
    }
    else {
        document.getElementById("about-bg__img").src = "./img/about-img.png";
    };



});
