
export const createMarkdownContent = (prdState: any, templateSections: any[]) => {
  // Create formatted content for download
  let content = `# ${prdState.title}\n\n`;
  content += `**Author:** ${prdState.author}\n`;
  content += `**Date:** ${prdState.date}\n`;
  content += `**Version:** ${prdState.version}\n\n`;

  // Add sections
  templateSections.forEach(section => {
    content += `## ${section.title}\n\n`;
    content += `${prdState.sections[section.id] || 'No content provided.'}\n\n`;
  });

  // Add features
  content += `## Feature List\n\n`;
  if (prdState.features.length > 0) {
    prdState.features.forEach(feature => {
      content += `### ${feature.title}\n\n`;
      content += `**Priority:** ${feature.priority}\n`;
      content += `**Status:** ${feature.status}\n\n`;
      content += `${feature.description || 'No description provided.'}\n\n`;
    });
  } else {
    content += "No features defined.\n\n";
  }

  return content;
};

export const downloadMarkdown = (content: string, filename: string) => {
  const element = document.createElement('a');
  const file = new Blob([content], {type: 'text/markdown'});
  element.href = URL.createObjectURL(file);
  element.download = filename;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};
