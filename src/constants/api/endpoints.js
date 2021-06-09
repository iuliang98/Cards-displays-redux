export const API_BASE_URL = "https://api.github.com";

export const API_HEADERS = {
    'Content-Type': 'application/json',
    'Authorization':'Token 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'
}

export const API_METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
}

export const API_ROUTES = {
    USER : {
        GET_GISTS: {
            METHOD: API_METHODS.GET,
            URL: '/users/<username>/gists'
        }
    },
    GIST : {
        GET_FORKS: {
            METHOD: API_METHODS.GET,
            URL: '/gists/<id>/forks'
        }
    }
}