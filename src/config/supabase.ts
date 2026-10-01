// Aqui é para exemplificar, mas nao é 
// correto deixar senha do banco de dados 
// no código fonte, é melhor usar variáveis 
// de ambiente para isso.

//=====================================
//=  senha database: MwkE6CS0DCgJzyZI =
//=====================================

import "dotenv/config";

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseKey = process.env.SUPABASE_KEY as string;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("SUPABASE_URL e SUPABASE_KEY devem ser definidos no arquivo .env");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;