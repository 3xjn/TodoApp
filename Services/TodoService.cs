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

        public Todo Get(string id) => _todos.Find(todo => todo.Id == id).FirstOrDefault();

        public Todo Create(Todo todo)
        {
            _todos.InsertOne(todo);
            return todo;
        }

        public void Update(string id, Todo updatedTodo) => _todos.ReplaceOne(todo => todo.Id == id, updatedTodo);

        public void Delete(Todo TodoForDeletion) => _todos.DeleteOne(todo => todo.Id == TodoForDeletion.Id);

        public void Delete(string id) => _todos.DeleteOne(Todo => Todo.Id == id);
    }
}