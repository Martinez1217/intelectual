jQuery(function($){

var MOD3 = window.MOD3 || {};

/* ==================================================
   Mobile Navigation
================================================== */
var mobileMenuClone = $('#menu').clone().attr('id', 'navigation-mobile');

MOD3.mobileNav = function(){
	var windowWidth = $(window).width();
	
	if( windowWidth <= 979 ) {
		if( $('#mobile-nav').length > 0 ) {
			mobileMenuClone.insertAfter('#menu');
			$('#navigation-mobile #menu-nav').attr('id', 'menu-nav-mobile');
		}
	} else {
		$('#navigation-mobile').css('display', 'none');
		if ($('#mobile-nav').hasClass('open')) {
			$('#mobile-nav').removeClass('open');	
		}
	}
}

MOD3.listenerMenu = function(){
	$('#mobile-nav').on('click', function(e){
		$(this).toggleClass('open');
		
		if ($('#mobile-nav').hasClass('open')) {
			$('#navigation-mobile').slideDown(500, 'easeOutExpo');
		} else {
			$('#navigation-mobile').slideUp(500, 'easeOutExpo');
		}
		e.preventDefault();
	});
	
	$('#menu-nav-mobile a').on('click', function(){
		$('#mobile-nav').removeClass('open');
		$('#navigation-mobile').slideUp(350, 'easeOutExpo');
	});
}


/* ==================================================
   Slider Options
================================================== */

MOD3.slider = function(){
	$.supersized({
		
		slideshow               :   1,			
		autoplay				:	1,			
		start_slide             :   1,			
		stop_loop				:	0,			
		random					: 	0,			
		slide_interval          :   12000,		
		transition              :   1, 			
		transition_speed		:	300,		
		new_window				:	1,			
		pause_hover             :   0,			
		keyboard_nav            :   1,			
		performance				:	1,			
		image_protect			:	1,			
												   
		// Size & Position						   
		min_width		        :   0,			
		min_height		        :   0,			
		vertical_center         :   1,			
		horizontal_center       :   1,			
		fit_always				:	0,			
		fit_portrait         	:   1,			
		fit_landscape			:   0,			
												   
		// Components							
		slide_links				:	'blank',	
		thumb_links				:	0,			
		thumbnail_navigation    :   0,			
		slides 					:  	[			
											{image : 'intelectual/img/slider-images/image01.PNG', title : '<div class="slide-content">MOD3</div>', thumb : '', url : ''},
											{image : 'intelectual/img/slider-images/image02.PNG', title : '<div class="slide-content">MOD3</div>', thumb : '', url : ''},
											{image : 'intelectual/img/slider-images/image03.PNG', title : '<div class="slide-content">MOD3</div>', thumb : '', url : ''},
											{image : 'intelectual/img/slider-images/image04.JPG', title : '<div class="slide-content">MOD3</div>', thumb : '', url : ''}  
									],
									
		// Theme Options			   
		progress_bar			:	0,			// Timer for each slide							
		mouse_scrub				:	0
		
	});

}


/* ==================================================
   Navigation Fix
================================================== */

MOD3.nav = function(){
	$('.sticky-nav').waypoint('sticky');
}


/* ==================================================
   Filter Works
================================================== */

MOD3.filter = function (){
	if($('#projects').length > 0){		
		var $container = $('#projects');
		
		$container.imagesLoaded(function() {
			$container.isotope({
			  // options
			  animationEngine: 'best-available',
			  itemSelector : '.item-thumbs',
			  layoutMode : 'fitRows'
			});
		});
	
		
		// filter items when filter link is clicked
		var $optionSets = $('#options .option-set'),
			$optionLinks = $optionSets.find('a');
	
		  $optionLinks.click(function(){
			var $this = $(this);
			// don't proceed if already selected
			if ( $this.hasClass('selected') ) {
			  return false;
			}
			var $optionSet = $this.parents('.option-set');
			$optionSet.find('.selected').removeClass('selected');
			$this.addClass('selected');
	  
			// make option object dynamically, i.e. { filter: '.my-filter-class' }
			var options = {},
				key = $optionSet.attr('data-option-key'),
				value = $this.attr('data-option-value');
			// parse 'false' as false boolean
			value = value === 'false' ? false : value;
			options[ key ] = value;
			if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
			  // changes in layout modes need extra logic
			  changeLayoutMode( $this, options )
			} else {
			  // otherwise, apply new options
			  $container.isotope( options );
			}
			
			return false;
		});
	}
}


/* ==================================================
   FancyBox
================================================== */

MOD3.fancyBox = function(){
	if($('.fancybox').length > 0 || $('.fancybox-media').length > 0 || $('.fancybox-various').length > 0){
		
		$(".fancybox").fancybox({				
				padding : 0,
				beforeShow: function () {
					this.title = $(this.element).attr('title');
					this.title = '<h4>' + this.title + '</h4>' + '<p>' + $(this.element).parent().find('img').attr('alt') + '</p>';
				},
				helpers : {
					title : { type: 'inside' },
				}
			});
			
		$('.fancybox-media').fancybox({
			openEffect  : 'none',
			closeEffect : 'none',
			helpers : {
				media : {}
			}
		});
	}
}


/* ==================================================
   Contact Form
================================================== */

MOD3.contactForm = function(){
	$("#contact-submit").on('click',function() {
		$contact_form = $('#contact-form');
		
		var fields = $contact_form.serialize();
		
		$.ajax({
			type: "POST",
			url: "intelectual/php/contact.php",
			data: fields,
			dataType: 'json',
			success: function(response) {
				
				if(response.status){
					$('#contact-form input').val('');
					$('#contact-form textarea').val('');
				}
				
				$('#response').empty().html(response.html);
			}
		});
		return false;
	});
}




/* ==================================================
   Menu Highlight
================================================== */

MOD3.menu = function(){
	$('#menu-nav, #menu-nav-mobile').onePageNav({
		currentClass: 'current',
    	changeHash: false,
    	scrollSpeed: 750,
    	scrollOffset: 30,
    	scrollThreshold: 0.5,
		easing: 'easeOutExpo',
		filter: ':not(.external)'
	});
}

/* ==================================================
   Next Section
================================================== */

MOD3.goSection = function(){
	$('#nextsection').on('click', function(){
		$target = $($(this).attr('href')).offset().top-30;
		
		$('body, html').animate({scrollTop : $target}, 750, 'easeOutExpo');
		return false;
	});
}

/* ==================================================
   GoUp
================================================== */

MOD3.goUp = function(){
	$('#goUp').on('click', function(){
		$target = $($(this).attr('href')).offset().top-30;
		
		$('body, html').animate({scrollTop : $target}, 750, 'easeOutExpo');
		return false;
	});
}


/* ==================================================
	Scroll to Top
================================================== */

MOD3.scrollToTop = function(){
	var windowWidth = $(window).width(),
		didScroll = false;

	var $arrow = $('#back-to-top');

	$arrow.click(function(e) {
		$('body,html').animate({ scrollTop: "0" }, 750, 'easeOutExpo' );
		e.preventDefault();
	})

	$(window).scroll(function() {
		didScroll = true;
	});

	setInterval(function() {
		if( didScroll ) {
			didScroll = false;

			if( $(window).scrollTop() > 1000 ) {
				$arrow.css('display', 'block');
			} else {
				$arrow.css('display', 'none');
			}
		}
	}, 250);
}

/* ==================================================
   Thumbs / Social Effects
================================================== */

MOD3.utils = function(){
	
	$('.item-thumbs').bind('touchstart', function(){
		$(".active").removeClass("active");
      	$(this).addClass('active');
    });
	
	$('.image-wrap').bind('touchstart', function(){
		$(".active").removeClass("active");
      	$(this).addClass('active');
    });
	
	$('#social ul li').bind('touchstart', function(){
		$(".active").removeClass("active");
      	$(this).addClass('active');
    });
	
}

/* ==================================================
   Accordion
================================================== */

MOD3.accordion = function(){
	var accordion_trigger = $('.accordion-heading.accordionize');
	
	accordion_trigger.delegate('.accordion-toggle','click', function(event){
		if($(this).hasClass('active')){
			$(this).removeClass('active');
		   	$(this).addClass('inactive');
		}
		else{
		  	accordion_trigger.find('.active').addClass('inactive');          
		  	accordion_trigger.find('.active').removeClass('active');   
		  	$(this).removeClass('inactive');
		  	$(this).addClass('active');
	 	}
		event.preventDefault();
	});
}

/* ==================================================
   Toggle
================================================== */

MOD3.toggle = function(){
	var accordion_trigger_toggle = $('.accordion-heading.togglize');
	
	accordion_trigger_toggle.delegate('.accordion-toggle','click', function(event){
		if($(this).hasClass('active')){
			$(this).removeClass('active');
		   	$(this).addClass('inactive');
		}
		else{
		  	$(this).removeClass('inactive');
		  	$(this).addClass('active');
	 	}
		event.preventDefault();
	});
}

/* ==================================================
   Tooltip
================================================== */

MOD3.toolTip = function(){ 
    $('a[data-toggle=tooltip]').tooltip();
}


/* ==================================================
	Init
================================================== */

MOD3.slider();

$(document).ready(function(){
	Modernizr.load([
	{
		test: Modernizr.placeholder,
		nope: 'intelectual/js/placeholder.js', 
		complete : function() {
				if (!Modernizr.placeholder) {
						Placeholders.init({
						live: true,
						hideOnFocus: false,
						className: "yourClass",
						textColor: "#999"
						});    
				}
		}
	}
	]);
	
	// Preload the page with jPreLoader
	$('body').jpreLoader({
		splashID: "#jSplash",
		showSplash: true,
		showPercentage: true,
		autoClose: true,
		splashFunction: function() {
			$('#circle').delay(250).animate({'opacity' : 1}, 500, 'linear');
		}
	});
	
	MOD3.nav();
	MOD3.mobileNav();
	MOD3.listenerMenu();
	MOD3.menu();
	MOD3.goSection();
	MOD3.goUp();
	MOD3.filter();
	MOD3.fancyBox();
	MOD3.contactForm();
	MOD3.tweetFeed();
	MOD3.scrollToTop();
	MOD3.utils();
	MOD3.accordion();
	MOD3.toggle();
	MOD3.toolTip();
});

$(window).resize(function(){
	MOD3.mobileNav();
});

});
/* ==================================================
   Quiz
================================================== */
var cat1 = ($("input[@name=q1]:checked").val() != "a");

