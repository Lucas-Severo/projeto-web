'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {

    async updateGameAverage(ctx) {
        const {id} = ctx.params
        const response = await strapi.services.jogo.updateGameAverage(Number(id))
        return response
    }

};
