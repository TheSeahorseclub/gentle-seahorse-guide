import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';
import type { AnalyticsData } from '@/hooks/useSignalAnalytics';
import type { DevelopmentalContext } from './developmentalContext';

interface PdfOptions {
  childAgeMonths: number;
  analytics: AnalyticsData;
  developmentalContext: DevelopmentalContext;
  clinicalReflection: string;
}

// Baby blue palette
const BLUE = { r: 100, g: 165, b: 210 };       // primary baby blue
const BLUE_LIGHT = { r: 220, g: 237, b: 248 };  // soft background
const BLUE_DARK = { r: 60, g: 110, b: 160 };     // darker accent
const BLUE_MID = { r: 140, g: 190, b: 225 };     // mid tone
const TEXT_DARK = { r: 40, g: 50, b: 65 };
const TEXT_MED = { r: 90, g: 100, b: 115 };
const TEXT_LIGHT = { r: 130, g: 140, b: 155 };
const WHITE = { r: 255, g: 255, b: 255 };
const BG_SUBTLE = { r: 248, g: 251, b: 254 };

// Chart colors for bar segments
const CHART_COLORS = [
  { r: 100, g: 165, b: 210 },
  { r: 140, g: 190, b: 225 },
  { r: 60, g: 110, b: 160 },
  { r: 180, g: 210, b: 235 },
];

