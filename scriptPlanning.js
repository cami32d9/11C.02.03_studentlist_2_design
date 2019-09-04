// ----- PLANNING ----- //
/* 

-- FILES
index.html
script.js
style.css
students1991.json

-- VARIABLES
studentListDest
studentModalDest
fullName
firstName
lastName
house
sortedBy
filteredBy

-- STUDENT LIST MUST INCLUDE (INFORMATION)
<li class="student ${house}" data-firstname="${firstname}" data-lastname="${lastname}" data-house="${house}">
- <h2>Full name</h2>
- <h3>House</h3>
- <img>Photo of student</img>
- <img>Crest</img>
</li>


-- MODAL WINDOW MUST INCLUDE
<div class="hide_list">Makes student list inactive</div>
<div class="modal" style="Styled by house">Contains all student information</div>
<button>Close window-button</button>


-- FUNCTIONS
----- ✓ YES, I know how to make it
----- ~ YEAH, I think I know how to make it
----- | NAH, I might know how to make it
----- ÷ NO, I don't know how to make it

✓ Load JSON
✓ Split first- and last name
✓ Insert studentList
  ~ Sort by X
  ÷ Filter by X
~ Open studentModal

*/

// Eventlistener(DOMLoaded, start)

function start() {
/*  
    forEach sortButton > addEventListener("click", sort)
    forEach filterButton > addEventListener("click", filter)
*/
async function getStudentList() {
/* 
    Define JSON
    Load JSON
    insertStudentList()
*/
}

function insertStudentList() {
/*  
    destStudentList.innerHTML = ""

    students.filter(x) - how?
    students.sortBy(x) - how?

    forEach student =>
      let nameArray = fullname.split(" ")

      let template = `
      <li class="student ${house}" data-firstname="${firstname}" data-lastname="${lastname}" data-house="${house}">
      <h2>${fullname}</h2>
      <h3>${house}</h3>
      `
     studentListDest.innerHTML = insert template

      function openPopup() {
        studentModalDest.innerHTML = `
          <div class="modal ${house}">
          <h2>${fullname}</h2>
          <h3>${house}</h3>
          <p>${info}</p>
          <img class="student_photo">${studentPhoto}.jpg</img>
          <img class="crest">${house}.jpg</img>
      `
      modal.style.display = block
    }
*/
}