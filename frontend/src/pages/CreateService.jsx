import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function CreateService() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { user } = useAuth();

  // ✅ Bloquear si NO es proveedor
  if (!user || user.role !== "PROVIDER") {
    return (
      <div className="text-center mt-20 text-xl font-semibold text-red-600">
        🚫 No tienes permisos para crear servicios
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !subtitle || !price || !image) {
      alert("Completa todos los campos");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("subtitle", subtitle);
    formData.append("price", price);
    formData.append("image", image);

    // ✅ Asociar con proveedor actual
    formData.append("providerId", user.id);

    try {
      const res = await fetch("http://localhost:3001/services", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Error al crear el servicio");
      }

      await res.json();

      alert("✅ Servicio creado correctamente");
      navigate("/provider/services"); // ✅ redirigir

    } catch (err) {
      console.error(err);
      alert("❌ Error al subir el servicio");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded mt-10">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Crear nuevo servicio
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="font-semibold block mb-1">Título</label>
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="font-semibold block mb-1">Descripción</label>
          <textarea
            className="w-full border p-2 rounded"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            required
          ></textarea>
        </div>

        <div>
          <label className="font-semibold block mb-1">Precio (S/.)</label>
          <input
            type="number"
            min="1"
            className="w-full border p-2 rounded"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="font-semibold block mb-1">Imagen</label>
          <input
            type="file"
            accept="image/*"
            className="w-full"
            onChange={(e) => {
              const file = e.target.files[0];
              setImage(file);
              setPreview(URL.createObjectURL(file));
            }}
            required
          />

          {preview && (
            <img
              src={preview}
              alt="preview"
              className="mt-3 w-40 h-40 object-cover rounded border"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded text-white text-lg font-semibold transition
            ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
        >
          {loading ? "Creando..." : "Crear servicio"}
        </button>
      </form>
    </div>
  );
}
