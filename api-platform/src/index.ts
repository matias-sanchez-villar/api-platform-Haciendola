import App from './app'
import dotenv  from 'dotenv';

async function main() {
    dotenv.config();
    const app = new App();
    await app.listen();
}

main();
