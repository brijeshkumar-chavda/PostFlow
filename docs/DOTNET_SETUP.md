# .NET Backend Setup Guide

This project is configured to work with a .NET Core Web API backend.
Follow these steps to set up your C# environment.

## 1. Create the .NET Project

If you haven't already, create a new Web API project:

```bash
dotnet new webapi -n CrossPlatformPostApp.Api
cd CrossPlatformPostApp.Api
```

## 2. Configure CORS

Your Frontend runs on `http://localhost:3000`. You must allow this origin.
Update `Program.cs`:

```csharp
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS Configuration
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000", "http://localhost:3001")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend"); // Enable CORS

app.UseAuthorization();
app.MapControllers();
app.Run();
```

## 3. Implement Auth Controller

Create a new controller `Controllers/AuthController.cs`:

```csharp
using Microsoft.AspNetCore.Mvc;

namespace CrossPlatformPostApp.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            // TODO: Replace with real database logic
            if (request.Email == "test@gmail.com" && request.Password == "123")
            {
                return Ok(new { Token = "mock-jwt-token-123", User = new { Name = "Alex Johnson", Email = request.Email } });
            }
            return Unauthorized(new { Message = "Invalid credentials" });
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterRequest request)
        {
            // TODO: Interact with DB
            return Ok(new { Message = "User registered successfully" });
        }
    }

    public class LoginRequest
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class RegisterRequest
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
```

## 4. Run the Backend

```bash
dotnet run
```

Ensure it is running on **http://localhost:5000** (or update the Frontend `.env.local` to match your port).

## 5. Frontend Configuration

Create a `.env.local` file in the Next.js root:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```
