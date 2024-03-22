//inputs variable

var siteNameInput = document.getElementById("siteNameInput");

var siteUrlInput = document.getElementById("siteUrlInput");

var tableBody = document.getElementById("tableBody");

var websitesList = [];

//getting previous data from local storage

if (localStorage.getItem("newWebsite") != null) {
  websitesList = JSON.parse(localStorage.getItem("newWebsite"));

  displayWebsite();
}

//addWebsite function
function addWebsite() {
  if (
    siteNameValidation() &&
    siteUrlValidation() &&
    RepeatNameValidation() != true
  ) {
    var website = {
      websiteName: siteNameInput.value,
      websiteUrl: siteUrlInput.value,
    };

    websitesList.push(website);

    localStorage.setItem("newWebsite", JSON.stringify(websitesList));

    displayWebsite();

    clearForm();

    //input remove style
    siteNameInput.classList.remove("is-valid");
    siteUrlInput.classList.remove("is-valid");
  } else {
    sweetAlert();
    clearForm()
  }
}

//clear-form

function clearForm() {
  siteNameInput.value = "";
  siteUrlInput.value = "";
}

//display Function
function displayWebsite() {
  tableData = "";

  for (var i = 0; i < websitesList.length; i++) {
    tableData += `
        <tr>
            <td>${i + 1}</td>
            <td class="text-capitalize">${websitesList[i].websiteName}</td>
            <td>
            <button class="btn btn-warning">
            <i class="fa-solid fa-eye"></i>
            <a href="${
              websitesList[i].websiteUrl
            }" target="_blank" class="text-black">visit</a>
            </button>
            </td>
            <td>
            <button class="btn btn-danger" onclick="deleteWebsite(${i})">
                <i class="fa-solid fa-trash-can"></i>
                <span class="text-capitalize">delete</span>
            </button>
            </td>
        </tr>`;
  }

  tableBody.innerHTML = tableData;
}

//delete function

function deleteWebsite(elementIndex) {
  websitesList.splice(elementIndex, 1);
  localStorage.setItem("newWebsite", JSON.stringify(websitesList));
  displayWebsite();
}

//validation functions

//--name validation
function siteNameValidation() {
  var nameTest = siteNameInput.value;

  var nameRegex = /^\w{3,}$/;

  if (nameRegex.test(nameTest)) {
    siteNameInput.classList.add("is-valid");
    siteNameInput.classList.remove("is-invalid");
    return true;
  } else {
    siteNameInput.classList.add("is-invalid");
    siteNameInput.classList.remove("is-valid");
    return false;
  }
}

//--url validation
function siteUrlValidation() {
  var urlTest = siteUrlInput.value;
  var urlRegex =
    /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;

  if (urlRegex.test(urlTest)) {
    siteUrlInput.classList.add("is-valid");
    siteUrlInput.classList.remove("is-invalid");
    return true;
  } else {
    siteUrlInput.classList.add("is-invalid");
    siteUrlInput.classList.remove("is-valid");
    return false;
  }
}

function RepeatNameValidation() {
  var repeatest = siteNameInput.value;
  var websitesNames = [];
  for (var i = 0; i < websitesList.length; i++) {
    websitesNames[i] = websitesList[i].websiteName;
  }
  var result = websitesNames.includes(repeatest);
  return result;
}

//sweetAlert function
function sweetAlert() {
  Swal.fire({
    icon: "error",
    title: "Oops... You cant add this website",
    text: `Site Name or Url is not valid, Please follow the rules below :
    1- Site name must contain at least 3 characters
    2- Site URL must be a valid one
    3- Site Name cant be repeated`,
    footer: '<a href="#">Why do I have this issue?</a>',
  });
}
