export function capitalizeFirstLetter(inputString: string) {
    return inputString.charAt(0).toUpperCase() + inputString.slice(1).toLowerCase();
}

export const convertToUpperCaseUnderscored = (inputString: string) => {
    if (!inputString) {
        return '';
    }

    const words = inputString.split(' ');

    const upperCaseWords = words.map((word) => {
        return word.toUpperCase();
    });

    return upperCaseWords.join('_');
};