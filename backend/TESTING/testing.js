const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { create } = require('xmlbuilder2');

// Veryfi API credentials
const client_id = 'vrfCmSwXe2kGXlHaG85J5eNk0jfIxo8i0MBHapY';
const client_secret =
  'KARbwyHiyt4IbHhUkr2njcctUxBbrJgB6Uuw64a11ReCi1TPLT1MrpGpYoaJK8XzHW1ihiaU2pPXv2XSKFn7oJGcsPUsW85Cm8j3GHSbULgH8Nv01aoe09w2kkbWsf7i';
const username = 'z5394767';
const api_key = '8ccdbf65bdf579e001b3529d71b429dc';

// The endpoint URL for uploading documents
const url = 'https://api.veryfi.com/api/v7/partner/documents/';

// The PDF file to convert
const pdfFilePath = path.resolve(__dirname, 'Invoice_BIG.pdf');

// Read the PDF file
const pdfFile = fs.createReadStream(pdfFilePath);

// Headers
const headers = {
  Accept: 'application/json',
  'CLIENT-ID': client_id,
  AUTHORIZATION: `apikey ${username}:${api_key}`,
  'X-Veryfi-Client-Id': client_id,
  'X-Veryfi-Client-Secret': client_secret,
};

// Form data
const FormData = require('form-data');
const formData = new FormData();
formData.append('file', pdfFile);

// Include headers from formData in the request
const formHeaders = formData.getHeaders();

async function uploadInvoice() {
  try {
    const response = await axios.post(url, formData, {
      headers: { ...headers, ...formHeaders },
    });
    console.log('Conversion successful!');
    return response.data; // This will be the JSON representation of your invoice
  } catch (error) {
    console.error('Failed to convert PDF to JSON:', error.response.status);
    console.error(error.response.data);
    return null;
  }
}

// Function to convert JSON to UBL XML
function createUblInvoice(json) {
  if (!json) {
    console.error('No JSON data provided');
    return;
  }

  const doc = create({ version: '1.0', encoding: 'UTF-8' })
    .ele('Invoice', {
      xmlns: 'urn:oasis:names:specification:ubl:schema:xsd:Invoice-2',
      'xmlns:cac':
        'urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2',
      'xmlns:cbc':
        'urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2',
    })
    .ele('cbc:ProfileID')
    .txt('urn:fdc:peppol.eu:2017:poacc:billing:01:1.0')
    .up() // Business process MUST be provided
    .ele('cbc:CustomizationID')
    .txt(
      'urn:cen.eu:en16931:2017#conformant#urn:fdc:peppol.eu:2017:poacc:billing:international:aunz:3.0'
    )
    .up() // Specification identifier
    .ele('cbc:ID')
    .txt(json.invoice_number || 'Unknown')
    .up()
    .ele('cbc:IssueDate')
    .txt(json.date ? json.date.split(' ')[0] : 'Unknown')
    .up()
    .ele('cbc:DueDate')
    .txt(json.due_date || 'Unknown')
    .up()
    .ele('cbc:InvoiceTypeCode')
    .txt('380')
    .up() // Invoice type code
    .ele('cbc:DocumentCurrencyCode')
    .txt('AUD')
    .up() // Currency code

    // Supplier information
    .ele('cac:AccountingSupplierParty')
    .ele('cac:Party')
    .ele('cbc:EndpointID', { schemeID: '0088' })
    .txt('1234567890128')
    .up() // Valid GLN for supplier
    .ele('cac:PartyIdentification')
    .ele('cbc:ID')
    .txt('SupplierID')
    .up()
    .up()
    .ele('cac:PartyName')
    .ele('cbc:Name')
    .txt(json.vendor && json.vendor.name ? json.vendor.name : 'Unknown')
    .up()
    .up()
    .ele('cac:PostalAddress')
    .ele('cbc:StreetName')
    .txt(
      json.vendor && json.vendor.address
        ? json.vendor.address.replace(/\n/g, ', ')
        : 'Unknown'
    )
    .up()
    .up()
    .ele('cac:PartyTaxScheme')
    .ele('cbc:CompanyID')
    .txt(
      json.vendor && json.vendor.vat_number ? json.vendor.vat_number : 'Unknown'
    )
    .up()
    .ele('cac:TaxScheme')
    .ele('cbc:ID')
    .txt('VAT')
    .up()
    .up()
    .up()
    .ele('cac:PartyLegalEntity')
    .ele('cbc:RegistrationName')
    .txt(json.vendor && json.vendor.name ? json.vendor.name : 'Unknown')
    .up()
    .ele('cbc:CompanyID')
    .txt(
      json.vendor && json.vendor.company_id ? json.vendor.company_id : 'Unknown'
    )
    .up()
    .up()
    .up()
    .up()

    // Customer information
    .ele('cac:AccountingCustomerParty')
    .ele('cac:Party')
    .ele('cbc:EndpointID', { schemeID: '0088' })
    .txt('9876543210128')
    .up() // Valid GLN for customer
    .ele('cac:PartyIdentification')
    .ele('cbc:ID')
    .txt('CustomerID')
    .up()
    .up()
    .ele('cac:PartyName')
    .ele('cbc:Name')
    .txt(json.bill_to_name || 'Unknown')
    .up()
    .up()
    .ele('cac:PostalAddress')
    .ele('cbc:StreetName')
    .txt(
      json.bill_to_address
        ? json.bill_to_address.replace(/\n/g, ', ')
        : 'Unknown'
    )
    .up()
    .up()
    .ele('cac:PartyTaxScheme')
    .ele('cbc:CompanyID')
    .txt(json.bill_to_vat_number || 'Unknown')
    .up()
    .ele('cac:TaxScheme')
    .ele('cbc:ID')
    .txt('VAT')
    .up()
    .up()
    .up()
    .ele('cac:PartyLegalEntity')
    .ele('cbc:RegistrationName')
    .txt(json.bill_to_name || 'Unknown')
    .up()
    .ele('cbc:CompanyID')
    .txt(json.bill_to_company_id || 'Unknown')
    .up()
    .up()
    .up()
    .up()

    // Order reference
    .ele('cac:OrderReference')
    .ele('cbc:ID')
    .txt(json.purchase_order_number || 'Unknown')
    .up()
    .up()

    // Monetary totals
    .ele('cac:LegalMonetaryTotal')
    .ele('cbc:LineExtensionAmount', { currencyID: 'AUD' })
    .txt(json.subtotal || 0)
    .up()
    .ele('cbc:TaxExclusiveAmount', { currencyID: 'AUD' })
    .txt(json.tax || 0)
    .up()
    .ele('cbc:TaxInclusiveAmount', { currencyID: 'AUD' })
    .txt(json.total || 0)
    .up()
    .ele('cbc:PayableAmount', { currencyID: 'AUD' })
    .txt(json.total || 0)
    .up()
    .up();

  // Tax total
  doc
    .ele('cac:TaxTotal')
    .ele('cbc:TaxAmount', { currencyID: 'AUD' })
    .txt(json.tax || 0)
    .up()
    .ele('cac:TaxSubtotal')
    .ele('cbc:TaxableAmount', { currencyID: 'AUD' })
    .txt(json.subtotal || 0)
    .up()
    .ele('cbc:TaxAmount', { currencyID: 'AUD' })
    .txt(json.tax || 0)
    .up()
    .ele('cac:TaxCategory')
    .ele('cbc:ID')
    .txt('S')
    .up()
    .ele('cbc:Percent')
    .txt(10)
    .up()
    .ele('cac:TaxScheme')
    .ele('cbc:ID')
    .txt('GST')
    .up()
    .up()
    .up()
    .up();

  // Line items
  (json.line_items || []).forEach((item, index) => {
    doc
      .ele('cac:InvoiceLine')
      .ele('cbc:ID')
      .txt(item.id || index + 1)
      .up()
      .ele('cbc:InvoicedQuantity', { unitCode: 'EA' })
      .txt(item.quantity || 0)
      .up()
      .ele('cbc:LineExtensionAmount', { currencyID: 'AUD' })
      .txt(item.total || 0)
      .up()
      .ele('cac:Item')
      .ele('cbc:Description')
      .txt(item.description || 'Unknown')
      .up()
      .up()
      .ele('cac:Price')
      .ele('cbc:PriceAmount', { currencyID: 'AUD' })
      .txt(item.price || 0)
      .up()
      .up()
      .up();
  });

  const xml = doc.end({ prettyPrint: true });
  return xml;
}

