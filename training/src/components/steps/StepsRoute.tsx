import React, { FC, useEffect } from 'react'
import StepElement from './StepElement'
import Page from '../../pages/Pages'
import { ISteps } from '../../data/stepsModels'
import Replica from './Replica'

interface IPropsRoute {
  element: ISteps
}

const StepsRoute: FC<IPropsRoute> = ({ element: e }) => {  
  return (
    <Page children={
      <StepElement img={e.image_name.src} alt={e.image_name.alt} audio={e.audio}>
        {e.replica.replica1.final ? <Replica
          key={Math.random()}
          replica={e.replica.replica1.replica}
          navigateString={e.replica.replica1.navigate}
          result={e.replica.replica1.result}
        /> : <Replica
          key={Math.random()}
          replica={e.replica.replica1.replica}
          navigateString={e.replica.replica1.navigate}
        />}
        {e.replica.replica2?.replica ?
          <>
            {e.replica.replica2.final ?
              <Replica
                key={Math.random()}
                replica={e.replica.replica2.replica}
                navigateString={e.replica.replica2.navigate}
                result={e.replica.replica2.result}
              /> : <Replica
                key={Math.random()}
                replica={e.replica.replica2.replica}
                navigateString={e.replica.replica2.navigate}
              />
            }
          </> : null
        }
        {e.replica.replica3?.replica ?
          <>
            {e.replica.replica3.final ?
              <Replica
                key={Math.random()}
                replica={e.replica.replica3.replica}
                navigateString={e.replica.replica3.navigate}
                result={e.replica.replica3.result}
              /> : <Replica
                key={Math.random()}
                replica={e.replica.replica3.replica}
                navigateString={e.replica.replica3.navigate}
              />
            }
          </> : null
        }
        {e.replica.replica4?.replica ?
          <>
            {e.replica.replica4.final ?
              <Replica
                key={Math.random()}
                replica={e.replica.replica4.replica}
                navigateString={e.replica.replica4.navigate}
                result={e.replica.replica4.result}
              /> : <Replica
                key={Math.random()}
                replica={e.replica.replica4.replica}
                navigateString={e.replica.replica4.navigate}
              />
            }
          </> : null
        }
      </StepElement>} />
  )
}

export default StepsRoute