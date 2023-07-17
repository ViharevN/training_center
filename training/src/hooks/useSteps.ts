import { useTypedSelector } from "./useTypedSelector"

export const useSteps = () => {
    const step = useTypedSelector (state => state.stepsSlice.stepsData)

    return step
}