import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {useMutation} from '@apollo/client';
import { ADD_PROFILE } from '../../utils/mutations';

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [profile, setProfile] = React.useState(null);

  const { data: checkData } = useQuery(CHECK_PROFILE_EXISTS, {
    variables: { email: user?.email },
    skip: !isAuthenticated, // Only run this query if the user is authenticated
  });

  const [addProfile] = useMutation(ADD_PROFILE, {
    onCompleted: (data) => {
      // Once profile is added, update state
      setProfile(data.addProfile);
    }
  });

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
};

export default Profile;