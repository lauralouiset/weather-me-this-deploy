// FRONT-END SCRIPTS for WEATHER ME THIS!

const functionality = {};

//Toggles display of modals
functionality.toggleAbout = () => {
	document.getElementById('about_button').addEventListener('click', () => {
		about.classList.toggle("hidden");
		$('.forecast').toggleClass('blur');
		$('.searchWrapper').toggleClass('blur');
	})
	document.getElementById('close_button').addEventListener('click', () => {
		about.classList.toggle("hidden");
		$('.forecast').toggleClass('blur');
		$('.searchWrapper').toggleClass('blur');
	})
}
// opens weekly modals on click
functionality.openModal = () => {
	$(".weekly_item").on('click', function () {
		$('.weekly_modal').addClass('hidden');
		$(this).children().removeClass('hidden');
	});
}

// closes weekly modals on click
functionality.closeModal = () => {	
	$('.weekly_modal').on('click', (e) => {
		e.stopPropagation();
		$('.weekly_modal').addClass('hidden');
	});

	$('.forecast').on('click', (e) => {
		e.stopPropagation();

	});
	
}

// Animates display of Error message
functionality.showError = () => {
	$('.error').hide();
	$('.error').slideDown(500).delay(1700).slideUp(500);
}

// contains all functionality in init function
functionality.init = () => {
	functionality.showError();
	functionality.toggleAbout();
	functionality.closeModal();
	functionality.openModal();
}

// runs init function on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () =>{
	functionality.init();
});