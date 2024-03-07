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
  const [profile, setProfile] = useState(null);
  const [cardSets, setCardSets] = useState([]);
  const [loading, setLoading] = useState(true);

  useQuery(CHECK_PROFILE_EXISTS, {
    variables: { email: user?.email },
    skip: !isAuthenticated, // Only run this query if the user is authenticated
  });


  const [addProfile] = useMutation(ADD_PROFILE, {
    onCompleted: (data) => {
      // This ensures setProfile is only called when the mutation is completed
      setProfile(data.addProfile);
    }
  });

  const { data: profileData } = useQuery(GET_PROFILE, {
    variables: { email: user?.email },
    skip: !isAuthenticated  // Skip if not authenticated or profile already exists
  });

  const { loading: cardsLoading, data: cardsData } = useQuery(GET_CARDSETS, {
    variables: { email: user?.email },
    skip: !isAuthenticated, // Skip if not authenticated
  });


  useEffect(() => {
    if (isAuthenticated && profileData) {

      addProfile({ variables: { name: user.name, email: user.email } });
    } else {
      // profile exists, set it
      setProfile(profileData?.profile);
    }
  },
   [isAuthenticated, profileData, user, addProfile]);

useEffect(() => {
  if (!cardsLoading && cardsData) {
    setCardSets(cardsData.cardSets);
  }
}, [cardsLoading, cardsData]);




console.log(cardSets);

if (loading) return <p>Loading...</p>;
if (!profile) return <div>Loading profile...</div>;

// if (error) return <p>Error: {error.message}</p>;

return (
  <>
    <Typography variant="h5" gutterBottom>
      Current Decks
    </Typography>
    <Grid container spacing={2}>
      {cardSets.length !== 0 ? (
        cardSets.map(cardSet => (
          <Grid item xs={4} key={cardSet._id}>
            <CardComponent title={cardSet.title} id={cardSet._id} />
          </Grid>
        ))
      ) : (
        <p>No card sets found</p>
      )}
    </Grid>
  </>
);
};