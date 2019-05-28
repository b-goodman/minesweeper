import {Game} from "phaser";
import GridScene from "./GridScene";


const config = {
    type: Phaser.AUTO,
    width: 900,
    height: 900,
    parent: "main",
    scene: [GridScene],
};


export class MinesweeperGame extends Game {
    constructor(config){
        super(config)
    }

}

window.onload = () => {
    const msGame = new MinesweeperGame(config);
    msGame.scene.start("GridScene");
}
