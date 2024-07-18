// Function to convert JSON to UBL XML
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { create } = require('xmlbuilder2');
function jsonToUbl(json, vendorGln, customerGln) {
  if (!json) {
    console.error('No JSON data provided');
    return;
  }

  const missingFields = [];

  // Validate required fields
  if (!json.invoice_number) missingFields.push('invoice_number');
  if (!json.date) missingFields.push('date');
  if (!json.due_date) missingFields.push('due_date');
  if (!json.vendor || !json.vendor.name) missingFields.push('vendor.name');
  if (!json.vendor || !json.vendor.address)
    missingFields.push('vendor.address');
  if (!json.vendor || !json.vendor.vat_number)
    missingFields.push('vendor.vat_number');
  if (!json.bill_to_name) missingFields.push('bill_to_name');
  if (!json.bill_to_address) missingFields.push('bill_to_address');
  if (!json.bill_to_vat_number) missingFields.push('bill_to_vat_number');
  if (!json.purchase_order_number) missingFields.push('purchase_order_number');
  if (!json.subtotal) missingFields.push('subtotal');
  if (!json.tax) missingFields.push('tax');
  if (!json.total) missingFields.push('total');
  // if (!json.vendor.gln) missingFields.push('vendor.gln');
  // if (!json.customer || !json.customer.gln) missingFields.push('customer.gln');

  console.log(json);

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
    .txt(vendorGln)
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
    .txt(customerGln)
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
  return { missingFields, xml };
}

module.exports = jsonToUbl;
