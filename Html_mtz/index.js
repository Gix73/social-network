let slovPanel = document.querySelector("#solution")
export let responseObj = {
    referencePlan: {
        minElement: [],
        reserves: [],
        needs: [],
        currentReserves: [],
        currentNeeds: [],
        minVolume: [],
        i: [],
        j: [],
        add_i: [],
        add_j: []
    },
    dataForRP: {
        methodText: [],
        checkBalanceText: [],
        stageText: ['Этап I. Поиск первого опорного плана. ', 'Этап II. Улучшение опорного плана. ', 'Анализ оптимального плана.']
    }


};


let m, n; //Размер таблицы
let u = [];
let v = []; //Потенциалы
let bazisYacheyki; //Базисные ячейки (занятые перевозками)
let iCikl = [];//Массивы с координатами цикла
let jCikl = []; //Массивы с координатами цикла
let arrCost, arrSpros, arrPredlojeniya, arrOtgruzki; // Массивы транспортной задачи
let i1, j1; //Ячейка начала цикла пересчета
let arrSprosOstatok, arrPredlojOstatok; //Массивы for( let метода "северо-западного угла"
let generatorRN;
let Fogel_I, Fogel_j;
let generSlychChisla; //Генератор случайных чисел

function Exemple1() {
    m = 4;
    n = 6;

    arrCost = new Array(m);            // создаем пустой Array длины `M`
    for (let i = 0; i < m; i++) {
        arrCost[i] = new Array(n);        // делаем каждый элемент массивом
    }


    //  arrCost = [[m+1], [n+1]]; что-то с индексами
    arrCost[0][0] = 2;
    arrCost[0][1] = 1;
    arrCost[0][2] = 3;
    arrCost[0][3] = 3;
    arrCost[0][4] = 2;
    arrCost[0][5] = 5;

    arrCost[1][0] = 3;
    arrCost[1][1] = 2;
    arrCost[1][2] = 2;
    arrCost[1][3] = 4;
    arrCost[1][4] = 3;
    arrCost[1][5] = 4;

    arrCost[2][0] = 3;
    arrCost[2][1] = 5;
    arrCost[2][2] = 4;
    arrCost[2][3] = 2;
    arrCost[2][4] = 4;
    arrCost[2][5] = 1;

    arrCost[3][0] = 4;
    arrCost[3][1] = 2;
    arrCost[3][2] = 2;
    arrCost[3][3] = 1;
    arrCost[3][4] = 2;
    arrCost[3][5] = 2;

    arrSpros = new Array(n);
    arrSpros[0] = 30;
    arrSpros[1] = 50;
    arrSpros[2] = 20;
    arrSpros[3] = 40;
    arrSpros[4] = 30;
    arrSpros[5] = 11;

    arrPredlojeniya = new Array(m);
    arrPredlojeniya[0] = 50;
    arrPredlojeniya[1] = 40;
    arrPredlojeniya[2] = 60;
    arrPredlojeniya[3] = 31;
    console.log(arrCost)

}

function Example2() {
    m = 4;
    n = 6;
    arrCost = new Array(m);            // создаем пустой Array длины `M`
    for (let i = 0; i < m; i++) {
        arrCost[i] = new Array(n);        // делаем каждый элемент массивом
    }
    arrCost[0][0] = 1;
    arrCost[0][1] = 2;
    arrCost[0][2] = 1;
    arrCost[0][3] = 4;
    arrCost[0][4] = 5;
    arrCost[0][5] = 2;

    arrCost[1][0] = 3;
    arrCost[1][1] = 3;
    arrCost[1][2] = 2;
    arrCost[1][3] = 1;
    arrCost[1][4] = 4;
    arrCost[1][5] = 3;

    arrCost[2][0] = 4;
    arrCost[2][1] = 2;
    arrCost[2][2] = 5;
    arrCost[2][3] = 9;
    arrCost[2][4] = 6;
    arrCost[2][5] = 2;

    arrCost[3][0] = 3;
    arrCost[3][1] = 1;
    arrCost[3][2] = 7;
    arrCost[3][3] = 3;
    arrCost[3][4] = 4;
    arrCost[3][5] = 6;

    arrSpros = new Array(n);
    arrSpros[0] = 20;
    arrSpros[1] = 40;
    arrSpros[2] = 30;
    arrSpros[3] = 10;
    arrSpros[4] = 50;
    arrSpros[5] = 25;

    arrPredlojeniya = new Array(m);
    arrPredlojeniya[0] = 30;
    arrPredlojeniya[1] = 50;
    arrPredlojeniya[2] = 75;
    arrPredlojeniya[3] = 20;
}

