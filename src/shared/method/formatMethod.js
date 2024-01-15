const tryParseDate = (dateString) => {
    let date;
    try {
        date = new Date(dateString);
        if (!isNaN(date)) return date;
    } catch (e) {}
    return null;
};

const formatDate = (dateString) => {
    const date = tryParseDate(dateString);
  
    if (!date) return 'Formato de fecha no válido';
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // hour '0' should be '12'

    return `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
}

const formatDateString = (dateString) => {
    const date = tryParseDate(dateString);
  
    if (!date) return 'Formato de fecha no válido';
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

export {
    formatDate,formatDateString
}