# jQuery iPhone Inline Video
Plays videos inline on an iPhone. So far so good! Obviously doesn't do audio, perhaps we can do the same type of thing with the <audio> tag...

### How it works
- iPhoneInlineVideo removes the <video> element's autoplay attribute. If not, and an inline video element is added later, the fullscreen iPhone mode will happen.
- <video> element removed from DOM. This is good so you can't see the real player or it's controls.
- A <canvas> element replaces the <video> element in the DOM. 
- If the <video> element had autoplay attribute, then it begins the rendering loop. If not call inlineVideo.play(); Example below.
- Each render is handled by setting the "stopped" <video> player's currentTime, then drawing it's graphic data to our <canvas> image's context.
- When the playhead ends, stop the render loop.

### Useage
- $().iPhoneInlineVideo([options])

### Options
- frameRate : Default 25 FPS.
- fadeIn : Default 'fast'. jQuery speed variable or miliseconds.

### Notes
- This plugin sniffs for iPhone userAgent. If not present, nothing happens.
- Only applys to <video> elements with the playinline attribute.

### Examples
- This loops a video and starts playing immediatly.
```html
<video playinline loop autostart>
    <source src="movie.mp4" type="video/mp4">
</video>
```
```javascript
$('video[playinline]').iPhoneInlineVideo();
```

- Plays video on click of a button.
```html
<video playinline>
    <source src="movie.mp4" type="video/mp4">
</video>
```
```javascript
var inlineVideo = $('video[playinline]').iPhoneInlineVideo().data('inlineVideo');
$('.btn').click(function(){
    inlineVideo.play();
});
```

### To Dos
- Get poster image from <video> and render it to canvas on beggining of non-autoplayed videos, and show on non-looped videos if the option.showPosterAtEnd is true.
- Render first frame if not auto start and no poster is found.
- Test API. Currently untested.
