import http from 'http'
import { app } from './app.js';
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);



server.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
