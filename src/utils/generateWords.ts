import { faker } from "@faker-js/faker";
import { TOTAL_WORDS } from "./constants";

export function generateWords() {
    const arr = [];
    const OPTIONS={length:{
        min:2,max:5
    }};
    for (let i = 0; i < TOTAL_WORDS; i++) {
        // let randomNumber=Math.random();
        // if(randomNumber>)
        arr.push(faker.random.word().toLowerCase())
    }
    return arr;
}