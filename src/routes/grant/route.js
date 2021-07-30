module.exports = {
    all: ({ data }) => {
        return []
    }, 
    permalink: ({ request }) => `/${request.slug}`
}