const contentContainer = document.getElementById('content');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
let currentPage = 1;

function fetchData(page) {
    fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
        .then((response) => response.json())
        .then((data) => {
            contentContainer.innerHTML = '';

            data.results.forEach((character) => {
                const card = document.createElement('div');
                card.classList.add('col-md-3', 'mb-4');

                card.innerHTML = `
                    <div class="card">
                        <img src="${character.image}" class="card-img-top" alt="${character.name}">
                        <div class="card-body">
                            <h5 class="card-title">${character.name}</h5>
                            <p class="card-text">Status: ${character.status}</p>
                            <p class="card-text">Species: ${character.species}</p>
                            <p class="card-text">Gender: ${character.gender}</p>
                        </div>
                    </div>
                `;

                contentContainer.appendChild(card);
            });
        });
}

fetchData(currentPage);

prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        fetchData(currentPage);
    }
});

nextButton.addEventListener('click', () => {
    currentPage++;
    fetchData(currentPage);
});
