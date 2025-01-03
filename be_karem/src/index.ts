import app from './app';

const PORT = 5175;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});