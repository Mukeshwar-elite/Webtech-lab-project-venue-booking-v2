document.addEventListener('DOMContentLoaded', function() {
    const venueCard = document.getElementById('available-venues-card');
    const venueList = document.getElementById('venue-list-section');

    if (venueCard && venueList) {
        venueCard.addEventListener('click', function() {
            venueList.classList.toggle('hidden');
        });
    }
});