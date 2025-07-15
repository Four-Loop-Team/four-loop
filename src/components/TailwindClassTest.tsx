/**
 * This component forces Tailwind to generate our custom classes
 * DO NOT DELETE - This ensures Tailwind sees and generates our custom utility classes
 */
export function TailwindClassTest() {
  return (
    <div className='hidden'>
      {/* Force generation of custom colors */}
      <div className='bg-primary text-primary border-primary'></div>
      <div className='bg-secondary text-secondary border-secondary'></div>
      <div className='bg-light text-light border-light'></div>
      <div className='bg-dark text-dark border-dark'></div>
      <div className='bg-accent text-accent border-accent'></div>

      {/* Force generation of custom border radius */}
      <div className='rounded-button'></div>

      {/* Force generation of surface colors */}
      <div className='bg-surface text-surface border-surface'></div>
      <div className='bg-surface-dim text-surface-dim border-surface-dim'></div>
      <div className='bg-surface-dark text-surface-dark border-surface-dark'></div>
    </div>
  );
}