function Example3() {
    m = 3;
    n = 5;
    arrCost = new Array(m + 1);            // создаем пустой Array длины `M`
    for (let i = 0; i < m + 1; i++) {
        arrCost[i] = new Array(n + 1);        // делаем каждый элемент массивом
    }
    arrCost[1][1] = 5;
    arrCost[1][2] = 3;
    arrCost[1][3] = 6;
    arrCost[1][4] = 2;
    arrCost[1][5] = 0;

    arrCost[2][1] = 4;
    arrCost[2][2] = 7;
    arrCost[2][3] = 9;
    arrCost[2][4] = 1;
    arrCost[2][5] = 0;

    arrCost[3][1] = 3;
    arrCost[3][2] = 4;
    arrCost[3][3] = 7;
    arrCost[3][4] = 5;
    arrCost[3][5] = 0;

    arrSpros = new Array(n + 1);
    arrSpros[1] = 16;
    arrSpros[2] = 18;
    arrSpros[3] = 30;
    arrSpros[4] = 25;
    arrSpros[5] = 1;

    arrPredlojeniya = new Array(m + 1);
    arrPredlojeniya[1] = 19;
    arrPredlojeniya[2] = 37;
    arrPredlojeniya[3] = 34;

}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

//Функция распределяет arrOtgruzki[i][j простейшим методом "северо-западного угла"
//Также заполняет bazisYacheyki[i][j] значениями 1 или 0 (если есть ненулевая 
//отгрузка, то ячейка - базисная).
function SeveroZapodYgl() { //Fix Возможно проблемма тут

    for (let j = 0; j < n; j++) {
        arrSprosOstatok[j] = arrSpros[j];
    }

    for (let i = 0; i < m; i++) {
        arrPredlojOstatok[i] = arrPredlojeniya[i];
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            bazisYacheyki[i][j] = 0;
            arrOtgruzki[i][j] = 0;
        }
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (arrPredlojOstatok[i] == 0) {
                break;
            }
            else if (arrPredlojOstatok[i] < 0) {
                throw ("Ошибка: остаток предложения меньше 0");
            }

            let chObjem = arrSprosOstatok[j];
            if (chObjem == 0) {
                continue;
            }
            else if (chObjem < 0) {
                throw ("Ошибка: остаток спроса меньше 0");
            }

            if (arrPredlojOstatok[i] < chObjem) {
                chObjem = arrPredlojOstatok[i];
            }

            responseObj.referencePlan.i.push(i);
            responseObj.referencePlan.j.push(j);
            responseObj.referencePlan.minElement.push(arrCost[i][j]);
            responseObj.referencePlan.needs.push(arrSprosOstatok[j]);
            responseObj.referencePlan.reserves.push(arrPredlojOstatok[i]);
            responseObj.referencePlan.minVolume.push(chObjem);

            responseObj.dataForRP.methodText.push(`Искомый элемент равен C[${i + 1}][${j + 1}]=${arrCost[i][j]}. Для этого элемента запасы равны ${arrPredlojOstatok[i]}, потребности ${arrSprosOstatok[j]}. Поскольку минимальным является ${chObjem}, то вычитаем его. `)

            arrSprosOstatok[j] = arrSprosOstatok[j] - chObjem;
            arrPredlojOstatok[i] = arrPredlojOstatok[i] - chObjem;

            responseObj.referencePlan.currentNeeds.push(arrSprosOstatok[j]);
            responseObj.referencePlan.currentReserves.push(arrPredlojOstatok[i]);

            bazisYacheyki[i][j] = 1;
            arrOtgruzki[i][j] = chObjem;



        }
    }
    responseObj.dataForRP.methodText.push(`Далее, согласно алгоритму, ищем элементы среди не вычеркнутых.`);
}