(async () => {
  const jsonData = await uploadInvoice();
  const ublInvoice = createUblInvoice(jsonData);
  console.log(ublInvoice);

  // Save the XML to a file
  if (ublInvoice) {
    fs.writeFileSync('invoice.xml', ublInvoice);
  }
})();

//
//
//
//
//
//
//
// // Form data
// const FormData = require('form-data');
// const formData = new FormData();
// formData.append('file', pdfFile);

// // Include headers from formData in the request
// const formHeaders = formData.getHeaders();

// async function uploadInvoice() {
//   try {
//     const response = await axios.post(url, formData, {
//       headers: { ...headers, ...formHeaders },
//     });
//     console.log('Conversion successful!');
//     return response.data; // This will be the JSON representation of your invoice
//   } catch (error) {
//     console.error('Failed to convert PDF to JSON:', error.response.status);
//     console.error(error.response.data);
//     return null;
//   }
// }

// // Function to convert JSON to UBL XML
// function createUblInvoice(json) {
//   if (!json) {
//     console.error('No JSON data provided');
//     return;
//   }

//   const doc = create({ version: '1.0', encoding: 'UTF-8' })
//     .ele('Invoice', {
//       xmlns: 'urn:oasis:names:specification:ubl:schema:xsd:Invoice-2',
//       'xmlns:cac':
//         'urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2',
//       'xmlns:cbc':
//         'urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2',
//     })
//     .ele('cbc:ProfileID')
//     .txt('urn:fdc:peppol.eu:2017:poacc:billing:01:1.0')
//     .up() // Business process MUST be provided
//     .ele('cbc:CustomizationID')
//     .txt(
//       'urn:cen.eu:en16931:2017#conformant#urn:fdc:peppol.eu:2017:poacc:billing:international:aunz:3.0'
//     )
//     .up() // Specification identifier
//     .ele('cbc:ID')
//     .txt(json.invoice_number || 'Unknown')
//     .up()
//     .ele('cbc:IssueDate')
//     .txt(json.date ? json.date.split(' ')[0] : 'Unknown')
//     .up()
//     .ele('cbc:DueDate')
//     .txt(json.due_date || 'Unknown')
//     .up()
//     .ele('cbc:InvoiceTypeCode')
//     .txt('380')
//     .up() // Invoice type code
//     .ele('cbc:DocumentCurrencyCode')
//     .txt('AUD')
//     .up() // Currency code

//     // Supplier information
//     .ele('cac:AccountingSupplierParty')
//     .ele('cac:Party')
//     .ele('cbc:EndpointID', { schemeID: '0088' })
//     .txt('1234567890123')
//     .up() // Valid GLN for supplier
//     .ele('cac:PartyIdentification')
//     .ele('cbc:ID')
//     .txt('SupplierID')
//     .up()
//     .up()
//     .ele('cac:PartyName')
//     .ele('cbc:Name')
//     .txt(json.vendor && json.vendor.name ? json.vendor.name : 'Unknown')
//     .up()
//     .up()
//     .ele('cac:PostalAddress')
//     .ele('cbc:StreetName')
//     .txt(
//       json.vendor && json.vendor.address
//         ? json.vendor.address.replace(/\n/g, ', ')
//         : 'Unknown'
//     )
//     .up()
//     .up()
//     .ele('cac:PartyTaxScheme')
//     .ele('cbc:CompanyID')
//     .txt(
//       json.vendor && json.vendor.vat_number ? json.vendor.vat_number : 'Unknown'
//     )
//     .up()
//     .ele('cac:TaxScheme')
//     .ele('cbc:ID')
//     .txt('VAT')
//     .up()
//     .up()
//     .up()
//     .ele('cac:PartyLegalEntity')
//     .ele('cbc:RegistrationName')
//     .txt(json.vendor && json.vendor.name ? json.vendor.name : 'Unknown')
//     .up()
//     .ele('cbc:CompanyID')
//     .txt(
//       json.vendor && json.vendor.company_id ? json.vendor.company_id : 'Unknown'
//     )
//     .up()
//     .up()
//     .up()
//     .up()

//     // Customer information
//     .ele('cac:AccountingCustomerParty')
//     .ele('cac:Party')
//     .ele('cbc:EndpointID', { schemeID: '0088' })
//     .txt('9876543210987')
//     .up() // Valid GLN for customer
//     .ele('cac:PartyIdentification')
//     .ele('cbc:ID')
//     .txt('CustomerID')
//     .up()
//     .up()
//     .ele('cac:PartyName')
//     .ele('cbc:Name')
//     .txt(json.bill_to_name || 'Unknown')
//     .up()
//     .up()
//     .ele('cac:PostalAddress')
//     .ele('cbc:StreetName')
//     .txt(
//       json.bill_to_address
//         ? json.bill_to_address.replace(/\n/g, ', ')
//         : 'Unknown'
//     )
//     .up()
//     .up()
//     .ele('cac:PartyTaxScheme')
//     .ele('cbc:CompanyID')
//     .txt(json.bill_to_vat_number || 'Unknown')
//     .up()
//     .ele('cac:TaxScheme')
//     .ele('cbc:ID')
//     .txt('VAT')
//     .up()
//     .up()
//     .up()
//     .ele('cac:PartyLegalEntity')
//     .ele('cbc:RegistrationName')
//     .txt(json.bill_to_name || 'Unknown')
//     .up()
//     .ele('cbc:CompanyID')
//     .txt(json.bill_to_company_id || 'Unknown')
//     .up()
//     .up()
//     .up()
//     .up()

