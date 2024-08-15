/**
 * @jest-environment jsdom
 */

const { game, newGame, showScore, addTurn, lightsOn, showTurns} = require('../game');
beforeAll(() => {
    let fs = require('fs');
    let fileContent = fs.readFileSync('index.html', 'utf-8');
    document.open();
    document.write(fileContent);
    document.close();
});

describe("game object contains correct keys", () => {
    test ("score key exists", () => {
        expect("score" in game).toBe(true);
    });
    test("currentGame key exists", () => {
        expect("score" in game).toBe(true);
    });
    test("playerMoves key exists", () => {
        expect("playerMoves" in game).toBe(true);
    });
    test("choices key exists", () => {
        expect("choices" in game).toBe(true);
    });
    test("choices contain correct ids", () => {
        expect(game.choices).toEqual(["button0", "button1", "button2", "button3", "button4",]);
    });
});
describe("newGame works correctly", () => {
    beforeAll(() => {
        game.score = 42;
        game.playerMoves = ["button1", "button2"];
        game.currentGame = ["button1", "button2"];
        document.getElementById("score").innerText = "42";
        newGame();
    });
    test("should set game score to zero", () => {
        expect(game.score).toEqual(0);
    });
    test("should be one move in the computer's game array", () => {
        expect(game.currentGame.length).toBe(1);
    });
    test("should clear the player moves array", () => {
        expect(game.playerMoves.length).toBe(0);
    });
    test("should display 0 for the element with id of score", () => {
        expect(document.getElementById("score").innerText).toBe(0);
    });
});
test("expect data-listener to be true", () => {
    const elements = document.getElementsByClassName("circle");
    for (let elements of elements){
        expect(elements.getAttribute("data-listener")).toBe("true");
    };
});
describe("gameplay works correctly", () => {
    beforeEach(() => {
        game.score = 0;
        game.playerMoves = [];
        game.currentGame = [];
        addTurn();
    });
    afterEach(() => {
        game.score = 0;
        game.playerMoves = [];
        game.currentGame = [];
    });
    test("should add a turn to the game", () => {
        addTurn();
        expect(game.currentGame.length).toBe(2);
    });
    test("should add the correct class to the buttons", () => {
        let button = document.getElementById(game.currentGame[0]);
        lightsOn(game.currentGame[0]);
        expect(button.classList).toContain("light");
    });
});
test("showTurns should update game.turnNumber", () => {
    game.turnNumber= 42;
    showTurns();
    expect(game.turnNumber).toBe(0);
});