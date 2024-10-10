using TodoAppAPI.Models;
using TodoAppAPI.Services;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

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

        [HttpDelete("delete")]
        public async Task<ActionResult> Delete(string id)
        {
            _todoService.Delete(id);
            return Ok();
        }

        [HttpPut("update")]
        public async Task<ActionResult> Update(TodoDto todo)
        {
            _todoService.Update(todo);
            return Ok();
        }

        [HttpGet]
        public ActionResult<IEnumerable<TodoDto>> GetAll()
        {
            var todos = _todoService.GetAll();

            if (todos == null || !todos.Any())
            {
                return NotFound();
            }

            return Ok(todos);
        }

        [HttpPost]
        public async Task<ActionResult> Create(Todo todo)
        {
            todo.Id = null;
            var createdTodo = _todoService.Create(todo);
            return CreatedAtAction(nameof(Get), new { id = createdTodo.Id }, createdTodo);
        }
    }
}
