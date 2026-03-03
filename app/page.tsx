"use client";

import { useState, useRef, useEffect } from "react";
import { Github, Linkedin, Mail } from "lucide-react";

type Message = {
    role: "user" | "assistant";
    content: string;
};

export default function Home() {

    const welcomeMessage = `
Merhaba ve hoş geldiniz 👋
Ben Emir AI.

Muhammet Emir Yılmaz'ın deneyimleri, projeleri ve teknik yetkinlikleri hakkında sorular sorabilirsiniz.

• Projelerini ve geliştirdiği sistemleri öğrenebilirsiniz
• Hangi teknolojileri kullandığını sorabilirsiniz
• Eğitim geçmişini inceleyebilirsiniz
• Mimari yaklaşımını ve Clean Architecture bakış açısını öğrenebilirsiniz

I can also respond in English.
You may ask about his projects, technical stack, education or professional background.

Lütfen istediğiniz dilde devam edin.
`;

    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: welcomeMessage }
    ]);

    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim() || loading) return;

        const userText = input;
        setInput("");

        setMessages((prev) => [...prev, { role: "user", content: userText }]);
        setLoading(true);

        try {
            const res = await fetch("https://localhost:7185/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userText }),
            });

            const data = await res.json();
            const fullText = data.response;

            // API cevabı geldiği anda loading'i kapat
            setLoading(false);

            // Typing için boş mesaj ekle
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "" },
            ]);

            let currentText = "";
            const typingSpeed = 10;

            for (let i = 0; i < fullText.length; i++) {
                currentText += fullText[i];

                setMessages((prev) => {
                    const updated = [...prev];
                    updated[updated.length - 1] = {
                        role: "assistant",
                        content: currentText,
                    };
                    return updated;
                });

                await new Promise((resolve) =>
                    setTimeout(resolve, typingSpeed)
                );
            }

        } catch {
            setLoading(false);

            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "Something went wrong." },
            ]);
        }
    };

    return (
        <div className="h-screen animated-bg text-white flex items-center justify-center">
            <div className="w-full max-w-7xl h-[85vh] p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* ================= LEFT PANEL ================= */} <div className="bg-black/50 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-6 flex flex-col overflow-hidden"> <div className="flex-1 overflow-y-auto space-y-6 text-center pr-2"> <img src="/profile.jpg" alt="Emir" className="w-32 h-32 mx-auto rounded-full object-cover border-2 border-blue-500/40" /> <div> <h1 className="text-2xl font-bold"> Muhammet Emir Yilmaz </h1> <p className="text-gray-400 mt-1"> Full Stack Developer </p> </div> <p className="text-gray-300 text-sm leading-relaxed"> Architecturally disciplined developer focused on scalable backend systems, clean code and long-term maintainability. </p> {/* CORE STACK */} <div> <h3 className="text-xs text-gray-400 uppercase tracking-widest mb-3"> Core Stack </h3> <div className="flex flex-wrap justify-center gap-2"> {["ASP.NET Core", "C#", "SQL", "REST API", "React", "Next.js"].map((tech) => (<span key={tech} className="px-3 py-1 text-xs bg-blue-600/20 text-blue-300 rounded-full border border-blue-500/20" > {tech} </span>))} </div> </div> {/* OTHER SKILLS */} <div> <h3 className="text-xs text-gray-400 uppercase tracking-widest mb-3"> Additional Skills </h3> <div className="flex flex-wrap justify-center gap-2"> {["HTML", "CSS", "JavaScript", "React Native", "MVC", "Layered Architecture", "Clean Architecture", "Unity"].map((tech) => (<span key={tech} className="px-2 py-1 text-[11px] bg-white/10 rounded-full border border-white/10" > {tech} </span>))} </div> </div> </div> {/* ALT SABIT */} <div className="pt-4 border-t border-white/10 space-y-4 text-center shrink-0"> <div className="flex items-center justify-center gap-2 text-gray-300 text-sm"> <Mail size={16} /> yz.emir@hotmail.com </div> <div className="flex justify-center gap-4"> <a href="https://github.com/Emiryz-162" target="_blank" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black text-sm font-semibold" > <Github size={16} /> GitHub </a> <a href="https://linkedin.com/in/emir-y" target="_blank" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-sm font-semibold" > <Linkedin size={16} /> LinkedIn </a> </div> <div className="text-xs text-gray-400"> Yapay Zeka Hatalar Yapabilir <br /> AI Can Make Mistakes </div> </div> </div>

                {/* CHAT PANEL */}
                <div className="md:col-span-2 bg-black/50 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl flex flex-col overflow-hidden">

                    <div className="p-4 border-b border-white/10 text-lg font-semibold">
                        Talk with Emir AI
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-4">

                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`whitespace-pre-line max-w-xl px-5 py-3 rounded-2xl animate-fadeIn ${msg.role === "user"
                                        ? "bg-blue-600 ml-auto"
                                        : "bg-gray-800 shadow-lg shadow-blue-500/10"
                                    }`}
                            >
                                {msg.content}
                            </div>
                        ))}

                        {loading && (
                            <div className="bg-gray-800 max-w-xl px-5 py-3 rounded-2xl flex items-center gap-2 animate-fadeIn">
                                <span>Emir AI</span>
                                <div className="flex gap-1">
                                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100"></div>
                                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-200"></div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    <div className="p-4 border-t border-white/10 flex gap-3">
                        <input
                            className="flex-1 p-3 rounded-xl bg-white text-black"
                            placeholder="Type your question..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                        />
                        <button
                            onClick={sendMessage}
                            className="bg-blue-600 px-6 rounded-xl font-semibold"
                        >
                            Send
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}