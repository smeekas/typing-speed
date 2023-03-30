export function generateCharState(dummWords:string[]) {
    const arr: number[][] = [];
    // console.log(words)       
    for (let i = 0; i < dummWords.length; i++) {
        // console.log(words[i])
        // console.log(words[i].length)
        // console.log(Array(words[i].length).fill(0,0,words[i].length))
        arr.push(Array(dummWords[i].length).fill(0, 0, dummWords[i].length))
    }
    return arr;
}