import { solvingMTZ, responseObj } from '../index.js'


let selectMatrixSizes = document.querySelectorAll('.select-size');
let createMatrixbtn = document.querySelector('.create-matrix');
let matrixPanel = document.querySelector('#step1');
let matrixSizePanel = document.querySelector('#online');
let solveMatrixBtn = document.querySelector('.solve-matrix');
let solvePanel = document.querySelector("#solution");
let solveMethodInp;
let nullMatrixData;

//Transfer data
let kolPR = 2;
let kolSTR = 2;

let trafficxMatrixArray = [];//cost
let reservesArr = [];//have
let needsArr = [];//need
let tempArr = [];//tempArr for methods
let tempNArr = [];
let tempRArr = [];
let solveMethod = 0;


selectMatrixSizes.forEach(e => {
    e.addEventListener("change", event => {
        if (event.target.name == "kolPR") {
            kolPR = Number(event.target.value);
        }
        if (event.target.name == "kolSTR") {
            kolSTR = Number(event.target.value);
        }
    })
})

createMatrixbtn.addEventListener('click', e => {
    matrixPanel.classList.add("active");
    matrixSizePanel.classList.remove("active");
    createNullMatrix(kolPR, kolSTR);
    nullMatrixData = document.querySelectorAll('.traffic-matrix tbody input');
    solveMethodInp = document.querySelector('.method');
    solveMethodInp.addEventListener("change", e => {
        solveMethod = e.target.value;
    })

    //console.log(nullMatrixData)
    // debugger;
    // console.log(trafficMatrix);
})


//////////////// step1 ////////////////////
const trafficMatrix = document.querySelector('.traffic-matrix tbody');

function createNullMatrix(kolPR, kolSTR) {
    let ab_tr, ab_td, a_elem, b_elem, i, j;

    for (i = 1; i <= kolSTR; i++) {

        ab_tr = document.createElement('tr');
        // if (i == 1) {
        //     // ab_td = document.createElement('td');
        //     // ab_td.rowSpan = m1;
        //     // ab_td.style.verticalAlign = 'middle';
        //     // ab_td.innerHTML = "<i>C</i> = ";
        //     // ab_tr.appendChild(ab_td);
        // }
        for (j = 1; j <= kolPR; j++) {
            ab_td = document.createElement('td');
            a_elem = document.createElement('input');
            a_elem.type = 'text';
            a_elem.size = 6;
            a_elem.classList.add("form-control");
            a_elem.id = 'C(' + i + ',' + j + ')';
            ab_td.appendChild(a_elem);
            // if (j == 1) {
            //     ab_td.style.borderLeft = '2px solid black';
            // }
            // else if (j == kolPR) {
            //     ab_td.style.borderRight = '2px solid black';
            // }
            ab_tr.appendChild(ab_td);
        }

        ab_td = document.createElement('td');
        b_elem = document.createElement('input');
        b_elem.type = 'text';
        b_elem.size = 6;
        b_elem.classList.add("form-control");
        b_elem.style.backgroundColor = "#b0e0e6";
        b_elem.id = 'a(' + i + ')';
        // b_elem.value = 1;
        ab_td.appendChild(b_elem);
        ab_tr.appendChild(ab_td);
        trafficMatrix.appendChild(ab_tr);
        if (i == kolSTR) {
            // ab_tr = document.createElement('tr');
            // ab_td = document.createElement('td');
            // ab_td.setAttribute('colspan', kolPR + 3);
            // ab_td.innerHTML = '&nbsp;';
            // ab_tr.appendChild(ab_td);
            // trafficMatrix.appendChild(ab_tr);
        }
    }
    ab_tr = document.createElement('tr');

    for (j = 1; j <= kolPR; j++) {
        ab_td = document.createElement('td');
        a_elem = document.createElement('input');
        a_elem.type = 'text';
        a_elem.size = 6;
        a_elem.classList.add("form-control");
        a_elem.style.backgroundColor = "#b0e0e6";
        a_elem.id = 'B(' + j + ')';
        // a_elem.value = 1;
        ab_td.appendChild(a_elem);
        ab_tr.appendChild(ab_td);
    }

    // ab_td = document.createElement('td');
    // ab_td.innerHTML = "&nbsp;";
    // ab_td.colSpan = 2;
    // ab_tr.appendChild(ab_td);

    trafficMatrix.appendChild(ab_tr);
}

