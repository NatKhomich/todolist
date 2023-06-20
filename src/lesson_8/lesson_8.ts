// 1. Функция sum принимает параметром целые положительные
// числа (неопределённое кол-во) и возвращает их сумму (rest).

export function sum(...nums: Array<number>): number {
    //console.log(nums)
    //console.log(arguments)
    let res = 0
    for(let i = 0; i < nums.length; i++) {
        res += nums[i]
    }
    return res
}

console.log(sum(1, 3, 6))

// 2. Функция getTriangleType принимает три параметра:
// длины сторон треугольника.
// Функция должна возвращать:
//  - "10", если треугольник равносторонний, - все стороны равны
//  - "01", если треугольник равнобедренный,- равны 2 стороны из 3-х
//  - "11", если треугольник обычный,
//  - "00", если такого треугольника не существует. - если сумма двух сторон больше третьей

export function getTriangleType(a: number, b: number, c: number): string {
    if (a === b && b === c && a === c) { //равносторонний
        return '10'
    }
    if ( a + b < c || b + c < a || a + c < b ) { //не существует
        return '00'
    }
    if ( a === b || b === c || a === c) { //равнобедренный
        return '01'
    }
    else { // обычный
        return '11'
    }
}

//console.log(getTriangleType(5,3,12))


// 3. Функция getSum принимает параметром целое число и возвращает
// сумму цифр этого числа

export function getSum(number: number): number {
   return  number.toString().split('').map(el => Number(el)).reduce((acc,el)=> acc+el)
}


// 4. Функция isEvenIndexSumGreater принимает  параметром массив чисел.
// Если сумма чисел с чётными ИНДЕКСАМИ!!! (0 как чётный индекс) больше
// суммы чисел с нечётными ИНДЕКСАМИ!!!, то функция возвращает true.
// В противном случае - false.

export const isEvenIndexSumGreater = (arr: Array<number>): boolean => {
    let sumEven = 0
    let sumOdd = 0
    for (let i = 0; i < arr.length; i++) {
        if ( i % 2 === 0) {
            sumEven = sumEven + arr[i]
        }
        if ( i % 2 !== 0) {
            sumOdd = sumOdd + arr[i]
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

// 6. Функция принимает параметром целое не отрицательное число N и возвращает сумму всех чисел от 0 до N включительно
// Попробуйте реализовать функцию без использования перебирающих методов.

export function sumFirstNumbers(N: number): number {
    //...здесь пишем код.
    // В return стоит "заглушка", чтоб typescript не ругался
    let newN = 0
    for (let i = 0; i <= N; i++) {
        newN += i
    }
    return newN
}

// ...и "лапку" вверх!!!!


// Д.З.:
// 7. Функция-банкомат принимает параметром целое натуральное число (сумму).
// Возвращает массив с наименьшим количеством купюр, которыми можно выдать эту
// сумму. Доступны банкноты следующих номиналов:
// const banknotes = [1000, 500, 100, 50, 20, 10, 5, 2, 1].
// Считаем, что количество банкнот каждого номинала не ограничено


export function getBanknoteList(amountOfMoney: number): Array<number> {
    //...здесь пишем код.
    // В return стоит "заглушка", чтоб typescript не ругался
    return [1]
}