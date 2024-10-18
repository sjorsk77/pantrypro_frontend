const useFormatServices = () => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0'); // Pad single digit days
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }

    const formatEnums = (enumString) => {
        return enumString.charAt(0).toUpperCase() + enumString.slice(1).toLowerCase();
    }

    return {formatDate, formatEnums};
}

export default useFormatServices;