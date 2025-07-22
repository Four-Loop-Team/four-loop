import { Box, BoxProps } from '@mui/material';
import Image from 'next/image';

interface LogoProps extends BoxProps {
  alt?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

/**
 * Logo component displays the Four Loop Digital brand logo with responsive sizing.
 *
 * This component is designed to provide consistent brand representation across
 * the application with customizable dimensions and Material-UI Box styling.
 *
 * @component
 * @example
 * ```tsx
 * // Basic usage
 * <Logo />
 *
 * // Custom size and styling
 * <Logo
 *   width={150}
 *   height={60}
 *   sx={{ margin: 2 }}
 * />
 *
 * // With custom alt text
 * <Logo alt="Company Logo" priority={false} />
 * ```
 *
 * @param {LogoProps} props - The logo component props
 * @param {string} [props.alt="Four Loop Digital Logo"] - Alt text for accessibility
 * @param {number} [props.width=200] - Logo width in pixels
 * @param {number} [props.height=80] - Logo height in pixels
 * @param {boolean} [props.priority=true] - Next.js Image priority loading
 * @returns {JSX.Element} The rendered logo component
 */
export default function Logo({
  alt = 'Four Loop Digital Logo',
  width = 200,
  height = 80,
  priority = true,
  ...boxProps
}: LogoProps) {
  return (
    <Box {...boxProps}>
      <Image
        src='/logo.png'
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className='img-responsive'
      />
    </Box>
  );
}
