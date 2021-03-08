import { Storage } from 'aws-amplify';

export default async function profile(photo, user_id) {
  const res = await Storage.put(`user/profile/${user_id}.jpeg`, photo, {
    contentType: 'image/jpeg',
  });

  if (res.key) return res.key;
}
