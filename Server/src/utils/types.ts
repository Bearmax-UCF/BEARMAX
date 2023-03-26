export interface EmotionGameStats {
    Correct: number[];
    Wrong: number[];
    NumPlays: number;
}

export type EmotionGameAction = "start" | "stop";