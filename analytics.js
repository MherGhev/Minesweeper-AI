function sum(array) {
    let result = 0;
    for (let i = 0; i < array.length; i++) {
        result += array[i];
    }
    return result;
}

function analyze() {
    const successfulSolutions = {
        times: [],
        iterations: []
    }

    const failedSolutions = {
        times: [],
        iterations: []
    }

    const testTimes = 1000;

    for (let i = 0; i < testTimes; i++) {
        console.log(i);
        const mineFieldGenerator = new MineFieldGenerator(16, 16, 0.1);

        const mineSweeperSolver = new MineSweeperSolver(mineFieldGenerator);

        mineSweeperSolver.startGame(4, 4);

        const startTime = performance.now();

        const solution = mineSweeperSolver.solve();

        const endTime = performance.now();

        const solutionTime = startTime - endTime
        if (solution.isSolved) {
            successfulSolutions.times.push(solutionTime);
            successfulSolutions.iterations.push(solution.iterationCount);
        }
        else {
            failedSolutions.times.push(solutionTime);
            failedSolutions.iterations.push(solution.iterationCount);
        }
    }

    console.log("Percentage of successful solutions: ", successfulSolutions.length / testTimes);
    console.log("Percentage of failed solutions: ", failedSolutions.length / testTimes);

    console.log("------------------");

    console.log("Successful solution mean time: ", sum(successfulSolutions.times) / testTimes);
    console.log("Failed solution mean time: ", sum(failedSolutions.times) / testTimes);

    console.log("------------------");

    console.log("Successful solution iteration count:", sum(successfulSolutions.iterations) / testTimes);
    console.log("Failed solution iteration count:", sum(failedSolutions.iterations) / testTimes);

}

analyze();