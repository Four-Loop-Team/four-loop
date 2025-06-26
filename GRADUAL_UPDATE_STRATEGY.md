# 📋 Gradual Major Update Strategy

## 🎯 **Objective**

Safely update Four Loop Digital's dependencies from current versions to latest while maintaining:

- ✅ 96.86% test coverage
- ✅ All 305 tests passing
- ✅ Production stability
- ✅ Code quality standards

## 📊 **Current State Analysis**

### **Progress Status** ✅

- ✅ **Phase 1 Complete** (Foundation & Tooling) - `phase-1-complete`
- ✅ **Phase 2 Complete** (TypeScript Ecosystem) - `phase-2-complete`
- ✅ **Phase 3 Complete** (Testing Infrastructure) - `phase-3-complete`
- ✅ **Phase 4 Complete** (React Ecosystem) - `phase-4-complete`
- ✅ **Phase 5 Complete** (Framework & UI Updates) - `phase-5-complete`

### **Critical Dependencies**

```
React Ecosystem:     18.x → 19.1.0 ✅ (Complete)
Next.js:            14.x → 15.3.4 ✅ (Complete)
Material-UI:         5.x → 7.1.2 ✅ (Complete)
Emotion:            11.x → 11.14.0 ✅ (Complete)
TypeScript:          5.x → 5.3.3 ✅ (Current)
TailwindCSS:         3.x → 4.x (Pending)
ESLint:              8.x → 8.56.0 ✅ (Complete)
Jest:               29.x → 30.0.3 ✅ (Complete)
```

## 🗺️ **5-Phase Update Strategy**

---

### **Phase 1: Foundation & Tooling** ⚡ **(Week 1)**

**Risk Level:** 🟢 Low | **Estimated Time:** 2-3 days

#### **Updates:**

```bash
# Safe updates first
npm update prettier                    # 3.5.3 → 3.6.1
npm update stylelint                   # 16.20.0 → 16.21.0
npm update lint-staged                 # 15.5.2 → 16.1.2
npm update @playwright/test            # 1.53.1 → latest
npm update lighthouse                  # Update to latest
```

#### **Action Plan:**

1. **Pre-update backup:** `git tag v0.1.0-pre-updates`
2. **Update packages:** Run above commands
3. **Test suite:** `npm run test` + `npm run test:e2e`
4. **Lint check:** `npm run lint`
5. **Build verification:** `npm run build`

#### **Expected Issues:** Minimal - these are tooling updates

---

### **Phase 2: TypeScript Ecosystem** 🔧 **(Week 2)**

**Risk Level:** 🟡 Medium | **Estimated Time:** 3-4 days

#### **Updates:**

```bash
# TypeScript and related packages
npm install --save-dev @typescript-eslint/eslint-plugin@^8.0.0
npm install --save-dev @typescript-eslint/parser@^8.0.0
npm install --save-dev @types/node@^24.0.0
npm install --save-dev @types/react@^19.0.0
npm install --save-dev @types/react-dom@^19.0.0
npm install --save-dev @types/jest@^30.0.0
```

#### **Action Plan:**

1. **Update TypeScript config:** May need `tsconfig.json` adjustments
2. **Fix ESLint config:** Update `.eslintrc.js` for v8 syntax
3. **Type fixes:** Address new strict typing requirements
4. **Test validation:** Ensure all type assertions still work

#### **Expected Issues:**

- New TypeScript strict mode requirements
- ESLint config format changes (flat config)
- Type definition updates for React 19

#### **Rollback Plan:** `git reset --hard v0.1.0-pre-updates`

---

### **Phase 3: Testing Infrastructure** 🧪 **(Week 3)**

**Risk Level:** 🟡 Medium | **Estimated Time:** 4-5 days

#### **Updates:**

```bash
# Jest and testing ecosystem
npm install --save-dev jest@^30.0.0
npm install --save-dev babel-jest@^30.0.0
npm install --save-dev jest-environment-jsdom@^30.0.0
npm install --save-dev @testing-library/react@^16.0.0
npm install --save-dev ts-jest@^30.0.0
```

#### **Action Plan:**

