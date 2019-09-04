// ----- INSERT STUDENTS IN LIST -----

let firstname;
let lastname;

destStudentList = document.querySelector("#student_list");

async function getStudentList() {
  let pagesUrl = "students1991.json";
  let jsonData = await fetch(pagesUrl);
  section = await jsonData.json();
  insertStudentList();
}

function insertStudentList() {
  section.forEach(section => {
    let nameArray = `${section.fullname}`.split(" ");

    let template = `
                <li class="student ${section.house}" data-firstname="${
      nameArray[0]
    }" data-lastname="${nameArray[1]}" data-house="${section.house}">
                        <h2 class="name">${section.fullname}</h2>
                        <p class="house">${section.house}</p>
                </li>
                `;

    destStudentList.insertAdjacentHTML("beforeend", template);
  });
}

getStudentList();
