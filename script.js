document.addEventListener("DOMContentLoaded", start);

// ----- INSERT STUDENTS IN LIST -----

destStudentList = document.querySelector("#student_list");

function start() {
  console.log(destStudentList);
}

async function getStudentList() {
  let pagesUrl = "students1991.json";
  let jsonData = await fetch(pagesUrl);
  section = await jsonData.json();
  insertStudentList();
}

function insertStudentList() {
  section.forEach(section => {
    let template = `
                <li class="student  ${section.house}">
                        <h2 class="name">${section.fullname}</h2>
                        <p class="house">${section.house}</p>
                </li>
                `;

    destStudentList.insertAdjacentHTML("beforeend", template);
  });
}

getStudentList();
