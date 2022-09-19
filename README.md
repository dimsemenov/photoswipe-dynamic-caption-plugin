## Dynamic caption plugin for [PhotoSwipe](https://photoswipe.com/) v5

**[> Plugin demo <](https://dimsemenov.github.io/photoswipe-dynamic-caption-plugin/)**


The plugin can automatically position the text below or aside depending on the available space. For small to medium sized captions. And only for images with the default `fit` scale mode.

For accessibility, make sure that important captions are always available without PhotoSwipe  - either use an `alt` attribute on thumbnails or `aria-labelledby`.

### Intiailization

The plugin has a single JS file `photoswipe-dynamic-caption-plugin.esm.js` (UMD version is in the `dist/` folder) and a single CSS file `photoswipe-dynamic-caption-plugin.css`. Include them directly or via with npm:

```
npm i photoswipe-dynamic-caption-plugin --save
```

It can be initialized like this:

```html
<script type="module">
import PhotoSwipeLightbox from 'photoswipe/dist/photoswipe-lightbox.esm.js';
// or 'photoswipe-dynamic-caption-plugin' if using package manager
import PhotoSwipeDynamicCaption from 'https://unpkg.com/photoswipe-dynamic-caption-plugin/photoswipe-dynamic-caption-plugin.esm.js';

const lightbox = new PhotoSwipeLightbox({
  gallerySelector: '#gallery',
  childSelector: '.pswp-gallery__item',
  pswpModule: () => import('photoswipe/dist/photoswipe.esm.js'),

  // Optional padding for images,
  // note that this is an option of PhotoSwipe, not a plugin
  paddingFn: (viewportSize) => {
    return {
      top: 30, bottom: 30, left: 70, right: 70
    }
  },
});

const captionPlugin = new PhotoSwipeDynamicCaption(lightbox, {
  // Plugins options, for example:
  type: 'auto',
});

// make sure you init photoswipe core after plugins are added
lightbox.init();
</script>
```

```html
<link rel="stylesheet" href="https://unpkg.com/photoswipe-dynamic-caption-plugin/photoswipe-dynamic-caption-plugin.css">
```

Also refer the source of the demo page - [index.html](https://github.com/dimsemenov/photoswipe-dynamic-caption-plugin/blob/main/index.html).

### Plugin options

#### `captionContent: '.pswp-caption-content'`

Used to retrieve caption content.

Can be a selector of the element from which caption content will be retrieved, if the element is not found - the plugin will try to use the thumbnail image `alt` attribute.

```html
<a href="path/to/large-image.jpg" data-pswp-width="1024" data-pswp-height="768">
  <img src="path/to/thumbnail.jpg" alt="" />
  <span class="pswp-caption-content">Caption content</span>
</a>
```

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

#### `horizontalEdgeThreshold: 20`

When caption `x` position is less than this value, it'll get class `pswp__dynamic-caption--on-hor-edge`. You may use it to apply different styling, such as horizontal padding.


#### `mobileCaptionOverlapRatio: 0.3`

A ratio defines the amount of horizontal empty space before the mobile caption switches to "overlap" layout. For example, if it's set to 0.3 - the caption will start overlapping the image when more than 30% of horizontal space is not occupied by an image. If you set it to 0 - the caption will always overlap. If you set it to 1 - the caption will always shift the image (unless it's taller than viewport).



#### verticallyCenterImage: false

If enabled, the image will always be vertically centered in the remaining space between caption and the rest of viewport.  If set to false (default value) - the image will lift up only if caption does not fit below.


### Styling

The caption has class `pswp__dynamic-caption`.

It can be in one of these states:

- Below the main image - `pswp__dynamic-caption--below`.
- Right side of the main image - `pswp__dynamic-caption--aside`.
- "Mobile" (by default just pinned to bottom) - `pswp__dynamic-caption--mobile`

If the caption is near left horizontal edge - it gets class `pswp__dynamic-caption--on-hor-edge`.

Feel free to adjust styles in the plugin CSS file (and use media queries if you need):

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
  background: rgba(0, 0, 0, 0.5);
  padding: 10px 15px;
}
```



### How 'auto' positioning works

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

If `mobileLayoutBreakpoint` requirements are met:

  - Measure caption height when it occupies 100% width.
  - Reduce pan area height to fit the caption below the image.
  - Check amount of free horizontal space after the adjustment.
  - If there is too much horizontal space (`mobileCaptionOverlapRatio`) - just overlap the caption and keep the image at the default position.

## Changelog

### 1.2.0

- Requires PhotoSwipe 5.3.0.
- Caption now moves with the slide when dragged (instead of fading in and out).
- Each slide now has a separate DOM element (before there was only a single caption element that changed content).
- No longer uses temporary caption to measure size.
- You may now access caption and its data via `dynamicCaption` property of a slide. For example `pswp.currSlide.dynamicCaption`.


### 1.1.0

- No longer adjusts main image padding. If you need to dynamically change padding based on the screen size - use PhotoSwipe option `paddingFn` (introduced in 5.1.61)
- Caption receives class `pswp__dynamic-caption--on-hor-edge` when it's on horizontal edge (`x` position is less than threshold). Added option `horizontalEdgeThreshold` to control this.
- Reworked mobile layout. Now the caption tries to not overlap the main image if there is an empty space below. Added option `mobileCaptionOverlapRatio` to control this.


