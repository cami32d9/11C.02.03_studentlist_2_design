document.addEventListener("DOMContentLoaded", getStudentList);

/* ----- VARIABLES ----- */

let firstname;
let lastname;
let filterBy = "all";
let sortBy = "house";
const popup = document.querySelector(".popup");
const popupDim = document.querySelector(".popup_dim");

const destStudentList = document.querySelector("#student_list");
const filterButtons = document.querySelectorAll(".filter_button");
const sortButtons = document.querySelectorAll(".sort_button");

async function getStudentList() {
  /* Loads the JSON */
  let pagesUrl = "students1991.json";
  let jsonData = await fetch(pagesUrl);
  students = await jsonData.json();

  start();
}

function start() {
  /* Splits fullname in two, and adds them to the array as firstname and lastname */
  students.forEach(student => {
    let nameArray = `${student.fullname}`.split(" ");
    student.firstname = nameArray[0];
    student.lastname = nameArray[1];
  });

  /* Adds eventlisteners to the filter- and sort buttons, to  */
  filterButtons.forEach(button => {
    button.addEventListener("click", function() {
      filterBy = this.getAttribute("data-type");
      getFilteredStudents(filterBy);
      document.querySelectorAll("button").forEach(button => {
        button.classList.remove("button_chosen");
        this.classList.add("button_chosen");
      });
    });
  });

  sortButtons.forEach(button => {
    button.addEventListener("click", function() {
      console.log("Clicking");
      sortBy = this.getAttribute("data-type");
      console.log("Sort by:" + sortBy);
      getFilteredStudents(filterBy);
      document.querySelectorAll("button").forEach(button => {
        button.classList.remove("button_chosen");
        this.classList.add("button_chosen");
      });
    });
  });

  getFilteredStudents("all");
}

function insertStudentList() {
  destStudentList.innerHTML = "";

  filteredStudents.forEach(student => {
    let template = `
                <li class="student" style="background-color: var(--${student.house}-color)">
                        <h2 class="name">${student.fullname}</h2>
                        <p class="house">${student.house}</p>
                </li>
                `;

    destStudentList.insertAdjacentHTML("beforeend", template);

    destStudentList.lastElementChild.addEventListener("click", openPopup);
    popupDim.addEventListener("click", closePopup);
    document.querySelector(".close").addEventListener("click", closePopup);

    function openPopup() {
      console.log("OpenPopup");
      document.querySelector(".popup_info").innerHTML = `
      <h1>${student.fullname}</h1>
      <h2>${student.house}</h2>
      <img class="crest" src="elements/crest_placeholder.jpg">
      <img class="student_photo" src="elements/photo_placeholder.jpg">
      <p>Hogwarts, Hogwarts, Hoggy Warty Hogwarts,
      Teach us something please,
      Whether we be old and bald,
      Or young with scabby knees,
      Our heads could do with filling,
      With some interesting stuff,
      For now they're bare and full of air,
      Dead flies and bits of fluff,
      So teach us things worth knowing,
      Bring back what we've forgot,
      Just do your best, we'll do the rest,
      And learn until our brains all rot.</p>
      `;
      popupDim.style.display = "block";
      popup.style.display = "block";
      popup.style.backgroundColor = `var(--${student.house}-color`;
      document.body.style.overflow = "hidden";
    }
  });
}

function getFilteredStudents(filterBy) {
  filteredStudents = students.filter(
    student => filterBy === "all" || student.house === filterBy
  );

  console.log("I'm sorting by " + sortBy);

  filteredStudents.sort(function(a, b) {
    var nameA = a[sortBy].toUpperCase(); // ignore upper and lowercase
    var nameB = b[sortBy].toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });

  /* Here, I'd like to add some if statement that will make it impossible to sort by house when only one house is selected,
  since that only brings it out of order! */

  console.log(filteredStudents);
  insertStudentList();
}

function closePopup() {
  popupDim.style.display = "none";
  popup.style.display = "none";
  document.body.style.overflow = "visible";
}
