import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';
import type { AnalyticsData } from '@/hooks/useSignalAnalytics';
import type { DevelopmentalContext } from './developmentalContext';
import type { SleepSummary, WakeWindowSummary, SleepSignalCorrelation, CaregiverBreakdown, WeeklyPattern } from '@/hooks/useClinicalSleepData';

interface PdfOptions {
  childAgeMonths: number;
  childName?: string;
  analytics: AnalyticsData;
  developmentalContext: DevelopmentalContext;
  clinicalReflection: string;
  sleepSummary?: SleepSummary;
  wakeSummary?: WakeWindowSummary;
  correlation?: SleepSignalCorrelation;
  caregiverBreakdown?: CaregiverBreakdown[];
  weeklyPatterns?: WeeklyPattern[];
}

// Baby blue palette
const BLUE = { r: 100, g: 165, b: 210 };
const BLUE_LIGHT = { r: 220, g: 237, b: 248 };
const BLUE_DARK = { r: 60, g: 110, b: 160 };
const BLUE_MID = { r: 140, g: 190, b: 225 };
const TEXT_DARK = { r: 40, g: 50, b: 65 };
const TEXT_MED = { r: 90, g: 100, b: 115 };
const TEXT_LIGHT = { r: 130, g: 140, b: 155 };
const WHITE = { r: 255, g: 255, b: 255 };
const BG_SUBTLE = { r: 248, g: 251, b: 254 };
const GREEN = { r: 80, g: 180, b: 120 };
const AMBER = { r: 220, g: 160, b: 60 };

const CHART_COLORS = [
  { r: 100, g: 165, b: 210 },
  { r: 140, g: 190, b: 225 },
  { r: 60, g: 110, b: 160 },
  { r: 180, g: 210, b: 235 },
];

type RGB = { r: number; g: number; b: number };

