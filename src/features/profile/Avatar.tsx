interface AvatarProps {
    src: string;
    alt: string;
  }
  
  const Avatar = ({ src, alt }: AvatarProps) => {
    const defaultAvatar = "/path/to/default-avatar.jpg"; // Chemin vers l'avatar par défaut
  
    return (
      <img
        src={src || defaultAvatar}  // Utilisation de l'avatar par défaut si src est vide
        alt={alt}
        className="w-32 h-32 object-cover rounded-full"
      />
    );
  };
  
  export default Avatar;
  