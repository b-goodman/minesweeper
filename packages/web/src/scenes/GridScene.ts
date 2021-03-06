import { GameEvents, SoundKeys } from "../objects/enums";
import { GameObjects,  Input, Scene } from "phaser";

import {Grid} from "@minesweeper/core"

import {  EmitterEvents, InputEventType } from "../objects/enums";
import { GridInitParams, SceneKeys } from "..";
import { Assets } from "../objects/Assets";
import CellObj from "../objects/CellObj";
import Toolbar from "./Toolbar";


export default class GridScene extends Scene {
    mines: number;
    params: GridInitParams;
    cellObjs: CellObj[] = [];
    lClicks: number = 0;
    doubleClickDelay: number = 170;

    constructor(){
        super({
            key: SceneKeys.GRID_SCENE,
        });
    }

    /**
     * Called when the scene starts; this function may accept parameters, which are passed from other scenes or game by calling scene.start(key, [params]).
     * @param params
     */
    init(params:GridInitParams): void {
        new Grid( params.rows );
        this.mines = Grid.nMines;
        this.params = params;
    }

    /**
     * Called before the scene objects are created, and it contains loading assets; these assets are cached, so when the scene is restarted, they are not reloaded.
     */
    preload(): void {
        new Assets(this);
    }

    /**
     * Called when the assets are loaded and usually contains creation of the main game objects (background, player, obstacles, enemies, etc.).
     */
    create(): void {

        this.data.set("flagsRemaining", this.mines);
        this.data.set("timeElapsed", 0);
        this.data.set("isGameOver", false);

        this.scene.add(SceneKeys.TOOLBAR, Toolbar, true);

        Assets.addSounds();

        this.cellObjs = new Array(Grid.nRows).fill(undefined).map( ( _elem, index_i) => {
            return new Array(Grid.nRows).fill(undefined).map( ( _elem, index_j ) => {
                const p0 = {x: (index_j * this.params.cellWidth) + this.params.cellWidth/2  , y: ((index_i * this.params.cellWidth) + this.params.cellWidth/2) + 60};
                return this.add.existing( new CellObj(this, p0, {cellObj: Grid.getCell([index_i,index_j]) }) ) as CellObj;
            })
        }).flat();

        // initialize event emitters.
        this.input.mouse.disableContextMenu();

        const handleClickInput = ( pointer:Input.Pointer, gameObject:GameObjects.Sprite, whichBtn: EmitterEvents.POINTER_RIGHT | EmitterEvents.POINTER_LEFT ) => {
            if(this.lClicks == 1) {
                gameObject.emit( EmitterEvents.CLICKED, pointer, whichBtn );
            } else {
                gameObject.emit( EmitterEvents.DOUBLE_CLICKED, pointer, whichBtn );
            }
            this.lClicks = 0;
        };

        const handleGameOver = () => {
            console.log("game over");
            Grid.uncoverRemainingMines();
            this.cellObjs.forEach( obj => obj.disableInteractive() );
            this.data.values.isGameOver = true;
        };

        this.input.on( InputEventType.GAMEOBJECT_DOWN, ( pointer:Input.Pointer, gameObject:GameObjects.Sprite) => {
            const whichBtn = pointer.rightButtonDown() ? EmitterEvents.POINTER_RIGHT : EmitterEvents.POINTER_LEFT;
            this.lClicks++;
            this.time.delayedCall(this.doubleClickDelay, handleClickInput, [pointer, gameObject, whichBtn], this);
        })

        this.input.on( InputEventType.GAMEOBJECT_OVER, ( _pointer:Input.Pointer, gameObject:GameObjects.Sprite) => {
            gameObject.emit( EmitterEvents.HOVER_IN , _pointer );
        })

        this.input.on( InputEventType.GAMEOBJECT_OUT, ( _pointer:Input.Pointer, gameObject:GameObjects.Sprite) => {
            gameObject.emit( EmitterEvents.HOVER_OUT, _pointer );
        })

        this.events.once( GameEvents.MINE_REVEALED, () => {
            Assets.Sounds.get(SoundKeys.MINE_UNCOVER_1).play();
            handleGameOver();
        })

        this.events.on( GameEvents.CELL_FLAGGED, () => {
            Assets.Sounds.get(SoundKeys.FLAGGED_2 ).play();
            this.data.values.flagsRemaining -= 1;
        })

        this.events.on( GameEvents.CELL_UNFLAGGED, () => {
            Assets.Sounds.get(SoundKeys.UNFLAG_1).play();
            this.data.values.flagsRemaining += 1;
        })

        this.events.on( GameEvents.CELL_UNCOVERED, () => {
            Assets.Sounds.get(SoundKeys.UNCOVERED_1).play();
        })

    }

    /**
     * Called every tick and contains the dynamic part of the scene — everything that moves, flashes, etc.
     * @param [time]
     */
    update(): void {
        // TODO
        this.cellObjs.forEach( obj => obj.refreshState() );
    }

}