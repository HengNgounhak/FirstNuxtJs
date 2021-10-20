//state
export const state = () => ({
    articles: [],
    article: {},
    prev: {},
    next: {}
})

//getters
export const getters = {

}

//actions
export const actions = {
    async getArticle({ commit }) {
        const articles = await this.$content('articles')
            .only(['title', 'description', 'img', 'slug', 'author'])
            .sortBy('createdAt', 'asc')
            .fetch()

        commit('addArticle', articles);
    },

    async anArticle({ commit }, { paramSlug }) {
        const article = await this.$content('articles', paramSlug).fetch()

        const [prev, next] = await this.$content('articles')
            .only(['title', 'slug'])
            .sortBy('createdAt', 'asc')
            .surround(paramSlug)
            .fetch()

        commit('oneArticle', article);
        commit('prev', prev);
        commit('next', next);
    },

    async anAuthor({ commit }, { paramSlug, paramsAuthor }) {
        const articles = await this.$content('articles', paramSlug)
            .where({
                'author.name': {
                    $regex: [paramsAuthor, 'i']
                }
            })
            .without('body')
            .sortBy('createdAt', 'asc')
            .fetch()

        commit('addArticle', articles);
    }
}

//mutations
export const mutations = {
    addArticle(state, articles) {
        state.articles = articles;
    },
    oneArticle(state, article) {
        state.article = article;
    },
    prev(state, prev) {
        state.prev = prev;
    },
    next(state, next) {
        state.next = next;
    }
}