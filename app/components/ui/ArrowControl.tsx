import {FaArrowLeft, FaArrowRight} from 'react-icons/fa';
import clsx from 'clsx';

interface ArrowControlProps {
  direction: 'left' | 'right';
  onClick?: () => void;
  disabled?: boolean;
}

const ArrowControl = ({ direction, onClick, disabled = false }: ArrowControlProps) => {
  const isLeft = direction === 'left';

  const baseClasses = "flex items-center justify-center transition duration-300 transform -skew-x-12 border";
  const sizeClasses = "w-[60px] h-[44px] rounded-tl-[12px] rounded-br-[12px]";
  const colorClasses = disabled
    ? "border-white/30 text-white/30 cursor-not-allowed"
    : "border-white text-white hover:bg-gradient-to-r hover:from-[#7e61f8] hover:to-[#d007a6] hover:text-white";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={isLeft ? 'Previous' : 'Next'}
      className={clsx(baseClasses, sizeClasses, colorClasses)}
    >
      <span className="skew-x-12">
        {isLeft ? <FaArrowLeft className="w-4 h-4" /> : <FaArrowRight className="w-4 h-4" />}
      </span>
    </button>
  );
};

export default ArrowControl;