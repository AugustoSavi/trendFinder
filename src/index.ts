import { handleCron } from "./controllers/cron"
import cron from 'node-cron';
import dotenv from 'dotenv';
import { verifyProviderAvailability } from "./services/ai/verifyProviderAvailability";

dotenv.config();

async function main() {
  await verifyProviderAvailability()
  console.log(`Starting process to generate draft...`);
  await handleCron();
}
main();


// If you want to run the cron job manually, uncomment the following line:
//cron.schedule(`0 17 * * *`, async () => {
//  console.log(`Starting process to generate draft...`);
//  await handleCron();
//});