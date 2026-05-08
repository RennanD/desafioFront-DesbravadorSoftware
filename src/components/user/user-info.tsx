import React from 'react';
import { Users, Mail } from 'lucide-react';

interface UserInfoProps {
  avatarUrl: string;
  name: string;
  bio: string;
  email: string;
  followers: number;
  following: number;
  className?: string;
  style?: React.CSSProperties;
}

export function UserInfo({ 
  avatarUrl, 
  name, 
  bio, 
  email, 
  followers, 
  following, 
  className = '', 
  style = {} 
}: UserInfoProps) {
  return (
    <div 
      className={`d-flex flex-column align-items-center align-items-md-start gap-3 ${className}`} 
      style={{ ...style }}
    >
      <img 
        className="rounded-circle border" 
        src={avatarUrl} 
        alt={name}
        style={{ width: '200px', height: '200px', objectFit: 'cover' }} 
      />
      <div className="d-flex flex-column gap-2 text-center text-md-start w-100">
        <div>
          <h2 className="text-dark fw-bold m-0" style={{ fontSize: '24px' }}>
            {name}
          </h2>
          <p className="text-secondary mb-0" style={{ fontSize: '16px' }}>
            {bio}
          </p>
        </div>
        
        <div className="d-flex gap-3 justify-content-center justify-content-md-start text-secondary" style={{ fontSize: '14px' }}>
          <div className="d-flex align-items-center gap-1">
            <Users size={16} />
            <span><strong>{followers}</strong> seguidores</span>
          </div>
          <div className="d-flex align-items-center gap-1">
            <span><strong>{following}</strong> seguindo</span>
          </div>
        </div>

        <div className="d-flex align-items-center gap-2 justify-content-center justify-content-md-start mt-1">
          <Mail size={16} className="text-secondary" />
          <a 
            href={`mailto:${email}`} 
            className="text-primary text-decoration-none" 
            style={{ fontSize: '14px' }}
          >
            {email}
          </a>
        </div>
      </div>
    </div>
  );
}
