import http from 'node:http';
import handler from './handler.js';
const PORT = process.env.PORT || 3000;
console.log('algo')
const server = http.createServer(handler).listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});

console.log('algo2')
export {
    server
};