export function generateClinicalPdf(options: PdfOptions): jsPDF {
  const { childAgeMonths, analytics, developmentalContext, clinicalReflection } = options;

  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 22;
  const contentWidth = pageWidth - margin * 2;
  let yPos = 0;

  // ─── Helper functions ───
  const setColor = (c: { r: number; g: number; b: number }) => {
    doc.setTextColor(c.r, c.g, c.b);
  };

  const drawPageBackground = () => {
    // Subtle top gradient bar
    doc.setFillColor(BLUE.r, BLUE.g, BLUE.b);
    doc.rect(0, 0, pageWidth, 4, 'F');
  };

  const checkNewPage = (neededSpace: number = 40) => {
    if (yPos > pageHeight - neededSpace) {
      doc.addPage();
      drawPageBackground();
      yPos = 20;
    }
  };

  const drawSectionHeader = (number: string, title: string) => {
    checkNewPage(30);
    // Blue pill for section number
    doc.setFillColor(BLUE.r, BLUE.g, BLUE.b);
    doc.roundedRect(margin, yPos - 5, 22, 10, 5, 5, 'F');
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    setColor(WHITE);
    doc.text(number, margin + 11, yPos + 1.5, { align: 'center' });

    // Section title
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    setColor(TEXT_DARK);
    doc.text(title, margin + 27, yPos + 1.5);

    // Subtle underline
    doc.setDrawColor(BLUE_LIGHT.r, BLUE_LIGHT.g, BLUE_LIGHT.b);
    doc.setLineWidth(0.5);
    doc.line(margin, yPos + 7, margin + contentWidth, yPos + 7);
    yPos += 14;
  };

  const addParagraph = (text: string, indent: number = 0, fontSize: number = 10) => {
    doc.setFontSize(fontSize);
    doc.setFont('helvetica', 'normal');
    setColor(TEXT_MED);
    const lines = doc.splitTextToSize(text, contentWidth - indent);
    doc.text(lines, margin + indent, yPos);
    yPos += lines.length * (fontSize * 0.45 + 1) + 4;
  };

  const addKeyValue = (key: string, value: string) => {
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    setColor(TEXT_LIGHT);
    doc.text(key, margin + 4, yPos);
    doc.setFont('helvetica', 'bold');
    setColor(TEXT_DARK);
    doc.text(value, margin + 45, yPos);
    yPos += 7;
  };

  // ─── PAGE 1: Header ───
  drawPageBackground();

  // Title area with soft background
  doc.setFillColor(BG_SUBTLE.r, BG_SUBTLE.g, BG_SUBTLE.b);
  doc.roundedRect(margin, 12, contentWidth, 32, 4, 4, 'F');

  // Decorative circle
  doc.setFillColor(BLUE_LIGHT.r, BLUE_LIGHT.g, BLUE_LIGHT.b);
  doc.circle(margin + 18, 28, 10, 'F');
  doc.setFillColor(BLUE.r, BLUE.g, BLUE.b);
  doc.circle(margin + 18, 28, 6, 'F');

  // Seahorse icon placeholder - simple wave
  setColor(WHITE);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('🌊', margin + 14, 31);

  // Title text
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  setColor(TEXT_DARK);
  doc.text('Clinical Signals Summary', margin + 35, 25);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  setColor(TEXT_LIGHT);
  doc.text('Parent-Reported Observations', margin + 35, 33);

  // Date stamp
  doc.setFontSize(8);
  setColor(BLUE);
  doc.text(format(new Date(), 'd MMMM yyyy'), margin + contentWidth - 2, 38, { align: 'right' });

  yPos = 52;

  // ─── Section 1: Context ───
  drawSectionHeader('1', 'Context');

  // Info card
  doc.setFillColor(BLUE_LIGHT.r, BLUE_LIGHT.g, BLUE_LIGHT.b);
  doc.roundedRect(margin, yPos - 2, contentWidth, 30, 3, 3, 'F');
  yPos += 4;

  addKeyValue('Child age', `${childAgeMonths} months`);
  addKeyValue('Period', `${format(analytics.periodStart, 'd MMM yyyy')} – ${format(analytics.periodEnd, 'd MMM yyyy')}`);
  addKeyValue('Days logged', `${analytics.daysWithData} of ${analytics.totalDays} days`);

  yPos += 6;

  // Disclaimer
  doc.setFillColor(BG_SUBTLE.r, BG_SUBTLE.g, BG_SUBTLE.b);
  doc.setDrawColor(BLUE_MID.r, BLUE_MID.g, BLUE_MID.b);
  doc.setLineWidth(0.3);
  const disclaimerText = 'This summary organises parent-reported signals and does not provide diagnosis, assessment, or prediction.';
  const disclaimerLines = doc.splitTextToSize(disclaimerText, contentWidth - 14);
  const boxH = disclaimerLines.length * 5 + 10;
  doc.roundedRect(margin, yPos - 2, contentWidth, boxH, 2, 2, 'FD');

  // Blue left accent bar
  doc.setFillColor(BLUE.r, BLUE.g, BLUE.b);
  doc.rect(margin, yPos - 2, 3, boxH, 'F');

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'italic');
  setColor(TEXT_LIGHT);
  doc.text(disclaimerLines, margin + 8, yPos + 4);
  yPos += boxH + 8;

  // ─── Section 2: Aggregated Signals ───
  checkNewPage(50);
  drawSectionHeader('2', 'Aggregated Signals');

  if (analytics.aggregations.length === 0) {
    addParagraph('No signals were recorded during this period.');
  } else {
    // Signal frequency table with styled header
    const tableData = analytics.aggregations.map(agg => {
      const cats = Object.entries(agg.frequencies)
        .map(([cat, count]) => `${cat} (${count})`)
        .join(', ');
      return [agg.label, String(agg.daysLogged), cats];
    });

    autoTable(doc, {
      startY: yPos,
      head: [['Signal Type', 'Days', 'Observations']],
      body: tableData,
      margin: { left: margin, right: margin },
      styles: {
        fontSize: 9,
        cellPadding: 5,
        lineColor: [220, 237, 248],
        lineWidth: 0.3,
      },
      headStyles: {
        fillColor: [BLUE.r, BLUE.g, BLUE.b],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 9,
      },
      alternateRowStyles: {
        fillColor: [BG_SUBTLE.r, BG_SUBTLE.g, BG_SUBTLE.b],
      },
      columnStyles: {
        0: { cellWidth: 32, fontStyle: 'bold', textColor: [TEXT_DARK.r, TEXT_DARK.g, TEXT_DARK.b] },
        1: { cellWidth: 20, halign: 'center' },
        2: { cellWidth: 'auto' },
      },
    });

    yPos = (doc as any).lastAutoTable.finalY + 10;
  }

  // ─── Section 2b: Signal Frequency Chart ───
  if (analytics.aggregations.length > 0) {
    checkNewPage(80);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    setColor(TEXT_DARK);
    doc.text('Signal Distribution', margin, yPos);
    yPos += 8;

    // Draw horizontal bar chart
    const chartHeight = analytics.aggregations.length * 20 + 10;
    const chartWidth = contentWidth - 40;
    const barMaxWidth = chartWidth - 5;

    // Find max total count
    const maxTotal = Math.max(
      ...analytics.aggregations.map(agg =>
        Object.values(agg.frequencies).reduce((a, b) => a + b, 0)
      )
    );

    analytics.aggregations.forEach((agg, i) => {
      const barY = yPos + i * 20;

      // Label
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      setColor(TEXT_DARK);
      doc.text(agg.label, margin, barY + 5);

      // Background track
      doc.setFillColor(BLUE_LIGHT.r, BLUE_LIGHT.g, BLUE_LIGHT.b);
      doc.roundedRect(margin + 38, barY, barMaxWidth, 10, 2, 2, 'F');

      // Stacked bar segments
      const total = Object.values(agg.frequencies).reduce((a, b) => a + b, 0);
      let offsetX = 0;
      const entries = Object.entries(agg.frequencies);

      entries.forEach(([, count], ci) => {
        const segWidth = (count / maxTotal) * barMaxWidth;
        const color = CHART_COLORS[ci % CHART_COLORS.length];
        doc.setFillColor(color.r, color.g, color.b);

        if (ci === 0) {
          doc.roundedRect(margin + 38 + offsetX, barY, segWidth, 10, 2, 0, 'F');
        } else if (ci === entries.length - 1) {
          doc.roundedRect(margin + 38 + offsetX, barY, segWidth, 10, 0, 2, 'F');
        } else {
          doc.rect(margin + 38 + offsetX, barY, segWidth, 10, 'F');
        }
        offsetX += segWidth;
      });

      // Total count
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      setColor(BLUE_DARK);
      doc.text(String(total), margin + 38 + offsetX + 3, barY + 6.5);
    });

    yPos += analytics.aggregations.length * 20 + 6;

    // Legend
    const allCategories = new Map<string, number>();
    analytics.aggregations.forEach(agg => {
      Object.entries(agg.frequencies).forEach(([cat], ci) => {
        if (!allCategories.has(cat)) {
          allCategories.set(cat, allCategories.size);
        }
      });
    });

    let legendX = margin;
    doc.setFontSize(7);
    allCategories.forEach((idx, cat) => {
      const color = CHART_COLORS[idx % CHART_COLORS.length];
      doc.setFillColor(color.r, color.g, color.b);
      doc.roundedRect(legendX, yPos, 6, 4, 1, 1, 'F');
      doc.setFont('helvetica', 'normal');
      setColor(TEXT_LIGHT);
      doc.text(cat, legendX + 8, yPos + 3.5);
      legendX += doc.getTextWidth(cat) + 14;
      if (legendX > margin + contentWidth - 30) {
        legendX = margin;
        yPos += 7;
      }
    });
    yPos += 12;
  }

  // ─── Section 3: Daily Observations Chart ───
  if (analytics.dailySignals.length > 0) {
    checkNewPage(90);
    drawSectionHeader('3', 'Daily Observations');

    const chartStartX = margin + 10;
    const chartEndX = margin + contentWidth - 5;
    const chartW = chartEndX - chartStartX;
    const chartH = 50;
    const chartTop = yPos;
    const chartBottom = yPos + chartH;

    // Background
    doc.setFillColor(BG_SUBTLE.r, BG_SUBTLE.g, BG_SUBTLE.b);
    doc.roundedRect(margin, chartTop - 5, contentWidth, chartH + 20, 3, 3, 'F');

    // Gridlines
    const dailyData = analytics.dailySignals.map(day => ({
      date: day.date,
      count: Object.values(day.signals).flat().length,
    }));
    const maxSignals = Math.max(...dailyData.map(d => d.count), 1);

    doc.setDrawColor(BLUE_LIGHT.r, BLUE_LIGHT.g, BLUE_LIGHT.b);
    doc.setLineWidth(0.2);
    for (let i = 0; i <= 4; i++) {
      const gridY = chartBottom - (i / 4) * chartH;
      doc.line(chartStartX, gridY, chartEndX, gridY);

      // Y-axis labels
      doc.setFontSize(7);
      setColor(TEXT_LIGHT);
      doc.text(String(Math.round((i / 4) * maxSignals)), chartStartX - 3, gridY + 1.5, { align: 'right' });
    }

    // Plot line with area fill
    if (dailyData.length > 1) {
      const stepX = chartW / (dailyData.length - 1);

      // Area fill (polygon)
      const areaPoints: { x: number; y: number }[] = [];
      dailyData.forEach((d, i) => {
        const x = chartStartX + i * stepX;
        const y = chartBottom - (d.count / maxSignals) * chartH;
        areaPoints.push({ x, y });
      });

      // Draw filled area using small rectangles for approximation
      doc.setFillColor(BLUE_LIGHT.r, BLUE_LIGHT.g, BLUE_LIGHT.b);
      for (let i = 0; i < areaPoints.length - 1; i++) {
        const x1 = areaPoints[i].x;
        const y1 = areaPoints[i].y;
        const x2 = areaPoints[i + 1].x;
        const y2 = areaPoints[i + 1].y;
        const avgY = (y1 + y2) / 2;
        doc.rect(x1, avgY, x2 - x1, chartBottom - avgY, 'F');
      }

      // Draw line
      doc.setDrawColor(BLUE.r, BLUE.g, BLUE.b);
      doc.setLineWidth(1.5);
      for (let i = 0; i < areaPoints.length - 1; i++) {
        doc.line(areaPoints[i].x, areaPoints[i].y, areaPoints[i + 1].x, areaPoints[i + 1].y);
      }

      // Draw dots
      areaPoints.forEach(p => {
        doc.setFillColor(WHITE.r, WHITE.g, WHITE.b);
        doc.circle(p.x, p.y, 2.5, 'F');
        doc.setFillColor(BLUE.r, BLUE.g, BLUE.b);
        doc.circle(p.x, p.y, 1.5, 'F');
      });

      // X-axis labels (show a few)
      const labelStep = Math.max(1, Math.floor(dailyData.length / 6));
      doc.setFontSize(6.5);
      setColor(TEXT_LIGHT);
      dailyData.forEach((d, i) => {
        if (i % labelStep === 0 || i === dailyData.length - 1) {
          const x = chartStartX + i * stepX;
          doc.text(format(new Date(d.date), 'dd/MM'), x, chartBottom + 7, { align: 'center' });
        }
      });
    }

    yPos = chartBottom + 14;

    // Note
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'italic');
    setColor(TEXT_LIGHT);
    doc.text('These observations reflect parent reports and are not a performance measure.', margin + contentWidth / 2, yPos, { align: 'center' });
    yPos += 10;
  }

  // ─── Section 4: Trend Description ───
  checkNewPage(35);
  drawSectionHeader('4', 'Trend Description');
  addParagraph(analytics.overallTrend.description);
  yPos += 4;

  // ─── Section 5: Developmental Context ───
  checkNewPage(45);
  drawSectionHeader('5', 'Developmental Context');

  // Age range badge
  doc.setFillColor(BLUE_LIGHT.r, BLUE_LIGHT.g, BLUE_LIGHT.b);
  const badgeText = developmentalContext.ageRange;
  const badgeWidth = doc.getTextWidth(badgeText) * 1.2 + 12;
  doc.roundedRect(margin, yPos - 4, badgeWidth, 9, 4, 4, 'F');
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  setColor(BLUE_DARK);
  doc.text(badgeText, margin + 6, yPos + 1.5);
  yPos += 10;

  addParagraph(developmentalContext.description);
  addParagraph(developmentalContext.signalNotes);
  yPos += 2;

  // ─── Section 6: Clinical Reflection ───
  checkNewPage(45);
  drawSectionHeader('6', 'Clinical Reflection');

  // Highlighted reflection box
  doc.setFillColor(BG_SUBTLE.r, BG_SUBTLE.g, BG_SUBTLE.b);
  const reflLines = doc.splitTextToSize(clinicalReflection, contentWidth - 16);
  const reflBoxH = reflLines.length * 5 + 12;
  doc.roundedRect(margin, yPos - 2, contentWidth, reflBoxH, 3, 3, 'F');

  // Left accent
  doc.setFillColor(BLUE.r, BLUE.g, BLUE.b);
  doc.rect(margin, yPos - 2, 3, reflBoxH, 'F');

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  setColor(TEXT_MED);
  doc.text(reflLines, margin + 10, yPos + 6);
  yPos += reflBoxH + 10;

  // ─── Footer on all pages ───
  const pageCount = doc.internal.pages.length - 1;
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);

    // Bottom blue bar
    doc.setFillColor(BLUE.r, BLUE.g, BLUE.b);
    doc.rect(0, pageHeight - 4, pageWidth, 4, 'F');

    // Footer text
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(TEXT_LIGHT.r, TEXT_LIGHT.g, TEXT_LIGHT.b);
    doc.text(
      `The Seahorse Club • Generated ${format(new Date(), 'd MMM yyyy')} • Page ${i} of ${pageCount}`,
      pageWidth / 2,
      pageHeight - 8,
      { align: 'center' }
    );
  }

  return doc;
}
