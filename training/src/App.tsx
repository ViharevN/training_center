import React, { Fragment, lazy, Suspense, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Loader } from './components/Loader';
import { useGetStepsQuery } from './store/api/api';
import { ISteps } from './data/stepsModels';
import { productAlfa, productSovcombank, productTinkoff } from './data/constants';

const StepsRoute = lazy(async () => ({ default: (await import('./components/steps/StepsRoute')).default }))
const Page = lazy(async () => ({ default: (await import('./pages/Pages')).default }))
const AdminMainPage = lazy(async () => ({ default: (await import('./pages/AdminPages')).AdminMainPage }))
const AdminPage = lazy(async () => ({ default: (await import('./pages/AdminPages')).default }))
const AdminLogin = lazy(async () => ({ default: (await import('./components/admin/auth/AdmnLogin')).AdminLogin }))
const AdminRegister = lazy(async () => ({ default: (await import('./components/admin/auth/AdminRegister')).AdminRegister }))
const StartPage = lazy(async () => ({ default: (await import('./pages/StartPage')).StartPage }))
const Step0 = lazy(async () => ({ default: (await import('./components/steps/Step0')).Step0 }))
const StepFinish = lazy(async () => ({ default: (await import('./components/steps/StepFinish')).default }))

const courses = [{ path: 'alfa', name: productAlfa }, { path: 'halva', name: productSovcombank }, { path: 'tinkoff', name: productTinkoff }]

const loginPage = [{ path: '/', element: <StartPage /> }]
const adminPage = [{ path: '/admin', element: <AdminMainPage /> }]

const adminAuth = [{ path: '/adminStart', element: <AdminLogin /> },
{ path: '/adminRegistration', element: <AdminRegister /> }]

function App() {
  const { isLoading, data } = useGetStepsQuery(null)
  const idSteps: ISteps[] = []

  isLoading ? <Loader /> : data!.map((data) => idSteps.push(data))

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path='/' element={<Navigate to='/halva' />} />
          <Route path='alfa/step0' element={<Navigate to='/alfa/training' />} />
          <Route path='halva/step0' element={<Navigate to='/halva/training' />} />
          <Route path='tinkoff/step0' element={<Navigate to='/tinkoff/training' />} />

          {courses.map(e => {
            return (
              <Fragment key={e.name}>
                {idSteps.filter(step => step.id === '0' && step.product === e.name).map(el => {
                  return (
                    <Route path={e.path + '/training'} element={<Page children={<Step0 el={el} />} />} key={Math.random()} />
                  )
                })}
              </Fragment>
            )
          })}
          {courses.map(e => {
            return (
              <Fragment key={e.name}>
                {idSteps.filter(step => step.replica.isEnd === false && step.product === e.name).map(el => {
                  return (
                    <Route path={e.path + '/step' + el.id} element={<StepsRoute element={el} />} key={Math.random()} />
                  )
                })}
              </Fragment>
            )
          })}
          {courses.map(e => {
            return (
              <Fragment key={e.name}>
                {idSteps.filter(step => step.replica.isEnd === true && step.product === e.name).map(el => {
                  return (
                    <Route path={e.path + '/finish' + el.id} element={<Page children={
                      <StepFinish img={el.image_name.src} alt={el.image_name.alt} audio={el.audio} success={el.replica.success} />} />} key={Math.random()} />
                  )
                })}
              </Fragment>
            )
          })}
          {adminAuth.map(e => {
            return (
              <Route path={e.path} element={<AdminPage children={e.element} />} key={e.path} />
            )
          })}
          {adminPage.map(e => {
            return (
              <Route path={e.path} element={e.element} key={e.path} />
            )
          })}
          {courses.map(e => {
            return (
              <Fragment key={e.name}>
                {loginPage.map(el => {
                  return (
                    <Route path={el.path + `/${e.path}`} element={el.element} key={el.path + e.name} />
                  )
                })}
              </Fragment>
            )
          })}
        </Routes>
      </Suspense>
    </>
  )
}
export default App;