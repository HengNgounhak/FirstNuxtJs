export default {
    modules: ['@nuxt/content'],
    buildModules: ['@nuxtjs/tailwindcss'],
    components: true,
    content: {
        markdown: {
            prism: {
                theme: 'prism-themes/themes/prism-material-oceanic.css'
            }
        },
        nestedProperties: ['author.name']
    },
    plugins: ['@/plugins/ant-design-vue']
}