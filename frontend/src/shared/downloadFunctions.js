import jsPDF from 'jspdf';

// Function to download email data as a JSON file
export const downloadJSON = (email) => {
  const json = JSON.stringify(email, null, 2); // Convert email object to JSON string
  const blob = new Blob([json], { type: 'application/json' }); // Create a Blob with the JSON data
  const link = document.createElement('a'); // Create a link element
  link.href = URL.createObjectURL(blob); // Create an object URL for the Blob
  link.download = `${email.subject}.json`; // Set the download attribute with the email subject
  link.click(); // Programmatically click the link to trigger the download
};

// Function to download email data as an HTML file
export const downloadHTML = (email) => {
  // HTML content with email details
  const htmlContent = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            margin: 0;
            padding: 20px;
          }
          .email-container {
            max-width: 80vw;
            margin: 0 auto;
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          }
          .header {
            border-bottom: 2px solid #651fff;
            padding-bottom: 10px;
            margin-bottom: 20px;
          }
          .header h1 {
            margin: 0;
            color: #651fff;
          }
          .content p {
            line-height: 1.6;
          }
          .footer {
            margin-top: 20px;
            text-align: center;
            color: #777;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <h1>${email.subject}</h1>
          </div>
          <div class="content">
            <p><strong>Email:</strong> ${email.email}</p>
            <p><strong>Process:</strong> ${email.process}</p>
            <p><strong>Date:</strong> ${new Date(email.date).toLocaleString()}</p>
            <p><strong>Body:</strong> ${email.body}</p>
            <p><strong>File Types:</strong> ${email.fileTypes.join(', ')}</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} HexaHunks. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
  const blob = new Blob([htmlContent], { type: 'text/html' }); // Create a Blob with the HTML data
  const link = document.createElement('a'); // Create a link element
  link.href = URL.createObjectURL(blob); // Create an object URL for the Blob
  link.download = `${email.subject}.html`; // Set the download attribute with the email subject
  link.click(); // Programmatically click the link to trigger the download
};

// Function to download email data as a PDF file
export const downloadPDF = (email) => {
  const doc = new jsPDF(); // Create a new jsPDF instance
  const pageWidth = doc.internal.pageSize.getWidth(); // Get the page width
  const margin = 10; // Set a margin
  const maxLineWidth = pageWidth - 2 * margin; // Calculate the maximum line width
  let cursorY = 20; // Set the initial cursor position

  doc.setFontSize(18); // Set font size for the subject
  const subjectText = doc.splitTextToSize(email.subject, maxLineWidth); // Split the subject text to fit within the line width
  doc.text(subjectText, margin, cursorY); // Add the subject text to the PDF
  cursorY += doc.getTextDimensions(subjectText).h + 10; // Update the cursor position

  doc.setFontSize(12); // Set font size for the rest of the text

  // Add the email details to the PDF, updating the cursor position each time
  const emailText = doc.splitTextToSize(`Email: ${email.email}`, maxLineWidth);
  doc.text(emailText, margin, cursorY);
  cursorY += doc.getTextDimensions(emailText).h + 10;

  const processText = doc.splitTextToSize(
    `Process: ${email.process}`,
    maxLineWidth
  );
  doc.text(processText, margin, cursorY);
  cursorY += doc.getTextDimensions(processText).h + 10;

  const dateText = doc.splitTextToSize(
    `Date: ${new Date(email.date).toLocaleString()}`,
    maxLineWidth
  );
  doc.text(dateText, margin, cursorY);
  cursorY += doc.getTextDimensions(dateText).h + 10;

  const bodyText = doc.splitTextToSize(`Body: ${email.body}`, maxLineWidth);
  doc.text(bodyText, margin, cursorY);
  cursorY += doc.getTextDimensions(bodyText).h + 10;

  const fileTypesText = doc.splitTextToSize(
    `File Types: ${email.fileTypes.join(', ')}`,
    maxLineWidth
  );
  doc.text(fileTypesText, margin, cursorY);
  cursorY += doc.getTextDimensions(fileTypesText).h + 10;

  doc.save(`${email.subject}.pdf`); // Save the PDF with the email subject as the file name
};
