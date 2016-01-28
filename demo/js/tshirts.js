$(document).ready(function() {
	var li, html, src, padding, max, bg=0, psbg, enableScroll,
	    goX, goY, scroll, mdown, u, undo, scrolly,
	    isActive='false',
	    ul = $('#clothesCarousel'),
		shirt = ul.find('a.clothWrap'),
	    n=ul.children('li').length-1,
		wrap=$('#clothesWrapper');
	
	function goPrev() {
		isActive='true';
		
		html=ul.children('li').eq(n);
		ul.children('li').eq(n).remove();
		ul.prepend(html);
		
		ul.addClass('prev');
		
		setTimeout(function() {
			isActive='false';
			ul.removeClass('prev');
		}, 1000);
	}
	
	function goNext() {
		isActive='true';
		
		html=ul.children('li').eq(0);
		ul.children('li').eq(0).remove();
		ul.append(html);
		
		ul.addClass('next');
		
		setTimeout(function() {
			isActive='false';
			ul.removeClass('next');
		}, 1000);
	}
	
	function pseudoScroll(u) {
		if(u>50) {
			u=50
		}
		else if(u<-50) {
			u=-50
		}
		ul.children('li').css('margin-left', u+'px');
	}
	
	$('#prevClothes').click(function() {
		if(isActive!='true') {
			goPrev();
		}
	});
	
	$('#nextClothes').click(function() {
		if(isActive!='true') {
			goNext();
		}
	});
	
	$('body').keydown(function(e) {
		if(isActive!='true') {
			if(e.keyCode==37) {
				goPrev();
			}
			if(e.keyCode==39) {
				goNext();
			}
		}
	});
	
	ul.on('mousedown touchstart', 'a.clothWrap', function() {
		ul.children('li').css('transition', 'margin-left 0s');
	});
	
	ul.on('mousedown', 'a.clothWrap', function(e) {
		e.preventDefault();
		goX=e.pageX;
		
		src=$(this).attr('href');
		mdown='true';
		enableScroll='false';
	});
	
	ul.on('touchstart', 'a.clothWrap', function(e) {
		e.preventDefault();
		goX=e.originalEvent.touches[0].pageX;
		goY=e.originalEvent.touches[0].pageY;
		
		src=$(this).attr('href');
		mdown='true';
		enableScroll='false';
	});

	$(window).on('mousemove', function(e) {
		if(mdown=='true') {
			scroll=(e.pageX-goX)/8;
			pseudoScroll(scroll);
		}
	});

	$(window).on('touchmove', function(e) {
		if(mdown=='true') {
			scroll=(e.originalEvent.touches[0].pageX-goX)/5;
			undo=e.originalEvent.touches[0].pageY-goY;
			
			if(scroll<25 && scroll>-25) {
				max=70;
			}
			else {
				max=140;
			}
			
			if(undo>max) {
				enableScroll = 'true';
				padding=max;
			}
			else if(undo<-max) {
				enableScroll = 'true';
				padding=-max;
			}
			
			if(enableScroll=='true') {
				$(window).scrollTop(scrolly-undo+padding);
			}
			pseudoScroll(scroll);
		}
	});

	$(window).on('mouseup touchend', function() {
		ul.children('li').css({
			'transition': 'margin-left 0.4s, left 0.8s, opacity 0.8s',
			'margin-left': '0'
		});
		
		setTimeout(function() {
			ul.children('li').css({
				'transition': 'margin-left 0, left 0.8s, opacity 0.8s'
			});
		}, 400);
		
		if(scroll>5) {
			if(isActive!='true') {
				scroll=0;
				goPrev();
			}
		}
		else if(scroll<-5) {
			if(isActive!='true') {
				goNext();
			}
		}
		else {
			if(src!='' && enableScroll=='false') {
				// Link URL is stored as variable called 'src'
				// Re-direct to 'src' now...
				
				window.location.replace(src);
			}
		}
		
		scroll=0;
		mdown='false';
		enableScroll='false';
		src='';
	});
});