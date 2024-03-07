import CardComponent from './CardComponent'

//MUI Imports
import { Typography, Grid } from '@mui/material';

//Query Imports
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';


//Auth Imports
import { useAuth0 } from '@auth0/auth0-react';

import { CHECK_PROFILE_EXISTS, GET_PROFILE, GET_CARDSETS } from '../../utils/queries';
import { useEffect, useState } from 'react';
import { ADD_PROFILE } from '../../utils/mutations';



export const Content = () => {
  const { user, isAuthenticated } = useAuth0();
