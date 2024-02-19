import { type FastifyInstance, type FastifyPluginOptions } from 'fastify'
import Sensible from '@fastify/sensible'

interface FavMovies {
    title: string
    description: string
    genre: string
}

/** Our simple database for movies **/ 
const favMovies: FavMovies[] = [];

export default async function (
  fastify: FastifyInstance,
  opts: FastifyPluginOptions,
): Promise<void> {
  await fastify.register(Sensible)

  // GET /movies endpoint
  fastify.route({
    url: '/movies',
    method: 'GET',
    handler: function myHandler(request, reply) {
      reply.send({
          message: 'Movies listed successfully',
          success: true,
          data: favMovies
      })
    },
  })

  // POST /movies endpoint
  fastify.route({
    url: '/movies',
    method: 'POST',
    handler: function handler(request, reply) {
      const data = request.body as FavMovies

      if (!data.title || !data?.description || !data.genre) {
        throw fastify.httpErrors.badRequest(
          'Please ensure all information, title, description and genre are provided',
        )
      }

      favMovies.push({
        title: data.title,
        description: data.description,
        genre: data.genre,
      })

      reply.send({
        message: 'Movie added successfully',
        success: true,
        data: null,
      })
    },
  })

  // 短縮法でGET /movies/:movieGenre
  fastify.get('/movies/:movieGenre', function getMovies(request, reply) {
    const requestParams = request.params as { movieGenre: string }
    const searchingFor = requestParams.movieGenre
    const result = favMovies.filter(movie => movie.genre === searchingFor)

    if (result) {
      return {
        message: 'Movie info found successfully',
        success: true,
        data: result,
      }
    } else {
      throw fastify.httpErrors.notFound(
        `Could not find movies with the genre: ${searchingFor}`,
      )
    }
  })
}
