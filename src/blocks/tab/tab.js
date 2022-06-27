(() => {

	$('.tab .tab__buttons').on('click', '.tab__button:not(.active)', function(e) {
		e.preventDefault();
		let $self = $(this);
	
		$self.addClass('active').siblings().removeClass('active');
		$self.closest('.tab').find('.tab__block').removeClass('active').eq($self.index()).addClass('active');
	});

})();
