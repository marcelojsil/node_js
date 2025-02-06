const images = [
    '../img/marthec_1.png',
    '../img/marthec_2.png',
    '../img/marthec_3.png',
    '../img/marthec_4.png'
  ];


  
  let currentIndex = 0;
  const slideElement = document.getElementById('slide');


  
  function changeSlide() {
    currentIndex = (currentIndex + 1) % images.length;
    slideElement.src = images[currentIndex];
  }


  
  // Troca de slide a cada 4 segundos
  setInterval(changeSlide, 4000);
  setInterval(changetxtSlide, 4000);
  