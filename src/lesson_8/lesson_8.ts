// 1. Функция sum принимает параметром целые положительные
// числа (неопределённое кол-во) и возвращает их сумму (rest).

export function sum(...nums: Array<number>): number {
    //rest сворачивает в массив и работает и в обычных и в стрелочных функциях
    //arguments - внутренняя переменная с фиксированным именем, получаем доступ к псевдомассиву и работает только в обычных функциях
    //console.log(nums)
    //console.log(arguments)
    let res = 0
    for(let i = 0; i < nums.length; i++) {
        res += nums[i]
    }
    return res
}

// 2. Функция getTriangleType принимает три параметра:
// длины сторон треугольника.
// Функция должна возвращать:
//  - "10", если треугольник равносторонний, - все стороны равны
//  - "01", если треугольник равнобедренный,- равны 2 стороны из 3-х
//  - "11", если треугольник обычный,
//  - "00", если такого треугольника не существует. - если сумма двух сторон больше третьей

export function getTriangleType(a: number, b: number, c: number): string {
    if ( a + b < c || b + c < a || a + c < b ) { //не существует
        return '00'
    } else if (a === b && b === c && a === c) { //равносторонний
        return '10'
    } else if ( a === b || b === c || a === c) { //равнобедренный
        return '01'
    } else { // обычный
        return '11'
    }
}

// 3. Функция getSum принимает параметром целое число и возвращает
// сумму цифр этого числа

export function getSum(number: number): number {
   return  number.toString().split('').reduce((acc,el)=> acc + Number(el), 0)
}

/*function getSum(number: number): number {
    let sum = 0
    while (number > 0) {
    const rest = number % 10
        sum += rest
        number = (number - rest) / 10
    }
    return sum
}*/

// 4. Функция isEvenIndexSumGreater принимает  параметром массив чисел.
// Если сумма чисел с чётными ИНДЕКСАМИ!!! (0 как чётный индекс) больше
// суммы чисел с нечётными ИНДЕКСАМИ!!!, то функция возвращает true.
// В противном случае - false.

export const isEvenIndexSumGreater = (arr: Array<number>): boolean => {
    let sumEven = 0
    let sumOdd = 0
    for (let i = 0; i < arr.length; i++) {
        if ( i % 2 === 0) {
            sumEven += arr[i]
        } else {
            sumOdd += arr[i]
        }
    }
    return sumEven >= sumOdd
}

// 5. Функция getSquarePositiveIntegers принимает параметром массив чисел и возвращает новый массив. 
// Новый массив состоит из квадратов целых положительных чисел, котрые являются элементами исходгого массива.
// Исходный массив не мутирует.

export function getSquarePositiveIntegers(array: Array<number>): Array<number> {
    return array.filter(el => Number.isInteger(el) && el > 0).map(num => num **2)
}

/* function getSquarePositiveIntegers(array: Array<number>): Array<number> {
    const answer = []
    for(let i = 0; i < array.length; i++) {
        if(array[i] > 0 && Number.isInteger(array[i])) {
            answer.push(array[i] ** 2)
        }
    }
    return answer
}*/

// 6. Функция принимает параметром целое не отрицательное число N и возвращает сумму всех чисел от 0 до N включительно
// Попробуйте реализовать функцию без использования перебирающих методов.

export function sumFirstNumbers(N: number): number {
    let newN = 0
    for (let i = 0; i <= N; i++) {
        newN += i
    }
    return newN
}

/* function sumFirstNumbers(N: number): number { //через рекурсию
   if(N === 0) {
       return 0
   }
   return N + sumFirstNumbers(N - 1)
}*/

/*function sumFirstNumbers(N: number): number { //через арифметическую прогрессию
   return (N * (N + 1)) / 2
}*/



// Д.З.:
// 7. Функция-банкомат принимает параметром целое натуральное число (сумму).
// Возвращает массив с наименьшим количеством купюр, которыми можно выдать эту
// сумму. Доступны банкноты следующих номиналов:
// const banknotes = [1000, 500, 100, 50, 20, 10, 5, 2, 1].
// Считаем, что количество банкнот каждого номинала не ограничено

const banknotes = [1000, 500, 100, 50, 20, 10, 5, 2, 1]

export function getBanknoteList(amountOfMoney: number): Array<number> {
    let newArr = []
    let i = 0

    while (amountOfMoney > 0) {
        if (banknotes[i] <= amountOfMoney) {
            newArr.push(banknotes[i])
            amountOfMoney -= banknotes[i]
        } else {
            i++
        }
    }
    return newArr
}