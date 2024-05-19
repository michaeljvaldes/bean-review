type PaginatedResonse<T> = {
    count: number,
    next: string,
    previous: string,
    results: T[]
}

export default PaginatedResonse;