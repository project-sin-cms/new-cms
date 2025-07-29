import localConfig from './config.local'
import productionConfig from './config.production'

const hostname = window.location.hostname
let config

if (hostname === 'prod domain') {
    config = productionConfig
} else {
    config = localConfig
}

export default config
