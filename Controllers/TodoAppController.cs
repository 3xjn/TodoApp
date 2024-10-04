using TodoAppAPI.Models;
using TodoAppAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace TodoAppAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodoAppController : ControllerBase
    {
        private readonly TodoService _todoService;
        private readonly ILogger<TodoAppController> _logger;
        public TodoAppController(TodoService todoService, ILogger<TodoAppController> logger)
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

        [HttpPost("/save")]
        public async Task<ActionResult> Save(Todo[] todos)
        {
            _logger.LogInformation("Got todos: " + todos.Length);
            _logger.LogInformation(todos.ToString());

            foreach (var todo in todos)
            {
                if (!string.IsNullOrEmpty(todo.Id))
                {
                    var exists = _todoService.Get(todo.Id);
                    if (exists != null)
                    {
                        _todoService.Update(todo.Id, todo);
                    }
                    else
                    {
                        _todoService.Create(todo);
                    }
                }
                else
                {
                    _todoService.Create(todo);
                }
            }

            return Ok();
        }

        [HttpPost("/delete")]
        public async Task<ActionResult> Delete(string id)
        {
            _todoService.Delete(id);
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

            //var todoDtos = todos.Select(todo => new TodoDto
            //{
            //    Title = todo.Title,
            //    Content = todo.Content
            //});

            //return Ok(todoDtos);
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
