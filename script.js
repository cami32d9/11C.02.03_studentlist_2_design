// ----- INSERT STUDENTS IN LIST -----

document.addEventListener("DOMContentLoaded", getStudentList);

let firstname;
let lastname;
let filterBy = "all";
let sortBy = "house";

const destStudentList = document.querySelector("#student_list");
const filterButtons = document.querySelectorAll(".filter_button");
const sortButtons = document.querySelectorAll(".sort_button");

function start() {
  students.forEach(student => {
    let nameArray = `${student.fullname}`.split(" ");

    student.firstname = nameArray[0];
    student.lastname = nameArray[1];
  });

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

async function getStudentList() {
  let pagesUrl = "students1991.json";
  let jsonData = await fetch(pagesUrl);
  students = await jsonData.json();
  start();
}

function insertStudentList() {
  destStudentList.innerHTML = "";

  filteredStudents.forEach(student => {
    let template = `
                <li class="student ${student.house}" data-firstname="${student.firstname}" data-lastname="${student.lastname}" data-house="${student.house}">
                        <h2 class="name">${student.fullname}</h2>
                        <p class="house">${student.house}</p>
                </li>
                `;

    destStudentList.insertAdjacentHTML("beforeend", template);
  });
}

function getFilteredStudents(filterBy) {
  filteredStudents = students.filter(
    student => filterBy === "all" || student.house === filterBy
  );

  console.log("I'm sorting by " + sortBy);
  filteredStudents.sort(function(a, b) {
    var nameA = a.lastname.toUpperCase(); // ignore upper and lowercase
    var nameB = b.lastname.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });
  console.log(filteredStudents);
  insertStudentList();
}
