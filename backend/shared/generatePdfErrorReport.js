const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

const generateErrorReportPDF = async (errors) => {
  try {
    if (!Array.isArray(errors)) {
      throw new TypeError('Expected an array of errors');
    }

    const pdfDoc = await PDFDocument.create();
    let page = pdfDoc.addPage([600, 800]);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 12;

    const marginTop = 50;
    const marginLeft = 50;
    const marginBottom = 50;
    const maxLineWidth = 450; // Maximum width for text lines
    const lineSpacing = 16;
    let y = page.getHeight() - marginTop;

    const wrapText = (text, maxWidth, font, fontSize) => {
      let lines = [];
      let currentLine = '';

      for (let i = 0; i < text.length; i++) {
        const testLine = currentLine + text[i];
        const testWidth = font.widthOfTextAtSize(testLine, fontSize);

        if (testWidth > maxWidth) {
          lines.push(currentLine);
          currentLine = text[i];
        } else {
          currentLine = testLine;
        }
      }

      lines.push(currentLine);
      return lines;
    };

    const drawText = (text, x, y, size, color, font, page) => {
      const wrappedLines = wrapText(text, maxLineWidth, font, size);
      wrappedLines.forEach((line) => {
        if (y - size < marginBottom) {
          page = pdfDoc.addPage([600, 800]);
          y = page.getHeight() - marginTop;
        }
        page.drawText(line, { x, y, size, color, font });
        y -= lineSpacing;
      });
      return { y, page };
    };

    const drawHeader = (text, x, y, size, color, font, page) => {
      if (y - size < marginBottom) {
        page = pdfDoc.addPage([600, 800]);
        y = page.getHeight() - marginTop;
      }
      page.drawText(text, { x, y, size, color, font });
      y -= lineSpacing;
      return { y, page };
    };

    let drawResult = drawHeader(
      'UBL Validation Error Report',
      marginLeft,
      y,
      20,
      rgb(0, 0, 0),
      font,
      page
    );
    y = drawResult.y - 30; // Adjust spacing after the title
    page = drawResult.page;

    for (const [index, error] of errors.entries()) {
      const errorHeader = `Error ${index + 1}:`;
      const errorDetails = `
ID: ${error.id}
Description: ${error.text}
Test: ${error.test}
Location: ${error.location}
Flag: ${error.flag}
Status: ${error.flag === 'fatal' ? 'Failed' : 'Passed'}
      `;

      drawResult = drawHeader(
        errorHeader,
        marginLeft,
        y,
        fontSize,
        rgb(0, 0, 0),
        font,
        page
      );
      y = drawResult.y;
      page = drawResult.page;

      for (const line of errorDetails.split('\n')) {
        drawResult = drawText(
          line.trim(),
          marginLeft,
          y,
          fontSize,
          rgb(0, 0, 0),
          font,
          page
        );
        y = drawResult.y;
        page = drawResult.page;
      }

      y -= lineSpacing; // Additional space between errors
    }

    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  } catch (err) {
    console.error('Error generating PDF:', err);
    throw new Error('Error generating PDF');
  }
};

module.exports = generateErrorReportPDF;