//     // Order reference
//     .ele('cac:OrderReference')
//     .ele('cbc:ID')
//     .txt(json.purchase_order_number || 'Unknown')
//     .up()
//     .up()

//     // Monetary totals
//     .ele('cac:LegalMonetaryTotal')
//     .ele('cbc:LineExtensionAmount', { currencyID: 'AUD' })
//     .txt(json.subtotal || 0)
//     .up()
//     .ele('cbc:TaxExclusiveAmount', { currencyID: 'AUD' })
//     .txt(json.tax || 0)
//     .up()
//     .ele('cbc:TaxInclusiveAmount', { currencyID: 'AUD' })
//     .txt(json.total || 0)
//     .up()
//     .ele('cbc:PayableAmount', { currencyID: 'AUD' })
//     .txt(json.total || 0)
//     .up()
//     .up();

//   // Tax total
//   doc
//     .ele('cac:TaxTotal')
//     .ele('cbc:TaxAmount', { currencyID: 'AUD' })
//     .txt(json.tax || 0)
//     .up()
//     .ele('cac:TaxSubtotal')
//     .ele('cbc:TaxableAmount', { currencyID: 'AUD' })
//     .txt(json.subtotal || 0)
//     .up()
//     .ele('cbc:TaxAmount', { currencyID: 'AUD' })
//     .txt(json.tax || 0)
//     .up()
//     .ele('cac:TaxCategory')
//     .ele('cbc:ID')
//     .txt('S')
//     .up()
//     .ele('cbc:Percent')
//     .txt(10)
//     .up()
//     .ele('cac:TaxScheme')
//     .ele('cbc:ID')
//     .txt('GST')
//     .up()
//     .up()
//     .up()
//     .up();

//   // Line items
//   (json.line_items || []).forEach((item, index) => {
//     doc
//       .ele('cac:InvoiceLine')
//       .ele('cbc:ID')
//       .txt(item.id || index + 1)
//       .up()
//       .ele('cbc:InvoicedQuantity', { unitCode: 'EA' })
//       .txt(item.quantity || 0)
//       .up()
//       .ele('cbc:LineExtensionAmount', { currencyID: 'AUD' })
//       .txt(item.total || 0)
//       .up()
//       .ele('cac:Item')
//       .ele('cbc:Description')
//       .txt(item.description || 'Unknown')
//       .up()
//       .up()
//       .ele('cac:Price')
//       .ele('cbc:PriceAmount', { currencyID: 'AUD' })
//       .txt(item.price || 0)
//       .up()
//       .up()
//       .up();
//   });

//   const xml = doc.end({ prettyPrint: true });
//   return xml;
// }

// (async () => {
//   const jsonData = await uploadInvoice();
//   const ublInvoice = createUblInvoice(jsonData);
//   console.log(ublInvoice);

//   // Save the XML to a file
//   if (ublInvoice) {
//     fs.writeFileSync('invoice.xml', ublInvoice);
//   }
// })();

// // // // // // hihihihihih;
// // // // // // // // Form data
// // // // // // // const FormData = require('form-data');
// // // // // // // const formData = new FormData();
// // // // // // // formData.append('file', pdfFile);

// // // // // // // // Include headers from formData in the request
// // // // // // // const formHeaders = formData.getHeaders();

// // // // // // // async function uploadInvoice() {
// // // // // // //   try {
// // // // // // //     const response = await axios.post(url, formData, {
// // // // // // //       headers: { ...headers, ...formHeaders },
// // // // // // //     });
// // // // // // //     console.log('Conversion successful!');
// // // // // // //     return response.data; // This will be the JSON representation of your invoice
// // // // // // //   } catch (error) {
// // // // // // //     console.error('Failed to convert PDF to JSON:', error.response.status);
// // // // // // //     console.error(error.response.data);
// // // // // // //   }
// // // // // // // }

// // // // // // // const jsonData = uploadInvoice();

// // // // // // // // Function to convert JSON to UBL XML
// // // // // // // function createUblInvoice(json) {
// // // // // // //   const doc = create({ version: '1.0', encoding: 'UTF-8' })
// // // // // // //     .ele('Invoice', {
// // // // // // //       xmlns: 'urn:oasis:names:specification:ubl:schema:xsd:Invoice-2',
// // // // // // //       'xmlns:cac':
// // // // // // //         'urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2',
// // // // // // //       'xmlns:cbc':
// // // // // // //         'urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2',
// // // // // // //     })
// // // // // // //     .ele('cbc:ID')
// // // // // // //     .txt(json.invoice_number)
// // // // // // //     .up()
// // // // // // //     .ele('cbc:IssueDate')
// // // // // // //     .txt(json.date.split(' ')[0])
// // // // // // //     .up()
// // // // // // //     .ele('cbc:DueDate')
// // // // // // //     .txt(json.due_date)
// // // // // // //     .up()
// // // // // // //     .ele('cac:AccountingSupplierParty')
// // // // // // //     .ele('cac:Party')
// // // // // // //     .ele('cac:PartyName')
// // // // // // //     .ele('cbc:Name')
// // // // // // //     .txt(json.vendor.name)
// // // // // // //     .up()
// // // // // // //     .up()
// // // // // // //     .ele('cac:PostalAddress')
// // // // // // //     .ele('cbc:StreetName')
// // // // // // //     .txt(json.vendor.address.replace(/\n/g, ', '))
// // // // // // //     .up()
// // // // // // //     .up()
// // // // // // //     .up()
// // // // // // //     .up()
// // // // // // //     .ele('cac:AccountingCustomerParty')
// // // // // // //     .ele('cac:Party')
// // // // // // //     .ele('cac:PartyName')
// // // // // // //     .ele('cbc:Name')
// // // // // // //     .txt(json.bill_to_name)
// // // // // // //     .up()
// // // // // // //     .up()
// // // // // // //     .ele('cac:PostalAddress')
// // // // // // //     .ele('cbc:StreetName')
// // // // // // //     .txt(json.bill_to_address.replace(/\n/g, ', '))
// // // // // // //     .up()
// // // // // // //     .up()
// // // // // // //     .up()
// // // // // // //     .up()
// // // // // // //     .ele('cac:LegalMonetaryTotal')
// // // // // // //     .ele('cbc:LineExtensionAmount', { currencyID: 'AUD' })
// // // // // // //     .txt(json.subtotal)
// // // // // // //     .up()
// // // // // // //     .ele('cbc:TaxExclusiveAmount', { currencyID: 'AUD' })
// // // // // // //     .txt(json.tax)
// // // // // // //     .up()
// // // // // // //     .ele('cbc:TaxInclusiveAmount', { currencyID: 'AUD' })
// // // // // // //     .txt(json.total)
// // // // // // //     .up()
// // // // // // //     .ele('cbc:PayableAmount', { currencyID: 'AUD' })
// // // // // // //     .txt(json.total)
// // // // // // //     .up()
// // // // // // //     .up();

