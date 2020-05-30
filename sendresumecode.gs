// naming of the function 

function resumesend(){
  var ss = SpreadsheetApp.openById('//YOUR_SPREAD_SHEET_ID//').getSheetByName('Form Responses 1'); // Give your spreadsheet ID and the name of sheet
  var Lrow = ss.getLastRow(); // get the last row in the sheet 
  var email = ss.getRange(Lrow, 3).getValue(); // get the values
  var date = Utilities.formatDate(new Date(), "GMT+04:00", "dd-MM-yyyy");
  var web = ss.getRange(Lrow, 4).getValue();
  var hrname = ss.getRange(Lrow, 5).getValue();
  Logger.log(hrname);
  var comp = ss.getRange(Lrow, 2).getValue();
  Logger.log(comp);
  
  var dest = DriveApp.getFolderById('//DESTINATION FOLDER ID');
  var coverletter = DriveApp.getFileById('COVERLETTER ID ').makeCopy().getId();
  var sampleDoc = DocumentApp.openById(coverletter).getBody();
  
  sampleDoc.replaceText('{{company}}', comp);
  sampleDoc.replaceText('{{DATE}}',date);
  sampleDoc.replaceText('{{WEB}}',web);
  sampleDoc.replaceText('{{HRname}}',web);
  
  var save = DocumentApp.openById(coverletter).saveAndClose();
  var resume = DriveApp.getFileById('RESUME ID');
  
  var blob = DocumentApp.openById(coverletter).getAs('application/pdf');
  var newFile = dest.createFile(blob.setName(comp +'.pdf'));
  var urlofpdf = newFile.getUrl();
  
  var nbody = "Dear "+hrname+"\n This is an application for the programmer possition as advertised at " + web+". I believe I have all the skills and qualification needed for the job\n\n Please find detailed resume & cover letter attached ";
  var email_footer = "\nI hope you will consider me for an interview. Please feel free to contact me at abc@gmail.com or 1234567890";
  
  GmailApp.sendEmail(email, ' Application for the position of programmer ', nbody+email_footer, {attachments:[resume, newFile]});
  
  


}
