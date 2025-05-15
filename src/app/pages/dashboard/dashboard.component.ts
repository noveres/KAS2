import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { Chart } from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(ChartDataLabels);

// Define interfaces for our data types
interface ChartDataItem {
  label: string;
  value: number;
  color?: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('categoryChart') private categoryChartRef!: ElementRef;
  @ViewChild('statusChart') private statusChartRef!: ElementRef;

  private categoryChartInstance: Chart | undefined;
  private statusChartInstance: Chart | undefined;


  // Summary metrics
  metrics = [
    { icon: 'home', value: 290, label: '標籤資產量', color: 'primary', trend: 3.2 },
    { icon: 'settings', value: 15, label: '預維保資產', color: 'warn', trend: -1.5 },
    { icon: 'person', value: 22, label: '本月新增資產', color: 'accent', trend: 5.8 },
    { icon: 'notifications', value: 8, label: '即將到期排程', color: 'warn', trend: 0 }
  ];

  // Dynamic color palette
  colorPalette = [
    '#1e88e5', // Blue
    '#26a69a', // Teal
    '#ffb74d', // Amber
    '#ef5350', // Red
    '#9575cd', // Purple
    '#4caf50', // Green
    '#ff7043', // Deep Orange
    '#7e57c2', // Deep Purple
    '#29b6f6', // Light Blue
    '#66bb6a', // Light Green
    '#ec407a', // Pink
    '#ffa726'  // Orange
  ];

  // Asset Category Distribution Data
  assetCategories: ChartDataItem[] = [
    { label: '電腦設備', value: 41 },
    { label: '辦公家具', value: 28 },
    { label: '照明設備', value: 14 },
    { label: '運輸設備', value: 7 },
    { label: '其他設備', value: 10 }
  ];

  // Asset Status Distribution Data
  assetStatuses: ChartDataItem[] = [
    { label: '正常使用', value: 69 },
    { label: '閒置', value: 9 },
    { label: '待修中', value: 5 },
    { label: '報廢', value: 17 }
  ];

  // Pending tasks
  pendingTasks = [
    {
      icon: 'warning',
      title: '資產A001需要進行定期維護',
      description: '上次維護日期: 2023/12/15 • 建議維護週期: 6個月',
      color: 'warn'
    },
    {
      icon: 'settings',
      title: '設備編號P002已排定空氣濾網更換',
      description: '排定日期: 2025/05/20 • 負責人: 技術部李工程師',
      color: 'primary'
    }
  ];

  constructor() {}

  ngOnInit(): void {
    // 初始化時為資料項添加顏色
    this.assignColorsToDatasets();
  }

  /**
   * 為資料集分配顏色
   */
  private assignColorsToDatasets(): void {
    // Assign colors to assetCategories
    this.assetCategories = this.assetCategories.map((item, index) => {
      return {
        ...item,
        color: this.colorPalette[index % this.colorPalette.length]
      };
    });

    // Assign colors to assetStatuses
    this.assetStatuses = this.assetStatuses.map((item, index) => {
      return {
        ...item,
        color: this.colorPalette[index % this.colorPalette.length]
      };
    });
  }

  ngAfterViewInit(): void {
    // 確保 DOM 元素已經渲染完成
    setTimeout(() => {
      this.initializeCharts();
    }, 0);
  }

  /**
   * 初始化所有圖表
   */
  private initializeCharts(): void {
    // Set up plugin for line connections
    Chart.register({
      id: 'datalabelsLine',
      beforeDraw: (chart: any) => {
        const ctx = chart.ctx;
        // Get data
        const meta = chart.getDatasetMeta(0);
        // Loop through data points
        for (let i = 0; i < meta.data.length; i++) {
          // Get pie center and data point
          const pieCenter = meta.data[i].getCenterPoint();
          // Get label position - calculate this based on bounding boxes if possible
          // For now we're estimating based on data and chart size
          const labelX = pieCenter.x + 80 * Math.cos((meta.data[i].startAngle + meta.data[i].endAngle) / 2);
          const labelY = pieCenter.y + 80 * Math.sin((meta.data[i].startAngle + meta.data[i].endAngle) / 2);

          // Get color from data point
          const dataset = chart.data.datasets[0];
          const color = Array.isArray(dataset.backgroundColor) ?
            dataset.backgroundColor[i] : dataset.backgroundColor;

          // Draw connecting line
          ctx.save();
          ctx.strokeStyle = color;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(pieCenter.x, pieCenter.y);
          ctx.lineTo(labelX, labelY);
          ctx.stroke();
          ctx.restore();
        }
      }
    });

    this.initializeCategoryChart();
    this.initializeStatusChart();
  }

