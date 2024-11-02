import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function generatePDF(formDetails, filePath, formType) {
  try {
    console.log('Received formType:', formType);
    console.log('Form Details:', formDetails);

    // Template filename based on form type
    let templateFileName;
    const fieldCoordinates = {};

    switch (formType) {
      case 'formSubmission': // LOP Template
        templateFileName = 'lop-template.pdf';
        Object.assign(fieldCoordinates, {
          date: { x: 58, y: 499 },
          employeeId: { x: 87, y: 486 },
          documentNo: { x: 90, y: 476 },
          name: { x: 29, y: 445 },
          college: { x: 29, y: 430 },
          nameAgain: { x: 900, y: 156 },
          oldDesignation: { x: 29, y: 378 },
          newDesignation: { x: 151, y: 378 },
          effectiveDate: { x: 387, y: 378 }
        });
        break;

        case 'offer-letter': // Offer Letter Template
        templateFileName = 'offer-letter-template.pdf';
        Object.assign(fieldCoordinates, {
          date: { x: 64, y: 479 },
          employeeId: { x: 99, y: 466 },
          documentNo: { x: 90, y: 476 },
          name: { x: 41 , y: 415 },
          college: { x: 41, y: 401 },
          AppliedProfile: { x: 398, y: 363 },
          JoiningDate: { x: 169, y: 306 }
        });
        break;

        case 'loc': // LOC Template
        templateFileName = 'loc-template.pdf';
        Object.assign(fieldCoordinates, {
          employeeId: { x: 86, y: 414 }, // Adjust coordinates
          documentNo: { x: 91, y: 402 },
          dateOfIssue: { x: 92, y: 390 },
          name: { x: 108 , y: 366 },
          name1: { x: 105 , y: 321 },
          courseStatus: { x: 252, y: 366 },
          college: { x: 23, y: 354.6 },
          pronoun: { x: 97, y: 332 },
          tenureStart: { x: 180, y: 480 },
          tenureEnd: { x: 90, y: 450 },
          profile: { x: 162, y: 332 },
          nameAgain: { x: 180, y: 520 },
          pronoun2: { x: 56.2, y: 306.3 },
          pronoun3: { x: 61, y: 320.7 },
          pronoun4: { x: 56.4, y: 288.4 },
          pronoun5: { x: 186, y: 306.8 },
          position: { x:279,y: 332 },
          joiningDate: { x: 300 , y:343},
          endDate: { x: 385 , y:343},
          courseName: { x:306, y:366}
        });
        break;

      case 'lor': // LOC Template (Adding demo text)
        templateFileName = 'lor-template.pdf';
        Object.assign(fieldCoordinates, {
          employeeID: { x: 88, y: 442 }, // Adjust coordinates
          documentNo: { x: 91, y: 402 },
          pronoun: { x: 195, y: 292 }, // This one is for him/her after assigned to 
          pronoun8: {x: 233, y: 364.5},// This one is for him/her after regard for
          pronoun9: {x:399, y:267}, // This one is for him/her after woman and give
          pronoun2: { x: 700, y:800 },
          pronoun3: { x: 307, y: 328 }, // This one is for he/she after Mern Stack Developer Intern
          pronoun4: { x: 428, y: 363.5 },// This one is for she/he after outstanding contribution that
          pronoun5: { x: 374, y: 316 }, // This one is for she/he after computer literate
          pronoun6: { x: 99, y: 315.5 }, // This one is for she/he after In addition
          pronoun7:  { x: 338, y: 303 },// This one is for she/he after gets done    
          pronoun10: {x: 322, y: 267}, // This one is for men/women
          dateOfIssue: { x: 55, y: 452 },
          name: { x: 73 , y: 386 },//start
          name1: { x: 140 , y: 244 },//bottom
          courseStatus: { x: 212, y: 366 },
          profile: { x: 162, y: 332 },
          nameAgain: { x: 41.7, y: 327 },//mid one
          position: { x:143,y: 375 },
          joiningDate: { x: 289 , y:375},
          endDate: { x: 376, y:375},
          courseName: { x:256, y:366},  
          internshipRole: {x: 27, y:375},
          internshipRole1: {x: 161, y:327}
          
        });
        break;

      default:
        throw new Error('Invalid form type');
    }

    const templatePath = path.join(__dirname, 'templates', templateFileName);
    console.log('Template Path:', templatePath);

    if (!fs.existsSync(templatePath)) {
      throw new Error(`Template file not found: ${templatePath}`);
    }

    const existingPdfBytes = fs.readFileSync(templatePath);
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const page = pdfDoc.getPages()[0];

    console.log('Template loaded successfully.');

    // Destructure fields based on form type
    const {
      todaysDate = new Date(),
      employeeId = '',
      documentNo = '',
      fullName: name = '',
      collegeName: college = '',
      previousJobRole: oldDesignation = '',
      positionPromotedTo: newDesignation = '',
      joiningDate: effectiveDate = new Date(),
          // AppliedProfile: profile = '',
      email = '',
      PhoneNumber = '',
      University = '',
      InternshipDuration = '',
      AppliedProfile= " ",
      FullName = '',
      fullName = '',
      EmployeeId = '',
      employeeID = "",
      gender = 'Male',
      courseStatus='',
      profile='',
      collegeName='',
      position='',
      JoiningDate=new Date(),
      joiningDate=new Date(),
      endDate=new Date(),
      courseName='',
      internshipRole="",
      internshipRole1="",
      nameAgain=""
      
  
    } = formDetails;

    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const pronoun = gender === 'Male' ? 'he' : 'she';
    const pronoun1 = gender === 'Male' ? 'him' : 'her';
    const pronoun2 = gender === "Male" ? "man" : "woman"
    const pronounPossessive = gender === 'Male' ? 'his' : 'her';
    const pronounCapitalized = pronoun.charAt(0).toUpperCase() + pronoun.slice(1);

    // Draw text for LOP
    if (formType === 'formSubmission') {
      page.drawText(todaysDate.toISOString().split('T')[0] || '', {
        x: fieldCoordinates.date.x,
        y: fieldCoordinates.date.y,
        size: 10,
        color: rgb(0, 0, 0),
        font: helveticaFont
      });

      page.drawText(employeeId || '', {
        x: fieldCoordinates.employeeId.x,
        y: fieldCoordinates.employeeId.y,
        size: 10,
        color: rgb(0, 0, 0),
        font: helveticaFont
      });

      page.drawText(documentNo || '', {
        x: fieldCoordinates.documentNo.x,
        y: fieldCoordinates.documentNo.y,
        size: 10,
        color: rgb(0, 0, 0),
        font: helveticaFont
      });

      page.drawText(name || '', {
        x: fieldCoordinates.name.x,
        y: fieldCoordinates.name.y,
        size: 10,
        color: rgb(0, 0, 0),
        font: helveticaFont
      });

      page.drawText(college || '', {
        x: fieldCoordinates.college.x,
        y: fieldCoordinates.college.y,
        size: 10,
        color: rgb(0, 0, 0),
        font: helveticaFont
      });

      page.drawText(name || '', {
        x: fieldCoordinates.nameAgain.x,
        y: fieldCoordinates.nameAgain.y,
        size: 10,
        color: rgb(0, 0, 0),
        font: helveticaFont
      });

      page.drawText(oldDesignation || '', {
        x: fieldCoordinates.oldDesignation.x,
        y: fieldCoordinates.oldDesignation.y,
        size: 10,
        color: rgb(0, 0, 0),
        font: helveticaFont
      });

      page.drawText(newDesignation || '', {
        x: fieldCoordinates.newDesignation.x,
        y: fieldCoordinates.newDesignation.y,
        size: 10,
        color: rgb(0, 0, 0),
        font: helveticaFont
      });

      page.drawText(effectiveDate.toISOString().split('T')[0] || '', {
        x: fieldCoordinates.effectiveDate.x,
        y: fieldCoordinates.effectiveDate.y,
        size: 10,
        color: rgb(0, 0, 0),
        font: helveticaFont
      });
    }

    // Draw text for Offer Letter
    if (formType === 'offer-letter') {
      page.drawText(todaysDate.toISOString().split('T')[0] || '', {
        x: fieldCoordinates.date.x,
        y: fieldCoordinates.date.y,
        size: 9,
        color: rgb(0, 0, 0),
        font: helveticaFont
      });

      page.drawText(JoiningDate.toISOString().split('T')[0] || '', {
        x: fieldCoordinates.JoiningDate.x,
        y: fieldCoordinates.JoiningDate.y,
        size: 9,
        color: rgb(0, 0, 0),
        font: helveticaFont
      });

      page.drawText(EmployeeId || '', {
        x: fieldCoordinates.employeeId.x,
        y: fieldCoordinates.employeeId.y,
        size: 9,
        color: rgb(0, 0, 0),
        font: helveticaFont
      });

      page.drawText(documentNo || '', {
        x: fieldCoordinates.documentNo.x,
        y: fieldCoordinates.documentNo.y,
        size: 9,
        color: rgb(0, 0, 0),
        font: helveticaFont
      });

      page.drawText(FullName || '', {
        x: 64,
        y: 386,
        size: 9,
        color: rgb(0, 0, 0),
        font: helveticaFont
      });

      page.drawText(FullName || '', {
        x: fieldCoordinates.name.x,
        y: fieldCoordinates.name.y,
        size: 9,
        color: rgb(0, 0, 0),
        font: helveticaFont
      });

      page.drawText(college || '', {
        x: fieldCoordinates.college.x,
        y: fieldCoordinates.college.y,
        size: 9,
        color: rgb(0, 0, 0),
        font: helveticaFont
      });

      page.drawText(AppliedProfile|| '', {
        x: fieldCoordinates.AppliedProfile.x,
        y: fieldCoordinates.AppliedProfile.y,
        size: 9,
        color: rgb(0, 0, 0),
        font: helveticaFont
      });


      // Additional fields for the offer letter
      page.drawText(University || '', {
        x: fieldCoordinates.college.x, // Adjust coordinates as needed
        y: fieldCoordinates.college.y, // Adjust coordinates as needed
        size: 9,
        color: rgb(0, 0, 0),
        font: helveticaFont
      });
    }

    // Draw text for LOC
    if (formType === 'loc') {
      page.drawText(employeeId || '', {
        x: fieldCoordinates.employeeId.x,
        y: fieldCoordinates.employeeId.y,
        size: 9,
        color: rgb(0, 0, 0),
        font: helveticaFont
      });

      page.drawText(documentNo || '', {
        x: fieldCoordinates.documentNo.x,
        y: fieldCoordinates.documentNo.y,
        size: 9,
        color: rgb(0, 0, 0),
        font: helveticaFont
      });

      page.drawText(todaysDate.toISOString().split('T')[0] || '', {
        x: fieldCoordinates.dateOfIssue.x,
        y: fieldCoordinates.dateOfIssue.y,
        size: 9,
        color: rgb(0, 0, 0),
        font: helveticaFont
      });

      page.drawText(fullName || '', {
        x: fieldCoordinates.name.x,
        y: fieldCoordinates.name.y,
        size: 9,
        color: rgb(0, 0, 0),
        font: helveticaFont
      });

      page.drawText(courseStatus || '', {
        x: fieldCoordinates.courseStatus.x,
        y: fieldCoordinates.courseStatus.y,
        size: 9,
        color: rgb(0, 0, 0),
        font: helveticaFont
      });
      page.drawText(courseName || '', {
        x: fieldCoordinates.courseName.x,
        y: fieldCoordinates.courseName.y,
        size: 9,
        color: rgb(0, 0, 0),
        font: helveticaFont
      });

      page.drawText(collegeName || '', {
        x: fieldCoordinates.college.x,
        y: fieldCoordinates.college.y,
        size: 9,
        color: rgb(0, 0, 0),
        font: helveticaFont
      });

      page.drawText(pronounCapitalized || '', {
        x: fieldCoordinates.pronoun.x,
        y: fieldCoordinates.pronoun.y,
        size: 9,
        color: rgb(0, 0, 0),
        font: helveticaFont
      });

      page.drawText(joiningDate.toISOString().split('T')[0] || '', {
        x: fieldCoordinates.joiningDate.x,
        y: fieldCoordinates.joiningDate.y,
        size: 9,
        color: rgb(0, 0, 0),
        font: helveticaFont
      });

      page.drawText(endDate.toISOString().split('T')[0] || '', {
        x: fieldCoordinates.endDate.x,
        y: fieldCoordinates.endDate.y,
        size: 9,
        color: rgb(0, 0, 0),
        font: helveticaFont
      });

      page.drawText(profile || '', {
        x: fieldCoordinates.profile.x,
        y: fieldCoordinates.profile.y,
        size: 9,
        color: rgb(0, 0, 0),
        font: helveticaFont
      });

      page.drawText(fullName || '', {
        x: fieldCoordinates.name1.x,
        y: fieldCoordinates.name1.y,
        size: 9,
        color: rgb(0, 0, 0),
        font: helveticaFont
      });

      page.drawText(pronounPossessive || '', {
        x: fieldCoordinates.pronoun2.x,
        y: fieldCoordinates.pronoun2.y,
        size: 9,
        color: rgb(0, 0, 0),
        font: helveticaFont
      });

      page.drawText(pronounPossessive || '', {
        x: fieldCoordinates.pronoun3.x,
        y: fieldCoordinates.pronoun3.y,
        size: 9,
        color: rgb(0, 0, 0),
        font: helveticaFont
      });
      page.drawText(pronounPossessive || '', {
        x: fieldCoordinates.pronoun5.x,
        y: fieldCoordinates.pronoun5.y,
        size: 9,
        color: rgb(0, 0, 0),
        font: helveticaFont
      });
      page.drawText(pronoun1 || '', {
        x: fieldCoordinates.pronoun4.x,
        y: fieldCoordinates.pronoun4.y,
        size: 9,
        color: rgb(0, 0, 0),
        font: helveticaFont
      });
      page.drawText(position || '', {
        x: fieldCoordinates.position.x,
        y: fieldCoordinates.position.y,
        size: 9,
        color: rgb(0, 0, 0),
        font: helveticaFont
      });
    }
      

    if (formType === 'lor') {
      page.drawText(employeeID || '', {
        x: fieldCoordinates.employeeID.x,
        y: fieldCoordinates.employeeID.y,
        size: 9,
        color: rgb(0, 0, 0),
        font: helveticaFont
      });
      page.drawText(documentNo || '', {
        x: fieldCoordinates.documentNo.x,
        y: fieldCoordinates.documentNo.y,
        size: 9,
        color: rgb(0, 0, 0),
        font: helveticaFont
      });
      page.drawText(todaysDate.toISOString().split('T')[0] || '', {
        x: fieldCoordinates.dateOfIssue.x,
        y: fieldCoordinates.dateOfIssue.y,
        size: 9,
        color: rgb(0, 0, 0),
        font: helveticaFont
      });
     

      page.drawText(fullName || '', {
        x: fieldCoordinates.name.x,
        y: fieldCoordinates.name.y,
        size: 9,
        color: rgb(0, 0, 0),
        font: helveticaFont
      });
      page.drawText(joiningDate.toISOString().split('T')[0] || '', {
        x: fieldCoordinates.joiningDate.x,
        y: fieldCoordinates.joiningDate.y,
        size: 9,
        color: rgb(0, 0, 0),
        font: helveticaFont
      });

      page.drawText(endDate.toISOString().split('T')[0] || '', {
        x: fieldCoordinates.endDate.x,
        y: fieldCoordinates.endDate.y,
        size: 9,
        color: rgb(0, 0, 0),
        font: helveticaFont
      });

      page.drawText(internshipRole || '', {
        x: fieldCoordinates.internshipRole.x,
        y: fieldCoordinates.internshipRole.y,
        size: 9,
        color: rgb(0, 0, 0),
        font: helveticaFont
      });

      page.drawText(internshipRole || '', {
        x: fieldCoordinates.internshipRole1.x,
        y: fieldCoordinates.internshipRole1.y,
        size: 9,
        color: rgb(0, 0, 0),
        font: helveticaFont
      });

      page.drawText(position || '', {
        x: fieldCoordinates.position.x,
        y: fieldCoordinates.position.y,
        size: 9,
        color: rgb(0, 0, 0),
        font: helveticaFont
      });
      page.drawText(fullName || '', {
        x: fieldCoordinates.name1.x,
        y: fieldCoordinates.name1.y,
        size: 9,
        color: rgb(0, 0, 0),
        font: helveticaFont
      });

      page.drawText(fullName || '', {
        x: fieldCoordinates.nameAgain.x,
        y: fieldCoordinates.nameAgain.y,
        size: 9,
        color: rgb(0, 0, 0),
        font: helveticaFont
      });
      page.drawText(pronoun || '', {
        x: fieldCoordinates.pronoun4.x,
        y: fieldCoordinates.pronoun4.y,
        size: 9,
        color: rgb(0, 0, 0),
        font: helveticaFont
      });
      page.drawText( pronounPossessive || '', {
        x: fieldCoordinates.pronoun2.x,
        y: fieldCoordinates.pronoun2.y,
        size: 9,
        color: rgb(0, 0, 0),
        font: helveticaFont
      });

      page.drawText(pronoun || '', {
        x: fieldCoordinates.pronoun3.x,
        y: fieldCoordinates.pronoun3.y,
        size: 9,
        color: rgb(0, 0, 0),
        font: helveticaFont
      });
      page.drawText(pronoun || '', {
        x: fieldCoordinates.pronoun5.x,
        y: fieldCoordinates.pronoun5.y,
        size: 9,
        color: rgb(0, 0, 0),
        font: helveticaFont
      });
      page.drawText(pronoun || '', {
        x: fieldCoordinates.pronoun6.x,
        y: fieldCoordinates.pronoun6.y,
        size: 9,
        color: rgb(0, 0, 0),
        font: helveticaFont
      });
      page.drawText(pronoun || '', {
        x: fieldCoordinates.pronoun7.x,
        y: fieldCoordinates.pronoun7.y,
        size: 9,
        color: rgb(0, 0, 0),
        font: helveticaFont
      });

      // This one is for his/her
      page.drawText(pronoun1 || '', {
        x: fieldCoordinates.pronoun8.x,
        y: fieldCoordinates.pronoun8.y,
        size: 9,
        color: rgb(0, 0, 0),
        font: helveticaFont
      });
      page.drawText(pronoun1 || '', {
        x: fieldCoordinates.pronoun9.x,
        y: fieldCoordinates.pronoun9.y,
        size: 9,
        color: rgb(0, 0, 0),
        font: helveticaFont
      });
      page.drawText(pronoun1 || '', {
        x: fieldCoordinates.pronoun.x,
        y: fieldCoordinates.pronoun.y,
        size: 9,
        color: rgb(0, 0, 0),
        font: helveticaFont
      });


// This one is for men/women
      page.drawText(pronoun2 || '', {
        x: fieldCoordinates.pronoun2.x,
        y: fieldCoordinates.pronoun2.y,
        size: 9,
        color: rgb(0, 0, 0),
        font: helveticaFont
      });
      page.drawText(pronoun2 || '', {
        x: fieldCoordinates.pronoun10.x,
        y: fieldCoordinates.pronoun10.y,
        size: 9,
        color: rgb(0, 0, 0),
        font: helveticaFont
      })

   

    }

    // Save the updated PDF
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(filePath, pdfBytes);
    console.log(`PDF generated at ${filePath}`);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
}

export default generatePDF;