function addAnswerOnPage(type, answer) {
   let paragraphElement = document.createElement("p");
   paragraphElement.innerHTML = `${type}: ${answer}`;
   document.querySelector("body")
      .append(paragraphElement);
}

function cleanAnswerOnClick() {
   let htmlParagraphs = document.querySelectorAll("p");
   htmlParagraphs.forEach(el => el.remove());
}