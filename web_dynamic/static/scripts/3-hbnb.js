$(document).ready(function () {
    const apiStatusDiv = $('#api_status');
    const placesSection = $('.places');

    function updateApiStatus() {
        $.get('http://127.0.0.1:5001/api/v1/status/', function (data) {
            if (data.status === 'OK') {
                apiStatusDiv.addClass('available');
            } else {
                apiStatusDiv.removeClass('available');
            }
        });
    }

    function loadPlaces() {
        $.ajax({
            url: 'http://127.0.0.1:5001/api/v1/places_search/',
            type: 'POST',
            contentType: 'application/json',
            data: '{}',
            success: function (data) {
                placesSection.empty(); // Clear existing places
                data.forEach(place => {
                    const article = `
                        <article>
                            <div class="title_box">
                                <h2>${place.name}</h2>
                                <div class="price_by_night">$${place.price_by_night}</div>
                            </div>
                            <div class="information">
                                <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                                <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                                <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
                            </div>
                            <div class="description">
                                ${place.description || 'No description available'}
                            </div>
                        </article>
                    `;
                    placesSection.append(article);
                });
            }
        });
    }

    updateApiStatus();
    loadPlaces();
});
