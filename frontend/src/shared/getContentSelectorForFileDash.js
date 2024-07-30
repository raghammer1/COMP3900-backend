import HelpBoard from '../components/Help/HelpBoard';
import AccessManagerBoardPdfUbl from '../FileManagerDashboard/PdfConverter/MainBoard/AccessManagerBoardPdfUbl';
import GuiFormDisplay from '../FileManagerDashboard/PdfConverter/MainBoard/GuiFormDisplay';
import ShareFilesBoardPdfUbl from '../FileManagerDashboard/PdfConverter/MainBoard/ShareFilesBoardPdfUbl';
import PdfUblValidSelector from '../FileManagerDashboard/PdfConverter/Selector/PdfUblValidSelector';
import EmailHistory from '../FileManagerDashboard/shared/EmailHistory';
import ValidBoard from '../FileManagerDashboard/shared/ValidBoard';
import AccessManagerBoard from '../FileManagerDashboard/UblValidation/MainBoard/AccessManagerBoard';
import ShareFilesBoard from '../FileManagerDashboard/UblValidation/MainBoard/ShareFilesBoard';
import UblBoard from '../FileManagerDashboard/UblValidation/MainBoard/UblBoard';
import ValidationSelectors from '../FileManagerDashboard/UblValidation/MainBoard/ValidationSelectors';
import UblValidSelector from '../FileManagerDashboard/UblValidation/Selector/UblValidSelector';

export const getContentSelectorForFileDash = (
  id,
  process,
  file,
  getValidatorDataById,
  setLatestData,
  UblValidateData,
  PdfUblValidateData,
  getPdfDataById,
  setLatestDataPdf,
  navigate
) => {
  let selector;
  let content;
  switch (process) {
    case 'validation-reports':
      selector = <UblValidSelector id={id} />;
      switch (file) {
        case 'ubl':
          content = (
            <UblBoard
              getValidatorDataById={getValidatorDataById}
              setLatestData={setLatestData}
            />
          );
          break;
        case 'validate':
          if (UblValidateData === undefined) {
            navigate('/error/not-found');
            return;
          }
          content = (
            <ValidationSelectors
              htmlContent={UblValidateData.validationHtml}
              fileId={UblValidateData.validatorId}
              jsonContent={UblValidateData.validationJson}
            />
          );
          break;
        case 'share':
          content = <ShareFilesBoard />;
          break;
        case 'access':
          content = <AccessManagerBoard />;
          break;
        case 'help':
          content = <HelpBoard />;
          break;
        case 'email-history':
          content = <EmailHistory />;
          break;
        default:
          content = <></>;
      }
      break;
    case 'convertion-reports':
      selector = <PdfUblValidSelector id={id} />;
      switch (file) {
        case 'pdf':
          if (PdfUblValidateData === undefined) {
            return navigate('/error/not-found');
          }
          if (typeof PdfUblValidateData.pdfId === 'string') {
            content = <ValidBoard fileId={PdfUblValidateData.pdfId} />;
          } else if (typeof PdfUblValidateData.pdfId === 'object') {
            content = <GuiFormDisplay invoice={PdfUblValidateData.pdfId} />;
          }
          break;
        case 'ubl':
          content = (
            <UblBoard
              getValidatorDataById={getPdfDataById}
              setLatestData={setLatestDataPdf}
            />
          );
          break;
        case 'validate':
          if (PdfUblValidateData === undefined) {
            return navigate('/error/not-found');
          }
          content = (
            <ValidationSelectors
              htmlContent={PdfUblValidateData.validationHtml}
              fileId={PdfUblValidateData.validatorId}
              jsonContent={PdfUblValidateData.validationJson}
            />
          );
          break;
        case 'share':
          content = <ShareFilesBoardPdfUbl />;
          break;
        case 'access':
          content = <AccessManagerBoardPdfUbl />;
          break;
        case 'email-history':
          content = <EmailHistory />;
          break;
        case 'help':
          content = <HelpBoard />;
          break;
        default:
          content = <></>;
      }
      break;
    default:
      content = <></>;
      selector = <></>;
  }
  return { selector, content };
};
