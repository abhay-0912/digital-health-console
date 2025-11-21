const { app, init } = require('./app');

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    await init();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server', err);
  }
}

start();
