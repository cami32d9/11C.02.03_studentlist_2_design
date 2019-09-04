document.addEventListener("DOMContentLoaded", getStudentList);

/* ----- VARIABLES ----- */

let firstname;
let lastname;
let filterBy = "all";
let sortBy = "house";

const destStudentList = document.querySelector("#student_list");
const popup = document.querySelector(".popup");
const popupDim = document.querySelector(".popup_dim");
const filterButtons = document.querySelectorAll(".filter_button");
const sortButtons = document.querySelectorAll(".sort_button");

/* ----- GET JSON ----- */

async function getStudentList() {
  /* Loads the JSON */
  let pagesUrl = "students1991.json";
  let jsonData = await fetch(pagesUrl);
  students = await jsonData.json();

  start();
}

/* ----- PROGRAM ----- */

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
      getFilteredStudents();
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
      getFilteredStudents();
      document.querySelectorAll("button").forEach(button => {
        button.classList.remove("button_chosen");
        this.classList.add("button_chosen");
      });
    });
  });

  getFilteredStudents();
}

function getFilteredStudents() {
  /* Filters the students with the variable filterBy, which starts as "all" and changes at click
    on filterButtons. */
  filteredStudents = students.filter(
    student => filterBy === "all" || student.house === filterBy
  );
  /* The array we are now working with is filteredStudents, which only gives us the chosen students from
  the original students array. */

  /* Sorts the students with the sortBy variable, which starts as "house" and changes at click on
  sortButtons. All is sorted a-z.
      Borrowed from:
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort */
  filteredStudents.sort(function(a, b) {
    var nameA = a[sortBy].toUpperCase(); // ignore upper and lowercase
    var nameB = b[sortBy].toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  /* For further work:
        1. Make the program sort from z-a instead of a-z, if that sorting option was already chosen.
        2. An if statement that will make it impossible to sort by house when only one house is selected,
        since that only brings it out of order!
        3. In addition to the above, the list should ideally start out by sorting by house AND THEN last name.
        At the same time, but the house "first", and then sort by last name inside the house.
    */

  insertStudentList();
}

function insertStudentList() {
  /* Clears the student list to make space for the "new" filtered/sorted list. */
  destStudentList.innerHTML = "";

  filteredStudents.forEach(student => {
    /* Inserts a list item for all currently available students. */
    let template = `
                <li class="student" style="background-color: var(--${student.house}-color)">
                        <h2 class="name">${student.fullname}</h2>
                        <p class="house">${student.house}</p>
                </li>
                `;

    destStudentList.insertAdjacentHTML("beforeend", template);

    /* Click event for each student:
        Open popup when clicking on student in student list*/
    destStudentList.lastElementChild.addEventListener("click", openPopup);

    function openPopup() {
      /* Adds student info to the modal window */
      document.querySelector(".popup_info").innerHTML = `
      <h1>${student.fullname}</h1>
      <h2>${student.house}</h2>
      <div class="popup_grid">
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
      </div>
      <img class="crest" src="elements/${student.house}_crest.png">

      `;

      /* Displays modal window and dim background, and makes list-page (seem) inactive. */
      popupDim.style.display = "block";
      popup.style.display = "block";
      document.body.style.overflow = "hidden";

      /* Styles modal window with student house color. */
      popup.style.backgroundColor = `var(--${student.house}-color`;

      /* Close popup when clicking outside modal window or the "close icon" in modal window. */
      popupDim.addEventListener("click", closePopup);
      document.querySelector(".close").addEventListener("click", closePopup);
    }
  });
}

function closePopup() {
  /* Hides modal window and makes list-page active. */
  popupDim.style.display = "none";
  popup.style.display = "none";
  document.body.style.overflow = "visible";
}
