document.addEventListener('DOMContentLoaded', () => {
    const selectedFilters = {
        states: [],
        cities: [],
        amenities: []
    };

    function updateLocationHeader() {
        const locationNames = [...selectedFilters.states, ...selectedFilters.cities].map(id => {
            return document.querySelector(`input[data-id="${id}"]`).dataset.name;
        });
        document.querySelector('.locations h4').innerText = locationNames.join(', ') || '\xa0';
    }

    function handleCheckboxChange(event) {
        const { id, name } = event.target.dataset;
        const filterType = event.target.closest('.locations') ? (event.target.closest('li').parentElement.previousElementSibling.tagName === 'H2' ? 'states' : 'cities') : 'amenities';

        if (event.target.checked) {
            selectedFilters[filterType].push(id);
        } else {
            const index = selectedFilters[filterType].indexOf(id);
            if (index > -1) {
                selectedFilters[filterType].splice(index, 1);
            }
        }

        if (filterType === 'states' || filterType === 'cities') {
            updateLocationHeader();
        }
    }

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => checkbox.addEventListener('change', handleCheckboxChange));

    const filterButton = document.getElementById('filter-button');
    filterButton.addEventListener('click', () => {
        fetch('/api/v1/places_search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                states: selectedFilters.states,
                cities: selectedFilters.cities,
                amenities: selectedFilters.amenities
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
