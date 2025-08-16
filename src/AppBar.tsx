import { ChevronLeft } from "lucide-react";

interface AppBarProps {
  title: string;
  description?: string;
  icon?: string;
  showBackButton?: boolean;
  onBack?: () => void;
}

const AppBar = ({ title, showBackButton = false, onBack }: AppBarProps) => {
  return (
    <div className="sticky top-0 z-20 rounded-full flex items-center justify-between p-4 bg-white border-b border-gray-200 font-sans">
      {/* Left side: Back Button */}
      {showBackButton && onBack && (
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          <span>Back</span>
        </button>
      )}
      {!showBackButton && <div></div>}{" "}
      {/* This is a spacer to push the title to the center */}
      {/* Center: Title and Description */}
      <div className="flex-grow text-center">
        <h1 className="text-xl font-bold text-gray-800">{title}</h1>
      </div>
      {/* Right side: Placeholder for other actions or an empty div */}
      <div></div>
    </div>
  );
};

export default AppBar;
