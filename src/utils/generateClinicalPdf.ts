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

export function generateClinicalPdf(options: PdfOptions): jsPDF {
  const { childAgeMonths, analytics, developmentalContext, clinicalReflection } = options;
  
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let yPos = 20;

  // Helper functions
  const addTitle = (text: string, size: number = 16) => {
    doc.setFontSize(size);
    doc.setFont('helvetica', 'bold');
    doc.text(text, margin, yPos);
    yPos += size * 0.5 + 4;
  };

  const addSubtitle = (text: string) => {
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(text, margin, yPos);
    yPos += 8;
  };

  const addParagraph = (text: string, indent: number = 0) => {
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const lines = doc.splitTextToSize(text, contentWidth - indent);
    doc.text(lines, margin + indent, yPos);
    yPos += lines.length * 5 + 4;
  };

  const addSpacer = (height: number = 8) => {
    yPos += height;
  };

  const checkNewPage = (neededSpace: number = 40) => {
    if (yPos > doc.internal.pageSize.getHeight() - neededSpace) {
      doc.addPage();
      yPos = 20;
    }
  };

  // Title
  addTitle('Clinical Signals Summary', 18);
  addTitle('(Parent-Reported)', 14);
  addSpacer(4);

  // Context Section
  addSubtitle('1. Context');
  addParagraph(`Child age: ${childAgeMonths} months`);
  addParagraph(`Period analysed: ${format(analytics.periodStart, 'd MMM yyyy')} – ${format(analytics.periodEnd, 'd MMM yyyy')}`);
  addParagraph(`Days with logged observations: ${analytics.daysWithData} of ${analytics.totalDays} days`);
  addSpacer(4);
  
  // Disclaimer box
  doc.setDrawColor(100, 100, 100);
  doc.setFillColor(245, 245, 245);
  const disclaimerText = 'This summary organises parent-reported signals and does not provide diagnosis, assessment, or prediction.';
  const disclaimerLines = doc.splitTextToSize(disclaimerText, contentWidth - 10);
  const boxHeight = disclaimerLines.length * 5 + 10;
  doc.roundedRect(margin, yPos - 2, contentWidth, boxHeight, 2, 2, 'FD');
  doc.setFontSize(9);
  doc.setFont('helvetica', 'italic');
  doc.text(disclaimerLines, margin + 5, yPos + 5);
  yPos += boxHeight + 8;

  checkNewPage();

  // Aggregated Signals Section
  addSubtitle('2. Aggregated Signals');
  addSpacer(2);

  if (analytics.aggregations.length === 0) {
    addParagraph('No signals were recorded during this period.');
  } else {
    analytics.aggregations.forEach(agg => {
      checkNewPage(30);
      
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text(`${agg.label}`, margin, yPos);
      yPos += 6;
      
      addParagraph(`Days logged: ${agg.daysLogged}`, 5);
      
      const frequencyText = Object.entries(agg.frequencies)
        .map(([category, count]) => `${category}: ${count}`)
        .join(', ');
      addParagraph(`Observations: ${frequencyText}`, 5);
      addSpacer(2);
    });
  }

  checkNewPage();

  // Trend Description Section
  addSubtitle('3. Trend Description');
  addParagraph(analytics.overallTrend.description);
  addSpacer(4);

  checkNewPage();

  // Developmental Context Section
  addSubtitle('4. Developmental Context');
  addParagraph(`Age range: ${developmentalContext.ageRange}`);
  addParagraph(developmentalContext.description);
  addSpacer(2);
  addParagraph(developmentalContext.signalNotes);
  addSpacer(4);

  checkNewPage();

  // Clinical Reflection Section
  addSubtitle('5. Clinical Reflection');
  addParagraph(clinicalReflection);
  addSpacer(8);

  checkNewPage(60);

  // Visualisation Note
  addSubtitle('6. Visualisation');
  addParagraph('Signal frequency charts are displayed in the preview interface.');
  addSpacer(4);
  
  // Note about visualization
  doc.setDrawColor(100, 100, 100);
  doc.setFillColor(250, 250, 245);
  const noteText = 'Note: These visualisations reflect parent observations and are not a performance measure.';
  const noteLines = doc.splitTextToSize(noteText, contentWidth - 10);
  const noteBoxHeight = noteLines.length * 5 + 10;
  doc.roundedRect(margin, yPos - 2, contentWidth, noteBoxHeight, 2, 2, 'FD');
  doc.setFontSize(9);
  doc.setFont('helvetica', 'italic');
  doc.text(noteLines, margin + 5, yPos + 5);
  yPos += noteBoxHeight + 8;

  // Signal frequency table
  if (analytics.aggregations.length > 0) {
    checkNewPage(50);
    
    const tableData = analytics.aggregations.map(agg => {
      const categories = Object.entries(agg.frequencies)
        .map(([cat, count]) => `${cat} (${count})`)
        .join('\n');
      return [agg.label, String(agg.daysLogged), categories];
    });

    autoTable(doc, {
      startY: yPos,
      head: [['Signal Type', 'Days Logged', 'Observations']],
      body: tableData,
      margin: { left: margin, right: margin },
      styles: { fontSize: 9 },
      headStyles: { fillColor: [100, 120, 140] },
      columnStyles: {
        0: { cellWidth: 35 },
        1: { cellWidth: 25, halign: 'center' },
        2: { cellWidth: 'auto' },
      },
    });
  }

  // Footer
  const pageCount = doc.internal.pages.length - 1;
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(128, 128, 128);
    doc.text(
      `Generated ${format(new Date(), 'd MMM yyyy')} • Page ${i} of ${pageCount}`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
    doc.setTextColor(0, 0, 0);
  }

  return doc;
}