var cat2 = ($("input[@name=q2]:checked").val() != "b");

$(document).ready(function() 
{    $("#results").click(function() {                

if (!$("input[@name=q1]:checked").val() ||            
!$("input[@name=q2]:checked").val() ||            
!$("input[@name=q3]:checked").val() ||            
!$("input[@name=q4]:checked").val() ||            
!$("input[@name=q5]:checked").val() ||            
!$("input[@name=q6]:checked").val() ||            
!$("input[@name=q7]:checked").val() ||            
!$("input[@name=q8]:checked").val() ||            
!$("input[@name=q9]:checked").val() ||            
!$("input[@name=q10]:checked").val()            
) {            
alert("You're not done yet!");        
}        

else {            
var cat1name = "1";            
var cat2name = "2";            
var cat3name = "3";            
var cat4name = "4";            
var cat5name = "5";            
var cat6name = "6";            
var cat7name = "7";            
var cat8name = "8";            
var cat9name = "9";            
var cat10name = "10";            
var cat11name = "None";            
            

var cat1 = ($("input[@name=q1]:checked").val() != "a"); 
           
var cat2 = ($("input[@name=q2]:checked").val() != "b");  

var cat3 = ($("input[@name=q3]:checked").val() != "c");  

var cat4 = ($("input[@name=q4]:checked").val() != "d");  

var cat5 = ($("input[@name=q5]:checked").val() != "a"); 

var cat6 = ($("input[@name=q6]:checked").val() != "b");  

var cat7 = ($("input[@name=q7]:checked").val() != "c"); 

var cat8 = ($("input[@name=q8]:checked").val() != "d");  

var cat9 = ($("input[@name=q9]:checked").val() != "a"); 

var cat10 = ($("input[@name=q10]:checked").val() != "b");  

var cat11 = (!cat1 && !cat2 && !cat3 && !cat4 && !cat5 && !cat6 && !cat7 && !cat8 && !cat9 && !cat10); var categories = [];                        

if (cat1) { categories.push(cat1name) };            
if (cat2) { categories.push(cat2name) };            
if (cat3) { categories.push(cat3name) };            
if (cat4) { categories.push(cat4name) };            
if (cat5) { categories.push(cat5name) };            
if (cat6) { categories.push(cat6name) };            
if (cat7) { categories.push(cat7name) };            
if (cat8) { categories.push(cat8name) };            
if (cat9) { categories.push(cat9name) };            
if (cat10) { categories.push(cat10name) };            
if (cat11) { categories.push(cat11name) };                        

var catStr = 'You answered the following questions incorrectly: ' + categories.join(', ') + '';                     
$("#categorylist").text(catStr);                        
$("#categorylist").show("slow");            

if (cat1) { $("#category1").show("slow"); };            
if (cat2) { $("#category2").show("slow"); };            
if (cat3) { $("#category3").show("slow"); };            
if (cat4) { $("#category4").show("slow"); };            
if (cat5) { $("#category5").show("slow"); };            
if (cat6) { $("#category6").show("slow"); };            
if (cat7) { $("#category7").show("slow"); };            
if (cat8) { $("#category8").show("slow"); };            
if (cat9) { $("#category9").show("slow"); };            
if (cat10) { $("#category10").show("slow"); };            
if (cat11) { $("#category11").show("slow"); };
{ $("#closing").show("slow"); };
}
    });});