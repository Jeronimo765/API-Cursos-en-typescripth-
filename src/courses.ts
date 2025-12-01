export enum CourseLevel {
    BASICO = "basico",
    INTERMEDIO = "intermedio",
    AVANZADO = "avanzado",
}

export interface Course {
    id: number;
    title: string;
    description: string;
    durationHours: number;
    level: CourseLevel;
}