// // // // // // //   json.line_items.forEach((item) => {
// // // // // // //     doc
// // // // // // //       .ele('cac:InvoiceLine')
// // // // // // //       .ele('cbc:ID')
// // // // // // //       .txt(item.id || 1)
// // // // // // //       .up()
// // // // // // //       .ele('cbc:InvoicedQuantity', { unitCode: 'EA' })
// // // // // // //       .txt(item.quantity)
// // // // // // //       .up()
// // // // // // //       .ele('cbc:LineExtensionAmount', { currencyID: 'AUD' })
// // // // // // //       .txt(item.total)
// // // // // // //       .up()
// // // // // // //       .ele('cac:Item')
// // // // // // //       .ele('cbc:Description')
// // // // // // //       .txt(item.description)
// // // // // // //       .up()
// // // // // // //       .up()
// // // // // // //       .ele('cac:Price')
// // // // // // //       .ele('cbc:PriceAmount', { currencyID: 'AUD' })
// // // // // // //       .txt(item.price)
// // // // // // //       .up()
// // // // // // //       .up()
// // // // // // //       .up();
// // // // // // //   });

// // // // // // //   const xml = doc.end({ prettyPrint: true });
// // // // // // //   return xml;
// // // // // // // }

// // // // // // // const ublInvoice = createUblInvoice(jsonData);
// // // // // // // console.log(ublInvoice);

// // // // // // // // Save the XML to a file
// // // // // // // fs.writeFileSync('invoice.xml', ublInvoice);

// // // // // // Form data
// // // // // const FormData = require('form-data');
// // // // // const formData = new FormData();
// // // // // formData.append('file', pdfFile);

// // // // // // Include headers from formData in the request
// // // // // const formHeaders = formData.getHeaders();

// // // // // async function uploadInvoice() {
// // // // //   try {
// // // // //     const response = await axios.post(url, formData, {
// // // // //       headers: { ...headers, ...formHeaders },
// // // // //     });
// // // // //     console.log('Conversion successful!');
// // // // //     return response.data; // This will be the JSON representation of your invoice
// // // // //   } catch (error) {
// // // // //     console.error('Failed to convert PDF to JSON:', error.response.status);
// // // // //     console.error(error.response.data);
// // // // //     return null;
// // // // //   }
// // // // // }

// // // // // // Function to convert JSON to UBL XML
// // // // // function createUblInvoice(json) {
// // // // //   if (!json) {
// // // // //     console.error('No JSON data provided');
// // // // //     return;
// // // // //   }

// // // // //   const doc = create({ version: '1.0', encoding: 'UTF-8' })
// // // // //     .ele('Invoice', {
// // // // //       xmlns: 'urn:oasis:names:specification:ubl:schema:xsd:Invoice-2',
// // // // //       'xmlns:cac':
// // // // //         'urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2',
// // // // //       'xmlns:cbc':
// // // // //         'urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2',
// // // // //     })
// // // // //     .ele('cbc:ID')
// // // // //     .txt(json.invoice_number || 'Unknown')
// // // // //     .up()
// // // // //     .ele('cbc:IssueDate')
// // // // //     .txt(json.date ? json.date.split(' ')[0] : 'Unknown')
// // // // //     .up()
// // // // //     .ele('cbc:DueDate')
// // // // //     .txt(json.due_date || 'Unknown')
// // // // //     .up()
// // // // //     .ele('cac:AccountingSupplierParty')
// // // // //     .ele('cac:Party')
// // // // //     .ele('cac:PartyName')
// // // // //     .ele('cbc:Name')
// // // // //     .txt(json.vendor && json.vendor.name ? json.vendor.name : 'Unknown')
// // // // //     .up()
// // // // //     .up()
// // // // //     .ele('cac:PostalAddress')
// // // // //     .ele('cbc:StreetName')
// // // // //     .txt(
// // // // //       json.vendor && json.vendor.address
// // // // //         ? json.vendor.address.replace(/\n/g, ', ')
// // // // //         : 'Unknown'
// // // // //     )
// // // // //     .up()
// // // // //     .up()
// // // // //     .up()
// // // // //     .up()
// // // // //     .ele('cac:AccountingCustomerParty')
// // // // //     .ele('cac:Party')
// // // // //     .ele('cac:PartyName')
// // // // //     .ele('cbc:Name')
// // // // //     .txt(json.bill_to_name || 'Unknown')
// // // // //     .up()
// // // // //     .up()
// // // // //     .ele('cac:PostalAddress')
// // // // //     .ele('cbc:StreetName')
// // // // //     .txt(
// // // // //       json.bill_to_address
// // // // //         ? json.bill_to_address.replace(/\n/g, ', ')
// // // // //         : 'Unknown'
// // // // //     )
// // // // //     .up()
// // // // //     .up()
// // // // //     .up()
// // // // //     .up()
// // // // //     .ele('cac:LegalMonetaryTotal')
// // // // //     .ele('cbc:LineExtensionAmount', { currencyID: 'AUD' })
// // // // //     .txt(json.subtotal || 0)
// // // // //     .up()
// // // // //     .ele('cbc:TaxExclusiveAmount', { currencyID: 'AUD' })
// // // // //     .txt(json.tax || 0)
// // // // //     .up()
// // // // //     .ele('cbc:TaxInclusiveAmount', { currencyID: 'AUD' })
// // // // //     .txt(json.total || 0)
// // // // //     .up()
// // // // //     .ele('cbc:PayableAmount', { currencyID: 'AUD' })
// // // // //     .txt(json.total || 0)
// // // // //     .up()
// // // // //     .up();

// // // // //   (json.line_items || []).forEach((item, index) => {
// // // // //     doc
// // // // //       .ele('cac:InvoiceLine')
// // // // //       .ele('cbc:ID')
// // // // //       .txt(item.id || index + 1)
// // // // //       .up()
// // // // //       .ele('cbc:InvoicedQuantity', { unitCode: 'EA' })
// // // // //       .txt(item.quantity || 0)
// // // // //       .up()
// // // // //       .ele('cbc:LineExtensionAmount', { currencyID: 'AUD' })
// // // // //       .txt(item.total || 0)
// // // // //       .up()
// // // // //       .ele('cac:Item')
// // // // //       .ele('cbc:Description')
// // // // //       .txt(item.description || 'Unknown')
// // // // //       .up()
// // // // //       .up()
// // // // //       .ele('cac:Price')
// // // // //       .ele('cbc:PriceAmount', { currencyID: 'AUD' })
// // // // //       .txt(item.price || 0)
// // // // //       .up()
// // // // //       .up()
// // // // //       .up();
// // // // //   });

// // // // //   const xml = doc.end({ prettyPrint: true });
// // // // //   return xml;
// // // // // }

// // // // // (async () => {
// // // // //   const jsonData = await uploadInvoice();
// // // // //   const ublInvoice = createUblInvoice(jsonData);
// // // // //   console.log(ublInvoice);

// // // // //   // Save the XML to a file
// // // // //   if (ublInvoice) {
// // // // //     fs.writeFileSync('invoice.xml', ublInvoice);
// // // // //   }
// // // // // })();

