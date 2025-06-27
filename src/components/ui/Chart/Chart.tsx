/**
 * Chart Component
 * A flexible data visualization component with support for multiple chart types
 */

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ChartDataset, ChartProps } from './types';

interface ChartMargins {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

const Chart: React.FC<ChartProps> = ({
  type,
  data,
  options = {},
  width = 400,
  height = 300,
  className = '',
  loading = false,
  error,
  onPointClick,
  'aria-label': ariaLabel,
  'data-testid': testId = 'chart',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [_isHovered, _setIsHovered] = useState(false);
  const [_hoveredPoint, _setHoveredPoint] = useState<{
    datasetIndex: number;
    pointIndex: number;
    x: number;
    y: number;
  } | null>(null);

  const defaultOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top' as const,
        },
        tooltip: {
          enabled: true,
          mode: 'index' as const,
        },
      },
      scales: {
        x: {
          display: true,
          type: 'category' as const,
        },
        y: {
          display: true,
          beginAtZero: true,
        },
      },
      animation: {
        duration: 750,
        easing: 'easeInOutQuart',
      },
      ...options,
    }),
    [options]
  );

  // Simple canvas-based rendering for demonstration
  const drawChart = useCallback(
    (canvas: HTMLCanvasElement) => {
      const ctx = canvas.getContext('2d');
      if (!ctx || !data.length) return;

      // Set canvas size
      canvas.width = width;
      canvas.height = height;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Calculate margins and chart area
      const margin = { top: 40, right: 40, bottom: 60, left: 60 };
      const chartWidth = width - margin.left - margin.right;
      const chartHeight = height - margin.top - margin.bottom;

      // Get all data points for scaling
      const allValues = data.flatMap((dataset) =>
        dataset.data.map((point) => point.y)
      );
      const maxValue = Math.max(...allValues, 0);
      const minValue = Math.min(...allValues, 0);
      const valueRange = maxValue - minValue || 1;

      // Draw chart based on type
      switch (type) {
        case 'line':
        case 'area':
          drawLineChart(
            ctx,
            data,
            margin,
            chartWidth,
            chartHeight,
            minValue,
            valueRange,
            type === 'area'
          );
          break;
        case 'bar':
          drawBarChart(
            ctx,
            data,
            margin,
            chartWidth,
            chartHeight,
            minValue,
            valueRange
          );
          break;
        case 'pie':
        case 'doughnut':
          drawPieChart(
            ctx,
            data,
            width / 2,
            height / 2,
            Math.min(chartWidth, chartHeight) / 2,
            type === 'doughnut'
          );
          break;
        default:
          drawLineChart(
            ctx,
            data,
            margin,
            chartWidth,
            chartHeight,
            minValue,
            valueRange,
            false
          );
      }

      // Draw axes for non-pie charts
      if (type !== 'pie' && type !== 'doughnut') {
        drawAxes(ctx, margin, chartWidth, chartHeight, minValue, maxValue);
      }

      // Draw legend
      if (defaultOptions.plugins?.legend?.display) {
        drawLegend(ctx, data, width, margin.top);
      }
    },
    [data, width, height, type, defaultOptions]
  );

  const drawLineChart = (
    ctx: CanvasRenderingContext2D,
    datasets: ChartDataset[],
    margin: ChartMargins,
    chartWidth: number,
    chartHeight: number,
    minValue: number,
    valueRange: number,
    filled: boolean
  ) => {
    datasets.forEach((dataset, datasetIndex) => {
      const points = dataset.data;
      if (points.length === 0) return;

      ctx.strokeStyle =
        dataset.borderColor ?? `hsl(${datasetIndex * 60}, 70%, 50%)`;
      ctx.lineWidth = dataset.borderWidth ?? 2;
      ctx.beginPath();

      points.forEach((point, index) => {
        const x = margin.left + (index / (points.length - 1)) * chartWidth;
        const y =
          margin.top +
          chartHeight -
          ((point.y - minValue) / valueRange) * chartHeight;

        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });

      ctx.stroke();

      if (filled) {
        ctx.fillStyle =
          (Array.isArray(dataset.backgroundColor)
            ? dataset.backgroundColor[0]
            : dataset.backgroundColor) ??
          `hsla(${datasetIndex * 60}, 70%, 50%, 0.3)`;
        ctx.lineTo(margin.left + chartWidth, margin.top + chartHeight);
        ctx.lineTo(margin.left, margin.top + chartHeight);
        ctx.closePath();
        ctx.fill();
      }

      // Draw points
      ctx.fillStyle =
        dataset.borderColor ?? `hsl(${datasetIndex * 60}, 70%, 50%)`;
      points.forEach((point, index) => {
        const x = margin.left + (index / (points.length - 1)) * chartWidth;
        const y =
          margin.top +
          chartHeight -
          ((point.y - minValue) / valueRange) * chartHeight;

        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fill();
      });
    });
  };

  const drawBarChart = (
    ctx: CanvasRenderingContext2D,
    datasets: ChartDataset[],
    margin: ChartMargins,
    chartWidth: number,
    chartHeight: number,
    minValue: number,
    valueRange: number
  ) => {
    const maxDataPoints = Math.max(...datasets.map((d) => d.data.length));
    const barWidth =
      chartWidth / (maxDataPoints * datasets.length + maxDataPoints);
    const groupWidth = barWidth * datasets.length;

    datasets.forEach((dataset, datasetIndex) => {
      ctx.fillStyle =
        (Array.isArray(dataset.backgroundColor)
          ? dataset.backgroundColor[0]
          : dataset.backgroundColor) ?? `hsl(${datasetIndex * 60}, 70%, 50%)`;

      dataset.data.forEach((point, pointIndex) => {
        const x =
          margin.left +
          pointIndex * (groupWidth + barWidth) +
          datasetIndex * barWidth;
        const barHeight = ((point.y - minValue) / valueRange) * chartHeight;
        const y = margin.top + chartHeight - barHeight;

        ctx.fillRect(x, y, barWidth, barHeight);
      });
    });
  };

  const drawPieChart = (
    ctx: CanvasRenderingContext2D,
    datasets: ChartDataset[],
    centerX: number,
    centerY: number,
    radius: number,
    isDoughnut: boolean
  ) => {
    const dataset = datasets[0]; // Use first dataset for pie chart
    if (!dataset || dataset.data.length === 0) return;

    const total = dataset.data.reduce((sum, point) => sum + point.y, 0);
    let currentAngle = -Math.PI / 2;

    dataset.data.forEach((point, index) => {
      const sliceAngle = (point.y / total) * 2 * Math.PI;
      const color = Array.isArray(dataset.backgroundColor)
        ? dataset.backgroundColor[index]
        : `hsl(${index * (360 / dataset.data.length)}, 70%, 50%)`;

      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(
        centerX,
        centerY,
        radius,
        currentAngle,
        currentAngle + sliceAngle
      );
      ctx.closePath();
      ctx.fill();

      // Draw slice border
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();

      currentAngle += sliceAngle;
    });

    // Draw doughnut hole
    if (isDoughnut) {
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 0.6, 0, 2 * Math.PI);
      ctx.fill();
    }
  };

  const drawAxes = (
    ctx: CanvasRenderingContext2D,
    margin: ChartMargins,
    chartWidth: number,
    chartHeight: number,
    minValue: number,
    maxValue: number
  ) => {
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;

    // X-axis
    ctx.beginPath();
    ctx.moveTo(margin.left, margin.top + chartHeight);
    ctx.lineTo(margin.left + chartWidth, margin.top + chartHeight);
    ctx.stroke();

    // Y-axis
    ctx.beginPath();
    ctx.moveTo(margin.left, margin.top);
    ctx.lineTo(margin.left, margin.top + chartHeight);
    ctx.stroke();

    // Y-axis labels
    ctx.fillStyle = '#6b7280';
    ctx.font = '12px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.textAlign = 'right';
    const steps = 5;
    for (let i = 0; i <= steps; i++) {
      const value = minValue + (maxValue - minValue) * (i / steps);
      const y = margin.top + chartHeight - (i / steps) * chartHeight;
      ctx.fillText(value.toFixed(0), margin.left - 10, y + 4);
    }
  };

  const drawLegend = (
    ctx: CanvasRenderingContext2D,
    datasets: ChartDataset[],
    width: number,
    marginTop: number
  ) => {
    ctx.font = '12px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.textAlign = 'left';

    let x = 20;
    const y = marginTop / 2;

    datasets.forEach((dataset, index) => {
      // Legend color box
      ctx.fillStyle =
        (Array.isArray(dataset.backgroundColor)
          ? dataset.backgroundColor[0]
          : dataset.backgroundColor) ?? `hsl(${index * 60}, 70%, 50%)`;
      ctx.fillRect(x, y - 6, 12, 12);

      // Legend text
      ctx.fillStyle = '#374151';
      ctx.fillText(dataset.label, x + 20, y + 4);

      x += ctx.measureText(dataset.label).width + 50;
    });
  };

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!onPointClick || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Simple hit detection for demonstration
    // In a real implementation, you'd calculate which data point was clicked
    // Chart clicked at coordinates for potential point detection
    const _clickData = { x, y };
  };

  useEffect(() => {
    if (canvasRef.current && !loading && !error) {
      drawChart(canvasRef.current);
    }
  }, [drawChart, loading, error]);

  if (error) {
    return (
      <div
        className={`flex items-center justify-center bg-red-50 border border-red-200 rounded-lg p-4 ${className}`}
        style={{ width, height }}
        data-testid={`${testId}-error`}
      >
        <div className='text-red-600 text-center'>
          <svg
            className='w-8 h-8 mx-auto mb-2'
            fill='currentColor'
            viewBox='0 0 20 20'
          >
            <path
              fillRule='evenodd'
              d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
              clipRule='evenodd'
            />
          </svg>
          <p className='text-sm font-medium'>Chart Error</p>
          <p className='text-xs text-red-500 mt-1'>{error}</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-50 border border-gray-200 rounded-lg ${className}`}
        style={{ width, height }}
        data-testid={`${testId}-loading`}
      >
        <div className='text-center'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2'></div>
          <p className='text-sm text-gray-600'>Loading chart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        onMouseEnter={() => _setIsHovered(true)}
        onMouseLeave={() => _setIsHovered(false)}
        className='cursor-pointer'
        role='img'
        aria-label={
          ariaLabel ??
          `${type} chart with ${data.length} dataset${data.length !== 1 ? 's' : ''}`
        }
        data-testid={testId}
      />

      {/* Tooltip */}
      {_hoveredPoint && (
        <div
          className='absolute bg-gray-900 text-white text-xs rounded px-2 py-1 pointer-events-none z-10'
          style={{
            left: _hoveredPoint.x - 30,
            top: _hoveredPoint.y - 30,
          }}
        >
          Tooltip content
        </div>
      )}
    </div>
  );
};

export { Chart };
export default Chart;
