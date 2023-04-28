const url = 'http://localhost:8080/persons';
const queryType = 'POST';

const inputName = document.getElementById("inputName");
const inputSurname = document.getElementById("inputSurname");

function fetchPerson() {
   fetch(url, {
      method: queryType,
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({name: inputName.value, surname: inputSurname.value})
   })
      .then(res => res.json())
      .then(persons => addAnswerOnPage("fetch", JSON.stringify(persons)));
}

function xhrPerson() {
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
   xhr.setRequestHeader('Content-Type', 'application/json')
   xhr.send(JSON.stringify({name: inputName.value, surname: inputSurname.value}));
}

function jQueryPerson() {
   $.post(url, {name: inputName.value, surname: inputSurname.value})
      .done(res => addAnswerOnPage("jQuery", JSON.stringify(res)))
      .fail(error => console.error(error));
}

function axiosPerson() {
   axios.post(url, {name: inputName.value, surname: inputSurname.value})
      .then(response => addAnswerOnPage("axios", JSON.stringify(response.data)))
      .catch(error => console.error(error));
}