//Метод минимальных тарифов - сначала отгружает ; < путям с на именьшей стоимостью.
function MethodMinTarifov() {

    for (let j = 0; j < n; j++) {
        arrSprosOstatok[j] = arrSpros[j];
    }
    console.log(arrSprosOstatok)

    for (let i = 0; i < m; i++) {
        arrPredlojOstatok[i] = arrPredlojeniya[i];
    }
    console.log(arrPredlojOstatok)

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            bazisYacheyki[i][j] = 0;
            arrOtgruzki[i][j] = 0;
        }
    }

    for (let q = 0; q < m * n; q++) { // Максимальное число итераций й-????????? пусть будет j
        let minTarif = undefined; //НеОпределено = undefined;
        let i_min = undefined;
        let j_min = undefined;
        let VesbGruzRaspredelen = true;
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                if (bazisYacheyki[i][j] == 1) {
                    continue;
                }

                if (arrPredlojOstatok[i] == 0) {
                    continue;
                }
                else if (arrPredlojOstatok[i] < 0) {
                    throw ("Ошибка: остаток предложения меньше 0");
                }

                if (arrSprosOstatok[j] == 0) {
                    continue;
                }
                else if (arrSprosOstatok[j] < 0) {
                    throw ("Ошибка: остаток спроса меньше 0");
                }

                VesbGruzRaspredelen = false;

                let costC = arrCost[i][j]; //ц = costC
                if (minTarif == undefined) {
                    minTarif = costC;
                    i_min = i;
                    j_min = j;
                }
                else {
                    if (costC < minTarif) {
                        minTarif = costC;
                        i_min = i;
                        j_min = j;
                    }
                }
            }
        }
        let i = i_min;
        let j = j_min;

        if (VesbGruzRaspredelen == true) {
            responseObj.dataForRP.methodText.push(`Далее, согласно алгоритму, ищем элементы среди не вычеркнутых.`)
            return true;
        }
        if (minTarif == undefined) {
            throw ("Не удалось определить минимальный тариф");
        }

        //Минимальный тариф найден в ячейке i, j

        responseObj.referencePlan.i.push(i);
        responseObj.referencePlan.j.push(j);
        responseObj.referencePlan.minElement.push(arrCost[i][j]);
        responseObj.referencePlan.needs.push(arrSprosOstatok[j]);
        responseObj.referencePlan.reserves.push(arrPredlojOstatok[i]);

        console.log("Минимальный тариф найден в ячейке " + i + " " + j + " = " + arrCost[i][j])
        //  slovPanel.innerHTML += "Минимальный тариф найден в ячейке " + i + " " + j + " = " + arrCost[i][j]+'<br>';
        let chObjem = arrSprosOstatok[j];
        if (Number(arrPredlojOstatok[i]) < chObjem) {
            chObjem = arrPredlojOstatok[i];
        }

        responseObj.referencePlan.minVolume.push(chObjem);
        console.log("Объем в ячейке =" + chObjem);
        // slovPanel.innerHTML += "Объем в ячейке =" + chObjem + '<br>';

        responseObj.dataForRP.methodText.push(`Искомый элемент равен C[${i + 1}][${j + 1}]=${arrCost[i][j]}. Для этого элемента запасы равны ${arrPredlojOstatok[i]}, потребности ${arrSprosOstatok[j]}. Поскольку минимальным является ${chObjem}, то вычитаем его. `)

        arrSprosOstatok[j] = arrSprosOstatok[j] - chObjem;
        arrPredlojOstatok[i] = arrPredlojOstatok[i] - chObjem;

        responseObj.referencePlan.currentNeeds.push(arrSprosOstatok[j]);
        responseObj.referencePlan.currentReserves.push(arrPredlojOstatok[i]);

        bazisYacheyki[i][j] = 1;
        arrOtgruzki[i][j] = chObjem;

    }
    throw ("Не удалось распределить методом минимальных тарифов");
}

//Получение начального решения методом Фогеля (альтернатива двум предыдущим методам)
// function РаспределениеМетодомФогеля()
// for (let j = 0; < n {
// arrSprosOstatok[j] = arrSpros[j];
// }

//     for (let i = 0; < m {
// arrPredlojOstatok[i] = arrPredlojeniya[i];
// }

//         for (let i = 0; < m {
//         for(let j = 0; < n {
// bazisYacheyki[i][j] = 0;
//     arrOtgruzki[i][j] = 0;
// }
// }

// for (let й = 1; < 100 {

//     макс1 = undefined;
//     макс1_i = undefined;
//     for(let i = 0 ; <m {
//         if (arrPredlojOstatok[i] = 0){
//     continue;
// }
// delta = Фогель_РазницаМеждуМинимальнымиЦенамиПоСтроке(i);
// if (макс1_i = undefined) {
//     макс1 = delta;
//     макс1_i = i;
//     Иначе
//     if (макс1 < delta) {
//         макс1 = delta;
//         макс1_i = i;
//     }
// }
//         }


