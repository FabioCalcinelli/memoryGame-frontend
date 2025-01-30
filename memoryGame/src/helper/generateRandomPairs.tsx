export function generateRandomPairs(n) {
    let result = [];
    let numbers1 = Array.from({length: n}, (_, i) => i + 1);
    let numbers2 = Array.from({length: n}, (_, i) => i + 1);

    for (let i = 0; i < n; i++) {
        let index1 = Math.floor(Math.random() * numbers1.length);
        let index2 = Math.floor(Math.random() * numbers2.length);

        result.push(numbers1[index1], numbers2[index2]);

        // Remove the used numbers to avoid duplicates
        numbers1.splice(index1, 1);
        numbers2.splice(index2, 1);
    }
    return result;
}