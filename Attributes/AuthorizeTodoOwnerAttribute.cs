using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using TodoAppAPI.Models;
using TodoAppAPI.Services;

namespace TodoAppAPI.Attributes
{
    public class AuthorizeTodoOwnerAttribute: ActionFilterAttribute
    {
        private readonly TodoService _todoService;

        public AuthorizeTodoOwnerAttribute(TodoService todoService)
        {
            _todoService = todoService;
        }

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            var userId = context.HttpContext.User.FindFirst("id")?.Value;

            if (userId == null)
            {
                context.Result = new UnauthorizedResult();
                return;
            }

            var todoId = context.ActionArguments["id"] as string;
            if (todoId == null) {
                context.Result = new BadRequestResult();
                return;
            }

            var todo = _todoService.Get(todoId);
            if (todo == null)
            {
                context.Result = new NotFoundResult();
                return;
            }

            if (todo.UserId != userId)
            {
                context.Result = new ForbidResult();
                return;
            }

            base.OnActionExecuting(context);
        }
    }
}
