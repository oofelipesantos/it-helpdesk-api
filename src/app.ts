import express from "express";
import healthRoutes from "./routes/health.routes.js";
import supabase from "./config/supabase.js";
import userRoutes from "./routes/users.routes.js";
import ticketRoutes from "./routes/tickets.routes.js";


const app = express();

app.use(express.json());


app.get("/", (req, res) => {
    res.json({ 
        message: "API funcionando corretamente!",
    });

});
   


app.use(healthRoutes);

app.use("/users", userRoutes);

app.use("/tickets", ticketRoutes);


// exporta o app para ser usado em outros arquivos
export default app;
