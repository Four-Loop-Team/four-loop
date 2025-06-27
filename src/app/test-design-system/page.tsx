/**
 * Simple Design System Test Component
 * Quick verification that design tokens are working
 */

import { DESIGN_SYSTEM } from '@/constants/design-system';

export default function DesignSystemTestPage() {
  return (
    <div style={{ padding: DESIGN_SYSTEM.spacing.scale[8] }}>
      <h1
        style={{
          color: DESIGN_SYSTEM.colors.brand.primary[600],
          fontSize: DESIGN_SYSTEM.typography.sizes['3xl'],
          fontWeight: DESIGN_SYSTEM.typography.weights.bold,
          marginBottom: DESIGN_SYSTEM.spacing.scale[4],
        }}
      >
        ✅ Design System Working!
      </h1>

      <div
        style={{
          backgroundColor: DESIGN_SYSTEM.colors.contextual.surface.secondary,
          padding: DESIGN_SYSTEM.spacing.scale[4],
          borderRadius: '8px',
          marginBottom: DESIGN_SYSTEM.spacing.scale[4],
        }}
      >
        <p
          style={{
            color: DESIGN_SYSTEM.colors.contextual.text.primary,
            fontSize: DESIGN_SYSTEM.typography.sizes.base,
            margin: 0,
          }}
        >
          Your enhanced design system is successfully integrated! 🎨
        </p>
      </div>

      <div className='flex gap-md'>
        <button className='btn btn-primary btn-md'>CSS Utility Button</button>

        <button
          style={{
            padding: DESIGN_SYSTEM.components.button.padding.md,
            fontSize: DESIGN_SYSTEM.components.button.fontSize.md,
            backgroundColor: DESIGN_SYSTEM.colors.semantic.success[500],
            color: 'white',
            border: 'none',
            borderRadius: DESIGN_SYSTEM.components.button.borderRadius,
            cursor: 'pointer',
          }}
        >
          Token-based Button
        </button>
      </div>

      <div style={{ marginTop: DESIGN_SYSTEM.spacing.scale[6] }}>
        <h2 className='text-2xl font-semibold text-primary mb-md'>
          Color Palette Preview
        </h2>

        <div className='grid grid-cols-5 gap-sm'>
          {Object.entries(DESIGN_SYSTEM.colors.brand.primary)
            .slice(0, 5)
            .map(([shade, color]) => (
              <div
                key={shade}
                style={{
                  backgroundColor: color,
                  padding: DESIGN_SYSTEM.spacing.scale[3],
                  borderRadius: '4px',
                  textAlign: 'center',
                  color: parseInt(shade) > 400 ? 'white' : 'black',
                }}
              >
                {shade}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