// макс2 = undefined;
// макс2_j = undefined;
// for (let j = 0; <n {
//             if (arrSprosOstatok[j] = 0){
//     continue;
// }
// delta = Фогель_РазницаМеждуМинимальнымиЦенамиПоСтолбцу(j);
// if (макс2_j = undefined) {
//     макс2 = delta;
//     макс2_j = j;
//     Иначе
//     if (макс2 < delta) {
//         макс2 = delta;
//         макс2_j = j;
//     }
// }
//             }

// if ((макс1 = undefined) и(макс2 = undefined) ) {
//     //Всё отгрузили
//     break;
// else if ((макс1 = undefined)) {
//         макс1 = макс2 - 1;
// else if ((макс2 = undefined)) {
//             макс2 = макс1 - 1;
//         }

//         if (макс1 > макс2) {
//             //Предпочтительна строка макс1_i
//             зн = Фогель_ПерваяМинимальнаяЦенаПоСтроке(макс1_i);
//             i = макс1_i;
//             j = Fogel_j;
//             Иначе
//             //Предпочтителен столбец макс2_j
//             зн = Фогель_ПерваяМинимальнаяЦенаПоСтолбцу(макс2_j);
//             i = Fogel_I;
//             j = макс2_j;
//         }

//         chObjem = arrSprosOstatok[j];
//         if (arrPredlojOstatok[i] < chObjem) {
//             chObjem = arrPredlojOstatok[i];
//         }
//         arrSprosOstatok[j] = arrSprosOstatok[j] - chObjem;
//         arrPredlojOstatok[i] = arrPredlojOstatok[i] - chObjem;
//         bazisYacheyki[i][j] = 1;
//         arrOtgruzki[i][j] = chObjem;
//     }
// }


// //Вычисляет первую минимальную цену в указанной строке
// //Обходит стороной ячейки, где остаток спроса = 0.
// //Возвращает минимальную цену, а j минимальной ячейки - в переменной Fogel_j
// function Фогель_ПерваяМинимальнаяЦенаПоСтроке(i)

// мин1 = undefined;
// Fogel_j = undefined;
// for (let j = 0; < n {
//         if (arrSprosOstatok[j] = 0){
//     continue;
//         else if (arrSprosOstatok[j] < 0) {
//         throw ("Ошибка: остаток спроса меньше 0");
//     }
//     ц = arrCost[i][j];
//     if (мин1 = undefined) {
//         мин1 = ц;
//         Fogel_j = j;
//         Иначе
//         if (мин1 > ц) {
//             мин1 = ц;
//             Fogel_j = j;
//         }
//     }
// }   
//     Возврат мин1;
// }

// //Вычисляет первую минимальную цену в указанной строке
// //Обходит стороной ячейки, где остаток спроса = 0, а также Fogel_j.
// //Возвращает вторую минимальную цену.
// function Фогель_ВтораяМинимальнаяЦенаПоСтроке(i)
// мин2 = undefined;
// if (Fogel_j = undefined) {
//         Возврат undefined;
// }
// for (let j = 0; < n {
//         if (j = Fogel_j){
//         continue;
//     }
//     if (arrSprosOstatok[j] = 0) {
//         continue;
//     }
// ц = arrCost[i][j];
// if (мин2 = undefined) {
//     мин2 = ц;
//     Иначе
//     if (мин2 > ц) {
//         мин2 = ц;
//     }
// }
// }   
//     Возврат мин2;
// }

// //Вычисляет первую минимальную цену ; < указанному столбцу.
// //Обходит стороной ячейки, где остаток предложения = 0.
// //Возвращает минимальную цену, а i минимальной ячейки - в переменной Fogel_I
// function Фогель_ПерваяМинимальнаяЦенаПоСтолбцу(j)
// мин1 = undefined;
// Fogel_I = undefined;
// for (let i = 0; < m {
//         if (arrPredlojOstatok[i] = 0){
//     continue;
//         else if (arrPredlojOstatok[i] < 0) {
//         throw ("Ошибка: остаток предложения меньше 0");
//     }
//     ц = arrCost[i][j];
//     if (мин1 = undefined) {
//         мин1 = ц;
//         Fogel_I = i;
//         Иначе
//         if (мин1 > ц) {
//             мин1 = ц;
//             Fogel_I = i;
//         }
//     }
// }   
//     Возврат мин1;
// }

