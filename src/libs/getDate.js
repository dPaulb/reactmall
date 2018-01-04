export default (value) => {
    const date = new Date(value);
    return {
        year : date.getFullYear(),
        month : date.getMonth() + 1,
        day : date.getDate()
    }
}