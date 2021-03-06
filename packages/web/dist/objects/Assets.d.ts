import { Scene, Sound } from "phaser";
import { SoundKeys } from "./enums";
export declare class Assets {
    private static _scene;
    static Sounds: Map<SoundKeys, Sound.BaseSound>;
    constructor(scene: Scene);
    static addSounds(): void;
}
//# sourceMappingURL=Assets.d.ts.map