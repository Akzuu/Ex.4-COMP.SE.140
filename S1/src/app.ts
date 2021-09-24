import fastify from 'fastify';
import bent, { BentResponse } from 'bent';

const APPLICATION_PORT: number = process.env.PORT? Number(process.env.PORT) : 3001;
const S2_ADDRESS: string = process.env.S2_ADDRESS?? 'http://localhost:3002';

const GET_S2 = bent(`${S2_ADDRESS}`, 'GET', 200);

(async () => {
  const server  = fastify({
    logger: true,
    ignoreTrailingSlash: true,
  });

  server.route({
    method: 'GET',
    url: '/',
    handler: async (req, reply) => {
      const response = await GET_S2('/') as BentResponse;
      const s2Reply = await response.text();

      reply.send(
        `Hello from ${req.connection.remoteAddress}:${req.connection.remotePort} 
to ${req.connection.localAddress}:${req.connection.localPort}
${s2Reply}`,
      ); 
    }
  });

  await server.listen(APPLICATION_PORT, '0.0.0.0');
})();
