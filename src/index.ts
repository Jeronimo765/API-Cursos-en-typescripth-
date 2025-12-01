import express, { Express, Request, Response } from "express";
import { Course, CourseLevel } from "./courses";

const app: Express = express();
const PORT = 3000;

app.use(express.json());

let courses: Course[] = [
    {
        id: 1,
        title: "Introducción a TypeScript",
        description: "Curso básico para aprender los fundamentos de TypeScript.",
        durationHours: 10,
        level: CourseLevel.BASICO
    },

    {
        id: 2,
        title: "Node.js Intermedio",
        description: "Aprende Express y creación de APIs.",
        durationHours: 25,
        level: CourseLevel.INTERMEDIO
    },

    {
        id: 3,
        title: "Arquitectura de Software",
        description: "Patrones avanzados de diseño.",
        durationHours: 30,
        level: CourseLevel.AVANZADO
    },
];


function validateCourse(body: any): string | null {
    if (typeof body.title !== "string") {
        return "title debe ser string";
    }

    if (typeof body.description !== "string") {
        return "description debe ser string";
    }

    if (typeof body.durationHours !== "number") {
        return "durationHours debe ser number";
    }

    if (!["basico", "intermedio", "avanzado"].includes(body.level)) {
        return "level debe ser basico, intermedio o avanzado";
    }

    return null;
}



app.get("/courses", (req: Request, res: Response) => {
    const { id, title, description, durationHours, level } = req.query;

    const filtered = courses.filter((c) => {
        const idFilter = id === undefined || c.id === parseInt(String(id));
        const titleFilter = title === undefined || c.title === String(title);
        const descFilter = description === undefined || c.description === String(description);
        const durationFilter = durationHours === undefined || c.durationHours === parseInt(String(durationHours));
        const levelFilter = level === undefined || c.level === String(level);

        return idFilter && titleFilter && descFilter && durationFilter && levelFilter;

    });

    res.status(200).json(filtered);
});


app.get("/courses/:id", (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const course = courses.find((c) => c.id === id);

    if (!course) {
        res.status(404).json({ message: "Curso no encontrado" });
    }

    res.status(200).json(course);
});

app.post("/courses", (req: Request, res: Response) => {
    const error = validateCourse(req.body);
    if (error) {
        return res.status(400).json({ error });
    }

    const body: Course = req.body;

    body.id = courses.length + 1;
    courses.push(body);

    res.status(201).json(body);
});

app.patch("/courses/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const course = courses.find(c => c.id === id);

    if (!course) {
        return res.status(404).json({ error: "Curso no encontrado" });
    }


    if (req.body.title) course.title = req.body.title;
    if (req.body.description) course.description = req.body.description;
    if (req.body.durationHours) course.durationHours = req.body.durationHours;
    if (req.body.level) course.level = req.body.level;

    res.json(course);
});


app.delete("/courses/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const exists = courses.some((c) => c.id === id);

    if (!exists) {
        return res.status(404).json({ message: "El curso no existe" });
    }

    courses = courses.filter((c) => c.id !== id);

    res.status(2024).send();
});


app.listen(PORT, () =>
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
);