import { useParams } from 'react-router'
import { useAxios } from '../../../../utils/hooks/useAxios'
import { useEffect } from 'react'
import { config as modelConfig } from '../../../content_model/utils/config'

export const useContetField = () => {
    const { model_id } = useParams()
    const { data, loading, sendRequest } = useAxios()

    // Content Model 情報取得
    useEffect(() => {
        ;(async () => {
            await sendRequest({
                method: 'get',
                url: `${modelConfig.end_point}/${model_id}`,
            })
        })()
    }, [model_id])

    const getBreads = (append = []) => {
        const breads = [
            { name: modelConfig.name, path: modelConfig.path },
            { name: data?.payload.data.title },
            ...append,
        ]

        return breads
    }

    return {
        model_id,
        loading,
        data,
        getBreads,
    }
}
