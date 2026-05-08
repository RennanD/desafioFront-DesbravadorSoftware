import React from 'react';
import { Users, Mail } from 'lucide-react';
import { Link } from 'react-router';

interface UserProps {
  children: React.ReactNode;
  className?: string;
  gap?: number;
  align?: 'start' | 'center' | 'end';
  style?: React.CSSProperties;
}

export function User({ children, className = '', gap = 3, align = 'start', style = {} }: UserProps) {
  const alignmentClass = align ? `align-items-${align}` : '';
  const gapClass = gap ? `gap-${gap}` : '';

  return (
    <div className={`d-flex ${alignmentClass} ${gapClass} ${className}`} style={style}>
      {children}
    </div>
  );
}

interface UserAvatarProps {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}

export function UserAvatar({ src, alt, size = 120, className = '' }: UserAvatarProps) {
  return (
    <img 
      className={`rounded-circle border ${className}`} 
      src={src} 
      alt={alt}
      style={{ width: `${size}px`, height: `${size}px`, objectFit: 'cover' }} 
    />
  );
}

interface UserInfoWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function UserInfo({ children, className = '' }: UserInfoWrapperProps) {
  return (
    <div className={`d-flex flex-column gap-2 ${className}`}>
      {children}
    </div>
  );
}

interface UserNameProps {
  text: string;
  size?: 'small' | 'large';
  asLink?: string;
  className?: string;
}

export function UserName({ text, size = 'large', asLink, className = '' }: UserNameProps) {
  const content = (
    <h2 
      className={`text-dark fw-bold m-0 ${className}`} 
      style={{ fontSize: size === 'large' ? '24px' : '16px' }}
    >
      {text}
    </h2>
  );

  if (asLink) {
    return <Link to={asLink} className="text-decoration-none">{content}</Link>;
  }

  return content;
}

interface UserBioProps {
  text: string;
  className?: string;
}

export function UserBio({ text, className = '' }: UserBioProps) {
  return (
    <p className={`text-secondary mb-0 ${className}`} style={{ fontSize: '16px' }}>
      {text}
    </p>
  );
}

interface UserStatsProps {
  followers: number;
  following: number;
  className?: string;
}

export function UserStats({ followers, following, className = '' }: UserStatsProps) {
  return (
    <div className={`d-flex gap-3 text-secondary ${className}`} style={{ fontSize: '14px' }}>
      <div className="d-flex align-items-center gap-1">
        <Users size={16} />
        <span><strong>{followers}</strong> seguidores</span>
      </div>
      <div className="d-flex align-items-center gap-1">
        <span><strong>{following}</strong> seguindo</span>
      </div>
    </div>
  );
}

interface UserEmailProps {
  email: string;
  className?: string;
}

export function UserEmail({ email, className = '' }: UserEmailProps) {
  return (
    <div className={`d-flex align-items-center gap-2 ${className}`}>
      <Mail size={16} className="text-secondary" />
      <a 
        href={`mailto:${email}`} 
        className="text-primary text-decoration-none" 
        style={{ fontSize: '14px' }}
      >
        {email}
      </a>
    </div>
  );
}
