import { createContext, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useAxios } from '../../../../utils/hooks/useAxios'
import { config as modelConfig } from '../../../content_model/utils/config'
import { config } from '../config'
import { getUrlParams } from '../../../../utils/common'
import { useNavigation } from '../../../../utils/hooks/useNavigation'
import { Spinner } from '../../../../utils/components/ui/spinner'

const ContentContext = createContext(undefined)

export const useContent = () => {
    const context = useContext(ContentContext)
    if (context === undefined) {
        throw new Error('useContet must be used within a ContentProvider')
    }

    return context
}

export const ContentContextProvider = ({ children }) => {
    const { model_name } = useParams()
    const { loading, sendRequest } = useAxios()
    const { navigateTo } = useNavigation()

    // Content Model 情報取得
    const [modelData, setModelData] = useState(null)
    useEffect(() => {
        ;(async () => {
            const response = await sendRequest({
                method: 'get',
                url:
                    `${modelConfig.end_point}/find?` +
                    getUrlParams({ criteria: { alias: model_name } }),
            })

            // データなし
            if (!response?.data.payload.data) {
                navigateTo('/')
            } else {
                let data = response.data.payload.data
                setModelData(data)

                // config設定変更
                config.name = data.title
                config.path = `/${data.alias}`
                config.end_point = `content/${data.alias}`
            }
        })()
    }, [model_name])

    return (
        <ContentContext.Provider
            value={{
                config,
                modelData,
                loading,
            }}
        >
            {loading && <Spinner />}
            {!loading && <>{children}</>}
        </ContentContext.Provider>
    )
}
