declare module 'reveal.js' {
  interface RevealOptions {
    hash?: boolean;
    transition?: string;
    transitionSpeed?: string;
    backgroundTransition?: string;
    controls?: boolean;
    progress?: boolean;
    center?: boolean;
    touch?: boolean;
    loop?: boolean;
    rtl?: boolean;
    fragments?: boolean;
    fragmentInURL?: boolean;
    embedded?: boolean;
    help?: boolean;
    showNotes?: boolean;
    autoSlide?: number;
    autoSlideStoppable?: boolean;
    mouseWheel?: boolean;
    hideAddressBar?: boolean;
    previewLinks?: boolean;
    focusBodyOnPageVisibilityChange?: boolean;
    viewDistance?: number;
    mobileViewDistance?: number;
  }

  class Reveal {
    constructor(options?: RevealOptions);
    initialize(): void;
  }

  export default Reveal;
}
