
document.getElementById("button_add_course").onclick = add;
document.getElementById("button_calculate").onclick = calculate;

var credits_1 = [];
var grades_1 = [];
var credits_2 = [];
var grades_2 = [];

function calculate() {
    var spi = 0;
    var cred = 0;
    for (var i = 0; i < credits_1.length; i++) {
        spi += credits_1[i]*grades_1[i];
        cred += credits_1[i];
    }
    spi = spi / cred;
    document.getElementById("sem1_spi").innerHTML = "SPI for 1st Semester = " + spi;
    spi = 0;
    cred = 0;
    for (var i = 0; i < credits_2.length; i++) {
        spi += credits_2[i]*grades_2[i];
        cred += credits_2[i];
    }
    if (cred != 0) spi = spi / cred;
    document.getElementById("sem2_spi").innerHTML = "SPI for 2nd Semester = " + spi;
    spi *= cred;
    for (var i = 0; i < credits_1.length; i++) {
        spi += credits_1[i]*grades_1[i];
        cred += credits_1[i];
    }
    if (cred != 0) spi = spi / cred;
    document.getElementById("cpi").innerHTML = "Overall CPI = " + spi;
}

function add() {
    var semester = document.getElementById("input_semester");
    var grade_selector = document.getElementById("input_grade");
    var course = document.getElementById("input_course").value;
    var credits = document.getElementById("input_credits").value;
    var grade = grade_selector.options[grade_selector.selectedIndex].innerHTML;
    var sem = semester.options[semester.selectedIndex].value;

    if (course === "" || credits === "") {
        window.alert("Please fill all the fields!");
        return;
    }

    var temp = 0;
    switch (grade) {
        case "A*":
        case "A":
            temp=10;
            break;
        case "B+":
            temp=9;
            break;
        case "B":
            temp=8;
            break;
        case "C+":
            temp=7;
            break;
        case "C":
            temp=6;
            break;
        case "D+":
            temp=5;
            break;
        case "D":
            temp=4;
            break;
        case "E":
        case "F":
        case "I":
            temp = 0;
            break;
    }

    if (sem==="sem1") {
        insertRow(document.getElementById("table_courses_1"), course, credits, grade);
        credits_1.push(parseInt(credits));
        grades_1.push(temp);
    }
    if (sem==='sem2') {
        insertRow(document.getElementById("table_courses_2"), course, credits, grade);
        credits_2.push(parseInt(credits));
        grades_2.push(temp);
    }
}

function insertRow(table, course, credits, grade) {
    var row = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");

    td1.innerHTML = course;
    td2.innerHTML = credits;
    td3.innerHTML = grade;

    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td3);

    table.children[0].appendChild(row);
}