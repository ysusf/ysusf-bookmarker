// *****************
// Global Variables
// *****************
var bookmarkInput = document.getElementById("bookmark");
var urlInput = document.getElementById("url");
var submitBtn = document.getElementById("submit");
var searchInput = document.getElementById("search");
// ****************************************
// Create & Retrieve data from localStorage
// ****************************************
if (localStorage.getItem("sitesKey") != null) {
  sitesArr = JSON.parse(localStorage.getItem("sitesKey"));
  displayBookmark(sitesArr);
} else {
  var sitesArr = [];
}
function addLocalStorage() {
  localStorage.setItem("sitesKey", JSON.stringify(sitesArr));
}
// *******************
// Create New Bookmark
// *******************
function createBookmark() {
  var siteObj = {
    bookmarkNam: bookmarkInput.value,
    websiteURL: urlInput.value,
  };
  sitesArr.push(siteObj);
  addLocalStorage();
  displayBookmark(sitesArr);
  clearInputs();
}
function clearInputs() {
  bookmarkInput.value = "";
  urlInput.value = "";
}
submitBtn.onclick = function () {
  if (validateURL() && validateBookmarkName()) {
    createBookmark();
  } else {
    Swal.fire("Invaild Bookmark Name or Website URL");
  }
};
// ****************************
// Retrieve websites / Display
// ****************************
function displayBookmark(arr) {
  var tableContent = ``;
  for (var i = 0; i < arr.length; i++) {
    tableContent += `   
    <tr>
      <td>${i + 1}</td>
      <td>${arr[i].bookmarkNam}</td>
      <td>
        <a href="${arr[i].websiteURL}" target="_blank">
          <i class="fa-solid fa-arrow-up-right-from-square text-warning"></i
        ></a>
      </td>
      <td><i onclick="deleteBookmark(${i})" class="fa-solid fa-trash text-danger"></i></td>
      </tr>
    `;
  }
  document.getElementById("tableBody").innerHTML = tableContent;
}
// ***************
// Delete website
// ***************
function deleteBookmark(index) {
  sitesArr.splice(index, 1);
  addLocalStorage();
  displayBookmark(sitesArr);
}
// ***************
// Search website
// ***************
searchInput.onkeyup = function searchBookmark() {
  var searchSites = [];
  for (var i = 0; i < sitesArr.length; i++) {
    if (
      sitesArr[i].bookmarkNam
        .toLowerCase()
        .includes(searchInput.value.toLowerCase())
    ) {
      searchSites.push(sitesArr[i]);
    }
  }
  displayBookmark(searchSites);
};
// ***********
// Vaildation
// ***********
function validateURL() {
  var regexUrl =
    /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
  //  Reference: https://gist.github.com/dperini/729294
  return regexUrl.test(urlInput.value);
}
urlInput.onblur = function () {
  if (validateURL() != true) {
    callURLSweetMsg();
  }
};
function validateBookmarkName() {
  for (var j = 0; j < sitesArr.length; j++) {
    if (
      bookmarkInput.value.toLowerCase() == sitesArr[j].bookmarkNam.toLowerCase()
    ) {
      return false;
    }
  }
  return true;
}
bookmarkInput.onblur = function () {
  if (validateBookmarkName() != true) {
    callNameSweetMsg();
  }
};
// *******************
// Sweet Alert Massage
// *******************
function callURLSweetMsg() {
  swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Invaild Site URL!",
    footer:
      '<a href="https://url.spec.whatwg.org/#parsing" target="_blank">Show URL Standard</a>',
  });
  urlInput.value = "";
}
function callNameSweetMsg() {
  swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Repeated Bookmark Name!",
  });
  bookmarkInput.value = "";
}
// *********************************
// *********************************
// *********************************
