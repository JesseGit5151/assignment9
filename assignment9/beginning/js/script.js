// CREATE AN ARRAY OF EMPLOYEES
let employeeArr = [
    [12345678, 'Tom Harris', 1234, 'jr@yh.com', 'administrative'],
    [23456789, 'Ted cramer',3456, 'jr@yh.com', 'administrative'],
    [34567890, 'Phil Due', 2222, 'jr@yh.com', 'administrative']
]

// CHECK TO SEE IF STORAGE OBJECT EXISTS WHEN THE PAGE LOADS
// IF DOES, RETURN STORAGE OBJECT INTO ARRAY INSTEAD OF POPULATED ARRAY
if (localStorage.getItem('employees')) {
    employeeArr = localStorage.getItem('employees')
}

// GET DOM ELEMENTS
let form = document.querySelector('#addForm')
let empTable = document.querySelector('#employees')
let empCount = document.querySelector('#empCount')
// BUILD THE EMPLOYEES TABLE WHEN THE PAGE LOADS
buildGrid(employeeArr)

// ADD EMPLOYEE
form.addEventListener('submit', (e) => {
    // PREVENT FORM SUBMISSION
    e.preventDefault()
    // GET THE VALUES FROM THE TEXT BOXES
    let empId = parseInt(document.querySelector('#id').value)
    let empName = document.querySelector('#name').value
    let empExt = parseInt(document.querySelector('#extension').value)
    let empEmail = document.querySelector('#email').value
    let empDepartment = document.querySelector('#department').value
    
    // ADD THE NEW EMPLOYEE TO A NEW ARRAY OBJECT
    let newEmployee = [empId, empName, empExt, empEmail, empDepartment]
    // PUSH THE NEW ARRAY TO THE *EXISTING* EMPLOYEES ARRAY
    employeeArr.push(newEmployee)
    // BUILD THE GRID
    buildGrid(employeeArr)
    // RESET THE FORM
    document.querySelector('#addForm').reset()
    // SET FOCUS BACK TO THE ID TEXT BOX
    document.querySelector('#id').focus()
});

// DELETE EMPLOYEE
empTable.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        // CONFIRM THE DELETE
        if (confirm('Are you sure you want to delete this User?')) {
            // GET THE SELECTED ROWINDEX FOR THE TR (PARENTNODE.PARENTNODE)
            let rowIndex = e.target.parentNode.parentNode.rowIndex
            console.log(rowIndex)
            // CALL DELETEROW() METHOD TO DELETE SPECIFIC ROW IN THE TABLE
            empTable.deleteRow(rowIndex)
            // REMOVE EMPLOYEE FROM ARRAY
            employeeArr.splice(rowIndex - 1, 1)
            // BUILD THE GRID
            buildGrid(employeeArr)
        }
    }

});

// BUILD THE EMPLOYEES GRID
function buildGrid(employeeArr) {
    // REMOVE THE EXISTING SET OF ROWS BY REMOVING THE ENTIRE TBODY SECTION
    empTable.lastElementChild.remove()
    // REBUILD THE TBODY FROM SCRATCH
    let tbody = document.createElement('tbody')
    // LOOP THROUGH THE ARRAY OF EMPLOYEES
    // REBUILDING THE ROW STRUCTURE
    for(employee of employeeArr) {
        tbody.innerHTML += 
        `<tr>
            <td>${employee[0]}</td>
            <td>${employee[1]}</td>
            <td>${employee[2]}</td>
            <td>${employee[3]}</td>
            <td>${employee[4]}</td>
            <td><button class = "btn btn-danger btn-sm delete">X</button></td>
        </tr>`
    }

    // BIND THE TBODY TO THE EMPLOYEE TABLE
    empTable.appendChild(tbody)
    // UPDATE EMPLOYEE COUNT
    empCount.value =    `(${employeeArr.length})`
    // STORE THE ARRAY IN STORAGE
    localStorage.setItem('employees', employeeArr)
};