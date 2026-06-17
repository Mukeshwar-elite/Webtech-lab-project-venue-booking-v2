//get card and list section elements
const venueCard = document.getElementById('available-venues-card');
const venueList = document.getElementById('venue-list-section');
//add click event listener to the card
venueCard.addEventListener('click',function() {
  venueList.classList.toggle('hidden');
});