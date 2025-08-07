import qs from 'qs'

export const getUrlParams = (params = {}) => {
    return qs.stringify(params)
}

export const getChoice = (choices = [], value) => {
    let choice = choices.find((item) => item.value === value)
    return choice
}
