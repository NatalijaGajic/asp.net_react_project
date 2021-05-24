export const getStringDate = datePickerDate => {
    //The value returned by getMonth is an integer between 0 and 11 corresponding to the month
    var localDate = new Date(datePickerDate);
    let year = localDate.getFullYear().toString();
    let month = (localDate.getMonth()+1).toString();
    let day = localDate.getDate().toString();
    let date = year+'-'+month+'-'+day;
    return date;
}
