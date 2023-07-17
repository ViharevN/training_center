import { useTypedSelector } from "./useTypedSelector"

export const useDate = () => {
    const date = useTypedSelector (state => state.dateSlice.date)

    return date
}
