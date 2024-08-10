import { ReactNode } from "react"

export type TBasicModal = {
    show: boolean,
    setShow(boolean): void,
    children: ReactNode
}