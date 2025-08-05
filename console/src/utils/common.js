export const getUrlParams = (params = {}) => {
    const urlSearchParam = new URLSearchParams(params)
    return urlSearchParam.toString()
}
