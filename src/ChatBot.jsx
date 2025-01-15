import React, { useState } from 'react';
import './ChatBot.css';

const ChatBot = () => {
    const [userMessage, setUserMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [tokenUsage, setTokenUsage] = useState(0);
    const [loading, setLoading] = useState(false); // Estado para controle de loading
    const maxTokens = 100; // Limite de tokens

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Adiciona a mensagem do usuário à lista de mensagens
        setMessages([...messages, { sender: 'user', text: userMessage }]);
        
        // Limpa o campo de entrada
        setUserMessage('');

        // Chamar a API do Gemini
        setLoading(true); // Inicia o loading
        try {
            const response = await fetch('http://localhost:5000/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: userMessage }),
            });

            const data = await response.json();

            // Atualiza o uso de tokens
            const tokensUsed = data.tokens || 20; // Ajuste conforme sua lógica
            setTokenUsage(prev => prev + tokensUsed);

            // Verifica se o limite de tokens foi excedido
            if (tokenUsage + tokensUsed <= maxTokens) {
                setMessages(prev => [...prev, { sender: 'bot', text: data.response }]);
            } else {
                alert('Limite de tokens excedido!');
            }
        } catch (error) {
            console.error('Erro ao chamar a API:', error);
        } finally {
            setLoading(false); // Finaliza o loading
        }
    };

    return (
        <div className="chatbot-container">
            <h1>Chatbot de Suporte Emocional</h1>
            <div className="chat-window">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`}>
                        <strong>{msg.sender === 'user' ? 'Você' : 'Bot'}:</strong> {msg.text}
                    </div>
                ))}
                {loading && <div className="loading">Carregando...</div>}
            </div>
            <form onSubmit={handleSubmit} className="message-form">
                <input
                    type="text"
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    placeholder="Digite sua mensagem..."
                    required
                    className="message-input"
                />
                <button type="submit" className="send-button">Enviar</button>
            </form>
        </div>
    );
};

export default ChatBot;