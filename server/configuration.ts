import * as dotenv from "dotenv";
dotenv.config();

export const getEnvValue = (keyname : string) : unknown => {
    
    const envVar = process.env[keyname];
    if (!envVar) {
        throw new Error(`Check your <.env> file. Configuration must include: ${keyname}`)
    }
    return envVar;
}

export const DATABASE_URL = getEnvValue('DATABASE_URL');
