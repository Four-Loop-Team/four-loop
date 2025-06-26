// Global type extensions for Jest test environment
declare global {
  interface Window {
    IntersectionObserver: typeof IntersectionObserver;
    ResizeObserver: typeof ResizeObserver;
  }

  namespace NodeJS {
    interface Global {
      IntersectionObserver: typeof IntersectionObserver;
      ResizeObserver: typeof ResizeObserver;
      scrollTo: typeof scrollTo;
    }
  }
}

export {};
