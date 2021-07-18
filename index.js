var coll = document.getElementsByClassName("accordion_label");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

window.addEventListener("scroll",function(){
  var header =document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 0);
})


const track =document.querySelector('.carousel_track');
console.log(track)
const slides=Array.from(track.children);
console.log(slides)
const prevButton=document.querySelector('.carousel__button--left');
const nextButton=document.querySelector('.carousel__button--right');
const dotsNav=document.querySelector('.carousel__nav');
const dots=Array.from(dotsNav.children);

const slideSize=slides[0].getBoundingClientRect();
const slideWidth=slides[0].getBoundingClientRect().width;


slides[0].style.left=0 + 'px';
slides[1].style.left=slideWidth + 'px';
slides[2].style.left= 2*slideWidth + 'px';
slides[3].style.left= 3*slideWidth + 'px'; 
slides[4].style.left= 4*slideWidth + 'px'; 

const setSlidePosition=(slide,index) => {
    const slideWidth=slide.style.left;
    slide.style.left=(slideWidth*index) + 'px';
    slide.style.top = 0+'px';
}

const moveToSlide = (track, currentSlide,targetSlide)  => {
    track.style.transform='translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');

    const targetIndex=slides.findIndex(slide => slide===targetSlide);
    console.log(targetIndex)
    if (targetIndex===0){
        prevButton.classList.add('isHidden');
        nextButton.classList.remove('isHidden');  
    } else if (targetIndex===slides.length-1){
      prevButton.classList.remove('isHidden');
      nextButton.classList.add('isHidden'); 
    }  else{
      prevButton.classList.remove('isHidden');
      nextButton.classList.remove('isHidden'); 
    }
}

const updateDots=(currentDot,targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
}


slides.forEach(setSlidePosition);

prevButton.addEventListener('click', e=> {
    const currentSlide=track.querySelector('.current-slide');
    const prevSlide=currentSlide.previousElementSibling;

    moveToSlide(track,currentSlide,prevSlide)

}
)

nextButton.addEventListener('click', e => {
    const currentSlide=track.querySelector('.current-slide');
    const nextSlide=currentSlide.nextElementSibling;
    const currentDot=dotsNav.querySelector('.current-slide-indicator');
    const nextDot=currentDot.nextElementSibling;
    moveToSlide(track,currentSlide,nextSlide);
    updateDots(currentDot,nextDot);
}
)

const maxSlide=slides.length;

var myVar =setInterval(function() {
    let currentSlide=track.querySelector('.current-slide');
    let nextSlide=currentSlide.nextElementSibling;
    console.log(nextSlide);
    if (!currentSlide.nextElementSibling){
    nextSlide=slides[0];
    }
   


    moveToSlide(track,currentSlide,nextSlide);
    //      const currentDot=dotsNav.querySelector('.current-slide');

  

  }, 3000); // setInterval

  window.addEventListener('scroll',(event) => {
     console.log(window.pageYOffset);
      clearInterval(myVar);
  });

  
  dotsNav.addEventListener('click', e=>{ 
      const targetDot=e.target.closest('button');

      if (!targetDot) return;

      const currentSlide=track.querySelector('.current-slide');
      const currentDot=dotsNav.querySelector('.current-slide-indicator');
      const targetIndex=dots.findIndex(dot => dot===targetDot);
      const targetSlide=slides[targetIndex];
       
      moveToSlide(track,currentSlide,targetSlide);
      currentDot.classList.remove('current-slide-indicator');
      targetDot.classList.add('current-slide-indicator');
      


  })