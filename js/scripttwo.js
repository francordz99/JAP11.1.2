document.addEventListener("DOMContentLoaded", function () {
    const content = document.getElementById("content");
    const prevButton = document.getElementById("prevButton");
    const nextButton = document.getElementById("nextButton");

    let currentPage = 1;

    function loadPage(page) {
        fetch(`https://rickandmortyapi.com/api/location?page=${page}`)
            .then((response) => response.json())
            .then((data) => {
                content.innerHTML = "";

                data.results.forEach((location) => {
                    const card = document.createElement("div");
                    card.classList.add("col-md-6", "col-lg-4", "mb-4");

                    card.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${location.name}</h5>
                    <p class="card-text">Type: ${location.type}</p>
                    <p class="card-text">Dimension: ${location.dimension}</p>
                    <p class="card-text">Residents: ${location.residents.length}</p>
                </div>
            </div>
            `;

                    content.appendChild(card);
                });

                prevButton.disabled = !data.info.prev;
                nextButton.disabled = !data.info.next;
            })
            .catch((error) => {
                console.error("Error al cargar datos:", error);
            });
    }

    prevButton.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            loadPage(currentPage);
        }
    });

    nextButton.addEventListener("click", () => {
        if (currentPage < 7) {
            currentPage++;
            loadPage(currentPage);
        }
    });

    loadPage(currentPage);
});
