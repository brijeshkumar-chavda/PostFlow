using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CrossPlatformPostApp.Server.Data;
using CrossPlatformPostApp.Server.Models;

namespace CrossPlatformPostApp.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PostsController : ControllerBase
{
    private readonly AppDbContext _context;

    public PostsController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/posts
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Post>>> GetPosts()
    {
        return await _context.Posts.ToListAsync();
    }

    // POST: api/posts
    [HttpPost]
    public async Task<ActionResult<Post>> CreatePost(Post post)
    {
        post.CreatedAt = DateTime.UtcNow;
        post.UpdatedAt = DateTime.UtcNow;
        
        _context.Posts.Add(post);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetPosts), new { id = post.Id }, post);
    }
}
