document.addEventListener('DOMContentLoaded', () => {
    const filterButton = document.getElementById('filter-button');

    filterButton.addEventListener('click', () => {
        const checkedAmenities = Array.from(document.querySelectorAll('.amenity-filter:checked')).map(cb => cb.value);

        fetch('http://127.0.0.1:5001/api/v1/places_search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                amenities: checkedAmenities
            })
        })
        .then(response => response.json())
        .then(data => {
            const placesSection = document.querySelector('.places');
            placesSection.innerHTML = ''; // Clear existing places
            data.forEach(place => {
                const article = document.createElement('article');
                article.innerHTML = `
                    <h2>${place.name}</h2>
                    <p>${place.description}</p>
                `;
                placesSection.appendChild(article);
            });
        })
        .catch(error => console.error('Error:', error));
    });
});