// //Вычисляет вторую минимальную цену ; < указанному столбцу.
// //Обходит стороной ячейки, где остаток предложения = 0, а также Fogel_I.
// //Возвращает минимальную цену, а i минимальной ячейки - в переменной Fogel_I
// function Фогель_ВтораяМинимальнаяЦенаПоСтолбцу(j)
// мин2 = undefined;
// if (Fogel_I = undefined) {
//         Возврат undefined;
// }
// for (let i = 0; < m {
//         if (i = Fogel_I){
//         continue;
//     }
//     if (arrPredlojOstatok[i] = 0) {
//         continue;
//     }
// ц = arrCost[i][j];
// if (мин2 = undefined) {
//     мин2 = ц;
//     Fogel_I = i;
//     Иначе
//     if (мин2 > ц) {
//         мин2 = ц;
//         Fogel_I = i;
//     }
// }
// }   
//     Возврат мин2;
// }

// function Фогель_РазницаМеждуМинимальнымиЦенамиПоСтроке(i)
// ц1 = Фогель_ПерваяМинимальнаяЦенаПоСтроке(i);
// if (ц1 = undefined) {
//         Возврат 0;
// }
// ц2 = Фогель_ВтораяМинимальнаяЦенаПоСтроке(i);
// if (ц2 = undefined) {
//         Возврат 0;
// }    
//     Возврат ц2 - ц1;
// }

// function Фогель_РазницаМеждуМинимальнымиЦенамиПоСтолбцу(j)
// ц1 = Фогель_ПерваяМинимальнаяЦенаПоСтолбцу(j);
// if (ц1 = undefined) {
//         Возврат 0;
// }
// ц2 = Фогель_ВтораяМинимальнаяЦенаПоСтолбцу(j);
// if (ц2 = undefined) {
//         Возврат 0;
// }    
//     Возврат ц2 - ц1;
// }

//Проверяет правильность отгрузок: arrOtgruzki ; < каждой строке должны быть равны предложению,
//а arrOtgruzki ; < каждому столбцу - спросу потребителя.
function CheckCorrectOtgruzki() {
    for (let i = 0; i < m; i++) {
        let str = "Отгрузки: ";
        for (let j = 0; j < n; j++) {
            str = str + arrOtgruzki[i][j] + " ";
        }
        console.log(str);
    }
    for (let i = 0; i < m; i++) { //возможно нужно chObjem сделать глобал
        let chObjem = 0;
        for (let j = 0; j < n; j++) {
            chObjem = chObjem + Number(arrOtgruzki[i][j]);
        }
        if (chObjem != arrPredlojeniya[i]) {
            throw ("Ошибка: отгрузки по строке не равны предложению в строке " + i);
        }
    }
    for (let j = 0; j < n; j++) {
        let chObjem = 0;
        for (let i = 0; i < m; i++) {
            chObjem = chObjem + Number(arrOtgruzki[i][j]);
        }
        if (chObjem != arrSpros[j]) {
            throw ("Ошибка: отгрузки по столбцу не равны спросу в столбце " + j);
        }
    }
    return true;
}

//Вычисление потенциалов u[i] и v[j]
function PotentialCalculation() {
    // u = [];
    // v = [];
    for (let i = 0; i < m; i++) {
        u[i] = undefined;
    }

    for (let j = 0; j < n; j++) {
        v[j] = undefined;
    }
    u[0] = 0;  /// u[1] = 0;
    generatorRN = m * n; // Максимальное число итераций
    PotentialCalculationHorizontal(0); //Начало рекурсии  PotentialCalculationHorizontal(1);
    //Проверка
    for (let i = 0; i < m; i++) {
        if (u[i] == undefined) {
            console.log("Не удалось вычислить потенциал u[" + i + "]");
            return false;
        }
    }

    for (let j = 0; j < n; j++) {
        if (v[j] == undefined) {
            console.log("Не удалось вычислить потенциал v[" + j + "]");
            return false;
        }
    }
    return true;
}

function PotentialCalculationVertical(j) {
    if (v[j] == undefined) {
        throw ("Ошибка получения потенциала v[" + j + "]");
    }
    for (let i = 0; i < m; i++) {
        if (bazisYacheyki[i][j] == 0) {
            continue;
        }
        if (u[i] != undefined) {
            continue;
        } else {
            u[i] = arrCost[i][j] - v[j];
            PotentialCalculationHorizontal(i);
        }
    }
}


function PotentialCalculationHorizontal(i) {
    generatorRN = generatorRN - 1;
    if (generatorRN == 0) {
        throw ("Зацикливание при вычислении потенциалов");
    }
    if (u[i] == undefined) {
        throw ("Ошибка получения потенциала u[" + i + "]");
    }
    for (let j = 0; j < n; j++) {
        if (bazisYacheyki[i][j] == 0) {
            continue;
        }
        if (v[j] != undefined) {
            continue;
        } else {
            v[j] = arrCost[i][j] - u[i];
            PotentialCalculationVertical(j);
        }
    }
}

