import React from 'react';

import classes from './BeforeAuth.module.css'
import NavigationItems from '../../../components/Navigation/NavigationItems/NavigationItems'
import Aux from '../../Aux/Aux'

const BeforeLayout = (props) => {

  return (
    <Aux>
      <header className={classes.Header}>
          <NavigationItems />        
      </header>
      <div className={classes.Content}>
        {props.children}
      </div>
    </Aux>
  )
}

export default BeforeLayout;