import {TrashIcon, ArrowRightIcon, DownloadIcon, TruckElectric } from "lucide-react";
import { dummyThumbnails, type IThumbnail } from "../assets/thumblify_assets/assets/assets";
import { SoftBackdrop } from "./SoftBackdrop"
import { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom";
const MyGeneration = () => {
    const aspectRatioClassMap: Record<string, string> = {
        "1:1": "aspect-square",
        "3:4": "aspect-[3/4]",
        "4:5": "aspect-[4/5]",
        "9:16": "aspect-[9/16]"
    };
    const navigate = useNavigate();
  const [thumbnails, setThumbnails] = useState<IThumbnail[]>([]);
  const [Loading, setLoading] = useState<boolean>(false);

  const fetchThumbnails = async () => {
    console.log("fetchThumbnails called, Loading state:", Loading);
    setThumbnails(dummyThumbnails as unknown as IThumbnail[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchThumbnails();
  }, []);

  const handleDownload = (image_url: string) => {
    window.open(image_url, "_blank");
  };

  const handleDelete = async (id: string) => {
    console.log("Delete thumbnail with id:", id);
  };

  console.log("Render - Loading state:", Loading);

  return (
    <>
      <SoftBackdrop />

      <div className="relative z-50 mt-32 min-h-screen px-6 md:px-16 lg:px-24 xl:px-32">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-zinc-200">
            My Generation
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            View and manage all your AI-generated thumbnails
          </p>
        </div>

        {Loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white/20 border border-white/30 animate-pulse h-[260px] flex items-center justify-center text-white"
              >
                Thumbnail {i + 1}
              </div>
            ))}
          </div>
        )}
        {!Loading && thumbnails.length===0 && (
            <div className="text-center py-24">
                <h3 className="text-lg font-medium text-zinc-300">No thumbnails yet</h3>
                <p className="text-sm text-zinc-500 mt-2">Generate some thumbnails to see them here.</p>
            </div>
        )}
        {!Loading && thumbnails.length > 0 && (
            <div className="columns-1 sm:columns-2 lg:columns-3 2xl:columns-4 gap-8">
                {thumbnails.map((thumb : IThumbnail) => {
                    const aspectClass = aspectRatioClassMap[thumb.aspect_ratio || '16:9'];
                    return(
                        <div key={thumb._id} className={`mb-8 group relative cursor-pointer rounded-2xl bg-white/6 border-white/10 transition shadow-xl break-inside-avoid ${aspectClass}`} onClick={() => navigate(`/generate/${thumb._id}`)}>
            <div className={`relative overflow-hidden rounded-t-2xl ${aspectClass} bg-black`}>
                {/* Image would go here */}
                {thumb.image_url ? (
                    <img src={thumb.image_url} alt={`thumb.title`} className="w-full h-full object-cover group-hover:scale-105 transition transform duration-300" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-400 text-sm">
                       {thumb.isGenerating ? "Generating..." : "No Image"}
                    </div>
                )}
                {thumb.isGenerating && <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white text-sm font-medium">Generating...</div>}
                
                </div>
                <div className="text-sm font-semibold text-zinc-100 line-clamp-2"> {thumb.title || 'Untitled Thumbnail'}
                  <div className="flex flex-wrap gap-2 text-xs text-zinc-400">
                    <span className="px-2 py-0.5 rounded bg-white/8">{thumb.color_scheme || 'Default'}</span>
                    <span className="px-2 py-0.5 rounded bg-white/8">{thumb.aspect_ratio || 'Default'}</span>
                    <p className="text-xs text-zinc-500">{new Date (thumb.createdAt!).toDateString()} </p>
                    </div>
                    <div onClick={(e)=> e.stopPropagation()} className="absolute bottom-2 right-2 max-sm:flex sm:hidden group-hover:flex gap-1.5">
                     
                     <TrashIcon className="size-6 bg-black/50 hover:bg-green-600 p-1 rounded transition-all" onClick={() =>handleDelete(thumb._id) } />
                     <DownloadIcon onClick={() => handleDownload(thumb.image_url!)} className="size-6 bg-black/50 p-1 rounded hover:bg-green-600 transistion-all" />
                     <Link target="_blank" to={`/preview?thumbnail_url=${thumb.image_url}&title=${thumb.title}`}>
                     <ArrowRightIcon className="size-6 bg-black/50 p-1 rounded hover:bg-green-600 transistion all cursor-pointer"/>
                  </Link>
                     </div>
                </div>
              </div>
            );
                })}
            </div>
        )}
      </div>
    </>
  );
};

export default MyGeneration;
