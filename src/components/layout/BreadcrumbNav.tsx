'use client';

import { useDesignSystem } from '@/lib/hooks';
import { Home } from '@mui/icons-material';
import { Box, Breadcrumbs, Link, Typography } from '@mui/material';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbNavProps {
  items?: BreadcrumbItem[];
}

/**
 * BreadcrumbNav component provides hierarchical navigation showing the user's location.
 *
 * This component is designed to help users understand their current page location
 * and navigate back to parent pages in the site hierarchy.
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage with auto-generated breadcrumbs from URL
 * <BreadcrumbNav />
 *
 * // Custom breadcrumb items
 * <BreadcrumbNav
 *   items={[
 *     { label: 'Home', href: '/' },
 *     { label: 'Products', href: '/products' },
 *     { label: 'Category' }
 *   ]}
 * />
 * ```
 *
 * @param {BreadcrumbNavProps} props - The breadcrumb navigation props
 * @param {BreadcrumbItem[]} [props.items] - Custom breadcrumb items, auto-generated if not provided
 * @returns {JSX.Element} The rendered breadcrumb navigation component
 */
export default function BreadcrumbNav({ items }: BreadcrumbNavProps) {
  const { spacing } = useDesignSystem();
  const pathname = usePathname();

  // Generate breadcrumbs from pathname if items not provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (items) return items;

    const pathSegments = pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [{ label: 'Home', href: '/' }];

    pathSegments.forEach((segment, index) => {
      const href = '/' + pathSegments.slice(0, index + 1).join('/');
      const label = segment.charAt(0).toUpperCase() + segment.slice(1);
      breadcrumbs.push({ label, href });
    });

    return breadcrumbs;
  };

  const breadcrumbItems = generateBreadcrumbs();

  // Don't show breadcrumbs on homepage
  if (pathname === '/' || breadcrumbItems.length <= 1) {
    return null;
  }

  return (
    <Box sx={{ py: spacing.component.md, px: spacing.component.md }}>
      <Breadcrumbs aria-label='breadcrumb navigation'>
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;

          if (isLast || !item.href) {
            return (
              <Typography key={item.label} color='text.primary'>
                {item.label}
              </Typography>
            );
          }

          return (
            <Link
              key={item.href}
              component={NextLink}
              href={item.href}
              color='inherit'
              sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              {item.href === '/' && <Home sx={{ mr: 0.5, fontSize: 16 }} />}
              {item.label}
            </Link>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
}
