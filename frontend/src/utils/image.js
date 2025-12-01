// src/utils/image.js
export function getImageUrl(img) {
  if (!img) return "https://via.placeholder.com/600x400?text=Sin+Imagen";
  if (img.startsWith("http")) return img;
  if (img.startsWith("/")) return `http://localhost:3001${img}`;
  return `http://localhost:3001/uploads/${img}`;
}
