
import jsPDF from 'jspdf';

interface Feature {
  id: string;
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Must Have' | 'Should Have' | 'Nice to Have';
}

interface PRDState {
  title: string;
  author: string;
  date: string;
  version: string;
  sections: {
    [key: string]: string;
  };
  features: Feature[];
}

export const exportToPDF = (prdState: PRDState, templateSections: any[]) => {
  // Create a new PDF document
  const doc = new jsPDF();
  let yPosition = 20;
  
  // Add the title
  doc.setFontSize(24);
  doc.text(prdState.title, 15, yPosition);
  yPosition += 15;

  // Add metadata
  doc.setFontSize(12);
  doc.text(`Author: ${prdState.author}`, 15, yPosition);
  yPosition += 8;
  doc.text(`Date: ${prdState.date}`, 15, yPosition);
  yPosition += 8;
  doc.text(`Version: ${prdState.version}`, 15, yPosition);
  yPosition += 15;

  // Add each section
  doc.setFontSize(16);
  templateSections.forEach(section => {
    // Add section title
    doc.setFont(undefined, 'bold');
    doc.text(section.title, 15, yPosition);
    yPosition += 10;
    
    // Add section content
    doc.setFont(undefined, 'normal');
    doc.setFontSize(12);
    
    // Split text to fit on page and handle page breaks
    const sectionContent = prdState.sections[section.id] || 'No content provided.';
    const splitText = doc.splitTextToSize(sectionContent, 180);
    
    // Check if adding this text would exceed page height, if so add a new page
    if (yPosition + splitText.length * 7 > 280) {
      doc.addPage();
      yPosition = 20;
    }
    
    doc.text(splitText, 15, yPosition);
    yPosition += splitText.length * 7 + 15;
    
    // Set font size back to heading size for next section
    doc.setFontSize(16);
  });

  // Add Features section
  if (prdState.features.length > 0) {
    // Add new page for features if we're close to bottom of page
    if (yPosition > 230) {
      doc.addPage();
      yPosition = 20;
    }
    
    doc.setFont(undefined, 'bold');
    doc.text('Feature List', 15, yPosition);
    yPosition += 10;
    
    // Add each feature
    doc.setFontSize(14);
    prdState.features.forEach(feature => {
      // Check if adding this feature would exceed page height
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.setFont(undefined, 'bold');
      doc.text(feature.title, 15, yPosition);
      yPosition += 8;
      
      doc.setFont(undefined, 'normal');
      doc.setFontSize(12);
      
      doc.text(`Priority: ${feature.priority}`, 15, yPosition);
      yPosition += 6;
      doc.text(`Status: ${feature.status}`, 15, yPosition);
      yPosition += 8;
      
      // Add feature description
      const descText = feature.description || 'No description provided.';
      const splitDesc = doc.splitTextToSize(descText, 180);
      
      // Check if adding this text would exceed page height
      if (yPosition + splitDesc.length * 7 > 280) {
        doc.addPage();
        yPosition = 20;
      }
      
      doc.text(splitDesc, 15, yPosition);
      yPosition += splitDesc.length * 7 + 10;
      
      // Restore font size for next feature title
      doc.setFontSize(14);
    });
  }

  // Save the PDF
  doc.save(`${prdState.title.replace(/\s+/g, '-').toLowerCase()}-prd.pdf`);
};
