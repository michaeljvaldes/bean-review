import { useState } from "react"

export const useToken = () => {
    const { value, setValue } = useStoredValue('token')
    return { token: value, setToken: setValue }
}

export const useCurrentUserId = () => {
    const { value, setValue } = useStoredValue('user')
    return { currentUserId: value, setCurrentUserId: setValue }
}

export const useStoredValue = (key: string) => {
    const lastValue = localStorage.getItem(key)
    const [value, setValue] = useState(lastValue)
    const saveValue = (newValue: string | null) => {
        if (newValue) {
            localStorage.setItem(key, newValue)
        } else {
            localStorage.removeItem(key)
        }
        setValue(newValue)
    }
    return {
        value,
        setValue: saveValue
    }
}
