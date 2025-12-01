import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditService() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    description: "",
    price: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadService = async () => {
      try {
        const res = await fetch(`http://localhost:3001/services/${id}`);
        const data = await res.json();

        setForm({
          title: data.title,
          subtitle: data.subtitle,
          description: data.description ?? "",
          price: data.price,
        });

        if (data.img) {
          setPreview(`http://localhost:3001/uploads/${data.img}`);
        }

      } catch (err) {
        console.error(err);
        alert("Error al cargar el servicio");
      } finally {
        setLoading(false);
      }
    };

    loadService();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("subtitle", form.subtitle);
    fd.append("description", form.description);
    fd.append("price", form.price);
    if (image) fd.append("image", image);

    try {
      const res = await fetch(`http://localhost:3001/services/${id}`, {
        method: "PUT",
        body: fd,
      });

      if (!res.ok) throw new Error();

      alert("✅ Servicio actualizado correctamente");
      navigate("/provider/services"); // ✅ FIX

    } catch (err) {
      alert("❌ Error al actualizar el servicio");
    }
  };

  if (loading) return <p className="text-center mt-10">Cargando...</p>;

  return (
    <div className="max-w-xl mx-auto p-4 mt-10">
      <h1 className="text-2xl font-bold mb-4">Editar servicio</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="font-semibold">Título</label>
          <input
            type="text"
            name="title"
            className="w-full border p-2 rounded"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="font-semibold">Subtítulo</label>
          <input
            type="text"
            name="subtitle"
            className="w-full border p-2 rounded"
            value={form.subtitle}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="font-semibold">Descripción</label>
          <textarea
            name="description"
            className="w-full border p-2 rounded"
            value={form.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div>
          <label className="font-semibold">Precio</label>
          <input
            type="number"
            name="price"
            className="w-full border p-2 rounded"
            value={form.price}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="font-semibold">Imagen</label>
          <input
            type="file"
            accept="image/*"
            className="w-full"
            onChange={handleImage}
          />

          {preview && (
            <img
              src={preview}
              alt="preview"
              className="mt-2 w-40 h-40 object-cover rounded border"
            />
          )}
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Guardar cambios
        </button>
      </form>
    </div>
  );
}
