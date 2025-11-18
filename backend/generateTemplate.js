function injectParagraphStyles(html) {
  // Add margin-bottom style to <p> tags that don't already have a style attribute
  return html.replace(/<p(?![^>]*\bstyle=)/gi, '<p style="margin-bottom:15px;"');
}

function getHeader() {
  // Simplified header similar to TemplateHelper.GetHeader
  return `
    <div style="display:flex;justify-content:space-between;align-items:center;">
      <div style="font-weight:bold;font-size:18px;">Institution Name</div>
      <div style="text-align:right;font-size:12px;color:#666;">Address line 1<br/>Address line 2</div>
    </div>
    <hr style="margin-top:10px;margin-bottom:4px;"/>
  `;
}

function generateTemplate(options) {
  const {
    circularNumber = '',
    contentsHtml = '',
    toText = '',
    copyTo = '',
    approvedDate = null,
    approvedByName = null,
    approvedByDesignation = null,
    pageSettings = 'font-family:Arial, Helvetica, sans-serif;font-size:14px;'
  } = options;

  const header = getHeader();

  const contents = injectParagraphStyles(contentsHtml || '');

  // convert lines in `toText` to <br/>
  const toAddress = toText ? toText.split(/\r?\n/).filter(Boolean).map(l => l + '<br/>').join('') : '';

  const dateDisplay = approvedDate || '#ApprovedDate#';
  const nameDisplay = approvedByName || '#ApprovedByName#';
  const designationDisplay = approvedByDesignation || '#ApprovedByDesignation#';

  const template = header +
    "<hr style=\"margin-bottom:4px;\">" +
    `<table style=\"width:100%;margin:0;margin-bottom:20px;\">` +
      `<tbody><tr><td style=\"width:595px;\">` +
        `<p style=\"${pageSettings}text-align:right;\">Date: ${dateDisplay}</p>` +
      `</td></tr></tbody>` +
    `</table>` +
    '<hr style="margin-top:4px;margin-bottom:20px;">' +
    `<table style=\"width:100%;margin:0;margin-bottom:20px;\">` +
      `<tbody><tr><td style=\"width:595px;\">` +
        `<p style=\"${pageSettings}text-align:center;\"><u><strong>Circular: ${escapeHtml(circularNumber.trim())}</strong></u></p>` +
      `</td></tr></tbody>` +
    `</table>` +
    `<table style=\"width:100%;margin-bottom:20px;\">` +
      `<tbody>` +
        `<tr><td colspan=\"2\" style=\"width:595px;\">` +
          `<p style=\"${pageSettings}text-align:justify;\"> ${contents}</p>` +
        `</td></tr>` +
        `<tr><td colspan=\"2\" style=\"width:595px;\">` +
          `<p style=\"${pageSettings}text-align:right;padding-right:15px;margin-top:50px;\">${nameDisplay}</p>` +
        `</td></tr>` +
        `<tr><td colspan=\"2\" style=\"width:595px;\">` +
          `<p style=\"${pageSettings}text-align:right;\">${designationDisplay}</p>` +
        `</td></tr>` +
        `<tr><td style=\"width:100px;vertical-align:top;\">` +
          `<p style=\"${pageSettings}margin-bottom:10px;\">To:</p>` +
        `</td><td style=\"width:495px;\">` +
          `<p style=\"${pageSettings}margin-bottom:10px;\">${toAddress}</p>` +
        `</td></tr>` +
        `<tr><td colspan=\"2\" style=\"width:595px;\">` +
          `<p style=\"${pageSettings}\">Copy To: ${escapeHtml(copyTo.trim())}</p>` +
        `</td></tr>` +
      `</tbody>` +
    `</table>`;

  return template;
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

module.exports = { generateTemplate };
