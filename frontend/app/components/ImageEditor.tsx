"use client";

import { useState, useRef, useEffect } from "react";

interface ImageEditorProps {
  imageUrl: string;
  initialCaption: string;
  onSave: (editedImageUrl: string, caption: string) => void;
  onClose: () => void;
}

export default function ImageEditor({
  imageUrl,
  initialCaption,
  onSave,
  onClose,
}: ImageEditorProps) {
  const [caption, setCaption] = useState(initialCaption);
  const [overlayText, setOverlayText] = useState("");
  const [fontSize, setFontSize] = useState(48);
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [textPosition, setTextPosition] = useState<"top" | "center" | "bottom">(
    "center"
  );
  const [fontWeight, setFontWeight] = useState<"normal" | "bold">("bold");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    drawImage();
  }, [imageUrl, overlayText, fontSize, textColor, textPosition, fontWeight]);

  const drawImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl;

    img.onload = () => {
      // Set canvas size
      canvas.width = 1024;
      canvas.height = 1024;

      // Draw image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Draw text overlay if exists
      if (overlayText) {
        ctx.font = `${fontWeight} ${fontSize}px system-ui, -apple-system, sans-serif`;
        ctx.fillStyle = textColor;
        ctx.textAlign = "center";
        ctx.shadowColor = "rgba(0, 0, 0, 0.8)";
        ctx.shadowBlur = 10;

        // Calculate position
        let y;
        if (textPosition === "top") {
          y = fontSize + 40;
        } else if (textPosition === "bottom") {
          y = canvas.height - 40;
        } else {
          y = canvas.height / 2;
        }

        // Draw text
        ctx.fillText(overlayText, canvas.width / 2, y);
      }
    };
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Convert canvas to data URL
    const editedImageUrl = canvas.toDataURL("image/png");
    onSave(editedImageUrl, caption);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-900">Edit Poster</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
          >
            ×
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Canvas Preview */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Preview
            </h3>
            <div className="bg-gray-100 rounded-2xl p-4">
              <canvas
                ref={canvasRef}
                className="w-full h-auto rounded-xl shadow-lg"
              />
            </div>
          </div>

          {/* Right: Controls */}
          <div className="space-y-6">
            {/* Caption Editor */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Caption
              </label>
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Write a caption for your post..."
              />
              <p className="text-xs text-gray-500 mt-1">
                {caption.length} characters
              </p>
            </div>

            {/* Text Overlay */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Add Text Overlay (Optional)
              </label>
              <input
                type="text"
                value={overlayText}
                onChange={(e) => setOverlayText(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border-0 rounded-xl text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., SUMMER SALE"
              />
            </div>

            {/* Text Controls */}
            {overlayText && (
              <div className="space-y-4 p-4 bg-gray-50 rounded-2xl">
                <h4 className="text-sm font-semibold text-gray-900">
                  Text Style
                </h4>

                {/* Font Size */}
                <div>
                  <label className="block text-xs text-gray-600 mb-2">
                    Font Size: {fontSize}px
                  </label>
                  <input
                    type="range"
                    min="24"
                    max="120"
                    value={fontSize}
                    onChange={(e) => setFontSize(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                {/* Text Color */}
                <div>
                  <label className="block text-xs text-gray-600 mb-2">
                    Text Color
                  </label>
                  <div className="flex gap-2">
                    {[
                      "#FFFFFF",
                      "#000000",
                      "#FF0000",
                      "#00FF00",
                      "#0000FF",
                      "#FFD700",
                    ].map((color) => (
                      <button
                        key={color}
                        onClick={() => setTextColor(color)}
                        className={`w-10 h-10 rounded-lg border-2 transition ${
                          textColor === color
                            ? "border-blue-500 scale-110"
                            : "border-gray-300"
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                    <input
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="w-10 h-10 rounded-lg border-2 border-gray-300 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Position */}
                <div>
                  <label className="block text-xs text-gray-600 mb-2">
                    Position
                  </label>
                  <div className="flex gap-2">
                    {[
                      { value: "top", label: "Top" },
                      { value: "center", label: "Center" },
                      { value: "bottom", label: "Bottom" },
                    ].map((pos) => (
                      <button
                        key={pos.value}
                        onClick={() => setTextPosition(pos.value as any)}
                        className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition ${
                          textPosition === pos.value
                            ? "bg-blue-500 text-white"
                            : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {pos.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Font Weight */}
                <div>
                  <label className="block text-xs text-gray-600 mb-2">
                    Weight
                  </label>
                  <div className="flex gap-2">
                    {[
                      { value: "normal", label: "Normal" },
                      { value: "bold", label: "Bold" },
                    ].map((weight) => (
                      <button
                        key={weight.value}
                        onClick={() => setFontWeight(weight.value as any)}
                        className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition ${
                          fontWeight === weight.value
                            ? "bg-blue-500 text-white"
                            : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {weight.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={onClose}
                className="flex-1 py-3 px-6 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-xl font-medium transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 py-3 px-6 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition shadow-sm"
              >
                Save & Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
