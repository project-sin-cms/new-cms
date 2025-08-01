import { useState } from 'react'
import axios from 'axios'
import config from '../../config/configLoader'

const apiClient = axios.create({
    baseURL: config.endpointUrl,
    headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
})

export const useAxios = () => {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [validationErrors, setValidationErrors] = useState(null)

    const sendRequest = async (config) => {
        setLoading(true)
        setError(null)
        setData(null)
        setValidationErrors(null)

        try {
            const response = await apiClient.request(config)
            setData(response.data)
            return { success: true, data: response.data }
        } catch (err) {
            setError(err)

            if (axios.isAxiosError(err) && err.response) {
                if (err.response.status === 422) {
                    const fieldErrors = err.response.data.errors || {}
                    setValidationErrors(fieldErrors)
                    return { success: false, error: err, validationErrors: fieldErrors }
                }
            }
            return { success: false, error: err }
        } finally {
            setLoading(false)
        }
    }

    return { data, error, loading, validationErrors, sendRequest }
}
