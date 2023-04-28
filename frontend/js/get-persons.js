const url = 'http://localhost:8080/persons';
const queryType = 'GET';

function fetchPersons() {
   fetch(url, {method: queryType})
      .then(res => res.json())
      .then(persons => addAnswerOnPage("fetch", JSON.stringify(persons)));
}

function xhrPersons() {
   const xhr = new XMLHttpRequest();
   xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
         if (xhr.status === 200) {
            addAnswerOnPage("xhr", JSON.stringify(xhr.response));
         } else {
            console.error(xhr.status);
         }
      }
   };
   xhr.open(queryType, url);
   xhr.send();
}

function jQueryPersons() {
   $.get(url)
      .done(res => addAnswerOnPage("jQuery", JSON.stringify(res)))
      .fail(error => console.error(error));
}

function axiosPersons() {
   axios.get(url)
      .then(response => addAnswerOnPage("axios", JSON.stringify(response.data)))
      .catch(error => console.error(error));
}