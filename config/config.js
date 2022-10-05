import env from 'dotenv';
import path from 'path';
const envConfig = env.config({path: path.resolve(`.env.${process.env.NODE_ENV}`)});
export default envConfig;