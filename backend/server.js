import http from 'http'
import { app } from './app.js';
import { connectDB } from './db/db.js';

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error: ", error);
  });

