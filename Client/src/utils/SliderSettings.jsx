const sliderSettings = {
    // Slider settings
    // Number of slides to display at once
    spaceBetween: 20, // Space between slides in pixels
    loop: false, // Loop slides infinitely
    pagination: {
      el: '.swiper-pagination', // Pagination element
      clickable: true, // Allow clicking on pagination to navigate to slide
    },
    navigation: {
      nextEl: '.swiper-button-next', // Next button element
      prevEl: '.swiper-button-prev', // Previous button element
    },
    breakpoints: {
        0: {
            slidesPerView: 1
        }, 
        400: {
            slidesPerView: 2
        },
        600: {
            slidesPerView: 3
        },
        800: {
            slidesPerView: 4
        },
        1000: {
            slidesPerView: 5
        },
        1200: {
            slidesPerView: 6
        }
    }
  };

  export default sliderSettings