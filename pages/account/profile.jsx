import Profile from '../../src/components/ProfilePage';
import { requireAuthentication } from '../../utils/requireAuthentication';

const ProfilePage = () => {
  return (
    <div>
      <Profile />
    </div>
  );
};

export default ProfilePage;

export const getServerSideProps = requireAuthentication(async (context) => {
  return { props: {} };
});
