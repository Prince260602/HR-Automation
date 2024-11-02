import * as pdfjsLib from 'pdfjs-dist';

const loadingTask = pdfjsLib.getDocument('lor-template.pdf');
loadingTask.promise.then(function (pdf) {
  pdf.getPage(1).then(function (page) {
    page.getTextContent().then(function (textContent) {
      textContent.items.forEach(item => {
        console.log(`Text: ${item.str}, Coordinates: (${item.transform[4]}, ${item.transform[5]})`);
      });
    });
  });
});
