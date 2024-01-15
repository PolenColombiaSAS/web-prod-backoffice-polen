const getFileNameWithoutExtension = (path) => {
    return path.split('.').slice(0, -1).join('.');
}

const capitalizeString = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const reverseString = (str) => {
    return str.split('').reverse().join('');
}
const formatNumber = (value, includeDecimals = true) => {
    
    if (!value) return '0.00';
    let [integerPart, decimalPart] = value.toString().split('.');
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return includeDecimals && decimalPart !== undefined ? `${integerPart}.${decimalPart}` : integerPart;
}
export {
    getFileNameWithoutExtension,
    capitalizeString,
    reverseString,
    formatNumber
};