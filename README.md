# Dynamic caption plugin for [PhotoSwipe](https://photoswipe.com/) v5

The plugin can automatically position the text below or aside depending on the available space. Recommended for small to medium sized captions.

## Intiailization

The plugin has a single JS file `photoswipe-dynamic-caption-plugin.esm.js` and a single CSS file `photoswipe-dynamic-caption-plugin.css`.

It can be initialized like this:

```html
<script type="module">
import PhotoSwipeLightbox from './lib/photoswipe/photoswipe-lightbox.esm.js';
import PhotoSwipeDynamicCaption from './photoswipe-dynamic-caption-plugin.esm.js';

const lightbox = new PhotoSwipeLightbox({
  gallerySelector: '#gallery',
  childSelector: '.pswp-gallery__item',
  pswpModule: './photoswipe.esm.js',
   
  // Optional padding for images
  paddingTop: 30,
  paddingBottom: 30,
  paddingLeft: 70,
  paddingRight: 70
});

const captionPlugin = new PhotoSwipeDynamicCaption(lightbox, {
  // Plugins options, for example:
  type: 'auto',
});

// make sure you init photoswipe core after plugins are added
lightbox.init();
</script>
```

Also refer to `example.html`.

## Plugin options

#### `captionContent: '.pswp-caption-content'`

Element class from which caption content will be retrieved, if element is not found - the plugin will try to use thumbnail image `alt` attribute.

Or a function that should return caption content. For example:
 
```js
captionContent: (slide) => {
  return slide.data.element.querySelector('img').getAttribute('alt');
}
```

#### `type: 'auto'`

Position type of the caption, can be 'auto', 'below', or 'aside'.

- 'below' - caption will always be place below the image
- 'aside' - caption will always be placed to the right side of the image
- 'auto'  - the plugin will try to automatically determine the best position (depending on available space)

#### `mobileLayoutBreakpoint: 600`

Maximum window width at which mobile layout should be used, or a function that should return true if mobile layout should be used. For example:
  
```js
mobileLayoutBreakpoint: (pswp, captionPlugin) => {
  return (window.innerWidth < 750);
}
```

#### `disableImagePaddingOnMobile: true`

Automatically disable paddingTop/Left/Right/Bottom when mobile layout is used.
  

## Styling

- The caption has class `pswp__dynamic-caption`, additionally:
  - while it's below the main image: `pswp__dynamic-caption--below`
  - while it's aside: `pswp__dynamic-caption--aside`
  - while mobile layout is used: `pswp__dynamic-caption--mobile`

Feel free to adjust it in the plugin CSS file (and use media queries if you need):

```css
.pswp__dynamic-caption--aside {
  max-width: 300px;
  padding: 20px 15px 20px 20px;
  margin-top: 70px;
}
.pswp__dynamic-caption--below {
  max-width: 700px;
  padding: 15px 0 0;
}
.pswp__dynamic-caption--mobile {
  background: rgba(0,0,0,0.5);
  padding: 10px 15px;
}
```



## How 'auto' positioning works

- Check if there is more horizontal or vertical free space around the image.
- If there is more free vertical space:
  - Set caption width to the width of the image 
  - Add `pswp__dynamic-caption--below` class, so size can also be adjusted via CSS.
  - Measure caption height.
  - Check if caption will fit without any adjustments of image position.
    - If it does - just show the caption below the image.
    - If it doesn't - reduce pan area height by the height of caption.
- If there is more horizontal space:
  - Add `pswp__dynamic-caption--aside` class, so size can be adjusted via CSS.
  - Measure caption width.
  - Check if caption will fit on the right side without any adjustments of image position.
    - If it does - just show the caption aside of the image.
    - If it doesn't - reduce pan area width by the width of caption.