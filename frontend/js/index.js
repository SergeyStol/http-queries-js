const answerLabelUI = document.getElementById("answerText");

function axiosButtonOnClick() {
   axios.get('http://localhost:8080/')
      .then(response => addAnswerOnPage("axios", response.data))
      .catch(error => console.error(error));
}

function jQueryButtonOnClick() {
   $.get('http://localhost:8080/')
      .done(res => addAnswerOnPage("jQuery", res))
      .fail(error => console.error(error));
}

function fetchButtonOnClick() {
   fetch('http://localhost:8080', {method: 'get'})
      .then(res => res.text())
      .then(data => addAnswerOnPage("fetch", data))
}

function xhrButtonOnClick() {
   const xhr = new XMLHttpRequest();
   xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
         if (xhr.status === 200) {
            addAnswerOnPage("xhr", xhr.responseText);
         } else {
            console.error(xhr.status);
         }
      }
   };
   xhr.open('GET', 'http://localhost:8080/');
   xhr.send();
}