import { Sound } from "excalibur";
import { Resources } from "../resources";

export default class SoundManager {
    private static soundManager: SoundManager;
    private currentSound: Sound;
    private backgroundSound: Sound;
    private disabled: boolean = false;

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
        this.disabled = true;
        if (this.backgroundSound) {
            this.backgroundSound.stop();
            this.backgroundSound = null;
        }
    }

    public enableSound() {
        this.disabled = false;
    }

    public backgroundMusicStart(): void {
        if (!this.disabled) {
            if (!this.backgroundSound) {
                this.backgroundSound = Resources.backgroundMusic;
                this.backgroundSound.loop = true;
                this.backgroundSound.play(0.1);
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
        if (!this.disabled) {
            this.currentSound = sound;
            if (after) {
                sound.play().then(after);
            } else {
                sound.play();
            }
        }
    }

}