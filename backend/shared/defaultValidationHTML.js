const defaultHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Error Report</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f9f9f9;
      color: #333;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .container {
      background-color: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      text-align: center;
    }
    h1 {
      color: #651FFF;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Error</h1>
    <p>Error generating report</p>
  </div>
</body>
</html>
`;

module.exports = { defaultHtml };
