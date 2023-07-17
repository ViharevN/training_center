import { useTypedSelector } from "./useTypedSelector"

export const usePerson = () => {
    const person = useTypedSelector (state => state.personSlice.person)

    return person
}