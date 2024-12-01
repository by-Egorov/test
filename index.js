document.addEventListener('DOMContentLoaded', function () {
	const leftArrow = document.querySelector(
		'.tournament__header--pagination--arrow-left'
	)
	const rightArrow = document.querySelector(
		'.tournament__header--pagination--arrow-right'
	)
	const track = document.querySelector('.tournament__slider--track')
	const slides = document.querySelectorAll('.tournament__slider--slide')
	const counter = document.querySelector(
		'.tournament__header--pagination--counter'
	)

	let currentIndex = 0
	let slidesToShow = calculateSlidesToShow()
	const totalSlides = slides.length
	let autoSlideInterval

	function calculateSlidesToShow() {
		const width = window.innerWidth
		if (width < 768) {
			return 1 
		} else if (width < 1024) {
			return 2 
		} else {
			return 3 
		}
	}

	function updateSlider() {
		const maxIndex = totalSlides - slidesToShow 
		track.style.transform = `translateX(-${
			(currentIndex * 100) / slidesToShow
		}%)`
		counter.textContent = `${Math.min(
			currentIndex + 1,
			totalSlides - slidesToShow + 1
		)} / ${totalSlides}`

		leftArrow.classList.toggle('disabled', currentIndex === 0)
		rightArrow.classList.toggle('disabled', currentIndex >= maxIndex)
	}

	function resizeHandler() {
		slidesToShow = calculateSlidesToShow()
		track.style.width = `${(100 * totalSlides) / slidesToShow}%`
		slides.forEach(slide => {
			slide.style.flex = `0 0 ${100 / slidesToShow}%`
		})
		currentIndex = Math.min(currentIndex, totalSlides - slidesToShow) 
		updateSlider()
	}

	function slideNext() {
		const maxIndex = totalSlides - slidesToShow
		currentIndex = currentIndex < maxIndex ? currentIndex + 1 : 0 
		updateSlider()
	}

	function slidePrev() {
		const maxIndex = totalSlides - slidesToShow
		currentIndex = currentIndex > 0 ? currentIndex - 1 : maxIndex 
		updateSlider()
	}

	function startAutoSlide() {
		stopAutoSlide()
		autoSlideInterval = setInterval(slideNext, 4000)
	}

	function stopAutoSlide() {
		clearInterval(autoSlideInterval)
	}

	leftArrow.addEventListener('click', function () {
		slidePrev()
		startAutoSlide() 
	})

	rightArrow.addEventListener('click', function () {
		slideNext()
		startAutoSlide() 
	})

	
	track.addEventListener('mouseenter', stopAutoSlide)
	track.addEventListener('mouseleave', startAutoSlide)
	track.addEventListener('touchstart', stopAutoSlide)
	track.addEventListener('touchend', startAutoSlide)

	
	window.addEventListener('resize', resizeHandler)

	
	resizeHandler()
	startAutoSlide() 
})