solveMatrixBtn.addEventListener('click', (e) => {
    solveMethodInp = document.querySelector('input-group input');
    addValuesFromMatrix(trafficxMatrixArray, reservesArr, needsArr, kolSTR);
    solvingMTZ(trafficxMatrixArray, reservesArr, needsArr, kolSTR, kolPR, solveMethod);
    console.log(responseObj);
    displayData();
})

function addValuesFromMatrix(trafficxMatrixArray, reservesArr, needsArr, kolSTR) {
    for (let i = 0; i < kolSTR; i++) {
        trafficxMatrixArray.push([]);
    }

    nullMatrixData.forEach((e) => {
        let currentLetter = e.id.slice(0, 1).toLowerCase();
        let currentValue = e.id.slice(2, e.id.length - 1).split(",");
        if (currentLetter == "c") {
            trafficxMatrixArray[currentValue[0] - 1][currentValue[1] - 1] = Number(e.value);
        } else if (currentLetter == "a") {
            reservesArr[currentValue[0] - 1] = Number(e.value);
        } else if (currentLetter == "b") {
            needsArr[currentValue[0] - 1] = Number(e.value);
        }
    })

    for (let i = 0; i < trafficxMatrixArray.length; i++) {
        tempArr.push([]);
        for (let j = 0; j < trafficxMatrixArray[i].length; j++) {
            tempArr[i][j] = trafficxMatrixArray[i][j];
        }
    }
    tempNArr = needsArr.slice();
    tempRArr = reservesArr.slice();
}

//решение матрицы (мин элемент и северозап угол)

function createTable(quest, kolPR, kolSTR, nextId) { //создание таблицы с <table>
    let ab_table, ab_tbody, ab_tr, ab_td, a_elem, b_elem,
        i, j, m, n;

    if (quest == "full") {
        m = kolSTR + 1;
        n = kolPR + 1; // 2 добавляет еще столбец (для < m-n)
    } else {
        m = kolSTR;
        n = kolPR;
    }

    ab_table = document.createElement('table');
    ab_table.id = 'table_' + nextId;
    ab_table.classList.add('traffic-matrix');
    ab_tbody = document.createElement('tbody');
    for (i = 1; i <= m; i++) {
        ab_tr = document.createElement('tr');

        for (j = 1; j <= n; j++) {
            ab_td = document.createElement('td');
            a_elem = document.createElement('input');
            a_elem.type = 'text';
            a_elem.size = 6;
            a_elem.readOnly = true;
            a_elem.classList.add("form-control");
            a_elem.name = 'C(' + i + ',' + j + ')';
            if (i == 1 && j != 1 && quest == "full") {
                a_elem.value = `B${j - 1}`;
            }
            if (i != 1 && j == 1 && quest == "full") {
                a_elem.value = `A${i - 1}`;
                a_elem.size = 10;
            }
            if (j == 1 && quest == "full") {
                a_elem.size = 10;
            }
            ab_td.appendChild(a_elem);
            ab_tr.appendChild(ab_td);
        }

        ab_td = document.createElement('td');
        b_elem = document.createElement('input');
        b_elem.type = 'text';
        if (i == 1 && quest == "full") {
            b_elem.value = "Запасы"
        }
        b_elem.size = 10;
        b_elem.classList.add("form-control");
        b_elem.style.backgroundColor = "#b0e0e6";
        b_elem.readOnly = true;
        b_elem.name = 'a(' + i + ')';
        ab_td.appendChild(b_elem);
        ab_tr.appendChild(ab_td);
        ab_tbody.appendChild(ab_tr);
    }
    ab_tr = document.createElement('tr');

    for (j = 1; j <= n; j++) {
        ab_td = document.createElement('td');
        a_elem = document.createElement('input');
        a_elem.type = 'text';
        a_elem.size = 6;

        if (j == 1 && quest == "full") {
            a_elem.value = "Потребности";
            a_elem.size = 10;
        }

        a_elem.classList.add("form-control");
        a_elem.readOnly = true;
        a_elem.style.backgroundColor = "#b0e0e6";
        a_elem.name = 'B(' + j + ')';
        ab_td.appendChild(a_elem);
        ab_tr.appendChild(ab_td);
    }
    ab_td = document.createElement('td');
    ab_tr.appendChild(ab_td);
    ab_tbody.appendChild(ab_tr);
    ab_table.appendChild(ab_tbody);
    solvePanel.appendChild(ab_table);
}

