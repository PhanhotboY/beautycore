$('.accordions').on('click', 'button', function (e) {
  e.preventDefault();

  // Slide up all answers except the one associated with the clicked button
  $('.answer').not($(this).closest('.accordion').find('.answer')).slideUp();

  // Toggle the clicked answer
  $(this).closest('.accordion').find('.answer').slideToggle();

  // Toggle the open/close icons for the clicked button
  $(this).find('.accordion-open, .accordion-close').toggleClass('hidden');
});
