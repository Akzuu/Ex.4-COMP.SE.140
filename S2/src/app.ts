import fastify from 'fastify';

const APPLICATION_PORT: number = process.env.PORT? Number(process.env.PORT) : 3002;

(async () => {
  const server  = fastify({
    logger: true,
    ignoreTrailingSlash: true,
  });

  server.route({
    method: 'GET',
    url: '/',
    handler: async (req, reply) => {
      reply.send(
        `Hello from ${req.connection.remoteAddress}:${req.connection.remotePort} 
to ${req.connection.localAddress}:${req.connection.localPort}`,
      ); 
    }
  });

  await server.listen(APPLICATION_PORT, '0.0.0.0');
})();
