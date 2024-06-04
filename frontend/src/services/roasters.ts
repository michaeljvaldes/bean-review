import { useInfiniteQuery } from "@tanstack/react-query"
import axios from "axios"
import PaginatedResponse from "../models/paginatedResponse"
import Roaster from "../models/roaster"

const getRoasters = async ({ queryKey, pageParam }: { queryKey: string[], pageParam: string }) => {
    const nameFilter = queryKey[1] ?? ''
    const searchParam = nameFilter.length > 0 ? `&search=${nameFilter}` : ''
    const response = await axios.get(`/roasters.json/?page=${pageParam}${searchParam}`)
    const data: PaginatedResponse<Roaster> = response.data
    return data
}

export const useRoastersQuery = (nameFilter: string) => {
    return useInfiniteQuery({
        queryKey: ['roasters', nameFilter],
        queryFn: getRoasters,
        initialPageParam: '1',
        getNextPageParam: (lastPage) => lastPage.next
    })
}