//По известным потенциалам u и v, а также ценам, вычисляет
//оптимальное ли решение (возвращает true или false).
//if ( решение не оптимально, находит ячейку i1,j1 с минимальной отрицательной дельтой,
//откуда будем строить цикл.
function CheckOptimality() {
    let isOptimal, minDelta, i, j, delta;
    isOptimal = true;
    minDelta = undefined;
    for (let i = 0; i < m; i++) {
        let str = "delta=";
        for (let j = 0; j < n; j++) {
            if (bazisYacheyki[i][j] == 1) {
                delta = 0;
            }
            else {
                delta = arrCost[i][j] - u[i] - v[j];
            }

            str = str + delta + " ";
            if (delta < 0) {
                isOptimal = false;
            }
            if (minDelta == undefined) {
                minDelta = delta;
                i1 = i;
                j1 = j;
            }
            else {
                if (delta < minDelta) {
                    minDelta = delta;
                    i1 = i;
                    j1 = j;
                }
            }
        }
        console.log(str);
    }
    return isOptimal;
}


function TransportCost() {
    let costC = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            costC = costC + (arrOtgruzki[i][j] * arrCost[i][j]);
        }
    }
    return costC;
}


//Если решение вырождено, то надо ввести в число базисных переменную с нулевой отгрузкой.
function FindNullYcheykaDlyavvodaVBazis() {

    //Проверка на всякий случай
    let ok = 0;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (bazisYacheyki[i][j] == 0) {
                ok = 1;
                break;
            }
        }
        if (ok == 1) {
            break;
        }
    }
    if (ok == 0) {
        throw ("Не существует не базисной (нулевой) ячейки для ввода в базис");
    }

    while (true) {
        //Случайные значения для предотвращения зацикливания, согласно рекомендации Данцига
        //Дж. Данциг «Линейное программирование, его применения и обобщения» М:Прогресс, 1966 стр. 312
        let i = getRandomIntInclusive(0, m - 1);
        let j = getRandomIntInclusive(0, n - 1);

        if (bazisYacheyki[i][j] == 1) {
            //Пропускаем базисные ячейки
            continue;
        }
        if (arrOtgruzki[i][j] != 0) {
            throw ("Ненулевые отгрузки для не базисной ячейки");
        }
        //if ( findCikl(i, j)=true ){
        //    //Пропускаем ячейки, которые образуют {
        //    continue;
        //}    
        bazisYacheyki[i][j] = 1;
        console.log("В базис введена ячейка " + i + " " + j);
        responseObj.referencePlan.add_i.push(i);
        responseObj.referencePlan.add_j.push(j);
        return true; //Удалось ввести ячейку в базис
    }
}

//Поиск цикла для перераспределения поставок. 
//Заполняет массивы iЦикл и jЦикл с координатами вершин цикла.
//Возвращает Истина, если цикл найден и Ложь, если не удалось найти цикл.
function findCikl(i0, j0) {
    generatorRN = m * n; // максимальное число итераций
    iCikl = [];
    jCikl = [];
    let res = findHorizontalCikl(i0, j0);
    if (res) {
        return true; //{найден успешно
    }
    return false;//{не найден
}

function findHorizontalCikl(i0, j0) {
    generatorRN = generatorRN - 1;
    if (generatorRN == 0) {
        throw ("Слишком большое число итераций при поиске цикла");
    }
    for (let j = 0; j < n; j++) {
        if (j == j0) {
            continue;
        }
        if (bazisYacheyki[i0][j] == 0) { //Fix массив из 0лей
            continue;
        }
        if (findVerticalCikl(i0, j)) {
            iCikl.push(i0);
            jCikl.push(j);
            return true;
        }
    }
    return false; // Не найден 
}

function findVerticalCikl(i0, j0) {
    for (let i = 0; i < m; i++) {
        if ((j0 == j1) && (i == i1)) {
            //Попали в начальную точку цикла
            iCikl.push(i);
            jCikl.push(j0);
            return true; //{завершен
        }
        if (i == i0) {
            continue;
        }
        if (bazisYacheyki[i][j0] == 0) {
            continue;
        }
        if (findHorizontalCikl(i, j0)) {
            iCikl.push(i);
            jCikl.push(j0);
            return true;
        }
    }
    return false; // Не найден {
}

