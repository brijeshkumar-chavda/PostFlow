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
        return await _context.Posts.Include(p => p.MediaAssets).ToListAsync();
    }

    // POST: api/posts
    [HttpPost]
    public async Task<ActionResult<Post>> CreatePost(CrossPlatformPostApp.Server.DTOs.CreatePostDto postDto)
    {
        var post = new Post
        {
            Content = postDto.Content,
            Status = postDto.Status,
            ScheduledTime = postDto.ScheduledTime,
            UserId = postDto.UserId,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        if (postDto.MediaAssetIds != null && postDto.MediaAssetIds.Any())
        {
            var mediaAssets = await _context.MediaAssets
                .Where(m => postDto.MediaAssetIds.Contains(m.Id))
                .ToListAsync();
            
            post.MediaAssets = mediaAssets;
        }
        
        _context.Posts.Add(post);
        await _context.SaveChangesAsync();

        return Ok(post);
    }

    // DELETE: api/posts/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePost(int id)
    {
        var post = await _context.Posts.FindAsync(id);
        if (post == null)
        {
            return NotFound();
        }

        _context.Posts.Remove(post);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