// // // // // Form data
// // // // const FormData = require('form-data');
// // // // const formData = new FormData();
// // // // formData.append('file', pdfFile);

// // // // // Include headers from formData in the request
// // // // const formHeaders = formData.getHeaders();

// // // // async function uploadInvoice() {
// // // //   try {
// // // //     const response = await axios.post(url, formData, {
// // // //       headers: { ...headers, ...formHeaders },
// // // //     });
// // // //     console.log('Conversion successful!');
// // // //     return response.data; // This will be the JSON representation of your invoice
// // // //   } catch (error) {
// // // //     console.error('Failed to convert PDF to JSON:', error.response.status);
// // // //     console.error(error.response.data);
// // // //     return null;
// // // //   }
// // // // }

// // // // // Function to convert JSON to UBL XML
// // // // function createUblInvoice(json) {
// // // //   if (!json) {
// // // //     console.error('No JSON data provided');
// // // //     return;
// // // //   }

// // // //   const doc = create({ version: '1.0', encoding: 'UTF-8' })
// // // //     .ele('Invoice', {
// // // //       xmlns: 'urn:oasis:names:specification:ubl:schema:xsd:Invoice-2',
// // // //       'xmlns:cac':
// // // //         'urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2',
// // // //       'xmlns:cbc':
// // // //         'urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2',
// // // //     })
// // // //     .ele('cbc:ProfileID')
// // // //     .txt('urn:fdc:peppol.eu:2017:poacc:billing:01:1.0')
// // // //     .up() // Business process MUST be provided
// // // //     .ele('cbc:CustomizationID')
// // // //     .txt(
// // // //       'urn:cen.eu:en16931:2017#conformant#urn:fdc:peppol.eu:2017:poacc:billing:international:aunz:3.0'
// // // //     )
// // // //     .up() // Specification identifier
// // // //     .ele('cbc:ID')
// // // //     .txt(json.invoice_number || 'Unknown')
// // // //     .up()
// // // //     .ele('cbc:IssueDate')
// // // //     .txt(json.date ? json.date.split(' ')[0] : 'Unknown')
// // // //     .up()
// // // //     .ele('cbc:DueDate')
// // // //     .txt(json.due_date || 'Unknown')
// // // //     .up()
// // // //     .ele('cbc:InvoiceTypeCode')
// // // //     .txt('380')
// // // //     .up() // Invoice type code
// // // //     .ele('cbc:DocumentCurrencyCode')
// // // //     .txt('AUD')
// // // //     .up() // Currency code

// // // //     // Supplier information
// // // //     .ele('cac:AccountingSupplierParty')
// // // //     .ele('cac:Party')
// // // //     .ele('cbc:EndpointID', { schemeID: 'GLN' })
// // // //     .txt('supplier-electronic-address')
// // // //     .up() // Seller electronic address
// // // //     .ele('cac:PartyIdentification')
// // // //     .ele('cbc:ID')
// // // //     .txt('SupplierID')
// // // //     .up()
// // // //     .up()
// // // //     .ele('cac:PartyName')
// // // //     .ele('cbc:Name')
// // // //     .txt(json.vendor && json.vendor.name ? json.vendor.name : 'Unknown')
// // // //     .up()
// // // //     .up()
// // // //     .ele('cac:PostalAddress')
// // // //     .ele('cbc:StreetName')
// // // //     .txt(
// // // //       json.vendor && json.vendor.address
// // // //         ? json.vendor.address.replace(/\n/g, ', ')
// // // //         : 'Unknown'
// // // //     )
// // // //     .up()
// // // //     .up()
// // // //     .ele('cac:PartyTaxScheme')
// // // //     .ele('cbc:CompanyID')
// // // //     .txt(
// // // //       json.vendor && json.vendor.vat_number ? json.vendor.vat_number : 'Unknown'
// // // //     )
// // // //     .up()
// // // //     .ele('cac:TaxScheme')
// // // //     .ele('cbc:ID')
// // // //     .txt('VAT')
// // // //     .up()
// // // //     .up()
// // // //     .up()
// // // //     .ele('cac:PartyLegalEntity')
// // // //     .ele('cbc:RegistrationName')
// // // //     .txt(json.vendor && json.vendor.name ? json.vendor.name : 'Unknown')
// // // //     .up()
// // // //     .ele('cbc:CompanyID')
// // // //     .txt(
// // // //       json.vendor && json.vendor.company_id ? json.vendor.company_id : 'Unknown'
// // // //     )
// // // //     .up()
// // // //     .up()
// // // //     .up()
// // // //     .up()

// // // //     // Customer information
// // // //     .ele('cac:AccountingCustomerParty')
// // // //     .ele('cac:Party')
// // // //     .ele('cbc:EndpointID', { schemeID: 'GLN' })
// // // //     .txt('customer-electronic-address')
// // // //     .up() // Buyer electronic address
// // // //     .ele('cac:PartyIdentification')
// // // //     .ele('cbc:ID')
// // // //     .txt('CustomerID')
// // // //     .up()
// // // //     .up()
// // // //     .ele('cac:PartyName')
// // // //     .ele('cbc:Name')
// // // //     .txt(json.bill_to_name || 'Unknown')
// // // //     .up()
// // // //     .up()
// // // //     .ele('cac:PostalAddress')
// // // //     .ele('cbc:StreetName')
// // // //     .txt(
// // // //       json.bill_to_address
// // // //         ? json.bill_to_address.replace(/\n/g, ', ')
// // // //         : 'Unknown'
// // // //     )
// // // //     .up()
// // // //     .up()
// // // //     .ele('cac:PartyTaxScheme')
// // // //     .ele('cbc:CompanyID')
// // // //     .txt(json.bill_to_vat_number || 'Unknown')
// // // //     .up()
// // // //     .ele('cac:TaxScheme')
// // // //     .ele('cbc:ID')
// // // //     .txt('VAT')
// // // //     .up()
// // // //     .up()
// // // //     .up()
// // // //     .ele('cac:PartyLegalEntity')
// // // //     .ele('cbc:RegistrationName')
// // // //     .txt(json.bill_to_name || 'Unknown')
// // // //     .up()
// // // //     .ele('cbc:CompanyID')
// // // //     .txt(json.bill_to_company_id || 'Unknown')
// // // //     .up()
// // // //     .up()
// // // //     .up()
// // // //     .up()

// // // //     // Order reference
// // // //     .ele('cac:OrderReference')
// // // //     .ele('cbc:ID')
// // // //     .txt(json.purchase_order_number || 'Unknown')
// // // //     .up()
// // // //     .up()

// // // //     // Monetary totals
// // // //     .ele('cac:LegalMonetaryTotal')
// // // //     .ele('cbc:LineExtensionAmount', { currencyID: 'AUD' })
// // // //     .txt(json.subtotal || 0)
// // // //     .up()
// // // //     .ele('cbc:TaxExclusiveAmount', { currencyID: 'AUD' })
// // // //     .txt(json.tax || 0)
// // // //     .up()
// // // //     .ele('cbc:TaxInclusiveAmount', { currencyID: 'AUD' })
// // // //     .txt(json.total || 0)
// // // //     .up()
// // // //     .ele('cbc:PayableAmount', { currencyID: 'AUD' })
// // // //     .txt(json.total || 0)
// // // //     .up()
// // // //     .up();

