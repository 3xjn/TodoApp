using TodoAppAPI.Models;
using TodoAppAPI.Services;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace TodoAppAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodoController : ControllerBase
    {
        private readonly TodoService _todoService;
        private readonly ILogger<TodoController> _logger;

        public TodoController(TodoService todoService, ILogger<TodoController> logger)
        {
            _todoService = todoService;
            _logger = logger;
        }

        [HttpGet("{id:length(24)}")]
        public ActionResult<Todo> Get(string id)
        {
            var todo = _todoService.Get(id);
            if (todo == null)
            {
                return NotFound();
            }
            return Ok(todo);
        }

        [HttpDelete("{id:length(24)}")]
        public async Task<ActionResult> Delete(string id)
        {
            var todo = _todoService.Get(id);
            if (todo == null)
            {
                return NotFound();
            }

            // Get the user ID from the claims in the HTTP context
            var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null || todo.UserId != userId)
            {
                return Forbid(); // User does not own this todo
            }

            _todoService.Delete(id);
            return Ok();
        }

        [HttpPut("update")]
        public async Task<ActionResult> Update(TodoDto todo)
        {
            // Get the user ID from the claims in the HTTP context
            var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return Unauthorized("User ID is required");
            }

            // Optionally retrieve the existing todo to ensure ownership
            var existingTodo = _todoService.Get(todo.Id);
            if (existingTodo == null || existingTodo.UserId != userId)
            {
                return Forbid(); // User does not own this todo
            }

            _todoService.Update(todo);
            return Ok();
        }

        [HttpGet, Authorize]
        public ActionResult<IEnumerable<TodoDto>> GetAll()
        {
            var userId = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (userId == null)
            {
                return Unauthorized("User ID is required");
            }

            var todos = _todoService.GetAllForUser(userId);
            if (todos == null || !todos.Any())
            {
                return NotFound();
            }

            return Ok(todos);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult> Create([FromBody] TodoDto todoDto) // Use the DTO for the request
        {
            _logger.LogInformation("Create method called");

            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User ID not found in token claims");
            }

            // Create the Todo object and set the UserId
            var todo = new Todo
            {
                UserId = userId,
                Title = todoDto.Title,
                Content = todoDto.Content,
                Order = todoDto.Order,
                Id = null // Ensure a new ID is created
            };

            try
            {
                var createdTodo = _todoService.Create(todo);
                return CreatedAtAction(nameof(Get), new { id = createdTodo.Id }, createdTodo);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating todo");
                return StatusCode(500, "An error occurred while creating the todo");
            }
        }
    }
}