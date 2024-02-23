import PhotoSwipeLightbox from "photoswipe/lightbox";

declare class PhotoSwipeDynamicCaption {
  constructor(
    lightbox: PhotoSwipeLightbox,
    options?: {
      /**
       * Used to retrieve caption content. Can be a selector of the element
       * from which caption content will be retrieved, if the element is not
       * found - the plugin will try to use the thumbnail image alt attribute.
       *
       * @defaultValue .pswp-caption-content
       */
      captionContent?: string;
      /**
       * Position type of the caption. Can be:
       * - `below`: caption will always be placed below the image.
       * - `aside`: caption will always be placed on the right side of the
       *   image.
       * - `auto`: the plugin will try to automatically determine the best
       *   position (depending on available space).
       *
       * @defaultValue auto
       */
      type?: "below" | "aside" | "auto";
      /**
       * Maximum window width at which mobile layout should be used, or a
       * function that should return true if mobile layout should be used.
       *
       * @defaultValue 600
       */
      mobileLayoutBreakpoint?: number | (() => boolean);
      /**
       * When the caption x position is less than this value, it'll get class
       * `pswp__dynamic-caption--on-hor-edge`. You may use it to apply different
       * styling, such as horizontal padding.
       *
       * @defaultValue 20
       */
      horizontalEdgeThreshold?: number;
      /**
       * A ratio defines the amount of horizontal empty space before the
       * mobile caption switches to an "overlap" layout. For example, if it's
       * set to 0.3 - the caption will start overlapping the image when more
       * than 30% of horizontal space is not occupied by an image. If you set
       * it to 0 - the caption will always overlap. If you set it to 1 - the
       * caption will constantly shift the image (unless it's taller than the
       * viewport).
       *
       * @defaultValue 0.3
       */
      mobileCaptionOverlapRatio?: number;
      /**
       * If enabled, the image will always be vertically centered in the
       * remaining space between the caption and the rest of the viewport. If
       * set to false the image will lift up only if the caption does not fit
       * below.
       *
       * @defaultValue false
       */
      verticallyCenterImage?: boolean;
    }
  );
}
export default PhotoSwipeDynamicCaption;
