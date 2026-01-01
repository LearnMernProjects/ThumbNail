import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { type AspectRatio, colorSchemes, dummyThumbnails, type IThumbnail, type ThumbnailStyle } from "../assets/thumblify_assets/assets/assets";
import { SoftBackdrop } from "../components/SoftBackdrop";
import AspectRatioSelector from "../components/AspectRatioSelector";
import StyleSelector from "../components/StyleSelector";
import ColorSchemeSelector from "../components/ColorSchemeSelector";
import PreviewPanel  from "../components/PreviewPanel";
const Generate = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [thumbnail, setThumbnails] = useState<IThumbnail | null>(null);
  const [loading, setLoading] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("16:9");
  const [colorSchemeId, setColorSchemeId] = useState<string>(colorSchemes[0].id);
  const [style, setStyle] = useState<ThumbnailStyle>('Bold and Graphic');
  const [styleDropDownOpen, setStyleDropDownOpen] = useState(false);
  const handleGenerate = async () =>{


  }
  const fetchThumbnail = async () => {
    if (id) {
      const foundThumbnail: any = dummyThumbnails.find(thumbnail => thumbnail._id === id) || null;
      setThumbnails(foundThumbnail)
      if (foundThumbnail) {
        setAdditionalDetails(foundThumbnail.user_prompt || "")
        setTitle(foundThumbnail.title || "")
        setColorSchemeId(foundThumbnail.color_scheme_id || colorSchemes[0].id)
        setAspectRatio(foundThumbnail.aspect_ratio as AspectRatio || "16:9");
        setStyle(foundThumbnail.style as ThumbnailStyle || 'Bold and Graphic');
      }
      setLoading(false);
    }
  }
  useEffect(() => {
    if (id) {
      fetchThumbnail();
    }
  }, [id]);
  return (
    <>
      <SoftBackdrop />

      <div className="pt-24 min-h-screen">
        <main className="max-w-6xl mx-auto px-4 sm:px-8 py-8 pb-28 lg:pb-8">
          <div className="grid lg:grid-cols-[400px_1fr] gap-8">
            <div className={`space-y-6 ${id && "pointer-events-none"}`}>
              <div className="p-6 rounded-2xl border border-gray-200 bg-white/8 border-white/12 shadow-xl space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-zinc-100 mb-1">Create your thumbnail</h2>
                  <p>Describe your vision and let AI bring it to life</p>
                </div>
                <div className="space-y-5">
                  <label className="block text-sm font-medium">
                    Title Topic

                  </label>
                  <input type="text" value={title} onChange={(e)=> setTitle(e.target.value)} maxLength={100} placeholder="Enter your title topic..."  className="w-full px-4 py-3 rounded-lg border border-white/12 bg-black/20 text-zinc-100 placeholder:text-zonc-400 focus:outline-none focus:ring-2 focus:ring-green-500"/>
                  <div>
                    <span className="text-xs text-zinc-400">{title.length}/100 characters</span>
                  </div>
                </div>
                <AspectRatioSelector value={aspectRatio} onChange={setAspectRatio} />
                <StyleSelector value={style} onChange={setStyle} isOpen={styleDropDownOpen} setIsOpen={(open) => {setStyleDropDownOpen(open)}} />
                  <ColorSchemeSelector value={colorSchemeId} onChange={setColorSchemeId} />
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Additional Details
                    <span className="text-xs text-zinc-400"> (Optional)</span>
                  </label>
                  <textarea 
                    value={additionalDetails} 
                    onChange={(e) => setAdditionalDetails(e.target.value)} 
                    maxLength={500} 
                    placeholder="Add any specific requirements or details..." 
                    className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/6 text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                    rows={3}
                  />
                  <div>
                    <span className="text-xs text-zinc-400">{additionalDetails.length}/500 characters</span>
                  </div>
                </div>
                {!id && (
                  <button onClick={handleGenerate} className="text-[15px] w-full py-3.5 rounded-xl font-medium bg-linear-to-b from-green-500 to-green-600 hover:from-green-700 disabled:cursor-not-allowed transition-colors" >
                    {loading ? 'Generating...' : 'Generate Thumbnail'}
                  </button>
                )}
              </div>
            </div>

            <div>
              <div className="p-6 rounded-2xl bg-white/8 border border-white/10 shadow-xl">
                <h2 className="text-lg font-semibold text-zinc-100 mb-4">Preview</h2>
                <PreviewPanel thumbnail={thumbnail} isLoading={loading} aspectRatio={aspectRatio} />
              </div>
            </div>
          </div>



          <div></div>
        </main>
      </div>
    </>
  );
};

export default Generate;
