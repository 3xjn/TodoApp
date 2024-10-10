using Microsoft.AspNetCore.Mvc.ModelBinding;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TodoAppAPI.Models
{
    public class Todo
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [BindNever]
        public string? Id { get; set; } = null;
        public string Title { get; set; }
        public string Content { get; set; }
        public int Order { get; set; }
    }

    public class TodoDto
    {
        public string? Id { get; set; }
        public string? Title { get; set; }
        public string? Content { get; set; }
        public int? Order { get; set; }
    }
}
