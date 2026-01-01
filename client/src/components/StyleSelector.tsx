import { thumbnailStyles, type ThumbnailStyle } from '../assets/thumblify_assets/assets/assets'
import { SparklesIcon, Square3Stack3DIcon, PhotoIcon, PencilIcon, CpuChipIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
const StyleSelector = ({value, onChange, isOpen, setIsOpen}: {value:ThumbnailStyle; onChange :(style: ThumbnailStyle)=> void;
isOpen: boolean; setIsOpen: (open: boolean) => void}) => {
  const styleDescriptions: Record<ThumbnailStyle, string> = {
    'modern': 'Clean and minimalist design',
    'vintage': 'Classic and retro aesthetic',
    'glamorous': 'Luxurious and shiny appearance',
    'natural': 'Earth-toned and organic feel',
    'tech/futuristic': 'High-tech and cyberpunk aesthetic'
  };
const styleIcons: Record<ThumbnailStyle, React.ReactNode> = {
    'modern': <SparklesIcon className="h-5 w-5 text-zinc-300" />,
    'vintage': <Square3Stack3DIcon className="h-5 w-5 text-zinc-300" />,
    'glamorous': <PhotoIcon className="h-5 w-5 text-zinc-300" />,
    'natural': <PencilIcon className="h-5 w-5 text-zinc-300" />,
    'tech/futuristic': <CpuChipIcon className="h-5 w-5 text-zinc-300" />
  };
  return (
    <div className="relative space-y-3 dark">
    <label className="block text-sm font-medium text-zinc-200">Thumbnail Style: {value}</label>
    <button type="button"
      onClick={() => setIsOpen(!isOpen)}
      className="w-full flex items-center justify-between rounded-md border px-4 py-3 text-left transition bg-white/8 border-white/10 text-zinc-300 hover:bg-white/12"
    >
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          {styleIcons[value]}
          <span>{value}</span>
        </div>
     
      <p className='text-xs text-zinc-400'>
        {styleDescriptions[value]}
      </p>
       </div>
      <ChevronDownIcon className={['h-5 w-5 text-zinc-400 transition-transform', isOpen && 'rotate-180'].join(' ')} />
      {isOpen && (
        <div className='absolute bottom-0 z-50 mt-1 w-full rounded-md border border-white/12 bg-black/20 backdrop-blur-3xl shadow-lg'>
          {thumbnailStyles.map((style) => (
            <button
              key={style} 
              type="button"
              className="flex w-full items-start gap-3 px-4 py-3 text-left transition hover:bg-black/30"
              onClick={() => { onChange(style); setIsOpen(false); }}
            >
              <div className='mt-0.5'> {styleIcons[style]}</div>
              <div>
                <p className='font-medium'>{style}</p>
                <p className='text-xs text-zinc-400'>{styleDescriptions[style]}</p>
              </div>
             
              <span className="ml-2">{style}</span>
            </button>
          ))}
        </div>
      )}
      
    </button>
    </div>
  )
}

export default StyleSelector
