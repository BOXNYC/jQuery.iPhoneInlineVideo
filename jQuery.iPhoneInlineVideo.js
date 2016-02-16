(function($){
	$.fn.iPhoneInlineVideo = function(options){
		if(!navigator.userAgent.match(/iPhone/i)) return $(this);
	  options = $.extend({
	    framesPerSecond: 25,
	    fadeIn: 'fast'
	  }, options);
	  return $(this).each(function() {
		  if(!$(this).is('[playinline]')) return true;
		  var $video = $(this),
				  autoPlay = $video.is('[autoplay]'),
		      video = $video.removeAttr('autoplay')[0],
		      $canvas = $('<canvas>').css({
		        width: '100%', height: '100%',
		        opacity: 0.0
		      }).insertAfter($video),
		      canvas = $canvas[0],
		      canvasContext = canvas.getContext('2d'),
		      loop = $video.is('[loop]'),
		      lastTime,
		      animationFrame,
		      renderable = false,
		      controls = {
					  play: function(){
						  lastTime = Date.now();
							video.load();
						  controls.render();
						},
						render: function() {
					    var time = Date.now(),
					        elapsed = (time - lastTime) / 1000;
					    if(!renderable && video.videoHeight && canvas.height) {
					      canvasContext.scale(1, canvas.height / video.videoHeight);
					      renderable = $canvas.animate({
						      opacity: 1.0
						    }, options.fadeIn);
					    };
					    if(elapsed >= ((1000/options.framesPerSecond)/1000)) {
					      video.currentTime = video.currentTime + elapsed;
					      canvasContext.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
					      lastTime = time;
					    };
					    var currentTime = (Math.round(parseFloat(video.currentTime)*10000)/10000),
					        duration = (Math.round(parseFloat(video.duration)*10000)/10000);
					    if(currentTime >= duration) {
					      if(loop) video.currentTime = 0;
					      else return;
					    };
					    animationFrame = window.requestAnimationFrame(controls.render);
					  }
					};
			$video.data('controls', controls).remove();
			if(autoPlay) controls.play();
		});
	};
})(jQuery);
