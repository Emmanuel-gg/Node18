import { parse } from 'node:url';
import { routes } from './routes/person.js';
import { DEFAULT_HEADER } from './util/constans.js';

const personRoutes = routes({ personService: {}})

const allRoutes = {

    ...personRoutes,

    //404 route
    default: (request, response) => {
        response.writeHead(404, DEFAULT_HEADER);
        response.write('hello');
        response.end();
    }
};

const handler = (req, res) => {
    const { url, method } = req;

    const { pathname } = parse(url, true);

    const key = `${pathname}:${method.toLowerCase()}`;
    console.log({key});
    const chosen = allRoutes[key] || allRoutes.default;
    console.log({chosen});
    const promise = new Promise((resolve, reject) => {
        try {
            resolve(chosen(req, res));
        } catch (error) {
            reject(error)
        }
    });

    return promise
    .catch(handlerError(res));
}

const handlerError = (res) => {
    return err => {
        console.log('Error', err);
        res.writeHead(500, DEFAULT_HEADER);
        res.write(JSON.stringify({error: 'Internal server error', message: err.message}));
        return res.end();
    }
}
export default handler;