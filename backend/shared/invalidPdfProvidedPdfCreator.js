const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

const invalidPdfProvidedPdfCreator = async () => {
  try {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontSize = 20;

    const text = 'INVALID PDF PROVIDED';

    // Center the text on the page
    const textWidth = font.widthOfTextAtSize(text, fontSize);
    const textX = (page.getWidth() - textWidth) / 2;
    const textY = (page.getHeight() - fontSize) / 2;

    page.drawText(text, {
      x: textX,
      y: textY,
      size: fontSize,
      font: font,
      color: rgb(1, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
  } catch (err) {
    console.error('Error generating invalid PDF:', err);
    return null;
  }
};

module.exports = invalidPdfProvidedPdfCreator;
