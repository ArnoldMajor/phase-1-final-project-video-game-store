'use strict'



document.addEventListener('DOMContentLoaded', () => {

    const homePageContainer = document.getElementById('home-page-container');
    const topBar = document.querySelector('.top-area');
    const contentArea = document.querySelector('.content-area');
    const cartCounter = document.getElementById('cart-counter')

    homePageContainer.style.height = '100vh';

    fetch('https://api.jsonsilo.com/public/840ce560-9596-4154-b4ca-ff014394500f')
        .then(res => res.json())
        .then(data => {
            homePageContainer.style.height = 'fit-content';
            fetchAllGames(data)
        })


    function fetchAllGames(data) {
        for (const item of data) {

            const gameCard = document.createElement('div');
            const cardImage = document.createElement('div');
            const cardInfo = document.createElement('div');
            const cardDescription = document.createElement('div');
            const cardButtons = document.createElement('div');
            const gameThumbnail = document.createElement('img');
            const gameTitle = document.createElement('p');
            const gamePrice = document.createElement('p');
            const addToCartBtn = document.createElement('button');
            const moreInfoBtn = document.createElement('button');


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

            cardDescription.appendChild(gamePrice);
            gamePrice.className = 'game-price';
            gamePrice.textContent = `TZS ${item.id}`

            cardButtons.appendChild(moreInfoBtn);
            moreInfoBtn.className = 'button info';
            moreInfoBtn.textContent = 'Info';

            cardButtons.appendChild(addToCartBtn);
            addToCartBtn.className = 'button checkout'
            addToCartBtn.innerHTML = '<svg version="1.1" class="shopping-cart black" xmlns="http://www.w3.org/2000/svg" x="0" y="0"\
                viewBox="0 0 128 128\" style=\"enable-background:new 0 0 128 128\" xml:space=\"preserve">\
                <g id="_x35__1_">\
                    <path class="st2"\
                        d="M124.5 39.8H38v6.9h83v6.9H38v6.9h83v6.9H38v6.9h83v6.9H31.1V1.7H0v6.9h24.2v79.6H128V39.8h-3.5zM24.2 102.1H128v-6.9H24.2v6.9zm20.8 3.4c-5.7 0-10.4 4.6-10.4 10.4 0 5.7 4.6 10.4 10.4 10.4 5.7 0 10.4-4.6 10.4-10.4 0-5.7-4.7-10.4-10.4-10.4zm62.2 0c-5.7 0-10.4 4.6-10.4 10.4 0 5.7 4.6 10.4 10.4 10.4 5.7 0 10.4-4.6 10.4-10.4 0-5.7-4.6-10.4-10.4-10.4z"\
                        id="icon_10_" />\
                </g>\
            </svg>'

            addToCartBtn.addEventListener('click', () => {
                cartCounter.textContent = Number(cartCounter.textContent) + 1;
            })
        }
    }
})