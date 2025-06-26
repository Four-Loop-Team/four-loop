# 🎯 Performance.ts Update Monitoring Guide

## 📄 **File Focus: `/src/lib/performance.ts`**

This file contains critical Web Vitals tracking and performance optimizations that must be preserved
through all updates.

## 🔍 **Critical Functions to Test in Each Phase**

### **Phase 1-2: Should be unaffected ✅**

- All current functionality should remain intact

### **Phase 3: Jest/Testing Updates 🧪**

**Test File:** `src/lib/__tests__/performance.test.ts`

#### **Validation Required:**

```bash
# Run specific performance tests
npm test -- performance.test.ts

# Check coverage for performance.ts
npm run test:coverage -- --collectCoverageFrom="src/lib/performance.ts"
```

#### **Key Test Cases:**

- [ ] `optimizeFont()` function
- [ ] `createLazyLoader()` intersection observer
- [ ] `vitals.trackCLS()` functionality
- [ ] `vitals.trackLCP()` functionality
- [ ] `vitals.trackFID()` functionality
- [ ] All exports accessible

### **Phase 4: React 19 Updates ⚛️**

**CRITICAL PHASE** for performance.ts

#### **High-Risk Areas:**

1. **IntersectionObserver API** (lines 86-108)
2. **PerformanceObserver** (lines 126-195)
3. **DOM manipulation** (lines 93-103)

#### **Specific Validations:**

```typescript
// Test in browser console after React 19 update:

// 1. Lazy loader functionality
const loader = createLazyLoader();
console.log('Lazy loader created:', loader);

// 2. Intersection observer
const testElement = document.createElement('div');
testElement.dataset.src = 'test-image.jpg';
document.body.appendChild(testElement);
// Verify observer detects element

// 3. Vitals tracking
const clsTracker = vitals.trackCLS();
console.log('CLS tracker active:', clsTracker);

const lcpTracker = vitals.trackLCP();
console.log('LCP tracker active:', lcpTracker);

const fidTracker = vitals.trackFID();
console.log('FID tracker active:', fidTracker);
```

#### **React 19 Specific Concerns:**

- **StrictMode changes** may affect PerformanceObserver behavior
- **DOM updates** may change timing of intersection detection
- **Event handling** for first input detection may need updates

### **Phase 5A: Next.js 15 Updates 🔧**

#### **Font Optimization Impact:**

```typescript
// Current font optimization may need updates
export const optimizeFont = (font: NextFont) => ({
  className: font.className,
  style: {
    fontDisplay: 'swap' as const,
  },
});
```

#### **Resource Preloading Updates:**

```typescript
// May need Next.js 15 compatible resource hints
export const preloadResources = [
  // Check if font preloading still works
  {
    href: '/fonts/Inter-Regular.woff2',
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  },
  // ...
];
```

#### **Validation Commands:**

```bash
# Test font loading
npm run build
# Check build output for font optimization warnings

# Test resource preloading
npm run dev
# Open browser dev tools → Network → check preloaded resources
```

### **Phase 5B: Material-UI 7 Updates 🎨**

#### **Intersection Observer Compatibility:**

- MUI 7 may change how components mount/unmount
- Verify lazy loading still works with MUI components

#### **Test with Navigation Component:**

```typescript
// Test lazy loading with MUI components
const observer = createLazyLoader();
// Apply to MUI Slide component in Navigation
```

### **Phase 5C: TailwindCSS 4 Updates 🎨**

#### **Critical Styles Validation:**

```typescript
// Ensure critical styles still work with Tailwind 4
export const criticalStyles = {
  layout: `
    body {
      margin: 0;
      padding: 0;
      // Verify these styles work with new Tailwind engine
    }
    
    .loading-skeleton {
      // Test gradient animations still work
    }
  `,
};
```

## 🚨 **Breaking Change Scenarios**

### **Scenario 1: PerformanceObserver API Changes**

**Symptoms:** Console errors about PerformanceObserver **Solution:** Update type assertions and API
usage

### **Scenario 2: IntersectionObserver Changes**

**Symptoms:** Lazy loading stops working **Solution:** Verify React 19 DOM changes don't affect
observers

### **Scenario 3: Font Loading Changes**

**Symptoms:** FOUT (flash of unstyled text) returns **Solution:** Update font optimization for
Next.js 15

### **Scenario 4: Web Vitals API Changes**

**Symptoms:** Core Web Vitals tracking returns undefined **Solution:** Update performance entry type
assertions

## 🧪 **Testing Protocol for Each Phase**

### **Automated Tests:**

```bash
# Before each phase
npm test -- performance.test.ts
npm run test:coverage -- --collectCoverageFrom="src/lib/performance.ts"

# After each phase
npm test -- performance.test.ts
npm run test:e2e -- --grep="performance"
```

### **Manual Browser Tests:**

1. **Open browser dev tools**
2. **Navigate to homepage**
3. **Check Performance tab:**
   - LCP measurement working
   - CLS tracking active
   - FID recording events
4. **Check Network tab:**
   - Fonts preloading correctly
   - Images lazy loading
5. **Check Console:**
   - No performance-related errors

### **Lighthouse Validation:**

```bash
# Run Lighthouse after each major phase
npm run test:accessibility
lighthouse http://localhost:3000 --output=json --output-path=./lighthouse-updated.json
```

## 📊 **Performance Benchmarks to Maintain**

### **Current Baselines (preserve these):**

- **LCP:** < 2.5s
- **FID:** < 100ms
- **CLS:** < 0.1
- **Font Display:** swap active
- **Image Loading:** lazy working
- **Bundle Size:** ≤ 117kB first load

### **Regression Indicators:**

- ❌ Console errors from performance.ts functions
- ❌ Lighthouse performance score drops
- ❌ Font flashing returns
- ❌ Images load eagerly instead of lazy
- ❌ Core Web Vitals tracking broken

## 🔧 **Quick Fix Commands**

### **If performance.ts breaks:**

```bash
# Rollback just the performance utilities
git checkout HEAD~1 -- src/lib/performance.ts src/lib/__tests__/performance.test.ts

# Test the rollback
npm test -- performance.test.ts
```

### **If Web Vitals stop working:**

```bash
# Check if it's a type issue
npm run type-check

# Check if it's a browser API issue
npm run dev
# Open browser console and test functions manually
```

## 📝 **Update Log Template**

```markdown
## Performance.ts Update Log

### Phase X: [Phase Name]

**Date:** **Status:** ✅ Pass / ❌ Fail / 🔄 In Progress

#### Changes Made:

-

#### Tests Run:

- [ ] Automated tests pass
- [ ] Browser manual tests pass
- [ ] Lighthouse scores maintained

#### Issues Found:

-

#### Solutions Applied:

-

#### Performance Impact:

- Before: [metrics]
- After: [metrics]
```

---

## 🎯 **Ready to Start?**

**Recommended First Step:**

1. Run current performance tests: `npm test -- performance.test.ts`
2. Document current Lighthouse scores
3. Begin Phase 1 with confidence that performance.ts is well-tested

Your performance utilities are comprehensive and well-tested - they should survive the updates with
minimal changes needed!