1. **Jest config update:** Update `jest.config.js` for v30
2. **Test utilities:** Update test helpers in `src/test/`
3. **React Testing Library:** Address API changes
4. **Run full test suite:** Fix any breaking changes
5. **Coverage verification:** Maintain 96%+ coverage

#### **Expected Issues:**

- Jest v30 configuration changes
- React Testing Library API updates
- Test environment setup changes

#### **Critical Checkpoint:** All 305 tests must pass before proceeding

---

### **Phase 4: React Ecosystem** ⚛️ **(Week 4-5)**

**Risk Level:** 🔴 High | **Estimated Time:** 7-10 days

#### **Updates:**

```bash
# React 19 upgrade
npm install react@^19.0.0 react-dom@^19.0.0
npm install --save-dev react-test-renderer@^19.0.0
```

#### **Action Plan:**

1. **React 19 preparation:**
   - Review [React 19 breaking changes](https://react.dev/blog/2024/04/25/react-19-upgrade-guide)
   - Audit components for deprecated patterns
2. **Code modernization:**

   - Update `forwardRef` usage
   - Replace deprecated lifecycle methods
   - Update context API usage
   - Address `StrictMode` changes

3. **Component testing:**

   - Test all components individually
   - Update test mocks for React 19
   - Verify performance utilities work

4. **Performance validation:**
   - Test Core Web Vitals tracking
   - Verify lazy loading functionality
   - Check intersection observer implementation

#### **Expected Issues:**

- `forwardRef` type signature changes
- StrictMode double-rendering behavior
- Context API updates
- Performance API changes

#### **Critical Files to Monitor:**

- `src/lib/performance.ts` (your current file)
- `src/components/Navigation/Navigation.tsx`
- `src/test/setup.ts`

---

### **Phase 5: Framework & UI Updates** 🎨 **(Week 6-8)**

**Risk Level:** 🔴 Very High | **Estimated Time:** 10-14 days

#### **Phase 5A: Next.js 15** (Week 6)

```bash
npm install next@^15.0.0
npm install --save-dev eslint-config-next@^15.0.0
```

**Breaking Changes:**

- App Router changes
- Middleware updates
- Image optimization changes
- Font optimization updates

#### **Phase 5B: Material-UI 7** (Week 7)

```bash
npm install @mui/material@^7.0.0 @mui/icons-material@^7.0.0
```

**Breaking Changes:**

- Theme system overhaul
- Component API changes
- Styling system updates

#### **Phase 5C: TailwindCSS 4** (Week 8)

```bash
npm install --save-dev tailwindcss@^4.0.0
```

**Breaking Changes:**

- Complete configuration rewrite
- New CSS engine
- Plugin system changes

---

### **✅ Phase 5 COMPLETED: Framework & UI Updates** 🎨

**Completion Date:** June 25, 2025  
**Duration:** Completed in single session  
**Final Tag:** `phase-5-complete`

#### **Successfully Updated:**

- **@mui/material:** 5.15.10 → 7.1.2
- **@mui/icons-material:** 5.15.10 → 7.1.2
- **@emotion/react:** 11.11.3 → 11.14.0
- **@emotion/styled:** 11.11.0 → 11.14.0

#### **Breaking Changes Resolved:**

1. **MUI 7 Grid Component API Changes:**

   - Updated from legacy `container`/`item` props to new `size` prop API
   - Fixed contact page: `<Grid item xs={12} md={8}>` → `<Grid size={{ xs: 12, md: 8 }}>`
   - Fixed work page: `<Grid item xs={12} md={4}>` → `<Grid size={{ xs: 12, md: 4 }}>`
   - Updated test assertions to work with new Grid structure

2. **Emotion Dependency Updates:**
   - Automatically updated to v11.14.0 for MUI 7 compatibility
   - No code changes required

#### **Validation Results:**

- ✅ **Tests:** All 305 tests passing
- ✅ **Type Check:** No TypeScript errors
- ✅ **Linting:** ESLint and Stylelint clean
- ✅ **Build:** Production build successful
- ✅ **Critical Files:** `performance.ts` and all components working correctly

#### **Files Modified:**

- `package.json` - Updated dependency versions
- `src/app/contact/page.tsx` - Grid API updates
- `src/app/work/page.tsx` - Grid API updates
- `src/app/contact/__tests__/page.test.tsx` - Test assertions updated

#### **Key Learnings:**

- MUI 7 Grid migration was straightforward - only prop API changes
- Custom Grid components (`GridItem`) in the project were unaffected
- Test assertions needed minor updates for new component structure
- No theme or styling system changes required for this upgrade

---

### **Phase 6: TailwindCSS 4** 🎨 **(Next Phase)**

**Risk Level:** 🔴 Very High | **Estimated Time:** 7-10 days

#### **Updates:**

```bash
npm install --save-dev tailwindcss@^4.0.0
```

**Breaking Changes:**

- Complete configuration rewrite
- New CSS engine
- Plugin system changes

## 🛡️ **Risk Mitigation Strategies**

### **Before Each Phase:**

1. **Full backup:** `git tag phase-X-start`
2. **Documentation:** Update this strategy with lessons learned
3. **Test baseline:** Ensure all tests pass
4. **Performance baseline:** Run Lighthouse audit

### **During Each Phase:**

1. **Incremental commits:** Commit working states frequently
2. **Test-driven:** Run tests after each package update
3. **Rollback ready:** Keep previous version tags accessible
4. **Documentation:** Update breaking changes as you find them

### **After Each Phase:**

1. **Full validation:** All test suites + e2e + build
2. **Performance check:** Verify Core Web Vitals still work
3. **Documentation update:** Update README with new versions
4. **Tag release:** `git tag phase-X-complete`

## 🚨 **Emergency Rollback Procedures**

### **Quick Rollback:**

```bash
# Rollback to last working state
git reset --hard phase-X-start
npm install
```

### **Package-specific Rollback:**

```bash
# Rollback specific packages
npm install package-name@previous-version
```

## 📋 **Validation Checklist for Each Phase**

### **✅ Must Pass Before Next Phase:**

- [ ] All 305 tests passing
- [ ] Test coverage ≥ 96%
- [ ] `npm run build` successful
- [ ] `npm run lint` clean
- [ ] E2E tests passing
- [ ] Performance utilities functional
- [ ] No TypeScript errors
- [ ] Lighthouse scores maintained

### **🔍 Critical Components to Test:**

- [ ] Navigation component (known MUI dependency)
- [ ] Performance tracking utilities
- [ ] Grid system functionality
- [ ] Contact form validation
- [ ] SEO metadata generation
- [ ] Accessibility features

## 📚 **Resources & References**

### **Breaking Change Guides:**

- [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide)
- [Next.js 15 Migration](https://nextjs.org/docs/app/building-your-application/upgrading/version-15)
- [Material-UI v7 Migration](https://mui.com/material-ui/migration/migration-v6/)
- [TailwindCSS v4 Upgrade](https://tailwindcss.com/docs/upgrade-guide)
- [ESLint v9 Migration](https://eslint.org/docs/latest/use/migrate-to-9.0.0)

### **Testing Resources:**

- [Jest 30 Migration](https://jestjs.io/docs/upgrading-to-jest30)
- [React Testing Library v16](https://testing-library.com/docs/react-testing-library/intro/)

## 🎯 **Success Metrics**

### **Technical Metrics:**

- ✅ All 305 tests passing
- ✅ Test coverage ≥ 96.86%
- ✅ Build time ≤ current time
- ✅ Bundle size ≤ current size
- ✅ Lighthouse score maintained

### **Quality Metrics:**

- ✅ Zero linting errors
- ✅ Zero TypeScript errors
- ✅ All e2e tests passing
- ✅ Accessibility tests passing
- ✅ Performance utilities working

## 🚀 **Quick Start Commands**

### **Phase 1 (Start Here):**

```bash
# Create backup
git tag v0.1.0-pre-updates

# Update tooling
npm update prettier stylelint lint-staged

# Validate
npm run test && npm run build && npm run lint
```

---

## 📝 **Notes**

- This strategy prioritizes stability over speed
- Each phase has natural stopping points
- Rollback procedures are built into each phase
- Your current performance.ts file will be critical to test in Phase 4
- The Navigation component (MUI dependency) is highest risk in Phase 5B

**Recommendation:** Start with Phase 1 and proceed only when comfortable with each phase's results.
