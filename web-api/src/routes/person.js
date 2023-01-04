import { DEFAULT_HEADER } from "../util/constans.js";

const routes = ({ personService }) => ({
    '/person:get':(request, response) => {
        response.writeHead(200, DEFAULT_HEADER);
        response.write('person:get');
        response.end();
    },
    '/person:post':(request, response) => {
        response.writeHead(201, DEFAULT_HEADER);
        response.write('person:post');
        response.end();
    },
});

export {
    routes
};