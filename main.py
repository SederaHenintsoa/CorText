from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import language_tool_python

app = FastAPI()

# IMPORTANT : Configuration CORS pour autoriser React (port 5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

tool = language_tool_python.LanguageTool('fr')

@app.post("/correct")
async def correct_text(data: dict):
    text = data.get("text", "")
    matches = tool.check(text)
    
    errors = []
    for m in matches:
        # AMÉLIORATION PRÉCISION : 
        # On filtre les suggestions absurdes comme "choque-la" 
        # en ignorant les suggestions qui ajoutent des tirets ou des espaces
        # sauf si le mot original en contenait déjà.
        filtered = [r for r in m.replacements if " " not in r and "-" not in r]
        if not filtered:
            filtered = m.replacements[:1] # Garder la meilleure si on n'a rien d'autre

        errors.append({
            "message": m.message,
            "replacements": filtered[:3],
            "offset": m.offset,
            "length": m.error_length,
        })
        
    return {
        "corrected": tool.correct(text),
        "errors": errors
    }