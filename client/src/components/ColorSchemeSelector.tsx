import { colorSchemes } from "../assets/thumblify_assets/assets/assets"

const ColorSchemeSelector = ({
  value,
  onChange
}: {
  value: string
  onChange: (color: string) => void
}) => {
  return (
    <div className="space-y-3">
      <label className="text-zinc-200 block text-sm font-medium">
        {colorSchemes.map((scheme) => (
          <button
            key={scheme.id}
            onClick={() => onChange(scheme.id)}
            className={`relative rounded-lg transistion-all ${
              value === scheme.id && "ring-2 ring-green-500"
            }`}
            title={scheme.name}
          >
            <div className="flex h-10 w-30 rounded-lg overflow-hidden">
  {scheme.colors.map((color, index) => (
    <div
      key={index}
      className="flex-1 h-full"
      style={{ backgroundColor: color }}
    />
  ))}
</div>

            <p className="text-zinc-300 text-xs">
              Selected: {colorSchemes.find(s => s.id === value)?.name || "None"}
            </p>
          </button>
        ))}
      </label>
    </div>
  )
}

export default ColorSchemeSelector
