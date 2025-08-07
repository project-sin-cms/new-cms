import { createContext, useContext, useEffect } from 'react'
import { useParams } from 'react-router'
import { useAxios } from '../../../../utils/hooks/useAxios'
import { Spinner } from '../../../../utils/components/ui/spinner'
import { config as modelConfig } from '../../../content_model/utils/config'

const ContentFieldContext = createContext(undefined)

export const useContetField = () => {
    const context = useContext(ContentFieldContext)
    if (context === undefined) {
        throw new Error('useContetField must be used within a ContentFieldProvider')
    }
    return context
}

export const ContentFieldProvider = ({ children }) => {
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

    const repalcePath = (path) => {
        return path.replace(':model_id', model_id)
    }

    return (
        <ContentFieldContext.Provider
            value={{
                model_id,
                getBreads,
                repalcePath,
            }}
        >
            {loading && <Spinner />}
            {!loading && <>{children}</>}
        </ContentFieldContext.Provider>
    )
}
