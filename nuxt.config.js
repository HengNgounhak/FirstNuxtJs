export default {
    modules: ['@nuxt/content'],
    components: true,
    content: {
        markdown: {
            prism: {
                theme: 'prism-themes/themes/prism-material-oceanic.css'
            }
        },
        nestedProperties: ['author.name']
    }
}