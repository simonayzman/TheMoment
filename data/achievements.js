const achievements = {
  '5': 'Moment Master!',
  '10': 'Loving Liver!',
  '15': 'Momentous Moment-Maker!',
  '20': 'Amazing Achiever!',
  '25': 'Excellent Earner!',
  '30': 'Craig!',
  '35': 'Fantastic Pusher!',
  '40': 'Wow-ing Wonder!',
  '45': 'Buddha Brain!',
  '50': 'BETTER than Craig!',
  '55': 'Doing Doer!',
  '60': 'Magnificent Mama or Man!',
  '65': 'Sharing Shoe-in!',
  '70': 'Land Mammal!',
  '75': 'Named Needer of Moments!',
};

export default function getAchievementForMomentCount(momentCount) {
  return achievements[momentCount];
}