function createSpan(to, text) {
    let e_span = document.createElement('span');
    let e_br = document.createElement('br');
    e_span.style.display = "block";
    e_span.innerHTML = text;
    to.appendChild(e_br);
    to.appendChild(e_span);

}

//Функция отображения и отрисовки данных
function displayData() {

    for (let i = 0; i < responseObj.dataForRP.checkBalanceText.length; i++) {
        createSpan(solvePanel, responseObj.dataForRP.checkBalanceText[i]);
    }

    let idForTables = 1;
    createTable("full", kolPR, kolSTR, idForTables++);
    let t1 = document.querySelectorAll("#table_1 tr");

    fillTable(t1, 'full', 0)

    createSpan(solvePanel, responseObj.dataForRP.stageText[0]);

    createSpan(solvePanel, responseObj.dataForRP.methodText[0])

    for (let i = 0; i < responseObj.referencePlan.i.length; i++) {
        createSpan(solvePanel, responseObj.dataForRP.methodText[i + 1])
        createTable("", kolPR, kolSTR, idForTables++);
        t1 = document.querySelectorAll(`#table_${idForTables - 1} tr`);
        fillTable(t1, 'method1', i)
    }

    if (responseObj.referencePlan.add_i.length == 0) {
        createSpan(solvePanel, "");
    } else {
        createSpan(solvePanel, responseObj.dataForRP.methodText[responseObj.dataForRP.methodText.length - 1]);
    }


    createTable("", kolPR, kolSTR, "pre_res");
    t1 = document.querySelectorAll(`#table_pre_res tr`);
    fillTable(t1, 'pre_res');

    if (responseObj.referencePlan.add_i.length != 0) { // сделать пока != 6 вывод иначе стоп
        for (let i = 0; i < responseObj.referencePlan.add_i.length; i++) {
            createSpan(solvePanel, `Искомый элемент равен C[${responseObj.referencePlan.add_i[i]}][${responseObj.referencePlan.add_j[i]}]=${trafficxMatrixArray[responseObj.referencePlan.add_i[i]][responseObj.referencePlan.add_j[i]]},
         но т.к. ограничения выполнены, то X[${responseObj.referencePlan.add_i[i]}][${responseObj.referencePlan.add_j[i]}]=0. `)
        }
    }

    createTable("full", kolPR, kolSTR, "method_res");
    t1 = document.querySelectorAll("#table_method_res tr");
    fillTable(t1, 'res');


}

