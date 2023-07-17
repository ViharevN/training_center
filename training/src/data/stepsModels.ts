import React, { ReactNode } from "react"

export interface ISteps {
    id: string
    replica: {
        replica1: {
            replica: string,
            navigate: string,
            final?: boolean,
            result?: string
        }
        replica2?: {
            replica: string,
            navigate: string,
            final?: boolean,
            result?: string
        }
        replica3?: {
            replica: string,
            navigate: string,
            final?: boolean,
            result?: string
        }
        replica4?: {
            replica: string,
            navigate: string,
            final?: boolean,
            result?: string
        }
        isEnd?:boolean
        success?: boolean
    }
    image_name: {
        src: string,
        alt: string
    }
    audio: string
    product: string
}

export interface IImage {
    src: string
    alt: string
}

export interface IPropsReplica {
    replica: string,
    navigateString?: string
    result?: string
}

export interface IPropsSteps {
    img: string,
    alt: string,
    audio: string,
    children?: ReactNode,
    success?: boolean
}

export interface IPropsPage {
    children: ReactNode
}

export interface IPropsCreateModal {
    openModal: boolean,
    closeModal: () => void,
    product: string
}

export interface IPropsEditDeleteModal {
    openModal: boolean,
    closeModal: () => void,
    step: ISteps
}

export interface IPropsCources {
    product: string
}