////Перераспределение объемов отгрузки по найденному циклу iЦикл, jЦикл
function ciklRedistribution() {
    console.log("Перераспределение по циклу " + iCikl.length);
    if (jCikl.length != iCikl.length) {
        throw ("Не одинаковые размерности for( let координат цикла");
    }
    if (iCikl.length < 4) {
        throw ("{имеет меньше 4 элементов");
    }
    let teta = undefined;
    let sign = "+";
    for (let q = 0; q < iCikl.length; q++) { ///й == q length заменить на length -1
        let i = iCikl[q];
        let j = jCikl[q];
        if (sign == "-") {
            let volume = arrOtgruzki[i][j];
            if (teta == undefined) {
                teta = volume;
            } else {
                if (volume < teta) {
                    teta = volume;
                }
            }
            sign = "+";
        } else {
            sign = "-";
        }
    }
    if (teta == undefined) {
        throw ("Не удалось вычислить переменную teta.");
    }
    console.log("teta= " + teta);
    if (teta == 0) {
        return false;
    }
    sign = "+";
    for (let q = 0; q < iCikl.length; q++) { //й == q   сделать length - 1
        let i = iCikl[q];
        let j = jCikl[q];
        if (sign == "-") {
            arrOtgruzki[i][j] = arrOtgruzki[i][j] - teta;
            sign = "+";
        } else {
            arrOtgruzki[i][j] = arrOtgruzki[i][j] + teta;
            sign = "-";
        }
    }
    return true;
}