function fillTable(table, quest, iteration) { //заполняет таблицу первоначальными данными (пока)
    if (quest == "full") {
        // for (let i = 0; i < responseObj.referencePlan.i.length; i++) {
        table.forEach((e, pos) => {
            //if (pos > 0 ) {
            e.querySelectorAll("td input").forEach((t, posT) => {
                if (pos > trafficxMatrixArray.length && posT > 0 && posT <= trafficxMatrixArray[0].length) {
                    t.value = needsArr[posT - 1];
                } else
                    if (pos > 0 && posT > 0 && pos <= trafficxMatrixArray[0].length && posT <= trafficxMatrixArray[0].length) {
                        t.value = trafficxMatrixArray[pos - 1][posT - 1];
                    } else
                        if (pos > 0 && posT > 0 && pos <= trafficxMatrixArray.length && posT <= trafficxMatrixArray[0].length) {
                            t.value = trafficxMatrixArray[pos - 1][posT - 1];
                        } else
                            if (pos > 0 && posT == trafficxMatrixArray[0].length + 1) {
                                t.value = reservesArr[pos - 1];
                            }

            })
        })
        //  }
    }
    if (quest == "pre_res") {

        table.forEach((e, pos) => {
            e.querySelectorAll('td input').forEach((t, posT) => {
                if (pos >= trafficxMatrixArray.length) {
                    t.value = needsArr[posT];
                } else
                    if (posT >= trafficxMatrixArray[0].length) {
                        t.value = reservesArr[pos];
                    } else
                        if (posT < trafficxMatrixArray[0].length) {
                            t.value = trafficxMatrixArray[pos][posT];
                            for (let i = 0; i <= responseObj.referencePlan.i.length; i++) {
                                if ((pos == responseObj.referencePlan.i[i]) && (posT == responseObj.referencePlan.j[i])) {
                                    t.style.backgroundColor = "#ffa0a0";
                                }
                            }
                        }
            })
        })

    }
    if (quest == "res") {
        //for (let i = 0; i < responseObj.referencePlan.i.length; i++) {
        table.forEach((e, pos) => {
            e.querySelectorAll("td input").forEach((t, posT) => {
                if (pos > trafficxMatrixArray.length && posT > 0 && posT <= trafficxMatrixArray[0].length) {
                    t.value = needsArr[posT - 1];
                } else
                    if (pos > 0 && posT > 0 && pos <= trafficxMatrixArray[0].length && posT <= trafficxMatrixArray[0].length) {
                        t.value = trafficxMatrixArray[pos - 1][posT - 1];
                        for (let i = 0; i <= responseObj.referencePlan.i.length; i++) {
                            if (((pos - 1) == responseObj.referencePlan.add_i[i]) && ((posT - 1) == responseObj.referencePlan.add_j[i])) {
                                t.style.backgroundColor = "#ffa0a0";
                                t.value = trafficxMatrixArray[pos - 1][posT - 1] + `[0]`;
                            }
                            if (((pos - 1) == responseObj.referencePlan.i[i]) && ((posT - 1) == responseObj.referencePlan.j[i])) {
                                t.style.backgroundColor = "#ffa0a0";
                                t.value = trafficxMatrixArray[pos - 1][posT - 1] + `[${responseObj.referencePlan.minVolume[i]}]`
                            }
                        }
                    } else
                        if (pos > 0 && posT > 0 && pos <= trafficxMatrixArray.length && posT <= trafficxMatrixArray[0].length) {
                            t.value = trafficxMatrixArray[pos - 1][posT - 1];
                            for (let i = 0; i <= responseObj.referencePlan.i.length; i++) {
                                if (((pos - 1) == responseObj.referencePlan.add_i[i]) && ((posT - 1) == responseObj.referencePlan.add_j[i])) {
                                    t.style.backgroundColor = "#ffa0a0";
                                    t.value = trafficxMatrixArray[pos - 1][posT - 1] + `[0]`;
                                }
                                if (((pos - 1) == responseObj.referencePlan.i[i]) && ((posT - 1) == responseObj.referencePlan.j[i])) {
                                    t.style.backgroundColor = "#ffa0a0";
                                    t.value = trafficxMatrixArray[pos - 1][posT - 1] + `[${responseObj.referencePlan.minVolume[i]}]`
                                }
                            }
                        } else
                            if (pos > 0 && posT == trafficxMatrixArray[0].length + 1) {
                                t.value = reservesArr[pos - 1];
                            }

            })
        })
    }
    //  }
    if (quest == "method1") {

        for (let i = 0; i < tempArr.length; i++) {
            for (let j = 0; j < tempArr[i].length; j++) {
                if ((i == responseObj.referencePlan.i[iteration]) && (j != responseObj.referencePlan.j[iteration])) {//вся строка кроме самого элемента
                    if ((responseObj.referencePlan.minVolume[iteration] == responseObj.referencePlan.needs[iteration]) && (responseObj.referencePlan.needs[iteration] == responseObj.referencePlan.reserves[iteration])) { //если n = r

                        tempArr[i][j] = "X";
                        // tempRArr[i] = `${tempRArr[i]}-${tempRArr[i]} = 0 `;
                    }
                    if ((responseObj.referencePlan.minVolume[iteration] == responseObj.referencePlan.reserves[iteration]) && (responseObj.referencePlan.reserves[iteration] < responseObj.referencePlan.needs[iteration])) {// если
                        tempArr[i][j] = "X";
                    }
                }
                if ((j == responseObj.referencePlan.j[iteration]) && (i != responseObj.referencePlan.i[iteration])) { //всесь столбец кроме самого элемента
                    if ((responseObj.referencePlan.minVolume[iteration] == responseObj.referencePlan.needs[iteration]) && (responseObj.referencePlan.needs[iteration] == responseObj.referencePlan.reserves[iteration])) {
                        tempArr[i][j] = "X";
                        //tempRArr[i] = `${tempNArr[i].toString()} - ${responseObj.referencePlan.minVolume[iteration]} = 0`
                        // tempNArr[i] = `${tempNArr[i]}-${tempNArr[i]} = 0 `;
                    }
                    if ((responseObj.referencePlan.minVolume[iteration] == responseObj.referencePlan.needs[iteration]) && (responseObj.referencePlan.needs[iteration] < responseObj.referencePlan.reserves[iteration])) {
                        tempArr[i][j] = "X";
                    }

                }
            }
        }

        if ((responseObj.referencePlan.minVolume[iteration] == responseObj.referencePlan.needs[iteration]) && (responseObj.referencePlan.needs[iteration] == responseObj.referencePlan.reserves[iteration])) {
            tempNArr[responseObj.referencePlan.j[iteration]] = `${tempNArr[responseObj.referencePlan.j[iteration]]} - ${responseObj.referencePlan.needs[iteration]} = ${responseObj.referencePlan.currentNeeds[iteration]}`;
            tempRArr[responseObj.referencePlan.i[iteration]] = `${tempRArr[responseObj.referencePlan.i[iteration]]} - ${responseObj.referencePlan.reserves[iteration]} = ${responseObj.referencePlan.currentReserves[iteration]}`;
        } else if ((responseObj.referencePlan.minVolume[iteration] == responseObj.referencePlan.reserves[iteration]) && (responseObj.referencePlan.reserves[iteration] < responseObj.referencePlan.needs[iteration])) {// если
            tempRArr[responseObj.referencePlan.i[iteration]] = `${tempRArr[responseObj.referencePlan.i[iteration]]} - ${responseObj.referencePlan.reserves[iteration]} = ${responseObj.referencePlan.currentReserves[iteration]}`;
            tempNArr[responseObj.referencePlan.j[iteration]] = `${tempNArr[responseObj.referencePlan.j[iteration]]} - ${responseObj.referencePlan.reserves[iteration]} = ${responseObj.referencePlan.currentNeeds[iteration]}`;
        } else if ((responseObj.referencePlan.minVolume[iteration] == responseObj.referencePlan.needs[iteration]) && (responseObj.referencePlan.needs[iteration] < responseObj.referencePlan.reserves[iteration])) {
            tempNArr[responseObj.referencePlan.j[iteration]] = `${tempNArr[responseObj.referencePlan.j[iteration]]} - ${responseObj.referencePlan.needs[iteration]} = ${responseObj.referencePlan.currentNeeds[iteration]}`;
            tempRArr[responseObj.referencePlan.i[iteration]] = `${tempRArr[responseObj.referencePlan.i[iteration]]} - ${responseObj.referencePlan.needs[iteration]} = ${responseObj.referencePlan.currentReserves[iteration]}`;
        }




        for (let i = 0; i < responseObj.referencePlan.i.length; i++) {//дикий костыль tempArr(i,j) = obj.minElem, доработать сверху
            tempArr[responseObj.referencePlan.i[i]][responseObj.referencePlan.j[i]] = responseObj.referencePlan.minElement[i];
        }

        // tempNArr[iteration] = `${tempNArr[iteration].toString()} - ${responseObj.referencePlan.minVolume[iteration]} = 0`

        //for (let i = 0; i < responseObj.referencePlan.i.length; i++) {

        table.forEach((e, pos) => {
            e.querySelectorAll('td input').forEach((t, posT) => {
                if (pos >= trafficxMatrixArray.length) {
                    t.value = tempNArr[posT];
                    if (typeof (tempNArr[posT]) != "number") {
                        tempNArr[posT] = Number(tempNArr[posT].substr(tempNArr[posT].indexOf("=") + 2));
                    }
                } else
                    if (posT >= trafficxMatrixArray[0].length) {
                        t.value = tempRArr[pos];
                        if (typeof (tempRArr[pos]) != "number") {
                            tempRArr[pos] = Number(tempRArr[pos].substr(tempRArr[pos].indexOf("=") + 2));
                        }
                    } else
                        if (posT < trafficxMatrixArray[0].length) {
                            if (tempArr[pos][posT] == "X") {
                                t.style.backgroundColor = "#ffa0a0";
                            }
                            t.value = tempArr[pos][posT];
                            for (let i = 0; i <= iteration; i++) {
                                if ((pos == responseObj.referencePlan.i[i]) && (posT == responseObj.referencePlan.j[i])) {
                                    t.style.backgroundColor = "#ffa0a0";
                                }
                            }
                        }
            })
        })
        // }
    }
}
