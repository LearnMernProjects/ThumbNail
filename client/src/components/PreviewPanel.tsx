import { Loader2Icon, DownloadIcon } from 'lucide-react';
import { type AspectRatio, type IThumbnail } from '../assets/thumblify_assets/assets/assets';
import { ImageIcon } from 'lucide-react';

interface PreviewPanelProps {
  thumbnail: IThumbnail | null;
  isLoading: boolean;
  aspectRatio: string;
}

const PreviewPanel = ({ thumbnail, isLoading, aspectRatio }: { thumbnail: IThumbnail | null; isLoading: boolean; aspectRatio: AspectRatio}) => {
    const aspectClasses: Record<string, string> = {
        '16:9': 'aspect-video',
        '1:1' : 'aspect-square',
        '9:16' : 'aspect-[9/16]'
    }
    const onDownload =() => {
        if(!thumbnail?.image_url) return;
        // TODO: Implement download functionality
        window.open(thumbnail.image_url, '_blank');
    }
  return (
    <div className='relative mx-auto w-full max-w-2xl'>
        <div className={`relative overflow-hidden ${aspectClasses[aspectRatio]}`}>
            {isLoading && (
                <div className='absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/25'>
                    <Loader2Icon className='size-8 animate-spin text-zinc-400' />
                    <div className='text-center'>
                        <p className='text-sm font-medium text-zinc-200'>AI is generating your thumbnail</p>
                        <p className='text-xs mt-1 font-medium text-zinc-400'>This may take few minutes</p>
                    </div>
                </div>
            )}
            {!isLoading && thumbnail?.image_url && ( 
                <div className="group relative h-full w-full">
                    <img src ={thumbnail?.image_url} alt={thumbnail.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity items-end transition-opacity duration-200">
                        <button onClick={onDownload} type="button" className="bg-white/80 hover:bg-white text-black p-2 rounded-full shadow-lg">
                            <DownloadIcon className="size-4" />
                        </button>
                    </div>
                </div>
            )}
            {!isLoading && !thumbnail?.image_url && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-white/20 bg-black/25">
                    <div className='flex size-20 items-center justify-center rounded-full bg-white/10'>
                        <ImageIcon className="size-12 text-white opacity-50" />
                        
                    </div>
                    <div className='px-4 text-center'>
                        <p className='text-zinc-300 font-medium'>Generate your first Thumbnail</p>
                        <p>Fill out the form and click Generate</p>
                    </div>
                </div>
            )}
        </div>
    </div>
  )
}

export default PreviewPanel