//Главная function - точка входа
export function solvingMTZ(trafficxMatrixArray, reservesArr, needsArr, kolSTR, kolPR, solveMethod) {
    //Раскомментируйте нужный пример
    //Exemple1();
    //Example2();
    //Example3();
    arrCost = trafficxMatrixArray;
    arrSpros = needsArr;
    arrPredlojeniya = reservesArr;
    m = kolSTR;
    n = kolPR;
    //console.log(arrCost, arrSpros, arrPredlojeniya, m, n)
    console.log("EXPORTED")

    //generSlychChisla = new ГенераторСлучайныхЧисел();
    bazisYacheyki = new Array(m + 1);            // создаем пустой Array длины `M`
    for (let i = 0; i < m + 1; i++) {
        bazisYacheyki[i] = new Array(n + 1);        // делаем каждый элемент массивом
    }

    arrOtgruzki = new Array(m + 1);            // создаем пустой Array длины `M`
    for (let i = 0; i < m + 1; i++) {
        arrOtgruzki[i] = new Array(n + 1);        // делаем каждый элемент массивом
    }

    arrSprosOstatok = new Array(n + 1);
    arrPredlojOstatok = new Array(m + 1);
    u = new Array(m + 1);
    v = new Array(n + 1);
    iCikl = [];
    jCikl = [];



    let chSpros = 0;
    for (let j = 0; j < n; j++) {
        chSpros = chSpros + Number(arrSpros[j]);
    }

    let chPredlojeniya = 0;
    for (let i = 0; i < m; i++) {
        chPredlojeniya = chPredlojeniya + Number(arrPredlojeniya[i]);
    }

    //console.log(arrPredlojeniya + " " + chSpros)
    // console.log("arrCost")
    // console.log(arrCost)
    // console.log("arrSpros")
    // console.log(arrSpros)
    // console.log("arrPredlojeniya")
    // console.log(arrPredlojeniya)
    // console.log("m")
    // console.log(m)
    // console.log('n')
    // console.log(n)
    // console.log("chPredlojeniya")
    // console.log(chPredlojeniya)
    // console.log('chSpros')
    // console.log(chSpros)


    if (chPredlojeniya > chSpros) {
        console.log("Предложения больше спроса на " + (chPredlojeniya - chSpros) + " единиц груза. Создайте фиктивного потребителя.");
        responseObj.dataForRP.checkBalanceText.push("arrPredlojeniya больше спроса на " + (chPredlojeniya - chSpros) + " единиц груза. Создайте фиктивного потребителя.")
        return false;
    }
    else if (chPredlojeniya < chSpros) {
        console.log("Предложения меньше спроса на " + (chSpros - chPredlojeniya) + " единиц груза. Создайте фиктивного поставщика.");
        responseObj.dataForRP.checkBalanceText.push("arrPredlojeniya меньше спроса на " + (chSpros - chPredlojeniya) + " единиц груза. Создайте фиктивного поставщика.")
        return false;
    }
    console.log(arrSpros)
    responseObj.dataForRP.checkBalanceText.push("Проверим необходимое и достаточное условие разрешимости задачи.")
    responseObj.dataForRP.checkBalanceText.push(`∑a = ${arrPredlojeniya.join("+")} = ${arrPredlojeniya.reduce((e, i) => e + i)}`)
    responseObj.dataForRP.checkBalanceText.push(`∑b = ${arrSpros.join("+")} = ${arrSpros.reduce((e, i) => e + i)}`)
    responseObj.dataForRP.checkBalanceText.push(`Условие баланса соблюдается. Запасы равны потребностям. Следовательно, модель транспортной задачи является закрытой.\nЗанесем исходные данные в распределительную таблицу. `)
    //Добавление возмущений (эпсилон) во избежание зацикливания транспортной задачи. См. литературу:
    //Дж. Данциг «Линейное программирование, его применения и обобщения» М:Прогресс, 1966 стр. 303
    //С.Гасс. «Линейное программирование (методы и приложения)», М:1961 стр. 195
    //В данном случае закомментировано, поскольку применен метод случайного включения нулевой перевозки
    //в базис, который также, согласно Данцигу, страхует от зацикливания. 

    //epsilon = 0.0001;
    //epsilon1= 0;
    //
    //Для j=1 по n Цикл
    //    Спрос[j]=Спрос[j]+epsilon;
    //    epsilon1=epsilon1+epsilon;
    //КонецЦикла;    
    //Предложение[1]=Предложение[1]+epsilon1;

    let costC;

    if (solveMethod == 0) {
        responseObj.dataForRP.methodText.push(`1. Используя метод наименьшей стоимости, построим первый опорный план транспортной задачи.
        Суть метода заключается в том, что из всей таблицы стоимостей выбирают наименьшую, и в клетку, которая ей соответствует, помещают меньшее из чисел ai, или bj.
        Затем, из рассмотрения исключают либо строку, соответствующую поставщику, запасы которого полностью израсходованы, либо столбец, соответствующий потребителю, потребности которого полностью удовлетворены, либо и строку и столбец, если израсходованы запасы поставщика и удовлетворены потребности потребителя.
        Из оставшейся части таблицы стоимостей снова выбирают наименьшую стоимость, и процесс распределения запасов продолжают, пока все запасы не будут распределены, а потребности удовлетворены. `);
        MethodMinTarifov();
        costC = TransportCost();
        console.log("Стоимость перевозки методом минимальных тарифов: " + costC);
    } else {
        responseObj.dataForRP.methodText.push(`1. Используя метод северо-западного угла, построим первый опорный план транспортной задачи.
        План начинается заполняться с верхнего левого угла. `)
        SeveroZapodYgl();
        costC = TransportCost();
        console.log("Стоимость перевозки методом северо-западного угла: " + costC);
    }




    //НУЖНО РЕАЛИЗОВАТЬ ВЕРХНЮЮ ЧАСТЬ, ПОТОМ НИЖНЮЮ РАСКОМЕНТИТЬ 


    // РаспределениеМетодомФогеля();
    // costC = TransportCost();
    // console.log("Стоимость перевозки методом Фогеля: " + costC);

    while (true) {
        CheckCorrectOtgruzki();

        let bazisCounter = 0;
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                if (arrOtgruzki[i][j] > 0) {
                    bazisYacheyki[i][j] = 1;
                    bazisCounter = bazisCounter + 1;
                }
                else if (arrOtgruzki[i][j] < 0) {
                    throw ("arrOtgruzki не должны быть отрицательными");
                }
                else {
                    bazisYacheyki[i][j] = 0;
                }
            }
        }

        while (bazisCounter < (m + n - 1)) {
            console.log("Решение вырождено");
            FindNullYcheykaDlyavvodaVBazis();
            bazisCounter = bazisCounter + 1;
        }
        if (bazisCounter == (m + n - 1)) {
            console.log("Решение невырожденно, т.к. " + bazisCounter + "=" + "m+n-1 = " + (m + n - 1))
            console.log(bazisCounter)
            console.log(bazisYacheyki)
            // return true;
        }

        if (PotentialCalculation() == false) {
            continue;
        }
        let opt = CheckOptimality();
        if (opt == true) {
            console.log("РЕШЕНИЕ ОПТИМАЛЬНО");
            break; // Решение найдено
        }
        console.log("Решение не оптимальное");

        if (findCikl(i1, j1) == false) {
            throw ("Не удалось найти цикл");
        }
        ciklRedistribution();

        costC = TransportCost();
        console.log("***");
        console.log("Стоимость перевозки: " + costC);
    }
    return true;
}

//solvingMTZ();
