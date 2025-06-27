/**
 * Chart component types and interfaces
 */

export type ChartType =
  | 'line'
  | 'bar'
  | 'pie'
  | 'doughnut'
  | 'area'
  | 'scatter';

export interface ChartDataPoint {
  x: number | string | Date;
  y: number;
  label?: string;
  color?: string;
}

export interface ChartDataset {
  label: string;
  data: ChartDataPoint[];
  backgroundColor?: string | string[];
  borderColor?: string;
  borderWidth?: number;
  fill?: boolean;
  tension?: number;
}

export interface ChartOptions {
  responsive?: boolean;
  maintainAspectRatio?: boolean;
  plugins?: {
    legend?: {
      display?: boolean;
      position?: 'top' | 'bottom' | 'left' | 'right';
    };
    tooltip?: {
      enabled?: boolean;
      mode?: 'index' | 'dataset' | 'point' | 'nearest';
    };
  };
  scales?: {
    x?: {
      type?: 'linear' | 'logarithmic' | 'category' | 'time';
      display?: boolean;
      title?: {
        display?: boolean;
        text?: string;
      };
    };
    y?: {
      type?: 'linear' | 'logarithmic';
      display?: boolean;
      beginAtZero?: boolean;
      title?: {
        display?: boolean;
        text?: string;
      };
    };
  };
  animation?: {
    duration?: number;
    easing?: string;
  };
}

export interface ChartProps {
  type: ChartType;
  data: ChartDataset[];
  options?: ChartOptions;
  width?: number;
  height?: number;
  className?: string;
  loading?: boolean;
  error?: string;
  onPointClick?: (
    datasetIndex: number,
    pointIndex: number,
    point: ChartDataPoint
  ) => void;
  'aria-label'?: string;
  'data-testid'?: string;
}

export interface SimpleChartData {
  labels: string[];
  values: number[];
  colors?: string[];
}

export interface SimpleChartProps {
  type: ChartType;
  data: SimpleChartData;
  title?: string;
  className?: string;
  height?: number;
  showLegend?: boolean;
  animate?: boolean;
  'aria-label'?: string;
}
