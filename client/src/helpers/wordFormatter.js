export default (text) => {
    console.log(text);
    const separators = [' ', '\\\+', '-', '_'];
    let textArray = text.toLowerCase().split(new RegExp(separators.join('|'), 'g'));
    for (let i in textArray) {
        textArray[i] = textArray[i].split('');
        textArray[i][0] = textArray[i][0].toUpperCase();
        textArray[i] = textArray[i].join('');
    }
    return textArray.join(' ');
}