import React from 'react';
import Image from 'next/image';
import { TwitterProfile } from '@/types';

interface ProfileHeaderProps {
  profile: TwitterProfile;
  tweetCount: number;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profile,
  tweetCount,
}) => {
  return (
    <div className='bg-white p-6 rounded-lg shadow-md mb-8'>
      <div className='flex flex-col md:flex-row items-center md:items-start gap-6'>
        <div className='relative w-24 h-24 rounded-full overflow-hidden'>
          {profile.profile_image_url ? (
            <Image
              src={profile.profile_image_url}
              alt={`${profile.name}'s profile picture`}
              fill
              className='object-cover'
            />
          ) : (
            <div className='w-full h-full bg-gray-200 flex items-center justify-center text-gray-500'>
              No Image
            </div>
          )}
        </div>

        <div className='flex-1 text-center md:text-left'>
          <h2 className='text-2xl font-bold'>{profile.name}</h2>
          <p className='text-gray-600'>@{profile.username}</p>

          {profile.description && (
            <p className='mt-2 text-gray-700'>{profile.description}</p>
          )}

          <div className='mt-4 grid grid-cols-3 gap-4'>
            <div>
              <p className='text-2xl font-bold'>
                {profile.followers_count.toLocaleString()}
              </p>
              <p className='text-sm text-gray-500'>Followers</p>
            </div>
            <div>
              <p className='text-2xl font-bold'>
                {profile.following_count.toLocaleString()}
              </p>
              <p className='text-sm text-gray-500'>Following</p>
            </div>
            <div>
              <p className='text-2xl font-bold'>
                {tweetCount.toLocaleString()}
              </p>
              <p className='text-sm text-gray-500'>Analyzed Tweets</p>
            </div>
          </div>
        </div>

        <div className='md:self-center'>
          <a
            href={`https://twitter.com/${profile.username}`}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center px-4 py-2 bg-[#1DA1F2] text-white rounded-md hover:bg-[#1a91da] transition-colors'
          >
            View Profile
            <svg
              className='ml-2 w-4 h-4'
              fill='currentColor'
              viewBox='0 0 24 24'
            >
              <path d='M8.29 13.29a1 1 0 0 0 1.42 1.42l3-3a1 1 0 0 0 0-1.42l-3-3a1 1 0 0 0-1.42 1.42L10.59 9H5a1 1 0 0 0 0 2h5.59l-2.3 2.29Z' />
              <path d='M19 12a1 1 0 0 0-1-1h-2a1 1 0 0 0 0 2h2a1 1 0 0 0 1-1Z' />
              <path d='M19 19h-9.8a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1H19a1 1 0 0 0 0-2h-9.8a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3H19a1 1 0 0 0 0-2Z' />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