  /**
   * 初始化資產分類圖表
   */
  private initializeCategoryChart(): void {
    if (!this.categoryChartRef) return;

    const ctx = this.categoryChartRef.nativeElement.getContext('2d');

    // 如果圖表已存在，先銷毀它
    if (this.categoryChartInstance) {
      this.categoryChartInstance.destroy();
    }

    this.categoryChartInstance = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: this.assetCategories.map(cat => cat.label),
        datasets: [{
          data: this.assetCategories.map(cat => cat.value),
          backgroundColor: this.assetCategories.map(cat => cat.color),
          borderColor: 'white',
          borderWidth: 2,
          // Add custom connectors
          datalabels: {
            // Use default color and offset
          }
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            top: 50,
            bottom: 50,
            left: 10,
            right: 10
          }
        },
        plugins: {
          legend: {
            display: false,  // Hide the default legend as we're showing it outside
          },
          tooltip: {
            callbacks: {
              label: function(context: any) {
                const label = context.label || '';
                const value = context.raw as number;
                return `${label}: ${value}%`;
              }
            }
          },
          datalabels: {
            // Text style
            color: 'white',
            font: {
              weight: 'bold',
              size: 13
            },
            // Label content
            formatter: (value: number, context: any) => {
              const total = context.chart.data.datasets[0].data.reduce((a: number, b: number) => a + b, 0);
              const percent = total > 0 ? Math.round((value / total) * 100) : 0;
              return `${context.chart.data.labels[context.dataIndex]}\n${percent}%`;
            },
            // Position
            anchor: 'end',
            align: 'end',
            offset: 16,
            // Style
            borderRadius: 4,
            backgroundColor: function(context: any) {
              // Safely access background color
              const bgColors = context.dataset.backgroundColor;
              return Array.isArray(bgColors) ? bgColors[context.dataIndex] : bgColors;
            },
            borderWidth: 0,
            clamp: false,
            display: true,
            padding: 6,
            // Text alignment
            textAlign: 'start'
          }
        }
      }
    });
  }

  /**
   * 初始化資產狀態圖表
   */
  private initializeStatusChart(): void {
    if (!this.statusChartRef) return;

    const ctx = this.statusChartRef.nativeElement.getContext('2d');

    // 如果圖表已存在，先銷毀它
    if (this.statusChartInstance) {
      this.statusChartInstance.destroy();
    }

    this.statusChartInstance = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: this.assetStatuses.map(status => status.label),
        datasets: [{
          data: this.assetStatuses.map(status => status.value),
          backgroundColor: this.assetStatuses.map(status => status.color),
          borderColor: 'white',
          borderWidth: 2,
          // Add custom connectors
          datalabels: {
            // Use default color and offset
          }
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            top: 50,
            bottom: 50,
            left: 10,
            right: 10
          }
        },
        plugins: {
          legend: {
            display: false,  // Hide the default legend as we're showing it outside
            labels: {
              padding: 20,
              font: {
                size: 12
              }
            }
          },
          tooltip: {
            callbacks: {
              label: function(context: any) {
                const label = context.label || '';
                const value = context.raw as number;
                return `${label}: ${value}%`;
              }
            }
          },
          datalabels: {
            // Text style
            color: 'white',
            font: {
              weight: 'bold',
              size: 13
            },
            // Label content
            formatter: (value: number, context: any) => {
              const total = context.chart.data.datasets[0].data.reduce((a: number, b: number) => a + b, 0);
              const percent = total > 0 ? Math.round((value / total) * 100) : 0;
              return `${context.chart.data.labels[context.dataIndex]}\n${percent}%`;
            },
            // Position
            anchor: 'end',
            align: 'end',
            offset: 16,
            // Style
            borderRadius: 4,
            backgroundColor: function(context: any) {
              // Safely access background color
              const bgColors = context.dataset.backgroundColor;
              return Array.isArray(bgColors) ? bgColors[context.dataIndex] : bgColors;
            },
            borderWidth: 0,
            clamp: false,
            display: true,
            padding: 6,
            // Text alignment
            textAlign: 'start'
          }
        }
      }
    });
  }

  /**
   * Creates a conic gradient string with white borders between segments
   */
  private createConicGradient(data: any[]): string {
    let gradientParts: string[] = [];
    let currentPosition = 0;

    data.forEach(item => {
      // Add thin white line before segment (except for first segment)
      if (currentPosition > 0) {
        gradientParts.push(`white ${currentPosition}% ${currentPosition + 0.5}%`);
        currentPosition += 0.5;
      }

      // Add the colored segment
      gradientParts.push(`${item.color} ${currentPosition}% ${currentPosition + item.value}%`);
      currentPosition += item.value;
    });

    return `conic-gradient(${gradientParts.join(', ')})`;
  }


}