export function generateClinicalPdf(options: PdfOptions): jsPDF {
  const { childAgeMonths, childName, analytics, developmentalContext, clinicalReflection,
    sleepSummary, wakeSummary, correlation, caregiverBreakdown, weeklyPatterns } = options;

  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 22;
  const contentWidth = pageWidth - margin * 2;
  let yPos = 0;
  let sectionNumber = 0;

  const setColor = (c: RGB) => doc.setTextColor(c.r, c.g, c.b);

  const drawPageBackground = () => {
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

  const nextSection = (title: string) => {
    sectionNumber++;
    checkNewPage(30);
    doc.setFillColor(BLUE.r, BLUE.g, BLUE.b);
    doc.roundedRect(margin, yPos - 5, 22, 10, 5, 5, 'F');
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    setColor(WHITE);
    doc.text(String(sectionNumber), margin + 11, yPos + 1.5, { align: 'center' });
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    setColor(TEXT_DARK);
    doc.text(title, margin + 27, yPos + 1.5);
    doc.setDrawColor(BLUE_LIGHT.r, BLUE_LIGHT.g, BLUE_LIGHT.b);
    doc.setLineWidth(0.5);
    doc.line(margin, yPos + 7, margin + contentWidth, yPos + 7);
    yPos += 14;
  };

  const addParagraph = (text: string, indent = 0, fontSize = 10) => {
    doc.setFontSize(fontSize);
    doc.setFont('helvetica', 'normal');
    setColor(TEXT_MED);
    const lines = doc.splitTextToSize(text, contentWidth - indent);
    checkNewPage(lines.length * 5 + 8);
    doc.text(lines, margin + indent, yPos);
    yPos += lines.length * (fontSize * 0.45 + 1) + 4;
  };

  const addKeyValue = (key: string, value: string, keyWidth = 45) => {
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    setColor(TEXT_LIGHT);
    doc.text(key, margin + 4, yPos);
    doc.setFont('helvetica', 'bold');
    setColor(TEXT_DARK);
    doc.text(value, margin + keyWidth, yPos);
    yPos += 7;
  };

  const drawStatCard = (x: number, y: number, w: number, h: number, label: string, value: string, color: RGB = BLUE) => {
    doc.setFillColor(BG_SUBTLE.r, BG_SUBTLE.g, BG_SUBTLE.b);
    doc.roundedRect(x, y, w, h, 3, 3, 'F');
    doc.setFillColor(color.r, color.g, color.b);
    doc.roundedRect(x, y, 3, h, 1, 0, 'F');
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    setColor(color);
    doc.text(value, x + w / 2, y + h / 2 - 2, { align: 'center' });
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    setColor(TEXT_LIGHT);
    doc.text(label, x + w / 2, y + h / 2 + 6, { align: 'center' });
  };

  // ─── PAGE 1: Header ───
  drawPageBackground();
  doc.setFillColor(BG_SUBTLE.r, BG_SUBTLE.g, BG_SUBTLE.b);
  doc.roundedRect(margin, 12, contentWidth, 32, 4, 4, 'F');

  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  setColor(TEXT_DARK);
  doc.text('Clinical Signals Summary', margin + 6, 25);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  setColor(TEXT_LIGHT);
  doc.text('Parent-Reported Observations', margin + 6, 33);

  if (childName && childName.trim().length > 0) {
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    setColor(BLUE_DARK);
    doc.text(`Child: ${childName}  •  ${childAgeMonths} months`, margin + 6, 40);
  }

  doc.setFontSize(8);
  setColor(BLUE);
  doc.text(format(new Date(), 'd MMMM yyyy'), margin + contentWidth - 2, 38, { align: 'right' });

  yPos = 52;

  // ─── Section 1: Context ───
  nextSection('Context');
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
  doc.setFillColor(BLUE.r, BLUE.g, BLUE.b);
  doc.rect(margin, yPos - 2, 3, boxH, 'F');
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'italic');
  setColor(TEXT_LIGHT);
  doc.text(disclaimerLines, margin + 8, yPos + 4);
  yPos += boxH + 8;

  // ─── Section 2: Aggregated Signals ───
  nextSection('Aggregated Signals');

  if (analytics.aggregations.length === 0) {
    addParagraph('No signals were recorded during this period.');
  } else {
    const tableData = analytics.aggregations.map(agg => {
      const cats = Object.entries(agg.frequencies).map(([cat, count]) => `${cat} (${count})`).join(', ');
      return [agg.label, String(agg.daysLogged), cats];
    });

    autoTable(doc, {
      startY: yPos,
      head: [['Signal Type', 'Days', 'Observations']],
      body: tableData,
      margin: { left: margin, right: margin },
      styles: { fontSize: 9, cellPadding: 5, lineColor: [220, 237, 248], lineWidth: 0.3 },
      headStyles: { fillColor: [BLUE.r, BLUE.g, BLUE.b], textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 9 },
      alternateRowStyles: { fillColor: [BG_SUBTLE.r, BG_SUBTLE.g, BG_SUBTLE.b] },
      columnStyles: { 0: { cellWidth: 32, fontStyle: 'bold', textColor: [TEXT_DARK.r, TEXT_DARK.g, TEXT_DARK.b] }, 1: { cellWidth: 20, halign: 'center' }, 2: { cellWidth: 'auto' } },
    });
    yPos = (doc as any).lastAutoTable.finalY + 10;
  }

  // Signal Distribution Chart
  if (analytics.aggregations.length > 0) {
    checkNewPage(80);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    setColor(TEXT_DARK);
    doc.text('Signal Distribution', margin, yPos);
    yPos += 8;

    const barMaxWidth = contentWidth - 45;
    const maxTotal = Math.max(...analytics.aggregations.map(agg => Object.values(agg.frequencies).reduce((a, b) => a + b, 0)));

    analytics.aggregations.forEach((agg, i) => {
      const barY = yPos + i * 20;
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      setColor(TEXT_DARK);
      doc.text(agg.label, margin, barY + 5);
      doc.setFillColor(BLUE_LIGHT.r, BLUE_LIGHT.g, BLUE_LIGHT.b);
      doc.roundedRect(margin + 38, barY, barMaxWidth, 10, 2, 2, 'F');

      const total = Object.values(agg.frequencies).reduce((a, b) => a + b, 0);
      let offsetX = 0;
      const entries = Object.entries(agg.frequencies);
      entries.forEach(([, count], ci) => {
        const segWidth = (count / maxTotal) * barMaxWidth;
        const color = CHART_COLORS[ci % CHART_COLORS.length];
        doc.setFillColor(color.r, color.g, color.b);
        if (ci === 0) doc.roundedRect(margin + 38 + offsetX, barY, segWidth, 10, 2, 0, 'F');
        else if (ci === entries.length - 1) doc.roundedRect(margin + 38 + offsetX, barY, segWidth, 10, 0, 2, 'F');
        else doc.rect(margin + 38 + offsetX, barY, segWidth, 10, 'F');
        offsetX += segWidth;
      });

      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      setColor(BLUE_DARK);
      doc.text(String(total), margin + 38 + offsetX + 3, barY + 6.5);
    });

    yPos += analytics.aggregations.length * 20 + 6;

    const allCategories = new Map<string, number>();
    analytics.aggregations.forEach(agg => {
      Object.entries(agg.frequencies).forEach(([cat]) => {
        if (!allCategories.has(cat)) allCategories.set(cat, allCategories.size);
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
      if (legendX > margin + contentWidth - 30) { legendX = margin; yPos += 7; }
    });
    yPos += 12;
  }

  // ─── Section 3: Sleep Summary ───
  if (sleepSummary && sleepSummary.totalLogs > 0) {
    nextSection('Sleep Summary');

    const cardW = (contentWidth - 6) / 3;
    checkNewPage(50);
    drawStatCard(margin, yPos, cardW, 28, 'Avg Duration', `${sleepSummary.avgDurationMinutes}min`, BLUE);
    drawStatCard(margin + cardW + 3, yPos, cardW, 28, 'Total Logs', String(sleepSummary.totalLogs), BLUE_DARK);
    drawStatCard(margin + (cardW + 3) * 2, yPos, cardW, 28, 'Consistency', `${sleepSummary.consistencyScore}%`, sleepSummary.consistencyScore >= 60 ? GREEN : AMBER);
    yPos += 34;

    // Quality distribution mini chart
    const qualities = Object.entries(sleepSummary.qualityDistribution);
    if (qualities.length > 0) {
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      setColor(TEXT_DARK);
      doc.text('Sleep Quality Distribution', margin, yPos);
      yPos += 6;

      const totalQ = qualities.reduce((s, [, c]) => s + c, 0);
      let qX = margin;
      qualities.forEach(([label, count], i) => {
        const pct = Math.round((count / totalQ) * 100);
        const barW = (count / totalQ) * contentWidth;
        const color = CHART_COLORS[i % CHART_COLORS.length];
        doc.setFillColor(color.r, color.g, color.b);
        doc.rect(qX, yPos, barW, 8, 'F');
        if (barW > 25) {
          doc.setFontSize(7);
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(255, 255, 255);
          doc.text(`${label} ${pct}%`, qX + 3, yPos + 5.5);
        }
        qX += barW;
      });
      yPos += 14;
    }

    if (sleepSummary.earliestStart) {
      addParagraph(`Earliest recorded sleep start: ${sleepSummary.earliestStart}. Latest recorded end: ${sleepSummary.latestEnd || 'N/A'}.`, 0, 9);
    }
  }

  // ─── Section 4: Wake Windows Analysis ───
  if (wakeSummary && wakeSummary.totalLogs > 0) {
    nextSection('Wake Windows Analysis');

    const cardW = (contentWidth - 6) / 3;
    checkNewPage(50);
    drawStatCard(margin, yPos, cardW, 28, 'Avg Duration', `${wakeSummary.avgDurationMinutes}min`, BLUE);
    drawStatCard(margin + cardW + 3, yPos, cardW, 28, 'Shortest', `${wakeSummary.shortestWindow}min`, GREEN);
    drawStatCard(margin + (cardW + 3) * 2, yPos, cardW, 28, 'Longest', `${wakeSummary.longestWindow}min`, AMBER);
    yPos += 34;

    // Age-appropriate benchmark
    let benchmarkMin = 0, benchmarkMax = 0;
    if (childAgeMonths <= 3) { benchmarkMin = 45; benchmarkMax = 90; }
    else if (childAgeMonths <= 6) { benchmarkMin = 90; benchmarkMax = 150; }
    else if (childAgeMonths <= 9) { benchmarkMin = 120; benchmarkMax = 210; }
    else if (childAgeMonths <= 12) { benchmarkMin = 150; benchmarkMax = 240; }
    else { benchmarkMin = 180; benchmarkMax = 300; }

    const isInRange = wakeSummary.avgDurationMinutes >= benchmarkMin && wakeSummary.avgDurationMinutes <= benchmarkMax;
    const benchmarkNote = isInRange
      ? `Average wake window (${wakeSummary.avgDurationMinutes}min) falls within the typical range for ${childAgeMonths}-month-olds (${benchmarkMin}–${benchmarkMax}min).`
      : `Average wake window (${wakeSummary.avgDurationMinutes}min) is outside the typical range for ${childAgeMonths}-month-olds (${benchmarkMin}–${benchmarkMax}min). This may warrant discussion.`;

    addParagraph(benchmarkNote, 0, 9);

    // Activities breakdown
    const acts = Object.entries(wakeSummary.activities);
    if (acts.length > 0) {
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      setColor(TEXT_DARK);
      doc.text('Activities During Wake Windows', margin, yPos);
      yPos += 6;
      acts.forEach(([act, count]) => {
        addKeyValue(act, `${count} sessions`, 55);
      });
    }
  }

  // ─── Section 5: Daily Observations Chart ───
  if (analytics.dailySignals.length > 0) {
    checkNewPage(90);
    nextSection('Daily Observations');
    addParagraph('Number of signals logged per day. Higher points indicate days with more recorded observations — not better or worse days. Peaks may reflect days when the caregiver logged more details.', 0, 8.5);
    const chartStartX = margin + 10;
    const chartEndX = margin + contentWidth - 5;
    const chartW = chartEndX - chartStartX;
    const chartH = 50;
    const chartTop = yPos;
    const chartBottom = yPos + chartH;

    doc.setFillColor(BG_SUBTLE.r, BG_SUBTLE.g, BG_SUBTLE.b);
    doc.roundedRect(margin, chartTop - 5, contentWidth, chartH + 20, 3, 3, 'F');

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
      doc.setFontSize(7);
      setColor(TEXT_LIGHT);
      doc.text(String(Math.round((i / 4) * maxSignals)), chartStartX - 3, gridY + 1.5, { align: 'right' });
    }

    if (dailyData.length > 1) {
      const stepX = chartW / (dailyData.length - 1);
      const areaPoints: { x: number; y: number }[] = [];
      dailyData.forEach((d, i) => {
        areaPoints.push({ x: chartStartX + i * stepX, y: chartBottom - (d.count / maxSignals) * chartH });
      });

      doc.setFillColor(BLUE_LIGHT.r, BLUE_LIGHT.g, BLUE_LIGHT.b);
      for (let i = 0; i < areaPoints.length - 1; i++) {
        const avgY = (areaPoints[i].y + areaPoints[i + 1].y) / 2;
        doc.rect(areaPoints[i].x, avgY, areaPoints[i + 1].x - areaPoints[i].x, chartBottom - avgY, 'F');
      }

      doc.setDrawColor(BLUE.r, BLUE.g, BLUE.b);
      doc.setLineWidth(1.5);
      for (let i = 0; i < areaPoints.length - 1; i++) {
        doc.line(areaPoints[i].x, areaPoints[i].y, areaPoints[i + 1].x, areaPoints[i + 1].y);
      }

      areaPoints.forEach(p => {
        doc.setFillColor(WHITE.r, WHITE.g, WHITE.b);
        doc.circle(p.x, p.y, 2.5, 'F');
        doc.setFillColor(BLUE.r, BLUE.g, BLUE.b);
        doc.circle(p.x, p.y, 1.5, 'F');
      });

      const labelStep = Math.max(1, Math.floor(dailyData.length / 6));
      doc.setFontSize(6.5);
      setColor(TEXT_LIGHT);
      dailyData.forEach((d, i) => {
        if (i % labelStep === 0 || i === dailyData.length - 1) {
          doc.text(format(new Date(d.date), 'dd/MM'), chartStartX + i * stepX, chartBottom + 7, { align: 'center' });
        }
      });
    }

    yPos = chartBottom + 14;
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'italic');
    setColor(TEXT_LIGHT);
    doc.text('These observations reflect parent reports and are not a performance measure.', margin + contentWidth / 2, yPos, { align: 'center' });
    yPos += 10;
  }

  // ─── Section 6: Sleep-Signal Correlation ───
  if (correlation && (correlation.goodSleepDays.count > 0 || correlation.poorSleepDays.count > 0)) {
    nextSection('Sleep & Signal Correlation');

    const cardW = (contentWidth - 6) / 2;
    checkNewPage(45);
    drawStatCard(margin, yPos, cardW, 32, `Good sleep days (${correlation.goodSleepDays.count})`, `${correlation.goodSleepDays.avgSignals} avg signals`, GREEN);
    drawStatCard(margin + cardW + 6, yPos, cardW, 32, `Low sleep days (${correlation.poorSleepDays.count})`, `${correlation.poorSleepDays.avgSignals} avg signals`, AMBER);
    yPos += 38;

    addParagraph(correlation.insight);
  }

  // ─── Section 7: Caregiver Consistency ───
  if (caregiverBreakdown && caregiverBreakdown.length > 0) {
    nextSection('Caregiver Reporting');

    const tableRows = caregiverBreakdown.map(c => [c.name, String(c.signalCount), String(c.sleepLogCount), String(c.totalEntries)]);

    autoTable(doc, {
      startY: yPos,
      head: [['Caregiver', 'Signals', 'Sleep Logs', 'Total']],
      body: tableRows,
      margin: { left: margin, right: margin },
      styles: { fontSize: 9, cellPadding: 4, lineColor: [220, 237, 248], lineWidth: 0.3 },
      headStyles: { fillColor: [BLUE.r, BLUE.g, BLUE.b], textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 9 },
      alternateRowStyles: { fillColor: [BG_SUBTLE.r, BG_SUBTLE.g, BG_SUBTLE.b] },
      columnStyles: { 0: { fontStyle: 'bold', textColor: [TEXT_DARK.r, TEXT_DARK.g, TEXT_DARK.b] }, 1: { halign: 'center' }, 2: { halign: 'center' }, 3: { halign: 'center' } },
    });
    yPos = (doc as any).lastAutoTable.finalY + 8;

    if (caregiverBreakdown.length > 1) {
      const topContrib = caregiverBreakdown[0];
      const pct = Math.round((topContrib.totalEntries / caregiverBreakdown.reduce((s, c) => s + c.totalEntries, 0)) * 100);
      addParagraph(`${topContrib.name} contributed ${pct}% of all entries during this period.`, 0, 9);
    }
  }

  // ─── Section 8: Weekly Patterns ───
  if (weeklyPatterns && weeklyPatterns.some(w => w.avgSignalCount > 0)) {
    nextSection('Weekly Patterns');

    checkNewPage(70);
    const chartH = 45;
    const barSpacing = contentWidth / 7;
    const maxAvg = Math.max(...weeklyPatterns.map(w => w.avgSignalCount), 1);

    doc.setFillColor(BG_SUBTLE.r, BG_SUBTLE.g, BG_SUBTLE.b);
    doc.roundedRect(margin, yPos - 3, contentWidth, chartH + 20, 3, 3, 'F');

    const chartBottom = yPos + chartH;

    weeklyPatterns.forEach((wp, i) => {
      const x = margin + i * barSpacing + barSpacing / 2 - 8;
      const barH = wp.avgSignalCount > 0 ? (wp.avgSignalCount / maxAvg) * (chartH - 5) : 0;
      const barTop = chartBottom - barH;

      const color = wp.dominantMood === 'Mostly settled' ? GREEN : wp.dominantMood === 'More variable' ? AMBER : BLUE_LIGHT;
      doc.setFillColor(color.r, color.g, color.b);
      doc.roundedRect(x, barTop, 16, barH, 2, 2, 'F');

      if (wp.avgSignalCount > 0) {
        doc.setFontSize(7);
        doc.setFont('helvetica', 'bold');
        setColor(TEXT_DARK);
        doc.text(String(wp.avgSignalCount), x + 8, barTop - 2, { align: 'center' });
      }

      doc.setFontSize(6.5);
      doc.setFont('helvetica', 'normal');
      setColor(TEXT_LIGHT);
      doc.text(wp.dayOfWeek.substring(0, 3), x + 8, chartBottom + 6, { align: 'center' });
    });

    yPos = chartBottom + 14;

    // Legend
    doc.setFontSize(7);
    let lx = margin;
    [{ label: 'Mostly settled', color: GREEN }, { label: 'More variable', color: AMBER }].forEach(({ label, color }) => {
      doc.setFillColor(color.r, color.g, color.b);
      doc.roundedRect(lx, yPos, 6, 4, 1, 1, 'F');
      doc.setFont('helvetica', 'normal');
      setColor(TEXT_LIGHT);
      doc.text(label, lx + 8, yPos + 3.5);
      lx += doc.getTextWidth(label) + 16;
    });
    yPos += 12;
  }

  // ─── Section: Trend Description ───
  nextSection('Trend Description');
  addParagraph(analytics.overallTrend.description);
  yPos += 4;

  // ─── Section: Developmental Context ───
  nextSection('Developmental Context');
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

  // ─── Section: Clinical Reflection ───
  nextSection('Clinical Reflection');
  doc.setFillColor(BG_SUBTLE.r, BG_SUBTLE.g, BG_SUBTLE.b);
  const reflLines = doc.splitTextToSize(clinicalReflection, contentWidth - 16);
  const reflBoxH = reflLines.length * 5 + 12;
  checkNewPage(reflBoxH + 5);
  doc.roundedRect(margin, yPos - 2, contentWidth, reflBoxH, 3, 3, 'F');
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
    doc.setFillColor(BLUE.r, BLUE.g, BLUE.b);
    doc.rect(0, pageHeight - 4, pageWidth, 4, 'F');
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(TEXT_LIGHT.r, TEXT_LIGHT.g, TEXT_LIGHT.b);
    doc.text(
      `The Seahorse Club • Generated ${format(new Date(), 'd MMM yyyy')} • Page ${i} of ${pageCount}`,
      pageWidth / 2, pageHeight - 8, { align: 'center' }
    );
  }

  return doc;
}
