import Image from 'next/image';
import { Box, BoxProps } from '@mui/material';

interface LogoProps extends BoxProps {
  alt?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

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
        style={{
          maxWidth: '100%',
          height: 'auto',
        }}
      />
    </Box>
  );
}
