const generateHtml = (validationErrors = [], selfFilledIssue = []) => {
  try {
    let errorCards = '';
    if (validationErrors.length > 0) {
      errorCards = validationErrors
        .map(
          (error) => `
          <div class="error-card">
            <h3>Error ID: ${error.id}</h3>
            <p><strong>Description:</strong> ${error.text}</p>
            <p><strong>Location:</strong> ${error.location}</p>
            <p><strong>Test:</strong> ${error.test}</p>
            <p><strong>Flag:</strong> ${error.flag}</p>
          </div>
        `
        )
        .join('');
    } else if (selfFilledIssue.length === 0 && validationErrors.length === 0) {
      errorCards = `
        <div class="no-errors">
          <p style="text-align: center; color: green; font-weight: bold;">No errors were detected</p>
        </div>
      `;
    }

    const additionalInfo =
      selfFilledIssue.length > 0
        ? `
          <h2>IMP: THESE WERE AUTO FILLED TO DEFAULT TO GENERATE A VALID UBL</h2>
          <ul>
            ${selfFilledIssue
              .map(
                (str) => `
                  <li>${str}</li>
                `
              )
              .join('')}
          </ul>
        `
        : '';

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Invoice Errors</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            color: #333;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          h1, h2 {
            color: #000;
            text-align: center;
          }
          .container {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            max-width: 80vw;
            width: 100%;
            margin: 0 auto;
            box-sizing: border-box;
          }
          .error-card {
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            padding: 20px;
            margin-bottom: 20px;
            border-left: 5px solid red;
            word-wrap: break-word;
            max-width: 100%;
          }
          .error-card.fatal {
            border-left-color: red;
            background-color: #ffe6e6;
          }
          .error-card.warning {
            border-left-color: orange;
            background-color: #fff4e6;
          }
          .error-card h3 {
            margin-top: 0;
            color: #651FFF;
          }
          .error-card p {
            margin: 5px 0;
          }
          ul {
            list-style-type: none;
            padding: 0;
          }
          li {
            background-color: #f9f9f9;
            margin: 5px 0;
            padding: 10px;
            border-radius: 5px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }
          .no-errors {
            text-align: center;
            color: green;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Invoice Errors</h1>
          <div class="errors">
            ${errorCards}
          </div>
          ${additionalInfo}
        </div>
      </body>
      </html>
    `;
  } catch (error) {
    throw new Error('Error generating HTML:', error);
  }
};

module.exports = { generateHtml };
