using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CrossPlatformPostApp.Server.Data;
using CrossPlatformPostApp.Server.Models;

namespace CrossPlatformPostApp.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MediaController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IWebHostEnvironment _environment;

    public MediaController(AppDbContext context, IWebHostEnvironment environment)
    {
        _context = context;
        _environment = environment;
    }

    [HttpPost("upload")]
    public async Task<IActionResult> UploadMedia([FromForm] IFormFile file, [FromForm] int userId)
    {
        if (file == null || file.Length == 0)
            return BadRequest("No file uploaded.");

        // Basic validation
        if (!file.ContentType.StartsWith("image/") && !file.ContentType.StartsWith("video/"))
            return BadRequest("Only image and video files are supported.");

        // Create uploads directory if it doesn't exist (double check)
        var uploadsPath = Path.Combine(_environment.WebRootPath ?? "wwwroot", "uploads");
        Directory.CreateDirectory(uploadsPath);

        // Generate unique filename
        var extension = Path.GetExtension(file.FileName);
        var filename = $"{Guid.NewGuid()}{extension}";
        var filePath = Path.Combine(uploadsPath, filename);

        // Save file
        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        // Determine type
        var type = file.ContentType.StartsWith("image/") ? "image" : "video";

        // Create MediaAsset record
        var mediaAsset = new MediaAsset
        {
            UserId = userId, // In real app, get from User.Identity
            Url = $"/uploads/{filename}",
            Type = type,
            Filename = file.FileName,
            SizeBytes = (int)file.Length,
            CreatedAt = DateTime.UtcNow
        };

        _context.MediaAssets.Add(mediaAsset);
        await _context.SaveChangesAsync();

        return Ok(mediaAsset);
    }
}