// // // //   // Tax total
// // // //   doc
// // // //     .ele('cac:TaxTotal')
// // // //     .ele('cbc:TaxAmount', { currencyID: 'AUD' })
// // // //     .txt(json.tax || 0)
// // // //     .up()
// // // //     .ele('cac:TaxSubtotal')
// // // //     .ele('cbc:TaxableAmount', { currencyID: 'AUD' })
// // // //     .txt(json.subtotal || 0)
// // // //     .up()
// // // //     .ele('cbc:TaxAmount', { currencyID: 'AUD' })
// // // //     .txt(json.tax || 0)
// // // //     .up()
// // // //     .ele('cac:TaxCategory')
// // // //     .ele('cbc:ID')
// // // //     .txt('S')
// // // //     .up()
// // // //     .ele('cbc:Percent')
// // // //     .txt(10)
// // // //     .up()
// // // //     .ele('cac:TaxScheme')
// // // //     .ele('cbc:ID')
// // // //     .txt('GST')
// // // //     .up()
// // // //     .up()
// // // //     .up()
// // // //     .up();

// // // //   // Line items
// // // //   (json.line_items || []).forEach((item, index) => {
// // // //     doc
// // // //       .ele('cac:InvoiceLine')
// // // //       .ele('cbc:ID')
// // // //       .txt(item.id || index + 1)
// // // //       .up()
// // // //       .ele('cbc:InvoicedQuantity', { unitCode: 'EA' })
// // // //       .txt(item.quantity || 0)
// // // //       .up()
// // // //       .ele('cbc:LineExtensionAmount', { currencyID: 'AUD' })
// // // //       .txt(item.total || 0)
// // // //       .up()
// // // //       .ele('cac:Item')
// // // //       .ele('cbc:Description')
// // // //       .txt(item.description || 'Unknown')
// // // //       .up()
// // // //       .up()
// // // //       .ele('cac:Price')
// // // //       .ele('cbc:PriceAmount', { currencyID: 'AUD' })
// // // //       .txt(item.price || 0)
// // // //       .up()
// // // //       .up()
// // // //       .up();
// // // //   });

// // // //   const xml = doc.end({ prettyPrint: true });
// // // //   return xml;
// // // // }

// // // // (async () => {
// // // //   const jsonData = await uploadInvoice();
// // // //   const ublInvoice = createUblInvoice(jsonData);
// // // //   console.log(ublInvoice);

// // // //   // Save the XML to a file
// // // //   if (ublInvoice) {
// // // //     fs.writeFileSync('invoice.xml', ublInvoice);
// // // //   }
// // // // })();

// // // // Form data
// // // const FormData = require('form-data');
// // // const formData = new FormData();
// // // formData.append('file', pdfFile);

// // // // Include headers from formData in the request
// // // const formHeaders = formData.getHeaders();

// // // async function uploadInvoice() {
// // //   try {
// // //     const response = await axios.post(url, formData, {
// // //       headers: { ...headers, ...formHeaders },
// // //     });
// // //     console.log('Conversion successful!');
// // //     return response.data; // This will be the JSON representation of your invoice
// // //   } catch (error) {
// // //     console.error('Failed to convert PDF to JSON:', error.response.status);
// // //     console.error(error.response.data);
// // //     return null;
// // //   }
// // // }

// // // // Function to convert JSON to UBL XML
// // // function createUblInvoice(json) {
// // //   if (!json) {
// // //     console.error('No JSON data provided');
// // //     return;
// // //   }

// // //   const doc = create({ version: '1.0', encoding: 'UTF-8' })
// // //     .ele('Invoice', {
// // //       xmlns: 'urn:oasis:names:specification:ubl:schema:xsd:Invoice-2',
// // //       'xmlns:cac':
// // //         'urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2',
// // //       'xmlns:cbc':
// // //         'urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2',
// // //     })
// // //     .ele('cbc:ProfileID')
// // //     .txt('urn:fdc:peppol.eu:2017:poacc:billing:01:1.0')
// // //     .up() // Business process MUST be provided
// // //     .ele('cbc:CustomizationID')
// // //     .txt(
// // //       'urn:cen.eu:en16931:2017#conformant#urn:fdc:peppol.eu:2017:poacc:billing:international:aunz:3.0'
// // //     )
// // //     .up() // Specification identifier
// // //     .ele('cbc:ID')
// // //     .txt(json.invoice_number || 'Unknown')
// // //     .up()
// // //     .ele('cbc:IssueDate')
// // //     .txt(json.date ? json.date.split(' ')[0] : 'Unknown')
// // //     .up()
// // //     .ele('cbc:DueDate')
// // //     .txt(json.due_date || 'Unknown')
// // //     .up()
// // //     .ele('cbc:InvoiceTypeCode')
// // //     .txt('380')
// // //     .up() // Invoice type code
// // //     .ele('cbc:DocumentCurrencyCode')
// // //     .txt('AUD')
// // //     .up() // Currency code

// // //     // Supplier information
// // //     .ele('cac:AccountingSupplierParty')
// // //     .ele('cac:Party')
// // //     .ele('cbc:EndpointID', { schemeID: 'GLN' })
// // //     .txt('0192:supplier-electronic-address')
// // //     .up() // Use 'GLN' or another valid schemeID
// // //     .ele('cac:PartyIdentification')
// // //     .ele('cbc:ID')
// // //     .txt('SupplierID')
// // //     .up()
// // //     .up()
// // //     .ele('cac:PartyName')
// // //     .ele('cbc:Name')
// // //     .txt(json.vendor && json.vendor.name ? json.vendor.name : 'Unknown')
// // //     .up()
// // //     .up()
// // //     .ele('cac:PostalAddress')
// // //     .ele('cbc:StreetName')
// // //     .txt(
// // //       json.vendor && json.vendor.address
// // //         ? json.vendor.address.replace(/\n/g, ', ')
// // //         : 'Unknown'
// // //     )
// // //     .up()
// // //     .up()
// // //     .ele('cac:PartyTaxScheme')
// // //     .ele('cbc:CompanyID')
// // //     .txt(
// // //       json.vendor && json.vendor.vat_number ? json.vendor.vat_number : 'Unknown'
// // //     )
// // //     .up()
// // //     .ele('cac:TaxScheme')
// // //     .ele('cbc:ID')
// // //     .txt('VAT')
// // //     .up()
// // //     .up()
// // //     .up()
// // //     .ele('cac:PartyLegalEntity')
// // //     .ele('cbc:RegistrationName')
// // //     .txt(json.vendor && json.vendor.name ? json.vendor.name : 'Unknown')
// // //     .up()
// // //     .ele('cbc:CompanyID')
// // //     .txt(
// // //       json.vendor && json.vendor.company_id ? json.vendor.company_id : 'Unknown'
// // //     )
// // //     .up()
// // //     .up()
// // //     .up()
// // //     .up()

