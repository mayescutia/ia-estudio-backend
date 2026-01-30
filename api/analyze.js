export default async function handler(req, res) {
  const { original, recall, article } = req.body;

  const prompt = `
Eres un preparador experto en oposiciones jurídicas.
Compara el texto original con el recuerdo del alumno.

ARTÍCULO:
${article}

TEXTO ORIGINAL:
${original}

RECUERDO DEL ALUMNO:
${recall}

Devuelve:
- Omisiones importantes
- Errores conceptuales
- Qué está bien recordado
- 5 tarjetas pregunta-respuesta
En español claro y pedagógico.
`;

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "llama3-8b-8192",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3
    })
  });

  const data = await response.json();
  res.json(data);
}
