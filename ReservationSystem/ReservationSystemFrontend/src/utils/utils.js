export const getStringDate = datePickerDate => {
    //The value returned by getMonth is an integer between 0 and 11 corresponding to the month
    var localDate = new Date(datePickerDate);
    let year = localDate.getFullYear().toString();
    let month = (localDate.getMonth()+1).toString();
    let day = localDate.getDate().toString();
    let date = year+'-'+month+'-'+day;
    return date;
}

export function range(size, startAt) {
    let array = [...Array(size).keys()].map(i => {
        let item = {
            id: (i + startAt),
            title:(i + startAt)
        }
        return item;
    });
    console.log(array);
    return array;
}

export const images = { 
    "6072281d5be9df9eb32c6515":"/images/gloomhaven.jpg",
    "60722a995be9df9eb32c6519":"/images/7-wonders-duel.jpg",
    "60722b7a5be9df9eb32c651b":"/images/agricola.jpg",
    "607229bf5be9df9eb32c6517":"/images/gaia.png",
    "60722b2d5be9df9eb32c651a":"/images/nemesis.jpg",
    "60722a435be9df9eb32c6518":"/images/spirit-island.png",
    "60708f45853fefd25c84cdc3":"/images/codenames.jpg"
    }
  