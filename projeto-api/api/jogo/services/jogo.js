'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/services.html#core-services)
 * to customize this service
 */

module.exports = {

    async updateGameAverage(id) {
        const knex = strapi.connections.default;

        const media = await knex('jogos')
            .join('avaliacaos', 'avaliacaos.jg_id', '=', id)
            .avg('nota')

        const response = await strapi.query('jogo').update(
            {id: id},
            {jg_media: media[0].avg || 0}
        )

        return response
    }

};
