'use strict'
const shoppingCartIcon = '<svg version="1.1" class="shopping-cart black" id="cart-icon" xmlns="http://www.w3.org/2000/svg" x="0" y="0"\
                viewBox="0 0 128 128\" style=\"enable-background:new 0 0 128 128\" xml:space=\"preserve">\
                <g id="_x35__1_">\
                    <path class="st2"\
                        d="M124.5 39.8H38v6.9h83v6.9H38v6.9h83v6.9H38v6.9h83v6.9H31.1V1.7H0v6.9h24.2v79.6H128V39.8h-3.5zM24.2 102.1H128v-6.9H24.2v6.9zm20.8 3.4c-5.7 0-10.4 4.6-10.4 10.4 0 5.7 4.6 10.4 10.4 10.4 5.7 0 10.4-4.6 10.4-10.4 0-5.7-4.7-10.4-10.4-10.4zm62.2 0c-5.7 0-10.4 4.6-10.4 10.4 0 5.7 4.6 10.4 10.4 10.4 5.7 0 10.4-4.6 10.4-10.4 0-5.7-4.6-10.4-10.4-10.4z"\
                        id="icon_10_" />\
                </g>\
            </svg>';

const checkMark = '<svg version="1.1" id="icons_1_" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 128 128" style="enable-background:new 0 0 128 128" xml:space="preserve"><style>.st0{display:none}.st1{display:inline}.st2{fill:#0a0a0a}</style><g id="row1_1_"><g id="_x35__2_"><path class="st2" d="M64 .3C28.7.3 0 28.8 0 64s28.7 63.7 64 63.7 64-28.5 64-63.7S99.3.3 64 .3zm0 121C32.2 121.3 6.4 95.7 6.4 64 6.4 32.3 32.2 6.7 64 6.7s57.6 25.7 57.6 57.3c0 31.7-25.8 57.3-57.6 57.3zm23.2-76.8c-.9-.9-2.3-.9-3.2 0L55.2 73.2 41.4 59.5c-.9-.9-2.3-.9-3.2 0l-4.8 4.8c-.9.9-.9 2.3 0 3.2l15.3 15.3 3.3 3.3.8.8.7.7c.9.9 2.3.9 3.2 0L92 52.5c.9-.9.9-2.3 0-3.2l-4.8-4.8z" id="error_transparent_copy"/></g></g></svg>';



