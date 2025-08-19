/**
 * @fileoverview Background sphere image loader utility.
 * Prevents flash by ensuring sphere images are loaded before displaying them.
 */

/**
 * Loads background sphere images and adds a class to body when ready.
 * Prevents flash by using opacity transition once images are loaded.
 */
export const initializeSphereLoader = () => {
  if (typeof window === 'undefined') return;

  const sphereImages = ['/top-sphere.png', '/right-sphere.png'];
  let loadedCount = 0;

  const checkAllLoaded = () => {
    loadedCount++;
    if (loadedCount === sphereImages.length) {
      document.body.classList.add('spheres-loaded');
    }
  };

  sphereImages.forEach((src) => {
    const img = new Image();
    img.onload = checkAllLoaded;
    img.onerror = checkAllLoaded; // Still show spheres even if one fails
    img.src = src;
  });
};
