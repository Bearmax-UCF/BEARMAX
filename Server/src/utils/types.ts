export interface EmotionGameStats {
    Correct: number[];
    Wrong: number[];
    NumPlays: number;
    UserID: string;
}

export type EmotionGameAction = "start" | "stop";