document.addEventListener('DOMContentLoaded', () => {


    const homePageContainer = document.getElementById('home-page-container');
    const topBar = document.querySelector('.top-area');
    const contentArea = document.querySelector('.content-area');
    const cartCounter = document.getElementById('cart-counter');
    const checkoutBanner = document.getElementById('checkout-banner');
    const checkoutButton = document.getElementById('checkout-btn');
    const checkoutCloseBtn = document.getElementById('checkout-closer');
    const gamesList = document.querySelector('.items-list');
    const priceTotal = document.getElementById('total-price');
    const confirmBtn = document.getElementById('confirm-button');
    const checkoutContent = document.querySelector('.checkout-content');
    const searchInput = document.getElementById('search-input');

    let totalPrice = 0;
    let gamesArr = [];

    homePageContainer.style.height = '100vh';

    fetch('https://api.jsonsilo.com/public/840ce560-9596-4154-b4ca-ff014394500f')
        .then(res => res.json())
        .then(rawData => {
            homePageContainer.style.height = 'fit-content';
            createGameCards(rawData);

            document.addEventListener('submit', (e) => {
                e.preventDefault();
                contentArea.innerHTML = '';

                const searchValue = searchInput.value.toLowerCase();
                let filteredData;

                if (searchValue === "") {
                    filteredData = rawData;
                } else {
                    filteredData = rawData.filter((item) => {
                        return item.title.toLowerCase().includes(searchValue) || item.genre.toLowerCase().includes(searchValue) || item.platform.toLowerCase().includes(searchValue);
                    })
                }
                createGameCards(filteredData);
            })
        })

    function createGameCards(data) {
        for (const item of data) {

            const gameCard = document.createElement('div');
            const cardImage = document.createElement('div');
            const cardInfo = document.createElement('div');
            const cardDescription = document.createElement('div');
            const cardButtons = document.createElement('div');
            const gameThumbnail = document.createElement('img');
            const gameTitle = document.createElement('p');
            const priceSect = document.createElement('div')
            const gamePrice = document.createElement('p');
            const savePercent = document.createElement('p');
            const addToCartBtn = document.createElement('button');
            const moreInfoBtn = document.createElement('button');
            const moreInfoArea = document.querySelector('.more-info');


            contentArea.appendChild(gameCard);
            gameCard.className = 'game-card';

            gameCard.appendChild(cardImage);
            cardImage.className = 'card-image-area';

            gameCard.appendChild(cardInfo);
            cardInfo.className = 'card-info-area'

            cardInfo.appendChild(cardDescription);
            cardDescription.className = 'card-description-area'

            cardInfo.appendChild(cardButtons);
            cardButtons.className = 'card-button-area';

            cardImage.appendChild(gameThumbnail);
            gameThumbnail.className = 'game-thumb';
            gameThumbnail.src = item.thumbnail;

            cardDescription.appendChild(gameTitle);
            gameTitle.className = 'game-title';
            gameTitle.textContent = item.title

            cardDescription.appendChild(priceSect);
            priceSect.className = 'price-section';

            let price = item.id * 100
            priceSect.appendChild(gamePrice);
            gamePrice.className = 'game-price';
            gamePrice.textContent = `TZS ${price}`

            let percent = (Math.ceil((item.id / 100) ** 2)) + 10;
            priceSect.appendChild(savePercent)
            savePercent.className = 'percent-saved';
            savePercent.textContent = `Save ${percent}%`

            cardButtons.appendChild(moreInfoBtn);
            moreInfoBtn.className = 'button info';
            moreInfoBtn.textContent = 'Info';

            cardButtons.appendChild(addToCartBtn);
            addToCartBtn.className = 'button checkout'
            addToCartBtn.innerHTML = shoppingCartIcon


            cardImage.addEventListener('click', () => {
                pullMoreInfoSect()

            })

            moreInfoBtn.addEventListener('click', () => {
                pullMoreInfoSect()
            })

            function pullMoreInfoSect() {
                moreInfoArea.classList.remove('collapse')
                moreInfoArea.innerHTML = '';

                const buttonLine = document.createElement('div')
                moreInfoArea.appendChild(buttonLine);
                buttonLine.className = 'close-btn-div';

                const closeMenuBtn = document.createElement('button');
                buttonLine.appendChild(closeMenuBtn);
                closeMenuBtn.className = 'button';
                closeMenuBtn.classList.add('close-menu-btn');
                closeMenuBtn.textContent = 'X';

                closeMenuBtn.addEventListener('click', () => {
                    moreInfoArea.classList.add('collapse')
                })

                const gameTitleInfo = document.createElement('h1');
                moreInfoArea.appendChild(gameTitleInfo);
                gameTitleInfo.className = 'more-info-title';
                gameTitleInfo.textContent = item.title;

                const gameThumbnailInfo = document.createElement('img');
                moreInfoArea.appendChild(gameThumbnailInfo);
                gameThumbnailInfo.className = 'more-info-image';
                gameThumbnailInfo.src = item.thumbnail;

                const gameDescription = document.createElement('p');
                moreInfoArea.appendChild(gameDescription);
                gameDescription.className = 'more-info-description';
                gameDescription.textContent = item.short_description;

                const pointersArea = document.createElement('div');
                moreInfoArea.appendChild(pointersArea);
                pointersArea.className = 'pointers-area';

                const developerInfo = document.createElement('p');
                pointersArea.appendChild(developerInfo);
                developerInfo.className = 'more-info-developer pointer';
                developerInfo.innerHTML = `<span>Developer:</span> ${item.developer}`;

                const genreInfo = document.createElement('p');
                pointersArea.appendChild(genreInfo);
                genreInfo.className = 'more-info-genre pointer';
                genreInfo.innerHTML = `<span>Genre:</span> ${item.genre}`;

                const platformInfo = document.createElement('p');
                pointersArea.appendChild(platformInfo);
                platformInfo.className = 'more-info-platform pointer';
                platformInfo.innerHTML = `<span>Platform:</span> ${item.platform}`;

                const priceArea = document.createElement('div');
                moreInfoArea.appendChild(priceArea);
                priceArea.className = 'price-area'

                const priceInfo = document.createElement('p');
                priceArea.appendChild(priceInfo);
                priceInfo.className = 'more-info-price header';
                priceInfo.innerHTML = `<span>Price:</span> ${price}`;

                const addToCartMoreInfo = document.createElement('button')
                priceArea.appendChild(addToCartMoreInfo)
                addToCartMoreInfo.className = 'button checkout';
                addToCartMoreInfo.id = 'add-to-cart-more-info'
                addToCartMoreInfo.innerText = 'Add to Cart'
                addToCartMoreInfo.style.width = '120px'



                if (addToCartBtn.disabled) {
                    disableAddButton(addToCartMoreInfo);
                    addToCartMoreInfo.innerHTML = 'Added to Cart';
                }

                addToCartBtn.addEventListener('click', () => {
                    disableAddButton(addToCartMoreInfo);
                    addToCartMoreInfo.innerHTML = 'Added to Cart';
                })

                addToCartMoreInfo.addEventListener('click', () => {
                    updateToCart();
                    disableAddButton(addToCartMoreInfo);
                    addToCartMoreInfo.innerHTML = 'Added to Cart';
                })


            }
            function updateToCart() {
                addToCartBtn.disabled
                totalPrice += price;
                cartCounter.textContent = `TZS ${totalPrice}`;
                disableAddButton(addToCartBtn);
                gamesArr.push(item.title);
            }

            addToCartBtn.addEventListener('click', () => {
                updateToCart();
                return gamesArr && totalPrice
            })

            confirmBtn.addEventListener('click', () => {
                addToCartBtn.disabled = false;
                addToCartBtn.classList.remove('inactive');
            })

            function disableAddButton(button) {
                button.classList.add('inactive');
                button.disabled = true;
            }
        }
    }
    checkoutButton.addEventListener('click', () => {
        if (totalPrice > 0) {
            checkoutBanner.classList.remove('hidden');

            for (const item of gamesArr) {
                const listEntry = document.createElement('li');
                gamesList.appendChild(listEntry)
                listEntry.textContent = item
            }

            priceTotal.textContent = totalPrice


        } else alert('You don\'t have anything in the Cart!')
    })

    const checkArea = document.createElement('div');
    const confirmedMessage = document.createElement('p');

    checkoutCloseBtn.addEventListener('click', () => {
        gamesList.innerHTML = '';
        checkoutContent.classList.remove('hidden');
        checkoutBanner.classList.add('hidden');
        checkArea.classList.add('hidden')
        confirmedMessage.classList.add('hidden')
    })


    confirmBtn.addEventListener('click', () => {
        gamesArr = [];
        totalPrice = 0;

        cartCounter.textContent = 0


        checkoutContent.classList.add('hidden');
        checkoutContent.style.height = '0px';

        checkoutBanner.appendChild(checkArea);
        checkArea.className = 'check-area-div';
        checkArea.innerHTML = checkMark;

        checkoutBanner.appendChild(confirmedMessage);
        confirmedMessage.textContent = 'Your Order Is Confirmed!';
        confirmedMessage.className = 'confirm-message'

    })
})