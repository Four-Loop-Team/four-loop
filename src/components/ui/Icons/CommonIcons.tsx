'use client';

import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EastIcon from '@mui/icons-material/East';
import EditIcon from '@mui/icons-material/Edit';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import MenuIcon from '@mui/icons-material/Menu';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RemoveIcon from '@mui/icons-material/Remove';
import WarningIcon from '@mui/icons-material/Warning';
import WestIcon from '@mui/icons-material/West';
import React from 'react';
import { ICON_FALLBACKS } from '../../../constants/icon-fallbacks';
import IconLoader from '../IconLoader';

interface CommonIconProps {
  fontSize?: 'small' | 'medium' | 'large';
  size?: number;
  className?: string;
}

// Navigation Icons
export const ArrowEast: React.FC<CommonIconProps> = (props) => (
  <IconLoader icon={EastIcon} fallbackPath={ICON_FALLBACKS.East} {...props} />
);

export const ArrowWest: React.FC<CommonIconProps> = (props) => (
  <IconLoader icon={WestIcon} fallbackPath={ICON_FALLBACKS.West} {...props} />
);

// Action Icons
export const Close: React.FC<CommonIconProps> = (props) => (
  <IconLoader icon={CloseIcon} fallbackPath={ICON_FALLBACKS.Close} {...props} />
);

export const Add: React.FC<CommonIconProps> = (props) => (
  <IconLoader icon={AddIcon} fallbackPath={ICON_FALLBACKS.Add} {...props} />
);

export const Remove: React.FC<CommonIconProps> = (props) => (
  <IconLoader
    icon={RemoveIcon}
    fallbackPath={ICON_FALLBACKS.Remove}
    {...props}
  />
);

export const Edit: React.FC<CommonIconProps> = (props) => (
  <IconLoader icon={EditIcon} fallbackPath={ICON_FALLBACKS.Edit} {...props} />
);

export const Delete: React.FC<CommonIconProps> = (props) => (
  <IconLoader
    icon={DeleteIcon}
    fallbackPath={ICON_FALLBACKS.Delete}
    {...props}
  />
);

// Status Icons
export const Check: React.FC<CommonIconProps> = (props) => (
  <IconLoader icon={CheckIcon} fallbackPath={ICON_FALLBACKS.Check} {...props} />
);

export const Warning: React.FC<CommonIconProps> = (props) => (
  <IconLoader
    icon={WarningIcon}
    fallbackPath={ICON_FALLBACKS.Warning}
    {...props}
  />
);

export const Error: React.FC<CommonIconProps> = (props) => (
  <IconLoader icon={ErrorIcon} fallbackPath={ICON_FALLBACKS.Error} {...props} />
);

export const Info: React.FC<CommonIconProps> = (props) => (
  <IconLoader icon={InfoIcon} fallbackPath={ICON_FALLBACKS.Info} {...props} />
);

// Menu Icons
export const Menu: React.FC<CommonIconProps> = (props) => (
  <IconLoader icon={MenuIcon} fallbackPath={ICON_FALLBACKS.Menu} {...props} />
);

export const MoreVert: React.FC<CommonIconProps> = (props) => (
  <IconLoader
    icon={MoreVertIcon}
    fallbackPath={ICON_FALLBACKS.MoreVert}
    {...props}
  />
);

export const MoreHoriz: React.FC<CommonIconProps> = (props) => (
  <IconLoader
    icon={MoreHorizIcon}
    fallbackPath={ICON_FALLBACKS.MoreHoriz}
    {...props}
  />
);
