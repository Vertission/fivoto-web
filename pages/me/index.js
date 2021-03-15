import React from 'react';
import { withSSRContext } from 'aws-amplify';

import { makeStyles } from '@material-ui/core/styles';

import { Drawer, DashboardSection } from '../../components/me';

export default function Me() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Drawer>
        <DashboardSection />
      </Drawer>
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
  },
}));

// export async function getServerSideProps({ req, res }) {
//   const { Auth } = withSSRContext({ req });
//   try {
//     await Auth.currentAuthenticatedUser();
//   } catch (error) {
//     res.writeHead(302, { Location: '/sign' });
//     res.end();
//   }

//   return { props: {} };
// }
