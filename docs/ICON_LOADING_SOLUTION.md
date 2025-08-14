# Icon Loading Solution

## Overview

This solution provides a comprehensive approach to prevent Flash of Unstyled Content (FOUC) for all
MUI icons throughout the application, not just arrows.

## Components

### 1. IconLoader

Universal wrapper that handles loading states for any MUI icon with fallback SVG.

```tsx
import IconLoader from '@/components/ui/IconLoader';
import EastIcon from '@mui/icons-material/East';
import { ICON_FALLBACKS } from '@/constants/icon-fallbacks';

<IconLoader icon={EastIcon} fallbackPath={ICON_FALLBACKS.East} fontSize='small' />;
```

### 2. Pre-configured Common Icons

Ready-to-use components for frequently used icons:

```tsx
import { ArrowEast, Close, Warning, Check } from '@/components/ui/Icons';

<ArrowEast fontSize="small" />
<Close fontSize="medium" />
<Warning className="text-warning" />
<Check size={24} />
```

## Usage Examples

### In Button Component (Current Implementation)

```tsx
<IconLoader icon={EastIcon} fallbackPath={ICON_FALLBACKS.East} fontSize='small' />
```

### For Modal Close Button

```tsx
import { Close } from '@/components/ui/Icons';

<Close fontSize='small' />;
```

### For Form Validation

```tsx
import { Check, Warning, Error } from '@/components/ui/Icons';

{
  isValid ? <Check /> : <Error />;
}
```

## Benefits

1. **Consistent Experience**: No more flickering icons on page load
2. **Universal Solution**: Works with any MUI icon, not just specific ones
3. **Performance**: Preloads Material Icons font in layout
4. **Maintainable**: Centralized fallback definitions
5. **Developer Friendly**: Pre-configured components for common use cases

## Browser Support

- Works with all modern browsers
- Graceful fallback for older browsers
- Respects user's reduced motion preferences

## Performance Impact

- Minimal bundle size increase
- Icons load instantly on subsequent renders
- Font preloading reduces initial load flash
