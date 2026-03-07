# 🤖 Emir AI Portfolio – Backend API

Emir AI is an AI-powered portfolio assistant backend built with ASP.NET Core.
It uses OpenAI's GPT-4.1-mini model to answer questions about Muhammet Emir Yilmaz's projects, skills, education and professional background in a conversational way.

---

## 🚀 Features

- RESTful chat endpoint powered by OpenAI GPT-4.1-mini
- Multi-language support (Turkish, English, German)
- Context-aware responses based on developer's profile, projects and skills
- Typing animation support (character-by-character streaming on frontend)
- CORS enabled for cross-origin frontend communication

---

## 🔗 API Endpoints

### `POST /api/chat`
Send a message and receive an AI-generated response.

**Request:**
```json
{
  "message": "What technologies does Emir use?"
}
```

**Response:**
```json
{
  "response": "Emir primarily works with ASP.NET Core, C#, SQL, React and Next.js..."
}
```

### `GET /api/chat/test`
Test endpoint for quick debugging.

---

## 🧰 Tech Stack

- ASP.NET Core 9.0
- C#
- RESTful API
- OpenAI API (GPT-4.1-mini)
- Dependency Injection
- Swagger / OpenAPI

---

## 🎯 Project Purpose

This project serves as the backend for an interactive AI portfolio website.
Instead of a static resume, visitors can chat with an AI assistant that knows about the developer's experience, projects and technical skills.

Main goals:
- Building a production-ready REST API with ASP.NET Core
- Integrating third-party AI APIs (OpenAI)
- Clean architecture with service layer pattern
- Multi-language conversational AI

---

## 👤 Developer

Muhammet Emir Yilmaz
Full Stack Developer

LinkedIn: https://www.linkedin.com/in/emir-y/
GitHub: https://github.com/Emiryz-162
Email: yz.emir@hotmail.com