// // //     // Customer information
// // //     .ele('cac:AccountingCustomerParty')
// // //     .ele('cac:Party')
// // //     .ele('cbc:EndpointID', { schemeID: 'GLN' })
// // //     .txt('0192:customer-electronic-address')
// // //     .up() // Use 'GLN' or another valid schemeID
// // //     .ele('cac:PartyIdentification')
// // //     .ele('cbc:ID')
// // //     .txt('CustomerID')
// // //     .up()
// // //     .up()
// // //     .ele('cac:PartyName')
// // //     .ele('cbc:Name')
// // //     .txt(json.bill_to_name || 'Unknown')
// // //     .up()
// // //     .up()
// // //     .ele('cac:PostalAddress')
// // //     .ele('cbc:StreetName')
// // //     .txt(
// // //       json.bill_to_address
// // //         ? json.bill_to_address.replace(/\n/g, ', ')
// // //         : 'Unknown'
// // //     )
// // //     .up()
// // //     .up()
// // //     .ele('cac:PartyTaxScheme')
// // //     .ele('cbc:CompanyID')
// // //     .txt(json.bill_to_vat_number || 'Unknown')
// // //     .up()
// // //     .ele('cac:TaxScheme')
// // //     .ele('cbc:ID')
// // //     .txt('VAT')
// // //     .up()
// // //     .up()
// // //     .up()
// // //     .ele('cac:PartyLegalEntity')
// // //     .ele('cbc:RegistrationName')
// // //     .txt(json.bill_to_name || 'Unknown')
// // //     .up()
// // //     .ele('cbc:CompanyID')
// // //     .txt(json.bill_to_company_id || 'Unknown')
// // //     .up()
// // //     .up()
// // //     .up()
// // //     .up()

// // //     // Order reference
// // //     .ele('cac:OrderReference')
// // //     .ele('cbc:ID')
// // //     .txt(json.purchase_order_number || 'Unknown')
// // //     .up()
// // //     .up()

// // //     // Monetary totals
// // //     .ele('cac:LegalMonetaryTotal')
// // //     .ele('cbc:LineExtensionAmount', { currencyID: 'AUD' })
// // //     .txt(json.subtotal || 0)
// // //     .up()
// // //     .ele('cbc:TaxExclusiveAmount', { currencyID: 'AUD' })
// // //     .txt(json.tax || 0)
// // //     .up()
// // //     .ele('cbc:TaxInclusiveAmount', { currencyID: 'AUD' })
// // //     .txt(json.total || 0)
// // //     .up()
// // //     .ele('cbc:PayableAmount', { currencyID: 'AUD' })
// // //     .txt(json.total || 0)
// // //     .up()
// // //     .up();

// // //   // Tax total
// // //   doc
// // //     .ele('cac:TaxTotal')
// // //     .ele('cbc:TaxAmount', { currencyID: 'AUD' })
// // //     .txt(json.tax || 0)
// // //     .up()
// // //     .ele('cac:TaxSubtotal')
// // //     .ele('cbc:TaxableAmount', { currencyID: 'AUD' })
// // //     .txt(json.subtotal || 0)
// // //     .up()
// // //     .ele('cbc:TaxAmount', { currencyID: 'AUD' })
// // //     .txt(json.tax || 0)
// // //     .up()
// // //     .ele('cac:TaxCategory')
// // //     .ele('cbc:ID')
// // //     .txt('S')
// // //     .up()
// // //     .ele('cbc:Percent')
// // //     .txt(10)
// // //     .up()
// // //     .ele('cac:TaxScheme')
// // //     .ele('cbc:ID')
// // //     .txt('GST')
// // //     .up()
// // //     .up()
// // //     .up()
// // //     .up();

// // //   // Line items
// // //   (json.line_items || []).forEach((item, index) => {
// // //     doc
// // //       .ele('cac:InvoiceLine')
// // //       .ele('cbc:ID')
// // //       .txt(item.id || index + 1)
// // //       .up()
// // //       .ele('cbc:InvoicedQuantity', { unitCode: 'EA' })
// // //       .txt(item.quantity || 0)
// // //       .up()
// // //       .ele('cbc:LineExtensionAmount', { currencyID: 'AUD' })
// // //       .txt(item.total || 0)
// // //       .up()
// // //       .ele('cac:Item')
// // //       .ele('cbc:Description')
// // //       .txt(item.description || 'Unknown')
// // //       .up()
// // //       .up()
// // //       .ele('cac:Price')
// // //       .ele('cbc:PriceAmount', { currencyID: 'AUD' })
// // //       .txt(item.price || 0)
// // //       .up()
// // //       .up()
// // //       .up();
// // //   });

// // //   const xml = doc.end({ prettyPrint: true });
// // //   return xml;
// // // }

// // // (async () => {
// // //   const jsonData = await uploadInvoice();
// // //   const ublInvoice = createUblInvoice(jsonData);
// // //   console.log(ublInvoice);

// // //   // Save the XML to a file
// // //   if (ublInvoice) {
// // //     fs.writeFileSync('invoice.xml', ublInvoice);
// // //   }
// // // })();
// // // Form data
// // const FormData = require('form-data');
// // const formData = new FormData();
// // formData.append('file', pdfFile);

// // // Include headers from formData in the request
// // const formHeaders = formData.getHeaders();

// // async function uploadInvoice() {
// //   try {
// //     const response = await axios.post(url, formData, {
// //       headers: { ...headers, ...formHeaders },
// //     });
// //     console.log('Conversion successful!');
// //     return response.data; // This will be the JSON representation of your invoice
// //   } catch (error) {
// //     console.error('Failed to convert PDF to JSON:', error.response.status);
// //     console.error(error.response.data);
// //     return null;
// //   }
// // }

// // // Function to convert JSON to UBL XML
// // function createUblInvoice(json) {
// //   if (!json) {
// //     console.error('No JSON data provided');
// //     return;
// //   }

// //   const doc = create({ version: '1.0', encoding: 'UTF-8' })
// //     .ele('Invoice', {
// //       xmlns: 'urn:oasis:names:specification:ubl:schema:xsd:Invoice-2',
// //       'xmlns:cac':
// //         'urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2',
// //       'xmlns:cbc':
// //         'urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2',
// //     })
// //     .ele('cbc:ProfileID')
// //     .txt('urn:fdc:peppol.eu:2017:poacc:billing:01:1.0')
// //     .up() // Business process MUST be provided
// //     .ele('cbc:CustomizationID')
// //     .txt(
// //       'urn:cen.eu:en16931:2017#conformant#urn:fdc:peppol.eu:2017:poacc:billing:international:aunz:3.0'
// //     )
// //     .up() // Specification identifier
// //     .ele('cbc:ID')
// //     .txt(json.invoice_number || 'Unknown')
// //     .up()
// //     .ele('cbc:IssueDate')
// //     .txt(json.date ? json.date.split(' ')[0] : 'Unknown')
// //     .up()
// //     .ele('cbc:DueDate')
// //     .txt(json.due_date || 'Unknown')
// //     .up()
// //     .ele('cbc:InvoiceTypeCode')
// //     .txt('380')
// //     .up() // Invoice type code
// //     .ele('cbc:DocumentCurrencyCode')
// //     .txt('AUD')
// //     .up() // Currency code

