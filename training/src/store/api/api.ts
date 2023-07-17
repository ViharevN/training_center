import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ISteps } from "../../data/stepsModels";

const API_URL = 'http://localhost:8080'

export const api = createApi({
    reducerPath: "api",
    tagTypes: ['Step'],
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL
    }),
    endpoints: builder => ({
        createPerson: builder.mutation({
            query: (person) => ({
                body: person,
                url:'/person',
                method: 'POST'
            })
        }),
        getSteps: builder.query<ISteps[], null>({
            query: () => '/steps',
            providesTags: () => [{
                type: 'Step'
            }],
        }),
        updateStep: builder.mutation({
            query: (step) => ({
                body: step,
                url: '/step',
                method: 'PUT'
            }),
            invalidatesTags: () => [{
                type: 'Step'
            }]
        }),
        createStep: builder.mutation({
            query: step => ({
                body: step,
                url: '/step',
                method: 'POST'
            }),
            invalidatesTags: () => [{
                type: 'Step',
            }]
        }),
        deleteStep: builder.mutation({
            query: (step) => ({
                body: step,
                url: `/step/${step.product}/${step.id}`,
                method: 'DELETE'
            }),
            invalidatesTags: () => [{
                type: 'Step',
            }]
        })
    })
})

export const {useCreatePersonMutation, useGetStepsQuery, useUpdateStepMutation, useCreateStepMutation, useDeleteStepMutation } = api