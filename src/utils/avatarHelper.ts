// Avatar Helper - matching Flutter app design

// 6 avatar preset colors (matching Flutter)
const AVATAR_COLORS = [
  '#FF6B9D', // 1: Pink - Female default
  '#4A90E2', // 2: Blue - Male default
  '#AB47BC', // 3: Purple - Female
  '#26A69A', // 4: Teal - Male
  '#EF5350', // 5: Red - Female
  '#5C6BC0', // 6: Indigo - Male
];

// Avatar emojis as fallback
const AVATAR_EMOJIS = [
  '👩', // 1: Female
  '👨', // 2: Male
  '👧', // 3: Girl
  '🧑', // 4: Person
  '👩‍🦰', // 5: Red hair woman
  '👨‍🦱', // 6: Curly hair man
];

/**
 * Get initials from name (first letter)
 */
export const getInitials = (name: string | null | undefined): string => {
  if (!name) return 'U';
  return name.charAt(0).toUpperCase();
};

/**
 * Get avatar color by avatar number (1-6)
 */
export const getAvatarColor = (avatar: number | null | undefined): string => {
  if (!avatar || avatar < 1 || avatar > 6) return AVATAR_COLORS[0];
  return AVATAR_COLORS[avatar - 1];
};

/**
 * Get avatar emoji by avatar number (1-6)
 */
export const getAvatarEmoji = (avatar: number | null | undefined): string => {
  if (!avatar || avatar < 1 || avatar > 6) return AVATAR_EMOJIS[0];
  return AVATAR_EMOJIS[avatar - 1];
};

/**
 * Get avatar image URL by avatar number (1-6)
 */
export const getAvatarImageUrl = (avatar: number | null | undefined): string | null => {
  if (!avatar || avatar < 1 || avatar > 6) return null;
  return `/images/profile/profile-${avatar}.png`;
};

/**
 * Generate avatar style object (for fallback with initials)
 */
export const getAvatarStyle = (avatar: number | null | undefined): React.CSSProperties => {
  return {
    backgroundColor: getAvatarColor(avatar),
  };
};
