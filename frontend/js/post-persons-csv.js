const url = 'http://localhost:8080/persons';
const queryType = 'POST';

const fileInput = document.getElementById("fileInput");

function fetchPerson() {
   const formData = new FormData();
   formData.append('file', fileInput.files[0]);

   fetch(url, {
      method: queryType,
      body: formData
   })
      .then(res => res.json())
      .then(persons => addAnswerOnPage("fetch", JSON.stringify(persons)));
}

function xhrPerson() {
   const formData = new FormData();
   formData.append('file', fileInput.files[0]);

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
   xhr.send(formData);
}

function jQueryPerson() {
   const formData = new FormData();
   formData.append('file', fileInput.files[0]);
   $.post({
      url: url,
      data: formData,
      contentType: false,
      processData: false,
   })
      .done(res => addAnswerOnPage("jQuery", JSON.stringify(res)))
      .fail(error => console.error(error));
}

function axiosPerson() {
   const formData = new FormData();
   formData.append('file', fileInput.files[0]);
   axios.post(url, formData)
      .then(response => addAnswerOnPage("axios", JSON.stringify(response.data)))
      .catch(error => console.error(error));
}