import { Col } from 'react-bootstrap';
import { User, UserAvatar, UserInfo, UserName, UserBio, UserStats, UserEmail } from '../../components/user';

interface UserSidebarProps {
  userData: {
    avatar_url: string;
    name: string;
    login: string;
    bio: string;
    followers: number;
    following: number;
    email: string | null;
  };
}

export function UserSidebar({ userData }: UserSidebarProps) {
  return (
    <Col md={4} lg={3}>
      <User className="flex-column align-items-center align-items-md-start">
        <UserAvatar 
          src={userData.avatar_url} 
          alt={userData.name || userData.login}
          size={200}
        />
        <UserInfo className="text-center text-md-start w-100">
          <UserName text={userData.name || userData.login} />
          {userData.bio && <UserBio text={userData.bio} />}
          <UserStats 
            followers={userData.followers} 
            following={userData.following} 
            className="justify-content-center justify-content-md-start" 
          />
          {userData.email && (
            <UserEmail 
              email={userData.email} 
              className="justify-content-center justify-content-md-start mt-1" 
            />
          )}
        </UserInfo>
      </User>
    </Col>
  );
}