// //     // Supplier information
// //     .ele('cac:AccountingSupplierParty')
// //     .ele('cac:Party')
// //     .ele('cbc:EndpointID', { schemeID: '0088' })
// //     .txt('0192:supplier-electronic-address')
// //     .up() // GLN schemeID for supplier
// //     .ele('cac:PartyIdentification')
// //     .ele('cbc:ID')
// //     .txt('SupplierID')
// //     .up()
// //     .up()
// //     .ele('cac:PartyName')
// //     .ele('cbc:Name')
// //     .txt(json.vendor && json.vendor.name ? json.vendor.name : 'Unknown')
// //     .up()
// //     .up()
// //     .ele('cac:PostalAddress')
// //     .ele('cbc:StreetName')
// //     .txt(
// //       json.vendor && json.vendor.address
// //         ? json.vendor.address.replace(/\n/g, ', ')
// //         : 'Unknown'
// //     )
// //     .up()
// //     .up()
// //     .ele('cac:PartyTaxScheme')
// //     .ele('cbc:CompanyID')
// //     .txt(
// //       json.vendor && json.vendor.vat_number ? json.vendor.vat_number : 'Unknown'
// //     )
// //     .up()
// //     .ele('cac:TaxScheme')
// //     .ele('cbc:ID')
// //     .txt('VAT')
// //     .up()
// //     .up()
// //     .up()
// //     .ele('cac:PartyLegalEntity')
// //     .ele('cbc:RegistrationName')
// //     .txt(json.vendor && json.vendor.name ? json.vendor.name : 'Unknown')
// //     .up()
// //     .ele('cbc:CompanyID')
// //     .txt(
// //       json.vendor && json.vendor.company_id ? json.vendor.company_id : 'Unknown'
// //     )
// //     .up()
// //     .up()
// //     .up()
// //     .up()

// //     // Customer information
// //     .ele('cac:AccountingCustomerParty')
// //     .ele('cac:Party')
// //     .ele('cbc:EndpointID', { schemeID: '0088' })
// //     .txt('0192:customer-electronic-address')
// //     .up() // GLN schemeID for customer
// //     .ele('cac:PartyIdentification')
// //     .ele('cbc:ID')
// //     .txt('CustomerID')
// //     .up()
// //     .up()
// //     .ele('cac:PartyName')
// //     .ele('cbc:Name')
// //     .txt(json.bill_to_name || 'Unknown')
// //     .up()
// //     .up()
// //     .ele('cac:PostalAddress')
// //     .ele('cbc:StreetName')
// //     .txt(
// //       json.bill_to_address
// //         ? json.bill_to_address.replace(/\n/g, ', ')
// //         : 'Unknown'
// //     )
// //     .up()
// //     .up()
// //     .ele('cac:PartyTaxScheme')
// //     .ele('cbc:CompanyID')
// //     .txt(json.bill_to_vat_number || 'Unknown')
// //     .up()
// //     .ele('cac:TaxScheme')
// //     .ele('cbc:ID')
// //     .txt('VAT')
// //     .up()
// //     .up()
// //     .up()
// //     .ele('cac:PartyLegalEntity')
// //     .ele('cbc:RegistrationName')
// //     .txt(json.bill_to_name || 'Unknown')
// //     .up()
// //     .ele('cbc:CompanyID')
// //     .txt(json.bill_to_company_id || 'Unknown')
// //     .up()
// //     .up()
// //     .up()
// //     .up()

// //     // Order reference
// //     .ele('cac:OrderReference')
// //     .ele('cbc:ID')
// //     .txt(json.purchase_order_number || 'Unknown')
// //     .up()
// //     .up()

// //     // Monetary totals
// //     .ele('cac:LegalMonetaryTotal')
// //     .ele('cbc:LineExtensionAmount', { currencyID: 'AUD' })
// //     .txt(json.subtotal || 0)
// //     .up()
// //     .ele('cbc:TaxExclusiveAmount', { currencyID: 'AUD' })
// //     .txt(json.tax || 0)
// //     .up()
// //     .ele('cbc:TaxInclusiveAmount', { currencyID: 'AUD' })
// //     .txt(json.total || 0)
// //     .up()
// //     .ele('cbc:PayableAmount', { currencyID: 'AUD' })
// //     .txt(json.total || 0)
// //     .up()
// //     .up();

// //   // Tax total
// //   doc
// //     .ele('cac:TaxTotal')
// //     .ele('cbc:TaxAmount', { currencyID: 'AUD' })
// //     .txt(json.tax || 0)
// //     .up()
// //     .ele('cac:TaxSubtotal')
// //     .ele('cbc:TaxableAmount', { currencyID: 'AUD' })
// //     .txt(json.subtotal || 0)
// //     .up()
// //     .ele('cbc:TaxAmount', { currencyID: 'AUD' })
// //     .txt(json.tax || 0)
// //     .up()
// //     .ele('cac:TaxCategory')
// //     .ele('cbc:ID')
// //     .txt('S')
// //     .up()
// //     .ele('cbc:Percent')
// //     .txt(10)
// //     .up()
// //     .ele('cac:TaxScheme')
// //     .ele('cbc:ID')
// //     .txt('GST')
// //     .up()
// //     .up()
// //     .up()
// //     .up();

// //   // Line items
// //   (json.line_items || []).forEach((item, index) => {
// //     doc
// //       .ele('cac:InvoiceLine')
// //       .ele('cbc:ID')
// //       .txt(item.id || index + 1)
// //       .up()
// //       .ele('cbc:InvoicedQuantity', { unitCode: 'EA' })
// //       .txt(item.quantity || 0)
// //       .up()
// //       .ele('cbc:LineExtensionAmount', { currencyID: 'AUD' })
// //       .txt(item.total || 0)
// //       .up()
// //       .ele('cac:Item')
// //       .ele('cbc:Description')
// //       .txt(item.description || 'Unknown')
// //       .up()
// //       .up()
// //       .ele('cac:Price')
// //       .ele('cbc:PriceAmount', { currencyID: 'AUD' })
// //       .txt(item.price || 0)
// //       .up()
// //       .up()
// //       .up();
// //   });

// //   const xml = doc.end({ prettyPrint: true });
// //   return xml;
// // }

// // (async () => {
// //   const jsonData = await uploadInvoice();
// //   const ublInvoice = createUblInvoice(jsonData);
// //   console.log(ublInvoice);

// //   // Save the XML to a file
// //   if (ublInvoice) {
// //     fs.writeFileSync('invoice.xml', ublInvoice);
// //   }
// // })();
