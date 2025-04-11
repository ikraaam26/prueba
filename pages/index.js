import { useEffect, useState } from 'react'
import supabase from '../lib/supabaseClient'

export default function Home() {
  const [notas, setNotas] = useState([])
  const [texto, setTexto] = useState('')

  useEffect(() => {
    cargarNotas()
  }, [])

  async function cargarNotas() {
    const { data, error } = await supabase.from('notas').select('*').order('id', { ascending: false })
    if (error) console.error(error)
    else setNotas(data)
  }

  async function agregarNota() {
    if (texto.trim() === '') return
    const { error } = await supabase.from('notas').insert([{ texto }])
    if (!error) {
      setTexto('')
      cargarNotas()
    }
  }
  //hola

  return (
    <main className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Notas rápidas</h1>
      <div className="flex gap-2">
        <input
          type="text"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          className="border p-2 w-full"
          placeholder="Escribe una nota"
        />
        <button onClick={agregarNota} className="bg-blue-500 text-white px-4 py-2 rounded">
          Añadir
        </button>
      </div>
      <ul className="mt-4">
        {notas.map((nota) => (
          <li key={nota.id} className="border-b py-2">{nota.texto}</li>
        ))}
      </ul>
    </main>
  )
}
