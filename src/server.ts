// src/server.ts
import app from './app';

// Define the port the server will run on.
// Use the PORT environment variable if available, otherwise default to 5000.
const PORT: number = parseInt(process.env.PORT as string, 10) || 5000;

// Start the server and listen for incoming connections.
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});