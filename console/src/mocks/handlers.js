import { http, HttpResponse } from 'msw'
import config from '../config/configLoader'
import contentModelData from './data/content_model'

export const handlers = [
    http.options('*', () => {
        return new HttpResponse(null, {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*', // 本番環境ではより厳密なオリジンを指定してください
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With, Authorization',
                'Access-Control-Allow-Credentials': 'true',
            },
        })
    }),

    http.get(config.endpointUrl + 'content_model', async ({ request }) => {
        return HttpResponse.json(
            {
                success: true,
                timestamp: 123456789,
                payload: {
                    current: 1,
                    pages: 10,
                    totalItems: contentModelData.length, // 総アイテム数を追加
                    data: contentModelData,
                },
            },
            { status: 201 }
        )
    }),

    http.post(config.endpointUrl + 'content_model/store', async ({ request }) => {
        return HttpResponse.json(
            {
                success: true,
                timestamp: 123456789,
                payload: {
                    id: 1,
                    result: true,
                },
            },
            { status: 201 }
        )
    }),
]
