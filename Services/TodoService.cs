using TodoAppAPI.Models;
using MongoDB.Driver;
using Microsoft.Extensions.Options;

namespace TodoAppAPI.Services
{
    public class TodoService
    {
        private readonly IMongoCollection<Todo> _todos;

        public TodoService(MongoClient mongoClient, IOptions<TodoDatabaseSettings> settings)
        {
            var database = mongoClient.GetDatabase(settings.Value.DatabaseName);

            _todos = database.GetCollection<Todo>(nameof(Todo));
        }

        public List<Todo> GetAll() => _todos.Find(todo => true).ToList();

        public IEnumerable<TodoDto> GetAllForUser(string userId)
        {
            return _todos
                .Find(todo => todo.UserId == userId)
                .ToList()
                .Select(todo => new TodoDto
                {
                    Id = todo.Id,
                    Title = todo.Title,
                    Content = todo.Content,
                    Order = todo.Order
                });
        }

        public Todo Get(string id) => _todos.Find(todo => todo.Id == id).FirstOrDefault();

        public Todo Create(Todo todo)
        {
            _todos.InsertOne(todo);
            return todo;
        }

        public void Update(TodoDto updateTodo)
        {
            var update = Builders<Todo>.Update;
            var updates = new List<UpdateDefinition<Todo>>();


            if (updateTodo.Title != null)
                updates.Add(update.Set(p => p.Title, updateTodo.Title));

            if (updateTodo.Content != null)
                updates.Add(update.Set(p => p.Content, updateTodo.Content));

            if (updateTodo.Order != null)
                updates.Add(update.Set(p => p.Order, updateTodo.Order));

            _todos.UpdateOneAsync(todo => todo.Id == updateTodo.Id, update.Combine(updates));
        }

        public void Delete(Todo TodoForDeletion) => _todos.DeleteOne(todo => todo.Id == TodoForDeletion.Id);

        public void Delete(string id) => _todos.DeleteOne(Todo => Todo.Id == id);
    }
}