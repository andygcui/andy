// Portfolio images loaded from public/uploads
// Captions are derived from filenames (minus extension) by default
// To customize a caption, add it to the customCaptions object below
// These images are permanent and will persist across reloads

const imageFilenames = [
  "zhangjiajie.jpg",
  "canon.jpg",
  "post paraglide.jpg",
  "inca trail.jpg",
  "birthday.jpg",
  "stargazing on poe.jpg",
  "1901 basement.jpg",
  "eddie herr.jpg",
  "pyramids.jpg",
  "fam in mexico.jpg",
  "carson, me, adele, tala.jpg",
  "senior sunset.jpg",
  "cusco.jpg",
  "srp night.jpg",
  "princeton.jpg",
  "citi.jpg",
  "club10.jpg",
  "dad's jacket.jpg",
  "blair lunch.jpg",
  "block blast @ plex.jpg",
  "hair dye.jpg",
  "boston.jpg",
  "anthony's.jpg",
  "emma raducanu.jpg",
  "carson.jpg",
  "freediving.jpg",
  "guang.jpg",
  "kbbq.jpg",
  "hong.jpg",
  "dc.jpg",
  "iceland race.jpg",
  "day 1.jpg",
  "lima.jpg",
  "longmen grottoes.jpg",
  "me and cody.jpg",
  "nom.jpg",
  "nyc chess.jpg",
  "oa.jpg",
  "panama.jpg",
  "paris.jpg",
  "pickups.jpg",
  "plex.jpg",
  "chichen itza.jpg",
  "puero rico.jpg",
  "rome.jpg",
  "selecto (tulum).jpg",
  "snapchat.jpg",
  "spooky practice.jpg",
  "cruise.jpg",
  "tennis tv.jpg",
  "tennis.jpg",
  "third row.jpg",
  "timmy.jpg",
  "turks and caicos.jpg",
  "westleigh.jpg",
  "yellowstone.jpg"
]

// Custom captions - override default filename-based captions here
// Format: "filename.jpg": "Your custom caption"
const customCaptions = {
  // Example: "boston.jpg": "Trip to Boston with friends"
  // Add your custom captions here
}

export const portfolioImages = imageFilenames.map((filename) => {
  // Use custom caption if provided, otherwise use filename (without extension)
  const defaultCaption = filename.replace(/\.(jpg|jpeg|png|gif|webp)$/i, '')
  const caption = customCaptions[filename] || defaultCaption
  
  return {
    id: filename,
    src: `/uploads/${filename}`,
    caption: caption,
    filename: filename
  }
})
