// document.getElementById("button_add_course").onclick = add;
document.getElementById("button_calculate").onclick = calculate;
document.getElementById("input_semester").onchange = updateSemester;
document.getElementById("button_update_courses").onclick = generateCourses;

var credits_1 = [];
var grades_1 = [];
var credits_2 = [];
var grades_2 = [];

var grades = ["Select", "A*", "A", "B+", "B", "C+", "C", "D+", "D", "E", "F", "I"];

function generateCourses() {
    var branch = document.getElementById("input_branch").selectedIndex;
    var elc_sem = document.getElementById("elc_semester").selectedIndex;
    var table1 = document.getElementById("table_courses_1");
    var table2 = document.getElementById("table_courses_2");

    document.getElementById("tbody_1").innerHTML = "";
    document.getElementById("tbody_2").innerHTML = "";

    insertRow(table1, "MTH111", 6);
    insertRow(table1, "MTH112", 6);
    insertRow(table2, "MTH113", 6);
    insertRow(table2, "MTH114", 6);

    switch (branch) {
        case 0:
            insertRow(table1, "PHY112", 11);
            insertRow(table2, "PHY115", 11);
            break;
        case 1:
            insertRow(table1, "PHY115", 11);
            insertRow(table2, "PHY112", 11);
            break;
        case 2:
            insertRow(table1, "PHY112", 11);
            insertRow(table2, "PHY115", 11);
            break;
        case 3:
            insertRow(table1, "PHY112", 11);
            insertRow(table2, "PHY113", 11);
            break;
        case 4:
            insertRow(table1, "PHY112", 11);
            insertRow(table2, "PHY113", 11);
            break;
        case 5:
            insertRow(table1, "PHY114", 11);
            insertRow(table2, "PHY113", 11);
            break;
        case 6:
            insertRow(table1, "PHY115", 11);
            insertRow(table2, "PHY112", 11);
            break;
        case 7:
            insertRow(table1, "PHY113", 11);
            insertRow(table2, "PHY114", 11);
            break;
        case 8:
            insertRow(table1, "PHY115", 11);
            insertRow(table2, "PHY112", 11);
            break;
        case 9:
            insertRow(table1, "PHY113", 11);
            insertRow(table2, "PHY115", 11);
            break;
        case 10:
            insertRow(table1, "PHY114", 11);
            insertRow(table2, "PHY113", 11);
            break;
        case 11:
            insertRow(table1, "PHY115", 11);
            insertRow(table2, "PHY114", 11);
            break;
        case 12:
            insertRow(table1, "PHY113", 11);
            insertRow(table2, "PHY112", 11);
            break;
        case 13:
            insertRow(table1, "PHY115", 11);
            insertRow(table2, "PHY114", 11);
            break;
    }

    if (elc_sem === 1) {
        insertRow(table1, "ESC111", 7);
        insertRow(table1, "ESC112", 7);
        insertRow(table1, "LIF111", 6);
        insertRow(table1, "CHM111", 3);
        insertRow(table2, "ELC111", 9);
        insertRow(table2, "CHM112", 4);
        insertRow(table2, "CHM113", 4);
        insertRow(table2, "TA111", 9);
        insertRow(table2, "PHY111", 3);
    } else {
        insertRow(table1, "ELC111", 9);
        insertRow(table1, "CHM112", 4);
        insertRow(table1, "CHM113", 4);
        insertRow(table1, "TA111", 9);
        insertRow(table1, "PHY111", 3);
        insertRow(table2, "ESC111", 7);
        insertRow(table2, "ESC112", 7);
        insertRow(table2, "LIF111", 6);
        insertRow(table2, "CHM111", 3);
    }
}

function updateSemester() {
    console.log("onchange called");
    var semester = document.getElementById("input_semester");
    var sem = semester.options[semester.selectedIndex].value;
    if (sem === "sem1") {
        document.getElementById("table_courses_1").style.display = "block";
        document.getElementById("table_courses_2").style.display = "none";
    }
    if (sem === "sem2") {
        document.getElementById("table_courses_2").style.display = "block";
        document.getElementById("table_courses_1").style.display = "none";
    }
}

function calculate() {
    var table1 = document.getElementById("table_courses_1");
    var table2 = document.getElementById("table_courses_2");

    var sem1 = 0;
    var cred1 = 0;
    var sem2 = 0;
    var cred2 = 0;
    var tbody1 = document.getElementById("tbody_1");
    var tbody2 = document.getElementById("tbody_2");
    
    var ok = 1;
    for (let row of tbody1.children) {
        var grade_selector = row.children[2].children[0];
        var grade = getGrade(grade_selector.options[grade_selector.selectedIndex].innerHTML);
        var cred = row.children[1].innerHTML;
        if (grade < 0) {
            ok=0;
            break;
        }
        sem1 += parseInt(cred)*parseInt(grade);
        cred1 += parseInt(cred);
    }
    if (ok === 1) {
        sem1 /= cred1;
        document.getElementById("sem1_spi").innerHTML = "SPI for 1st Semester = " + sem1;
    }

    ok = 1;
    for (let row of tbody2.children) {
        var grade_selector = row.children[2].children[0];
        var grade = getGrade(grade_selector.options[grade_selector.selectedIndex].innerHTML);
        var cred = row.children[1].innerHTML;
        if (grade < 0) {
            ok = 0;
            break;
        }
        sem2 += parseInt(cred)*parseInt(grade);
        cred2 += parseInt(cred);
    }
    if (ok === 1) {
        sem2 /= cred2;
        document.getElementById("sem2_spi").innerHTML = "SPI for 2nd Semester = " + sem2;
        document.getElementById("cpi").innerHTML = "CPI = " + (sem2*cred2 + sem1*cred1) / (cred1+cred2);
    }
}

function getGrade(grade) {
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
        case "Select":
            temp = -1;
            break;
    }

    return temp;
}

function insertRow(table, course, credits) {
    var row = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");

    td1.innerHTML = course;
    td2.innerHTML = credits;

    var selector = document.createElement("select");
    for (var i = 0; i < grades.length; i++) {
        var option = document.createElement("option");
        option.value = grades[i];
        option.text = grades[i];
        selector.appendChild(option);
    }
    td3.appendChild(selector);

    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td3);

    table.children[1].appendChild(row);
}