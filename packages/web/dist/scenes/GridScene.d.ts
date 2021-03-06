import { Scene } from "phaser";
import { GridInitParams } from "..";
import CellObj from "../objects/CellObj";
export default class GridScene extends Scene {
    mines: number;
    params: GridInitParams;
    cellObjs: CellObj[];
    lClicks: number;
    doubleClickDelay: number;
    constructor();
    /**
     * Called when the scene starts; this function may accept parameters, which are passed from other scenes or game by calling scene.start(key, [params]).
     * @param params
     */
    init(params: GridInitParams): void;
    /**
     * Called before the scene objects are created, and it contains loading assets; these assets are cached, so when the scene is restarted, they are not reloaded.
     */
    preload(): void;
    /**
     * Called when the assets are loaded and usually contains creation of the main game objects (background, player, obstacles, enemies, etc.).
     */
    create(): void;
    /**
     * Called every tick and contains the dynamic part of the scene — everything that moves, flashes, etc.
     * @param [time]
     */
    update(): void;
}
//# sourceMappingURL=GridScene.d.ts.map