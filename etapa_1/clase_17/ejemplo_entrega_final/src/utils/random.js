import moment from "moment";

export const generateNumber = (startNumber, endNumber) => {
    return Math.floor(Math.random() * (endNumber - startNumber + 1) + startNumber);
};

export const generateNameForFile = (filename) => {
    const randomNumber = generateNumber(1000, 9999);
    const dateTime = moment().format("DDMMYYYY_HHmmss");
    const extension = filename.slice(filename.lastIndexOf("."));

    return `file_${randomNumber}_${dateTime}${extension}`;
};