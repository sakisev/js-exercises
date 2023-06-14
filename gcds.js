/**
 * Validates if a given number is a non-zero positive integer.
 * @param {number} num - The number to validate.
 * @returns {boolean} - True if the number is a non-zero positive integer, false otherwise.
 */
const validateNum = (num) => {
    return Number.isInteger(num) && num > 0;
};

/**
 * Validates if a given value is an array of integers.
 * @param {any[]} array - The value to validate.
 * @returns {boolean} - True if the value is an array of integers, false otherwise.
 */
const validateArray = (array) => {
    return Array.isArray(array) && array.every((element) => Number.isInteger(element));
};

/**
 * Calculates the greatest common divisor (GCD) of two numbers using the Euclidean algorithm.
 * @param {number} a - The first number.
 * @param {number} b - The second number.
 * @returns {number|undefined} - The GCD of a and b, or undefined if both numbers are 0.
 */
const calculateGCD = (a, b) => {
    if (a === 0 && b === 0) return undefined;
    if (a === 0) return b;
    if (b === 0) return a;

    return calculateGCD(b, a % b);
};

/**
 * Finds the greatest common divisor (GCD) of a given number of elements in an array.
 * @param {number} num - The number of elements to consider in the array.
 * @param {number[]} array - The array of numbers.
 * @returns {number|undefined} - The GCD of the specified number of elements in the array, or undefined if we are comparing two consecutive 0s
 * @throws {Error} - Throws an error if the num is not a non-zero positive integer, the array is not an array of integers, or num is greater than the length of the array.
 */
const findGCD = (num, array) => {
    if (!validateNum(num)) {
        throw new Error('N should be a non-zero positive number');
    }
    if (!validateArray(array)) {
        throw new Error('Array should be an array of numbers');
    }

    // This implementation assumes that the num parameter is valid as long as it's a non-zero integer and at most equal to the length of the given array
    if (num > array.length) {
        throw new Error('N should not be greater than the length of the array');
    }

    let result = array[0];

    for (let i = 1; i < num; i++) {
        result = calculateGCD(result, array[i]);

        if (result === undefined) {
            return result;
        }

        if (result === 1) {
            return 1;
        }
    }

    return result;
};

// UI Form submission
const gcdSubmitForm = (event) => {
    event.preventDefault();

    const gcdArrayInput = document.getElementById('gcdArrayInput');
    const numInput = document.getElementById('gcdNumInput');

    const gcdResultsContainer = document.getElementById('gcdResultsContainer');
    const gcdResultsInput = document.createElement('input');

    gcdResultsInput.id = 'gcdResultsInput';
    gcdResultsInput.type = 'text';
    gcdResultsInput.classList.add('form-control');
    gcdResultsInput.disabled = true;

    const gcdArray = gcdArrayInput.value.trim().split(',').map(Number);
    const num = Number(numInput.value);
    try {
        gcdResultsInput.value = findGCD(num, gcdArray);
        gcdResultsContainer.appendChild(gcdResultsInput);
    } catch (e) {
        if ('message' in e) {
            gcdResultsInput.value = e.message;
            gcdResultsContainer.appendChild(gcdResultsInput);
        } else {
            alert(e);
        }
    }
};

const gcdForm = document.getElementById('gcdForm');
gcdForm.addEventListener('submit', gcdSubmitForm);
