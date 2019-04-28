import { Sound } from "excalibur";
import { Resources } from "../resources";
import PlayerSettingsManager from "./progression/playerSettingsManager";

export default class SoundManager {
    private static soundManager: SoundManager;
    private currentSound: Sound;
    private backgroundSound: Sound;

    /**
     * returns a singleton instance of the sound manager
     */
    public static get(): SoundManager {
        if (SoundManager.soundManager) {
            return SoundManager.soundManager;
        } else {
            SoundManager.soundManager = new SoundManager();
            return SoundManager.soundManager;
        }
    }

    public disableSound() {
        if (this.backgroundSound) {
            this.backgroundSound.stop();
            this.backgroundSound = null;
        }
    }

    public backgroundMusicStart(): void {
        if (!PlayerSettingsManager.get().isSoundOff()) {
            if (!this.backgroundSound) {
                this.backgroundSound = Resources.backgroundMusic;
                this.backgroundSound.volume = 0.1;
                this.backgroundSound.loop = true;
                this.backgroundSound.play();
            }
        }
    }

    public backgroundMusicEnd(): void {
        if(PlayerSettingsManager.get().isSoundOff()) {
            if (this.backgroundSound) {
                this.backgroundSound.stop();
                this.backgroundSound = null;
            }
        }
    }

    public playSoundInterrupt(sound: Sound);
    public playSoundInterrupt(sound: Sound, after: () => void);
    public playSoundInterrupt(sound: Sound, after?: () => void): void {
        if (this.currentSound && this.currentSound.isPlaying()) {
            this.currentSound.pause();
            this.currentSound = null;
        }
        this.playSoundWithAfter(sound, after);
    }

    private playSoundWithAfter(sound: Sound, after?: () => void) {
        if (!PlayerSettingsManager.get().isSoundOff()) {
            this.currentSound = sound;
            if (after) {
                sound.play().then(after);
            } else {
                sound.play();
            }
        }
    }

}