// ----- INSERT STUDENTS IN LIST -----

document.addEventListener("DOMContentLoaded", start);

let firstname;
let lastname;

const destStudentList = document.querySelector("#student_list");
const filterButtons = document.querySelectorAll(".filter_button");

function start() {
  filterButtons.forEach(button => {
    button.addEventListener("click", function() {
      let filterBy = this.getAttribute("data-type");
      insertStudentList(filterBy);
      document.querySelectorAll("button").forEach(button => {
        button.classList.remove("button_chosen");
        this.classList.add("button_chosen");
      });
    });
  });

  getStudentList();
}

function sortStudents() {
  students.sort(function(a, b) {
    var nameA = a.fullname.toUpperCase(); // ignore upper and lowercase
    var nameB = b.fullname.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });
}

async function getStudentList() {
  let pagesUrl = "students1991.json";
  let jsonData = await fetch(pagesUrl);
  students = await jsonData.json();
  insertStudentList("all");
}

function insertStudentList(filterBy) {
  destStudentList.innerHTML = "";

  sortStudents();

  filteredStudents = students.filter(
    student => filterBy === "all" || student.house === filterBy
  );

  filteredStudents.forEach(student => {
    let nameArray = `${student.fullname}`.split(" ");

    student.firstname = nameArray[0];
    student.lastname = nameArray[1];

    let template = `
                <li class="student ${student.house}" data-firstname="${
      nameArray[0]
    }" data-lastname="${nameArray[1]}" data-house="${student.house}">
                        <h2 class="name">${student.fullname}</h2>
                        <p class="house">${student.house}</p>
                </li>
                `;

    destStudentList.insertAdjacentHTML("beforeend", template);
  });
}
