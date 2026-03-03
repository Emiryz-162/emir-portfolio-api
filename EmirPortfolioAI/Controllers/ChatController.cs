using EmirPortfolioAI.DTOs;
using EmirPortfolioAI.Services;
using Microsoft.AspNetCore.Mvc;

namespace EmirPortfolioAI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChatController : ControllerBase
    {
        private readonly IAIService _aiService;

        public ChatController(IAIService aiService)
        {
            _aiService = aiService;
        }

        [HttpPost]
        public async Task<ActionResult<ChatResponseDto>> Post([FromBody] ChatRequestDto request)
        {
            var response = await _aiService.GetResponseAsync(request.Message);

            return Ok(new ChatResponseDto
            {
                Response = response
            });
        }

        [HttpGet("test")]
        public async Task<IActionResult> Test()
        {
            var result = await _aiService.GetResponseAsync("Emir Universitede ne okumustur?");
            return Ok(result);
        }
    }
}