const middleware = {}

middleware['router-guards'] = require('../src/middleware/router-guards.js')
middleware['router-guards'] = middleware['router-guards'].default || middleware['router-guards']

export default middleware
