/**
 * Validates the lampsArray to ensure it is an array of 8 elements containing only 0's and 1's.
 * @param {any[]} lampsArray - The array to be validated
 * @returns {boolean} True if the lampsArray is valid, false otherwise
 */
const validateLampsArray = (lampsArray) => {
    return (
        Array.isArray(lampsArray) &&
        lampsArray.length === 8 &&
        !lampsArray.some((element) => !Number.isInteger(element) || (element !== 0 && element !== 1))
    );
};

/**
 * Returns the final outcome of lamps competition between adjacent elements in the array
 * @param {number[]} lampsArray - An array of 8 0's and 1's representing the ON and OFF states of the lamps
 * @param {number} days - A non-zero positive integer representing the consecutive days the operation should run for
 * @throws {Error} If the lampsArray argument is invalid
 * @throws {Error} If the days argument is not a valid number
 * @returns {number[]} The final state of the lampsArray after the specified number of days
 */
const lampsExercise = (lampsArray, days) => {
    if (!validateLampsArray(lampsArray)) {
        throw new Error("Invalid argument, first argument is not an array length 8 and consisting of 1's and 0's");
    }

    if (typeof days !== 'number' || days <= 0) {
        throw new Error('Invalid argument, second argument is not a valid number');
    }

    let finalResult = [...lampsArray];

    for (let i = 0; i < days; i++) {
        const dailyChange = [];

        const offGridElement = 0;
        const secondElement = finalResult[1];

        dailyChange[0] = offGridElement === secondElement ? 0 : 1;

        const previousElement = finalResult[finalResult.length - 2];
        dailyChange[finalResult.length - 1] = previousElement === offGridElement ? 0 : 1;

        for (let j = 1; j < finalResult.length - 1; j++) {
            const previousElement = finalResult[j - 1];
            const nextElement = finalResult[j + 1];

            dailyChange[j] = previousElement === nextElement ? 0 : 1;
        }
        finalResult = [...dailyChange];
    }

    return finalResult;
};

// UI Form submission
const lampsSubmitForm = (event) => {
    event.preventDefault();

    const lampsArrayInput = document.getElementById('lampsArrayInput');
    const daysInput = document.getElementById('lampsDaysInput');

    const lampsResultsContainer = document.getElementById('lampsResultsContainer');
    const lampsResultsInput = document.createElement('input');

    lampsResultsInput.id = 'lampsResultsInput';
    lampsResultsInput.type = 'text';
    lampsResultsInput.classList.add('form-control');
    lampsResultsInput.disabled = true;

    const lampsArray = lampsArrayInput.value.trim().split(',').map(Number);
    const days = Number(daysInput.value);
    try {
        const result = lampsExercise(lampsArray, days);

        lampsResultsInput.value = result.join(', ');
        lampsResultsContainer.appendChild(lampsResultsInput);
    } catch (e) {
        if ('message' in e) {
            lampsResultsInput.value = e.message;
            lampsResultsContainer.appendChild(lampsResultsInput);
        } else {
            alert(e);
        }
    }
};

const lampsForm = document.getElementById('lampsForm');
lampsForm.addEventListener('submit', lampsSubmitForm);
