using EmirPortfolioAI.DTOs;

namespace EmirPortfolioAI.Services
{
    public interface IAIService
    {
        Task<string> GetResponseAsync(string userMessage);
    }
}