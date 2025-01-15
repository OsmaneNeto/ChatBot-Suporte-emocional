# backend/app/routes.py
from flask import Blueprint, jsonify, request
import google.generativeai as genai

# Configurar a chave da API
genai.configure(api_key="API_KEY_Gemini")  # Substitua pela sua chave da API

main_routes = Blueprint('main', __name__)

@main_routes.route('/api/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')

    # Chama a função para obter a resposta da API do Gemini
    response = fetch_gemini_response(user_message)

    # Exemplo de como calcular tokens (ajuste conforme necessário)
    tokens_used = len(user_message.split()) // 2  # Exemplo simples
    return jsonify({
        "response": response,
        "tokens": tokens_used
    })

def fetch_gemini_response(message):
    # Criar uma instância do modelo
    model = genai.GenerativeModel("gemini-1.5-flash")

    # Definir uma orientação padrão
    instruction = "Você é um assistente de suporte emocional. Responda de forma empática e informativa. Em caso de conselhos se basei na literatura em psicologia, não tem liberdade para criar ou inventar informação, somente use informações literarias como exemplo: Inteligência Emocional - Daniel Goleman, A Coragem de Ser Imperfeito - Brené Brown e O Homem em Busca de um Sentido - Viktor Frankl, mas nunca cite diretamente estes em seus comentários"

    try:
        # Concatenar a orientação com a mensagem do usuário
        full_message = f"{instruction}\n{message}"
        
        # Gerar conteúdo usando o modelo
        response = model.generate_content(full_message)
        return response.text
    except Exception as e:
        print(f"Erro ao chamar a API: {e}")
        return "Desculpe, não consegui entender sua mensagem."