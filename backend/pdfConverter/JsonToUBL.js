//! BOILER PLATE CODE FOR JSON TO UBL

// const { create } = require('xmlbuilder2');

// const jsonToUbl = (json) => {
//   const doc = create({ version: '1.0', encoding: 'UTF-8' })
//     .ele('Invoice', { xmlns: 'urn:oasis:names:specification:ubl:schema:xsd:Invoice-2' })
//     .ele('cbc:UBLVersionID').txt('2.1').up()
//     .ele('cbc:CustomizationID').txt('urn:cen.eu:en16931:2017').up()
//     .ele('cbc:ProfileID').txt('urn:fdc:peppol.eu:2017:poacc:billing:01:1.0').up()
//     .ele('cbc:ID').txt(json.invoiceNumber).up()
//     .ele('cbc:IssueDate').txt(json.issueDate).up()
//     .ele('cac:AccountingSupplierParty')
//       .ele('cac:Party')
//         .ele('cac:PartyName')
//           .ele('cbc:Name').txt(json.supplier.name).up()
//         .up()
//         .ele('cac:PostalAddress')
//           .ele('cbc:StreetName').txt(json.supplier.address.street).up()
//           .ele('cbc:CityName').txt(json.supplier.address.city).up()
//           .ele('cbc:PostalZone').txt(json.supplier.address.postalCode).up()
//         .up()
//       .up()
//     .up()
//     .ele('cac:AccountingCustomerParty')
//       .ele('cac:Party')
//         .ele('cac:PartyName')
//           .ele('cbc:Name').txt(json.customer.name).up()
//         .up()
//         .ele('cac:PostalAddress')
//           .ele('cbc:StreetName').txt(json.customer.address.street).up()
//           .ele('cbc:CityName').txt(json.customer.address.city).up()
//           .ele('cbc:PostalZone').txt(json.customer.address.postalCode).up()
//         .up()
//       .up()
//     .up();

//   return doc.end({ prettyPrint: true });
// };

// const sampleJson = {
//   invoiceNumber: 'INV-001',
//   issueDate: '2024-06-20',
//   supplier: {
//     name: 'Supplier Name',
//     address: {
//       street: '123 Supplier St.',
//       city: 'Supplier City',
//       postalCode: '12345'
//     }
//   },
//   customer: {
//     name: 'Customer Name',
//     address: {
//       street: '456 Customer St.',
//       city: 'Customer City',
//       postalCode: '67890'
//     }
//   }
// };

// console.log(jsonToUbl(sampleJson));
