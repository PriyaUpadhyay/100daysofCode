const imgSlider = document.querySelector('.img-slide');
const images = document.querySelectorAll('.img-slide img');

// select buttons
const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');

// counter - to count the img no
let counter = 1;
const size  = images[0].clientWidth; // to take the img width to find how much we have to slide

imgSlider.style.transform = 'translateX(' + (-size * counter) + 'px)';
                            
nextBtn.addEventListener('click', ()=>{
	if(counter >= images.length -1) return;
	imgSlider.style.transition = "transform 0.4s ease-in-out";
	counter++;
	console.log(counter);
	imgSlider.style.transform = 'translateX(' + (-size * counter)+ 'px)';

});
prevBtn.addEventListener('click', ()=>{
	if(counter<=0) return;
	imgSlider.style.transition = "transform 0.4s ease-in-out";
	counter--;
	console.log(counter);
	imgSlider.style.transform = 'translateX(' + (-size * counter)+ 'px)';

});

imgSlider.addEventListener('transitionend',()=>{
	if(images[counter].id === "last-img"){
		imgSlider.style.transition = "none";
		counter = images.length - 2 ;
		imgSlider.style.transform = 'translateX(' + (-size * counter)+ 'px)';
	}
	if(images[counter].id === "first-img"){
		imgSlider.style.transition = "none";
		counter = images.length - counter ;
		imgSlider.style.transform = 'translateX(' + (-size * counter)+ 'px)';
	}

});

